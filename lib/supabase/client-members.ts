import type { SupabaseClient } from "@supabase/supabase-js";

export type ClientMember = {
  id_client: string;
  user_id: string;
  role: string | null;
};

export type PaidClient = {
  id_client: string;
  contact_first_name: string | null;
  contact_last_name?: string | null;
  contact_email?: string | null;
  phone_country_code?: string | null;
  phone_number?: string | null;
  business_name?: string | null;
  business_city?: string | null;
  business_website_url?: string | null;
  google_business_url?: string | null;
};

export async function getClientMemberForUser(
  supabase: SupabaseClient,
  userId: string
) {
  return supabase
    .from("client_members")
    .select("id_client, user_id, role")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
}

export async function getPaidClientForUser(
  supabase: SupabaseClient,
  userId: string,
  columns: string
) {
  const { data: clientMember, error: memberError } =
    await getClientMemberForUser(supabase, userId);

  if (memberError || !clientMember?.id_client) {
    return {
      clientMember: null,
      client: null,
      memberError,
      clientError: null,
    };
  }

  const { data: client, error: clientError } = (await supabase
    .from("clients")
    .select(columns)
    .eq("id_client", clientMember.id_client)
    .maybeSingle()) as { data: Partial<PaidClient> | null; error: unknown };

  return {
    clientMember: clientMember as ClientMember,
    client,
    memberError: null,
    clientError,
  };
}
