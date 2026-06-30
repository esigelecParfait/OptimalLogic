import { supabaseAdmin } from "@/lib/supabase-admin";
import GoogleSetupClient from "./GoogleSetupClient";

export const dynamic = "force-dynamic";

export default async function GoogleSetupPage() {
  const { data: prospects } = await supabaseAdmin
    .from("client_prospects")
    .select(
      "id_client, business_name, contact_first_name, contact_last_name, google_location_name, google_account_location_name"
    )
    .order("business_name");

  const adminSecret = process.env.ADMIN_SECRET ?? "";

  return (
    <div className="p-8 space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-mut-2">Administration</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Google Business</h1>
        <p className="mt-1 text-sm text-mut">
          Liaison des fiches Google Business Profile aux comptes clients.
        </p>
      </div>

      <GoogleSetupClient clients={prospects ?? []} adminSecret={adminSecret} />
    </div>
  );
}
