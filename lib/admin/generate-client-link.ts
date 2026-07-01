import { supabaseAdmin } from "@/lib/supabase-admin";
import { randomBytes } from "crypto";

export type ClientLinkResult = {
  link: string | null;
  error: string | null;
  firstName?: string;
  lastName?: string;
};

export async function buildClientLink(email: string): Promise<ClientLinkResult> {
  const { data: prospect } = await supabaseAdmin
    .from("client_prospects")
    .select("id_client, contact_first_name, contact_last_name")
    .eq("contact_email", email)
    .maybeSingle();
  if (!prospect?.id_client) return { link: null, error: "Aucun prospect trouvé pour cet email." };

  const { data: client } = await supabaseAdmin
    .from("clients")
    .select("id_client")
    .eq("id_client_prospect", prospect.id_client)
    .eq("status", "active")
    .maybeSingle();
  if (!client?.id_client) return { link: null, error: "Aucun client actif associé à cet email." };

  const { data: activeService } = await supabaseAdmin
    .from("client_services")
    .select("id_service")
    .eq("id_client", prospect.id_client)
    .in("payment_status", ["paye"])
    .in("service_status", ["en_cours"])
    .limit(1)
    .maybeSingle();
  if (!activeService) return { link: null, error: "Aucun service payé actif pour ce client." };

  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
  let authUser = users.find((u) => u.email?.toLowerCase() === email);

  if (!authUser) {
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        first_name: prospect.contact_first_name ?? "",
        last_name: prospect.contact_last_name ?? "",
      },
    });
    if (createErr || !created.user) return { link: null, error: "Impossible de créer le compte Auth." };
    authUser = created.user;
  } else {
    await supabaseAdmin.auth.admin.updateUserById(authUser.id, {
      user_metadata: {
        first_name: prospect.contact_first_name ?? "",
        last_name: prospect.contact_last_name ?? "",
      },
    });
  }

  const { data: existingMember } = await supabaseAdmin
    .from("client_members")
    .select("id")
    .eq("id_client", client.id_client)
    .eq("user_id", authUser.id)
    .maybeSingle();

  if (!existingMember) {
    await supabaseAdmin.from("client_members").insert({
      id_client: client.id_client,
      user_id: authUser.id,
      role: "owner",
    });
  }

  await supabaseAdmin
    .from("activation_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("email", email)
    .is("used_at", null);

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

  const { error: insertErr } = await supabaseAdmin.from("activation_tokens").insert({
    token,
    email,
    expires_at: expiresAt.toISOString(),
  });
  if (insertErr) return { link: null, error: "Erreur lors de la génération du token." };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://optimal-logic.com";
  return {
    link: `${appUrl}/connexion/activer?token=${token}`,
    error: null,
    firstName: prospect.contact_first_name ?? undefined,
    lastName: prospect.contact_last_name ?? undefined,
  };
}
