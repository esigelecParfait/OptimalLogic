"use client";

import { useActionState } from "react";
import { updatePassword, type ActionState } from "@/app/connexion/actions";

const labelClass = "grid gap-2";

const labelTextClass = "text-sm font-semibold text-slate-700";

const fieldClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100";

const initialState: ActionState = { error: null };

export default function PasswordForm() {
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState
  );

  return (
    <form action={formAction} className="grid gap-5">
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
        <span className={labelTextClass}>Confirmer le mot de passe</span>
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
