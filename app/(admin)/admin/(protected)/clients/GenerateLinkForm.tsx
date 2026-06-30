"use client";

import { useActionState } from "react";
import { generateClientLink } from "./actions";

const field = "h-11 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/30 focus:ring-2 focus:ring-white/[0.08]";
const initial = { link: null as string | null, error: null as string | null };

export default function GenerateLinkForm({ defaultEmail }: { defaultEmail?: string }) {
  const [state, action, pending] = useActionState(generateClientLink, initial);

  return (
    <form action={action} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          defaultValue={defaultEmail}
          placeholder="email@client.com"
          className={field}
        />
        <button
          type="submit"
          disabled={pending}
          className="btn-grad shrink-0 rounded-xl px-4 text-sm font-semibold disabled:opacity-50 whitespace-nowrap"
        >
          {pending ? "…" : "Générer →"}
        </button>
      </div>

      {state.error && (
        <p className="rounded-xl border border-[rgba(255,77,109,0.3)] bg-[rgba(255,77,109,0.08)] px-4 py-2.5 text-sm text-[#ff9db1]">
          {state.error}
        </p>
      )}

      {state.link && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400">Lien généré — valide 2h</p>
          <p className="break-all text-xs text-mut font-mono">{state.link}</p>
          <CopyButton link={state.link} />
        </div>
      )}
    </form>
  );
}

function CopyButton({ link }: { link: string }) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(link)}
      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
    >
      Copier le lien
    </button>
  );
}
