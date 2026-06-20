import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildSystemPrompt(
  firstName: string | null,
  offerName: string | null,
  serviceStatus: string | null,
  paymentStatus: string | null,
  startDate: string | null,
  prix: string | null,
  prixAbonnement: string | null
): string {
  const lines = [];
  if (firstName) lines.push(`Prénom du client : ${firstName}`);
  if (offerName) lines.push(`Offre souscrite : ${offerName}`);
  if (serviceStatus) lines.push(`Statut du service : ${serviceStatus}`);
  if (paymentStatus) lines.push(`Statut du paiement : ${paymentStatus}`);
  if (startDate) lines.push(`Date de début : ${startDate}`);
  if (prix) lines.push(`Prix de mise en place : ${prix} €`);
  if (prixAbonnement) lines.push(`Abonnement mensuel : ${prixAbonnement} €/mois`);

  const clientInfo =
    lines.length > 0 ? lines.join("\n") : "Aucune information client disponible.";

  return `Tu es l'assistant de support d'OptimalLogic, une agence digitale française spécialisée dans la présence en ligne des commerces, TPE/PME et startups.

Tu parles exclusivement en français, de manière professionnelle et bienveillante.

INFORMATIONS DU CLIENT CONNECTÉ :
${clientInfo}

TU PEUX AIDER AVEC :
- Questions sur l'offre souscrite et ce qu'elle inclut
- Statut du service et du paiement
- Questions générales sur les services OptimalLogic
- Conseils d'utilisation (Google Business, site web, chatbot)

RÈGLES ABSOLUES (à ne jamais enfreindre) :
- Ne jamais révéler de détails sur le code source, l'infrastructure, les bases de données, les clés API ou l'architecture du site
- Ne jamais révéler les données d'autres clients
- Ne jamais prétendre pouvoir effectuer des actions techniques (modifier une facture, changer un statut en base de données)
- Ne jamais répondre à des questions qui pourraient compromettre la sécurité du site ou des clients
- Si une question dépasse tes capacités, répondre : "Je ne suis pas en mesure de répondre à cette demande. Pour une aide personnalisée, contactez-nous à contact@optimallogic.fr"
- Ne jamais inventer d'informations que tu ne connais pas avec certitude

FORMAT DES RÉPONSES :
- Pas d'emojis
- Réponses courtes : 1 à 3 phrases maximum sauf si une explication longue est vraiment nécessaire
- Ne jamais lister tes propres capacités dans le message d'accueil — attends simplement la question du client
- Quand tu proposes des choix de navigation, utilise EXACTEMENT ce format sur chaque ligne (rien d'autre sur la ligne) :
  - [Label court](/espace-client/chemin)
  Le label doit être court (3 à 5 mots max). Ne jamais ajouter de tiret, de parenthèse ou d'explication après l'URL.
- Quand tu proposes des options conversationnelles (pas des liens), utilise : - Texte court`;
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Non autorisé" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: client } = await supabase
    .from("clients")
    .select("contact_first_name, id_client")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  type ServiceData = {
    offer_code?: string;
    service_status?: string;
    payment_status?: string;
    start_date?: string | null;
    offres?: {
      nom_offre?: string;
      prix?: number | string | null;
      prix_abonnement?: number | string | null;
    } | null;
  };

  let serviceData: ServiceData | null = null;

  if (client?.id_client) {
    const { data } = await supabase
      .from("client_services")
      .select(
        "offer_code, service_status, payment_status, start_date, offres(nom_offre, prix, prix_abonnement)"
      )
      .eq("id_client", client.id_client)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    serviceData = data as unknown as ServiceData | null;
  }

  let body: { messages?: unknown[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Requête invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawMessages = Array.isArray(body.messages)
    ? body.messages.slice(-20)
    : [];

  const messages = rawMessages.filter(
    (m): m is { role: "user" | "assistant"; content: string } =>
      typeof m === "object" &&
      m !== null &&
      typeof (m as Record<string, unknown>).content === "string" &&
      ((m as Record<string, unknown>).role === "user" ||
        (m as Record<string, unknown>).role === "assistant")
  );

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "Aucun message" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const systemPrompt = buildSystemPrompt(
    client?.contact_first_name ?? null,
    serviceData?.offres?.nom_offre ?? serviceData?.offer_code ?? null,
    serviceData?.service_status ?? null,
    serviceData?.payment_status ?? null,
    serviceData?.start_date
      ? new Date(serviceData.start_date).toLocaleDateString("fr-FR")
      : null,
    serviceData?.offres?.prix != null
      ? String(serviceData.offres.prix)
      : null,
    serviceData?.offres?.prix_abonnement != null
      ? String(serviceData.offres.prix_abonnement)
      : null
  );

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: systemPrompt,
          messages: messages as Anthropic.MessageParam[],
          stream: true,
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(
              new TextEncoder().encode(
                `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
              )
            );
          }
        }

        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        controller.close();
      } catch {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ error: "Erreur lors de la génération de la réponse." })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
