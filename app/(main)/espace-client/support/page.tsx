import { createClient } from "@/lib/supabase/server";
import ChatInterface from "./ChatInterface";

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let firstName: string | null = null;
  if (user) {
    const { data: client } = await supabase
      .from("clients")
      .select("contact_first_name")
      .eq("auth_user_id", user.id)
      .maybeSingle();
    firstName = client?.contact_first_name ?? null;
  }

  return (
    <div>
      <div className="mb-6">
        <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Support</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Assistant OptimalLogic</h2>
        <p className="mt-1 text-sm text-mut">Posez vos questions sur votre offre, votre compte ou nos services.</p>
      </div>
      <ChatInterface firstName={firstName} />
    </div>
  );
}
