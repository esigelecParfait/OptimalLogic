import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountForm from "./AccountForm";
import PasswordForm from "./PasswordForm";

export const dynamic = "force-dynamic";

export default async function MonComptePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { data: client } = await supabase
    .from("clients")
    .select(
      "contact_first_name, contact_last_name, contact_email, phone_country_code, phone_number, business_name, business_city, business_website_url, google_business_url"
    )
    .eq("auth_user_id", user.id)
    .maybeSingle();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="surface-card rounded-[28px] p-6 sm:p-8">
        <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Mes informations</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Mon profil</h2>
        {client ? (
          <div className="mt-6">
            <AccountForm client={client} />
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-mut">Impossible de récupérer vos informations pour le moment.</p>
        )}
      </section>

      <section className="surface-card rounded-[28px] p-6 sm:p-8">
        <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Sécurité</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Mot de passe</h2>
        <p className="mt-3 text-sm leading-6 text-mut">Choisissez un nouveau mot de passe pour votre compte (8 caractères minimum).</p>
        <div className="mt-6">
          <PasswordForm />
        </div>
      </section>
    </div>
  );
}
