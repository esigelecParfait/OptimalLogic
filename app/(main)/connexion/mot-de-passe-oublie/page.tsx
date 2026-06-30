"use client";

import { useActionState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { requestPasswordReset, type ActionState } from "../actions";

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-white/[0.12]";

const initialState: ActionState = { error: null };

export default function MotDePasseOubliePage() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, initialState);

  return (
    <AuthShell
      eyebrow="Récupération"
      title="Mot de passe oublié"
      description="Indiquez votre e-mail et nous vous enverrons un lien pour définir un nouveau mot de passe."
      footer={
        <Link href="/connexion" className="font-semibold text-white underline-offset-4 hover:underline">
          Retour à la connexion
        </Link>
      }
    >
      {state.success ? (
        <div className="rounded-2xl border border-white/[0.09] p-6 text-sm leading-6 text-mut" style={{ background: "rgba(26,26,29,0.5)" }}>
          Si un compte existe avec cet e-mail, vous allez recevoir un lien pour définir un nouveau mot de passe.
        </div>
      ) : (
        <form action={formAction} className="grid gap-5">
          <label className={labelClass}>
            <span className={labelTextClass}>E-mail</span>
            <input type="email" name="email" required placeholder="vous@email.com" className={fieldClass} />
          </label>
          {state.error && (
            <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>
              {state.error}
            </div>
          )}
          <button type="submit" disabled={isPending} className="btn-grad mt-2 inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
            {isPending ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
