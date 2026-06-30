"use client";

import { useActionState } from "react";
import { sendClientLinkByEmail } from "./actions";

const initial = { error: null as string | null, sent: false };

export default function SendLinkButton({ email }: { email: string }) {
  const [state, action, pending] = useActionState(sendClientLinkByEmail, initial);

  return (
    <form action={action} className="flex flex-col items-start gap-1">
      <input type="hidden" name="email" value={email} />
      <button
        type="submit"
        disabled={pending || state.sent}
        className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-all disabled:opacity-60 ${
          state.sent
            ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
            : "btn-grad"
        }`}
      >
        {pending ? "Envoi…" : state.sent ? "✓ Envoyé" : "✉ Envoyer le lien"}
      </button>
      {state.error && <span className="text-[11px] text-red-400">{state.error}</span>}
    </form>
  );
}
