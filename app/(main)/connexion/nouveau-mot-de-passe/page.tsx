"use client";

import { useActionState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { updatePassword, type ActionState } from "../actions";

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-white/[0.12]";

const initialState: ActionState = { error: null };

export default function NouveauMotDePassePage() {
  const [state, formAction, isPending] = useActionState(updatePassword, initialState);

  return (
    <AuthShell
      eyebrow="Sécurité"
      title="Nouveau mot de passe"
      description="Choisissez un nouveau mot de passe pour accéder à votre espace client."
    >
      <form action={formAction} className="grid gap-5">
        <label className={labelClass}>
          <span className={labelTextClass}>Nouveau mot de passe</span>
          <input type="password" name="password" required minLength={8} placeholder="Minimum 8 caractères" className={fieldClass} />
        </label>
        <label className={labelClass}>
          <span className={labelTextClass}>Confirmer le mot de passe</span>
          <input type="password" name="confirmPassword" required minLength={8} placeholder="Retapez votre mot de passe" className={fieldClass} />
        </label>

        {state.error && (
          <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>
            {state.error}
          </div>
        )}

        <button type="submit" disabled={isPending} className="btn-grad mt-2 inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
          {isPending ? "Enregistrement..." : "Enregistrer le mot de passe"}
        </button>
      </form>
    </AuthShell>
  );
}
