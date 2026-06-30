import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Genere un lien d'invitation Supabase pour un vrai client paye.
 *
 * POST /api/admin/clients/invite
 * Header : x-admin-secret: VOTRE_ADMIN_SECRET
 * Body   : { "email": "client@email.com" }
 */

export const dynamic = "force-dynamic";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Variables Supabase manquantes.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return Response.json({ error: "Non autorise." }, { status: 401 });
  }
//jjerjjrjr
  let email: string;
  try {
    const body = await request.json();
    email = (body.email as string)?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Email invalide." }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "Body JSON invalide." }, { status: 400 });
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? `https://${request.headers.get("host")}`;
  const redirectTo = `${appUrl}/auth/confirm`;

  try {
    const db = supabaseAdmin();

    const { data: client, error: clientError } = await db
      .from("clients")
      .select("id_client")
      .eq("contact_email", email)
      .maybeSingle();

    if (clientError) {
      return Response.json({ error: "Impossible de verifier le client." }, { status: 500 });
    }

    if (!client?.id_client) {
      return Response.json({ error: "Aucun client paye associe a cet email." }, { status: 404 });
    }

    const { data: activeService, error: serviceError } = await db
      .from("client_services")
      .select("id")
      .eq("id_client", client.id_client)
      .in("payment_status", ["paid", "paye"])
      .in("service_status", ["active", "en_cours"])
      .limit(1)
      .maybeSingle();

    if (serviceError) {
      return Response.json({ error: "Impossible de verifier le service client." }, { status: 500 });
    }

    if (!activeService) {
      return Response.json({ error: "Aucun service paye actif pour ce client." }, { status: 403 });
    }

    const { data, error } = await db.auth.admin.generateLink({
      type: "invite",
      email,
      options: { redirectTo },
    });

    if (error) {
      console.error("[invite] Erreur Supabase:", error.message);
      return Response.json({ error: error.message }, { status: 500 });
    }

    const link = data?.properties?.action_link;
    if (!link) {
      return Response.json({ error: "Lien non genere." }, { status: 500 });
    }

    let userId: string | null = data.user?.id ?? null;
    if (!userId) {
      const {
        data: { users },
      } = await db.auth.admin.listUsers();
      userId = users.find((authUser) => authUser.email?.toLowerCase() === email)?.id ?? null;
    }

    if (!userId) {
      return Response.json({ error: "Compte Auth client introuvable apres invitation." }, { status: 500 });
    }

    const { data: existingMember, error: memberFetchError } = await db
      .from("client_members")
      .select("id_client, user_id")
      .eq("id_client", client.id_client)
      .eq("user_id", userId)
      .maybeSingle();

    if (memberFetchError) {
      return Response.json({ error: "Impossible de verifier le rattachement client." }, { status: 500 });
    }

    if (!existingMember) {
      const { error: memberInsertError } = await db
        .from("client_members")
        .insert({
          id_client: client.id_client,
          user_id: userId,
          role: "owner",
        });

      if (memberInsertError) {
        return Response.json({ error: "Impossible de rattacher le compte Auth au client." }, { status: 500 });
      }
    }

    return Response.json({
      success: true,
      email,
      link,
      expires_in: "24 heures",
      message: `Envoyez ce lien a ${email} pour qu'il cree son acces espace client.`,
    });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Erreur inconnue." },
      { status: 500 }
    );
  }
}
