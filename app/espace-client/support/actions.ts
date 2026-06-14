"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type TicketActionState = {
  error: string | null;
  success?: boolean;
};

export async function createSupportTicket(
  _prevState: TicketActionState,
  formData: FormData
): Promise<TicketActionState> {
  const subject = (formData.get("subject") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();

  if (!subject || !description) {
    return { error: "Veuillez renseigner un sujet et une description." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Vous devez être connecté." };
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id_client")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (!client) {
    return { error: "Impossible de retrouver votre compte client." };
  }

  const { error } = await supabase.from("support_tickets").insert({
    id_client: client.id_client,
    subject,
    description,
  });

  if (error) {
    return { error: "Impossible de créer le ticket. Veuillez réessayer." };
  }

  revalidatePath("/espace-client/support");
  return { error: null, success: true };
}
