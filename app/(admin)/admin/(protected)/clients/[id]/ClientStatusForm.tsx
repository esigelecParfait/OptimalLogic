"use client";

import { useActionState } from "react";
import { updateClientStatus, type SaveState } from "./actions";

const initial: SaveState = { error: null, success: false };

const statusOptions = [
  { value: "active", label: "Actif" },
  { value: "pause", label: "En pause" },
  { value: "canceled", label: "Résilié" },
];

export default function ClientStatusForm({ clientId, status }: { clientId: string; status: string }) {
  const [state, action, pending] = useActionState(updateClientStatus, initial);

  return (
    <form action={action} className="flex items-center gap-3">
      <input type="hidden" name="clientId" value={clientId} />
      <select
        name="status"
        defaultValue={status}
        className="h-10 rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-3 text-sm text-ink outline-none focus:border-white/30"
      >
        {statusOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <button type="submit" disabled={pending} className="rounded-full border border-white/[0.13] px-4 py-2 text-xs font-medium text-ink hover:bg-white/[0.05] disabled:opacity-50">
        {pending ? "…" : "Mettre à jour"}
      </button>
      {state.success && <span className="text-xs font-medium text-emerald-400">✓</span>}
      {state.error && <span className="text-xs text-red-400">{state.error}</span>}
    </form>
  );
}
