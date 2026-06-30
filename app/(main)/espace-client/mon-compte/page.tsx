import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPaidClientForUser } from "@/lib/supabase/client-members";
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

  const { client } = await getPaidClientForUser(
    supabase,
    user.id,
    "id_client, contact_first_name, contact_last_name, contact_email, phone_country_code, phone_number, business_name, business_city, business_website_url, google_business_url"
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <section className="surface-card relative overflow-hidden rounded-[30px] p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-[90px]"
          style={{ background: "var(--grad)" }}
        />
        <div className="relative">
          <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Mes informations</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em]">Profil client</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-mut">
            Gardez vos informations à jour pour faciliter le suivi, les rapports mensuels et les échanges avec l&apos;équipe.
          </p>

          <div className="mt-8">
            {client ? (
              <AccountForm
                client={{
                  contact_first_name: client.contact_first_name ?? "",
                  contact_last_name: client.contact_last_name ?? "",
                  contact_email: client.contact_email ?? "",
                  phone_country_code: client.phone_country_code ?? "",
                  phone_number: client.phone_number ?? "",
                  business_name: client.business_name ?? null,
                  business_city: client.business_city ?? null,
                  business_website_url: client.business_website_url ?? null,
                  google_business_url: client.google_business_url ?? null,
                }}
              />
            ) : (
              <p className="text-sm leading-6 text-mut">Impossible de récupérer vos informations pour le moment.</p>
            )}
          </div>
        </div>
      </section>

      <aside className="grid gap-6">
        <section className="surface-card rounded-[30px] p-6 sm:p-8">
          <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Sécurité</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Mot de passe</h2>
          <p className="mt-3 text-sm leading-6 text-mut">
            Choisissez un mot de passe unique et suffisamment long pour protéger votre espace client.
          </p>
          <div className="mt-6">
            <PasswordForm />
          </div>
        </section>

        <section className="rounded-[26px] border border-white/[0.09] p-6" style={{ background: "rgba(26,26,29,0.38)" }}>
          <p className="font-display text-lg font-semibold text-ink">Besoin de modifier une donnée verrouillée ?</p>
          <p className="mt-2 text-sm leading-6 text-mut">
            Votre e-mail et votre téléphone sont protégés. Contactez le support pour une modification sensible.
          </p>
        </section>
      </aside>
    </div>
  );
}
