"use client";

import { useActionState, type ReactNode } from "react";
import { updateClientInfo, type AccountActionState } from "./actions";

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-white/[0.12]";
const readOnlyFieldClass =
  "h-12 w-full rounded-xl border border-white/[0.07] bg-[rgba(5,5,5,0.6)] px-4 text-sm text-mut-2";

const initialState: AccountActionState = { error: null };

type ClientInfo = {
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  phone_country_code: string;
  phone_number: string;
  business_name: string | null;
  business_city: string | null;
  business_website_url: string | null;
  google_business_url: string | null;
};

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/[0.08] p-4 sm:p-5" style={{ background: "rgba(26,26,29,0.34)" }}>
      <div className="mb-4">
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-mut-2">{description}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export default function AccountForm({ client }: { client: ClientInfo }) {
  const [state, formAction, isPending] = useActionState(updateClientInfo, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <FormSection title="Identité" description="Ces informations nous permettent de personnaliser le suivi de votre compte.">
        <label className={labelClass}>
          <span className={labelTextClass}>Prénom *</span>
          <input name="contact_first_name" defaultValue={client.contact_first_name} required className={fieldClass} />
        </label>
        <label className={labelClass}>
          <span className={labelTextClass}>Nom *</span>
          <input name="contact_last_name" defaultValue={client.contact_last_name} required className={fieldClass} />
        </label>
      </FormSection>

      <FormSection title="Coordonnées" description="Ces données sont verrouillées pour protéger votre compte. Contactez le support pour les modifier.">
        <label className={labelClass}>
          <span className={labelTextClass}>E-mail</span>
          <input defaultValue={client.contact_email} disabled className={readOnlyFieldClass} />
        </label>
        <label className={labelClass}>
          <span className={labelTextClass}>Téléphone</span>
          <input defaultValue={`${client.phone_country_code} ${client.phone_number}`} disabled className={readOnlyFieldClass} />
        </label>
      </FormSection>

      <FormSection title="Entreprise" description="Aidez-nous à contextualiser vos rapports, demandes et recommandations.">
        <label className={labelClass}>
          <span className={labelTextClass}>Entreprise</span>
          <input name="business_name" defaultValue={client.business_name ?? ""} placeholder="Nom de votre entreprise" className={fieldClass} />
        </label>
        <label className={labelClass}>
          <span className={labelTextClass}>Ville</span>
          <input name="business_city" defaultValue={client.business_city ?? ""} placeholder="Ville de votre activité" className={fieldClass} />
        </label>
      </FormSection>

      <FormSection title="Présence digitale" description="Centralisez les liens que nous utilisons pour analyser et améliorer votre visibilité.">
        <label className={labelClass}>
          <span className={labelTextClass}>Site web</span>
          <input name="business_website_url" defaultValue={client.business_website_url ?? ""} placeholder="https://www.votre-site.com" className={fieldClass} />
        </label>
        <label className={labelClass}>
          <span className={labelTextClass}>Lien Google Business</span>
          <input name="google_business_url" defaultValue={client.google_business_url ?? ""} placeholder="Lien vers votre fiche Google Business" className={fieldClass} />
        </label>
      </FormSection>

      {state.error && (
        <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="rounded-xl border border-emerald/40 px-4 py-3 text-sm font-medium text-emerald" style={{ background: "rgba(46,230,168,0.1)" }}>
          Vos informations ont bien été mises à jour.
        </div>
      )}

      <button type="submit" disabled={isPending} className="btn-grad mt-2 inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
        {isPending ? "Enregistrement..." : "Enregistrer les informations"}
      </button>
    </form>
  );
}
