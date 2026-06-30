"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "./actions";

const field = "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/30 focus:ring-2 focus:ring-white/[0.08]";

const initial: AdminLoginState = { error: null };

export default function AdminConnexionPage() {
  const [state, action, pending] = useActionState(loginAdmin, initial);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0d0f] px-5">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-xl font-display text-base font-bold text-white"
            style={{ background: "linear-gradient(135deg,#7c5cff,#b14dff 50%,#1fd5f0)" }}
          >
            OL
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink">Espace administration</h1>
          <p className="mt-2 text-sm text-mut">Connectez-vous avec votre compte administrateur.</p>
        </div>

        <div className="surface-card rounded-2xl p-7">
          <form action={action} className="grid gap-5">
            <label className="grid gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-mut-2">Email</span>
              <input type="email" name="email" required placeholder="admin@optimallogic.fr" className={field} autoComplete="email" />
            </label>
            <label className="grid gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-mut-2">Mot de passe</span>
              <input type="password" name="password" required placeholder="••••••••" className={field} autoComplete="current-password" />
            </label>

            {state.error && (
              <p className="rounded-xl border border-[rgba(255,77,109,0.3)] bg-[rgba(255,77,109,0.08)] px-4 py-3 text-sm text-[#ff9db1]">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="btn-grad mt-1 rounded-xl py-3.5 text-sm font-semibold disabled:opacity-50"
            >
              {pending ? "Connexion…" : "Se connecter →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
