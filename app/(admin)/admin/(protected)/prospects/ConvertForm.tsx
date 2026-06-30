"use client";

import { useActionState } from "react";
import { convertProspectToClient, type ConvertState } from "./actions";

const initial: ConvertState = { error: null, success: false };

export default function ConvertForm({
  prospectId,
  offers,
}: {
  prospectId: string;
  offers: { code: string; nom_offre: string }[];
}) {
  const [state, action, pending] = useActionState(convertProspectToClient, initial);

  if (state.success) {
    return <span className="text-[11px] font-semibold text-emerald-400 whitespace-nowrap">✓ Converti en client</span>;
  }

  return (
    <form action={action} className="flex flex-col items-start gap-1">
      <input type="hidden" name="prospectId" value={prospectId} />
      <div className="flex items-center gap-1.5">
        <select
          name="offerCode"
          required
          defaultValue=""
          className="h-7 max-w-[140px] rounded-lg border border-white/[0.12] bg-[rgba(26,26,29,0.8)] px-1.5 text-[11px] text-ink outline-none"
        >
          <option value="" disabled>Offre…</option>
          {offers.map((o) => (
            <option key={o.code} value={o.code}>{o.nom_offre}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="btn-grad shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap disabled:opacity-50"
        >
          {pending ? "…" : "Convertir"}
        </button>
      </div>
      {state.error && <span className="text-[11px] text-red-400">{state.error}</span>}
    </form>
  );
}
