"use client";

import { useActionState, useEffect, useRef } from "react";
import { updatePasswordFromAccount, type PasswordActionState } from "./actions";

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-[rgba(255,255,255,0.12)]";

const initialState: PasswordActionState = { error: null };

export default function PasswordForm() {
  const [state, formAction, isPending] = useActionState(updatePasswordFromAccount, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-5">
      <label className={labelClass}><span className={labelTextClass}>Mot de passe actuel</span><input type="password" name="currentPassword" required placeholder="••••••••" className={fieldClass} /></label>
      <label className={labelClass}><span className={labelTextClass}>Nouveau mot de passe</span><input type="password" name="password" required minLength={8} placeholder="••••••••" className={fieldClass} /></label>
      <label className={labelClass}><span className={labelTextClass}>Confirmer le nouveau mot de passe</span><input type="password" name="confirmPassword" required minLength={8} placeholder="••••••••" className={fieldClass} /></label>

      {state.error && (
        <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>{state.error}</div>
      )}
      {state.success && (
        <div className="rounded-xl border border-emerald/40 px-4 py-3 text-sm font-medium text-emerald" style={{ background: "rgba(46,230,168,0.1)" }}>Votre mot de passe a bien été mis à jour.</div>
      )}

      <button type="submit" disabled={isPending} className="btn-grad mt-2 inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
        {isPending ? "Enregistrement..." : "Mettre à jour le mot de passe"}
      </button>
    </form>
  );
}
