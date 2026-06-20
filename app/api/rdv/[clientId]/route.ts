import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";
import { getClientConfig } from "@/lib/clients/registry";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 2000);
}

function isValidEmail(email: string): boolean {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

function isValidDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  minDate.setDate(minDate.getDate() + 2);
  return d >= minDate;
}

const VALID_TYPES = [
  "gateau_anniversaire",
  "piece_montee",
  "buffet_patissier",
  "pain_special",
  "consultation",
  "autre",
] as const;

type CommandeType = (typeof VALID_TYPES)[number];

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/rdv/[clientId]">
) {
  const ip = getClientIp(request);
  const rl = rateLimit(`rdv-slots:${ip}`, 60, 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { clientId } = await ctx.params;
  if (!getClientConfig(clientId)) {
    return Response.json({ error: "Client introuvable." }, { status: 404 });
  }

  const { data: slots, error } = await supabase
    .from("commerce_rdv_slots")
    .select("id, day_of_week, start_time, end_time, max_bookings")
    .eq("id_client", clientId)
    .eq("is_active", true)
    .order("day_of_week");

  if (error) {
    return Response.json({ error: "Impossible de charger les créneaux." }, { status: 500 });
  }

  const today = new Date();
  const dayNames = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  const availableSlots: Array<{ date: string; day: string; startTime: string; endTime: string; slotId: string }> = [];

  for (let week = 0; week < 4; week++) {
    for (const slot of slots ?? []) {
      const date = new Date(today);
      const daysUntil = (slot.day_of_week - today.getDay() + 7) % 7;
      date.setDate(today.getDate() + daysUntil + week * 7);

      const minDate = new Date(today);
      minDate.setDate(minDate.getDate() + 2);
      if (date < minDate) continue;

      const dateStr = date.toISOString().split("T")[0];
      const { count } = await supabase
        .from("commerce_rdv")
        .select("id", { count: "exact", head: true })
        .eq("id_client", clientId)
        .eq("date_souhaitee", dateStr)
        .eq("heure_rdv", slot.start_time)
        .in("statut", ["en_attente", "confirme"]);

      if ((count ?? 0) < slot.max_bookings) {
        availableSlots.push({
          date: dateStr,
          day: dayNames[slot.day_of_week],
          startTime: slot.start_time,
          endTime: slot.end_time,
          slotId: slot.id,
        });
      }
    }
  }

  return Response.json({ slots: availableSlots });
}

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/rdv/[clientId]">
) {
  const ip = getClientIp(request);
  const rl = rateLimit(`rdv-book:${ip}`, 3, 60 * 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { clientId } = await ctx.params;
  if (!getClientConfig(clientId)) {
    return Response.json({ error: "Client introuvable." }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const prospectNom = sanitize(body.prospectNom);
  const prospectEmail = sanitize(body.prospectEmail).toLowerCase();
  const prospectPhone = sanitize(body.prospectPhone);
  const typeCommande = sanitize(body.typeCommande) as CommandeType;
  const dateSouhaitee = sanitize(body.dateSouhaitee);
  const heureRdv = body.heureRdv ? sanitize(body.heureRdv as string) : null;
  const nbPersonnes = typeof body.nbPersonnes === "number" ? Math.min(Math.max(body.nbPersonnes, 1), 10000) : null;
  const details = sanitize(body.details).slice(0, 1000);
  const budgetRange = body.budgetRange ? sanitize(body.budgetRange as string) : null;
  const consentementRgpd = body.consentementRgpd === true;

  if (!prospectNom || prospectNom.length < 2) return Response.json({ error: "Le nom est obligatoire." }, { status: 400 });
  if (!isValidEmail(prospectEmail)) return Response.json({ error: "Email invalide." }, { status: 400 });
  if (!VALID_TYPES.includes(typeCommande)) return Response.json({ error: "Type de commande invalide." }, { status: 400 });
  if (!dateSouhaitee || !isValidDate(dateSouhaitee)) return Response.json({ error: "La date doit être au minimum 48h à l'avance." }, { status: 400 });
  if (!consentementRgpd) return Response.json({ error: "Le consentement RGPD est obligatoire." }, { status: 400 });

  const { data, error } = await supabase
    .from("commerce_rdv")
    .insert({
      id_client: clientId,
      prospect_nom: prospectNom,
      prospect_email: prospectEmail,
      prospect_phone: prospectPhone || null,
      type_commande: typeCommande,
      date_souhaitee: dateSouhaitee,
      heure_rdv: heureRdv,
      nb_personnes: nbPersonnes,
      details: details || null,
      budget_range: budgetRange,
      consentement_rgpd: consentementRgpd,
      statut: "en_attente",
    })
    .select("id")
    .single();

  if (error || !data) {
    return Response.json({ error: "Impossible d'enregistrer votre demande. Veuillez réessayer." }, { status: 500 });
  }

  return Response.json({ success: true, id: data.id, message: "Demande enregistrée." }, { status: 201 });
}
