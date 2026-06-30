"use client";

import { useActionState } from "react";
import { updateService, type SaveState } from "./actions";

const initial: SaveState = { error: null, success: false };

const field = "h-9 rounded-lg border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-2.5 text-xs text-ink outline-none focus:border-white/30";

const serviceStatusOptions = [
  { value: "en_attente", label: "En attente" },
  { value: "en_cours", label: "En cours" },
  { value: "termine", label: "Terminé" },
  { value: "suspendu", label: "Suspendu" },
  { value: "annule", label: "Annulé" },
];

const paymentStatusOptions = [
  { value: "a_verifier", label: "À vérifier" },
  { value: "non_paye", label: "Non payé" },
  { value: "partiellement_paye", label: "Partiellement payé" },
  { value: "paye", label: "Payé" },
  { value: "rembourse", label: "Remboursé" },
];

type Offer = { code: string; nom_offre: string };

type Service = {
  id_service: string;
  offer_code: string | null;
  service_status: string | null;
  payment_status: string | null;
};

export default function ServiceEditForm({ service, offers }: { service: Service; offers: Offer[] }) {
  const [state, action, pending] = useActionState(updateService, initial);

  return (
    <form action={action} className="flex flex-wrap items-center gap-2.5">
      <input type="hidden" name="serviceId" value={service.id_service} />

      <select name="offerCode" defaultValue={service.offer_code ?? ""} className={field}>
        {offers.map((o) => (
          <option key={o.code} value={o.code}>{o.nom_offre}</option>
        ))}
      </select>

      <select name="serviceStatus" defaultValue={service.service_status ?? ""} className={field}>
        {serviceStatusOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <select name="paymentStatus" defaultValue={service.payment_status ?? ""} className={field}>
        {paymentStatusOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <button type="submit" disabled={pending} className="rounded-full border border-white/[0.13] px-3.5 py-1.5 text-xs font-medium text-ink hover:bg-white/[0.05] disabled:opacity-50">
        {pending ? "…" : "Enregistrer"}
      </button>
      {state.success && <span className="text-xs font-medium text-emerald-400">✓</span>}
      {state.error && <span className="text-xs text-red-400">{state.error}</span>}
    </form>
  );
}
