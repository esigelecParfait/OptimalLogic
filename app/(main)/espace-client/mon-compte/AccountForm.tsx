"use client";

import { useActionState } from "react";
import { updateClientInfo, type AccountActionState } from "./actions";

const labelClass = "grid gap-2";

const labelTextClass = "text-sm font-semibold text-slate-700";

const fieldClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100";

const readOnlyFieldClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-500";

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

export default function AccountForm({ client }: { client: ClientInfo }) {
  const [state, formAction, isPending] = useActionState(
    updateClientInfo,
    initialState
  );

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={labelTextClass}>Prénom *</span>
          <input
            name="contact_first_name"
            defaultValue={client.contact_first_name}
            required
            className={fieldClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Nom *</span>
          <input
            name="contact_last_name"
            defaultValue={client.contact_last_name}
            required
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={labelTextClass}>E-mail</span>
          <input
            defaultValue={client.contact_email}
            disabled
            className={readOnlyFieldClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Téléphone</span>
          <input
            defaultValue={`${client.phone_country_code} ${client.phone_number}`}
            disabled
            className={readOnlyFieldClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={labelTextClass}>Entreprise</span>
          <input
            name="business_name"
            defaultValue={client.business_name ?? ""}
            placeholder="Nom de votre entreprise"
            className={fieldClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Ville</span>
          <input
            name="business_city"
            defaultValue={client.business_city ?? ""}
            placeholder="Ville de votre activité"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={labelTextClass}>Site web</span>
          <input
            name="business_website_url"
            defaultValue={client.business_website_url ?? ""}
            placeholder="https://www.votre-site.com"
            className={fieldClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Lien Google Business</span>
          <input
            name="google_business_url"
            defaultValue={client.google_business_url ?? ""}
            placeholder="Lien vers votre fiche Google Business"
            className={fieldClass}
          />
        </label>
      </div>

      {state.error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Vos informations ont bien été mises à jour.
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
