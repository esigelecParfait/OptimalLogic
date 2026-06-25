"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type ActionState } from "./actions";

const labelClass = "grid gap-2";

const labelTextClass = "text-sm font-semibold text-slate-700";

const fieldClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100";

const initialState: ActionState = { error: null };

export default function ConnexionPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-20">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Espace client
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
          Connexion
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Connectez-vous pour suivre l’avancement de votre service et
          contacter notre support.
        </p>

        <form action={formAction} className="mt-8 grid gap-5">
          <label className={labelClass}>
            <span className={labelTextClass}>E-mail</span>
            <input
              type="email"
              name="email"
              required
              placeholder="vous@email.com"
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            <span className={labelTextClass}>Mot de passe</span>
            <input
              type="password"
              name="password"
              required
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
            {isPending ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <Link
            href="/connexion/mot-de-passe-oublie"
            className="font-semibold text-slate-950 underline-offset-4 hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
    </main>
  );
}
