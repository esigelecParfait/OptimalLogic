"use client";

import { useActionState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { login, type ActionState } from "./actions";

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-white/[0.12]";

const initialState: ActionState = { error: null };

export default function ConnexionPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <AuthShell
      eyebrow="Espace client"
      title="Connexion"
      description="Connectez-vous pour suivre l'avancement de votre service et contacter notre support."
      footer={
        <Link href="/connexion/mot-de-passe-oublie" className="font-semibold text-white underline-offset-4 hover:underline">
          Mot de passe oublié ?
        </Link>
      }
    >
      <form action={formAction} className="grid gap-5">
        <label className={labelClass}>
          <span className={labelTextClass}>E-mail</span>
          <input type="email" name="email" required placeholder="vous@email.com" className={fieldClass} />
        </label>
        <label className={labelClass}>
          <span className={labelTextClass}>Mot de passe</span>
          <input type="password" name="password" required placeholder="********" className={fieldClass} />
        </label>

        {state.error && (
          <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>
            {state.error}
          </div>
        )}

        <button type="submit" disabled={isPending} className="btn-grad mt-2 inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
          {isPending ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </AuthShell>
  );
}
