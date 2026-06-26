"use client";

import { useActionState } from "react";
import { updatePassword, type ActionState } from "../actions";

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-indigo focus:ring-2 focus:ring-[rgba(124,92,255,0.18)]";

const initialState: ActionState = { error: null };

export default function NouveauMotDePassePage() {
  const [state, formAction, isPending] = useActionState(updatePassword, initialState);

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-32">
      <div className="surface-card w-full max-w-md rounded-[28px] p-8 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] sm:p-10">
        <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Espace client</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">Nouveau mot de passe</h1>
        <p className="mt-3 text-sm leading-6 text-mut">Choisissez un nouveau mot de passe pour accéder à votre espace client (8 caractères minimum).</p>

        <form action={formAction} className="mt-8 grid gap-5">
          <label className={labelClass}>
            <span className={labelTextClass}>Nouveau mot de passe</span>
            <input type="password" name="password" required minLength={8} placeholder="••••••••" className={fieldClass} />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Confirmer le mot de passe</span>
            <input type="password" name="confirmPassword" required minLength={8} placeholder="••••••••" className={fieldClass} />
          </label>
          {state.error && (
            <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>{state.error}</div>
          )}
          <button type="submit" disabled={isPending} className="btn-grad mt-2 inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
            {isPending ? "Enregistrement..." : "Enregistrer le mot de passe"}
          </button>
        </form>
      </div>
    </main>
  );
}
