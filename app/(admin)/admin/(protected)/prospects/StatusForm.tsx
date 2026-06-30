"use client";

import { useActionState, useState } from "react";
import { updateDemandeStatus, type StatusState } from "./actions";

const initial: StatusState = { error: null, success: false };

const statusOptions = [
  { value: "nouveau", label: "Nouveau" },
  { value: "a_contacter", label: "À contacter" },
  { value: "contacte", label: "Contacté" },
  { value: "rdv_planifie", label: "RDV planifié" },
  { value: "devis_envoye", label: "Devis envoyé" },
  { value: "en_negociation", label: "En négociation" },
  { value: "gagne", label: "Gagné" },
  { value: "perdu", label: "Perdu" },
  { value: "archive", label: "Archivé" },
];

const lostReasonOptions = [
  { value: "budget_trop_faible", label: "Budget trop faible" },
  { value: "pas_de_reponse", label: "Pas de réponse" },
  { value: "concurrent_choisi", label: "A choisi un concurrent" },
  { value: "pas_le_bon_moment", label: "Pas le bon moment" },
  { value: "besoin_non_adapte", label: "Besoin non adapté" },
  { value: "autre", label: "Autre" },
];

const selectCls = "h-8 rounded-lg border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-2 text-[11px] text-ink outline-none focus:border-white/30";

export default function StatusForm({ demandeId, status }: { demandeId: string; status: string | null }) {
  const [state, action, pending] = useActionState(updateDemandeStatus, initial);
  const [localStatus, setLocalStatus] = useState(status ?? "nouveau");

  return (
    <form action={action} className="flex flex-wrap items-center gap-1.5">
      <input type="hidden" name="demandeId" value={demandeId} />
      <select
        name="status"
        value={localStatus}
        onChange={(e) => setLocalStatus(e.target.value)}
        className={selectCls}
      >
        {statusOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {localStatus === "perdu" && (
        <select name="lostReason" defaultValue="" className={selectCls}>
          <option value="">Raison…</option>
          {lostReasonOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}
      <button type="submit" disabled={pending} className="rounded-full border border-white/[0.13] px-2.5 py-1 text-[11px] text-ink hover:bg-white/[0.05] disabled:opacity-50">
        {pending ? "…" : "OK"}
      </button>
      {state.success && <span className="text-[11px] text-emerald-400">✓</span>}
      {state.error && <span className="text-[11px] text-red-400">{state.error}</span>}
    </form>
  );
}
