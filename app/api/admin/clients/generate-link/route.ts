import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/clients/generate-link
 * Header : x-admin-secret: VOTRE_ADMIN_SECRET
 * Body   : { "email": "client@email.com" }
 *
 * Retourne : { "link": "https://optimal-logic.com/connexion/activer?token=..." }
 * Valable 2 heures, usage unique.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return Response.json({ error: "Non autorise." }, { status: 401 });
  }

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

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: prospect, error: prospectError } = await db
    .from("client_prospects")
    .select("id_client")
    .eq("contact_email", email)
    .maybeSingle();

  if (prospectError) {
    return Response.json({ error: "Impossible de verifier le client." }, { status: 500 });
  }

  if (!prospect?.id_client) {
    return Response.json({ error: "Aucun client paye associe a cet email." }, { status: 404 });
  }

  const { data: client, error: clientError } = await db
    .from("clients")
    .select("id_client")
    .eq("id_client_prospect", prospect.id_client)
    .eq("status", "active")
    .maybeSingle();

  if (clientError) {
    return Response.json({ error: "Impossible de verifier le client." }, { status: 500 });
  }

  if (!client?.id_client) {
    return Response.json({ error: "Aucun client paye associe a cet email." }, { status: 404 });
  }

  const { data: activeService, error: serviceError } = await db
    .from("client_services")
    .select("id_service")
    .eq("id_client", prospect.id_client)
    .in("payment_status", ["paye"])
    .in("service_status", ["en_cours"])
    .limit(1)
    .maybeSingle();

  if (serviceError) {
    return Response.json({ error: "Impossible de verifier le service client." }, { status: 500 });
  }

  if (!activeService) {
    return Response.json({ error: "Aucun service paye actif pour ce client." }, { status: 403 });
  }

  const {
    data: { users },
  } = await db.auth.admin.listUsers();

  let user = users.find((authUser) => authUser.email?.toLowerCase() === email);

  if (!user) {
    const { data: createdUser, error: createUserError } =
      await db.auth.admin.createUser({
        email,
        email_confirm: true,
      });

    if (createUserError || !createdUser.user) {
      return Response.json({ error: "Impossible de creer le compte Auth client." }, { status: 500 });
    }

    user = createdUser.user;
  }

  const { data: existingMember, error: memberFetchError } = await db
    .from("client_members")
    .select("id_client, user_id")
    .eq("id_client", client.id_client)
    .eq("user_id", user.id)
    .maybeSingle();

  if (memberFetchError) {
    return Response.json({ error: "Impossible de verifier le rattachement client." }, { status: 500 });
  }

  if (!existingMember) {
    const { error: memberInsertError } = await db
      .from("client_members")
      .insert({
        id_client: client.id_client,
        user_id: user.id,
        role: "owner",
      });

    if (memberInsertError) {
      return Response.json({ error: "Impossible de rattacher le compte Auth au client." }, { status: 500 });
    }
  }

  await db
    .from("activation_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("email", email)
    .is("used_at", null);

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

  const { error } = await db.from("activation_tokens").insert({
    token,
    email,
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    return Response.json({ error: "Erreur lors de la generation du lien." }, { status: 500 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? `https://${request.headers.get("host")}`;
  const link = `${appUrl}/connexion/activer?token=${token}`;

  return Response.json({
    success: true,
    email,
    link,
    expires_in: "2 heures",
    expires_at: expiresAt.toISOString(),
  });
}
