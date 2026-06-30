"use client";

import { useState, useTransition } from "react";
import { refreshMetrics } from "./actions";

export default function RefreshButton() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = () => {
    startTransition(async () => {
      const result = await refreshMetrics();
      setMessage(result.error ?? "✓ Métriques à jour");
      setTimeout(() => setMessage(null), 4000);
    });
  };

  return (
    <div className="flex items-center gap-3">
      {message && <span className="text-xs text-mut">{message}</span>}
      <button
        onClick={handleClick}
        disabled={pending}
        className="btn-grad shrink-0 rounded-full px-5 py-2 text-sm font-semibold disabled:opacity-50"
      >
        {pending ? "Actualisation…" : "↻ Rafraîchir les métriques"}
      </button>
    </div>
  );
}
