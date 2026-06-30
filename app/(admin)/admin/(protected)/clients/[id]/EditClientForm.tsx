"use client";

import { useActionState } from "react";
import { updateClientProspect, type SaveState } from "./actions";

const initial: SaveState = { error: null, success: false };

const field = "h-10 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-3 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/30 focus:ring-2 focus:ring-white/[0.08]";
const label = "block text-xs font-medium text-mut mb-1.5";

type Prospect = {
  id_client: string;
  contact_first_name: string | null;
  contact_last_name: string | null;
  contact_email: string | null;
  phone_country_code: string | null;
  phone_number: string | null;
  business_name: string | null;
  business_city: string | null;
  business_sector: string | null;
  business_website_url: string | null;
  google_business_url: string | null;
  type_client: string | null;
};

const typeOptions = [
  { value: "commerce", label: "Commerce" },
  { value: "tpe_pme", label: "TPE / PME" },
  { value: "startup", label: "Startup" },
  { value: "autre", label: "Autre" },
];

export default function EditClientForm({ prospect }: { prospect: Prospect }) {
  const [state, action, pending] = useActionState(updateClientProspect, initial);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="prospectId" value={prospect.id_client} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Prénom</label>
          <input className={field} name="contact_first_name" defaultValue={prospect.contact_first_name ?? ""} required />
        </div>
        <div>
          <label className={label}>Nom</label>
          <input className={field} name="contact_last_name" defaultValue={prospect.contact_last_name ?? ""} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Email</label>
          <input className={field} type="email" name="contact_email" defaultValue={prospect.contact_email ?? ""} required />
        </div>
        <div className="grid grid-cols-[90px_1fr] gap-2">
          <div>
            <label className={label}>Indicatif</label>
            <input className={field} name="phone_country_code" defaultValue={prospect.phone_country_code ?? "+33"} placeholder="+33" required />
          </div>
          <div>
            <label className={label}>Téléphone</label>
            <input className={field} name="phone_number" defaultValue={prospect.phone_number ?? ""} placeholder="600000000" required />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Nom de l&apos;entreprise</label>
          <input className={field} name="business_name" defaultValue={prospect.business_name ?? ""} />
        </div>
        <div>
          <label className={label}>Type d&apos;entreprise</label>
          <select className={field} name="type_client" defaultValue={prospect.type_client ?? ""}>
            <option value="">—</option>
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Ville</label>
          <input className={field} name="business_city" defaultValue={prospect.business_city ?? ""} />
        </div>
        <div>
          <label className={label}>Secteur d&apos;activité</label>
          <input className={field} name="business_sector" defaultValue={prospect.business_sector ?? ""} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Site web</label>
          <input className={field} name="business_website_url" defaultValue={prospect.business_website_url ?? ""} placeholder="https://…" />
        </div>
        <div>
          <label className={label}>Fiche Google Business (URL)</label>
          <input className={field} name="google_business_url" defaultValue={prospect.google_business_url ?? ""} placeholder="https://…" />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-grad rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-50">
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        {state.success && <span className="text-sm font-medium text-emerald-400">✓ Enregistré</span>}
        {state.error && <span className="text-sm text-red-400">{state.error}</span>}
      </div>
    </form>
  );
}
