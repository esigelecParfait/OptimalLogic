"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordReset, type ActionState } from "../actions";

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-[rgba(255,255,255,0.12)]";

const initialState: ActionState = { error: null };

export default function MotDePasseOubliePage() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, initialState);

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-32">
      <div className="surface-card w-full max-w-md rounded-[28px] p-8 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] sm:p-10">
        <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Espace client</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">Mot de passe oublié</h1>
        <p className="mt-3 text-sm leading-6 text-mut">Indiquez votre e-mail et nous vous envoyons un lien pour définir un nouveau mot de passe.</p>

        {state.success ? (
          <div className="mt-8 rounded-2xl border border-white/[0.07] p-6 text-sm leading-6 text-mut" style={{ background: "rgba(26,26,29,0.5)" }}>
            Si un compte existe avec cet e-mail, vous allez recevoir un lien pour définir un nouveau mot de passe.
          </div>
        ) : (
          <form action={formAction} className="mt-8 grid gap-5">
            <label className={labelClass}>
              <span className={labelTextClass}>E-mail</span>
              <input type="email" name="email" required placeholder="vous@email.com" className={fieldClass} />
            </label>
            {state.error && (
              <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>{state.error}</div>
            )}
            <button type="submit" disabled={isPending} className="btn-grad mt-2 inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
              {isPending ? "Envoi en cours..." : "Envoyer le lien"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-mut">
          <Link href="/connexion" className="font-semibold text-white underline-offset-4 hover:underline">Retour à la connexion</Link>
        </div>
      </div>
    </main>
  );
}
