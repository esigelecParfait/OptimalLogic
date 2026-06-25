"use client";

import { useActionState, useEffect, useRef } from "react";
import { updatePasswordFromAccount, type PasswordActionState } from "./actions";

const labelClass = "grid gap-2";

const labelTextClass = "text-sm font-semibold text-slate-700";

const fieldClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100";

const initialState: PasswordActionState = { error: null };

export default function PasswordForm() {
  const [state, formAction, isPending] = useActionState(
    updatePasswordFromAccount,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-5">
      <label className={labelClass}>
        <span className={labelTextClass}>Mot de passe actuel</span>
        <input
          type="password"
          name="currentPassword"
          required
          placeholder="••••••••"
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Nouveau mot de passe</span>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          placeholder="••••••••"
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Confirmer le nouveau mot de passe</span>
        <input
          type="password"
          name="confirmPassword"
          required
          minLength={8}
          placeholder="••••••••"
          className={fieldClass}
        />
      </label>

      {state.error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Votre mot de passe a bien été mis à jour.
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Enregistrement..." : "Mettre à jour le mot de passe"}
      </button>
    </form>
  );
}
