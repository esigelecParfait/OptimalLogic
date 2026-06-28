"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { setPassword, type ActionState } from "../actions";

const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-[rgba(255,255,255,0.12)]";

const labelTextClass =
  "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";

const initialState: ActionState = { error: null };

type Props = {
  email: string;
  isReset: boolean;
};

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8 caractères minimum",  ok: password.length >= 8 },
    { label: "Une lettre majuscule",  ok: /[A-Z]/.test(password) },
    { label: "Un chiffre ou symbole", ok: /[0-9!@#$%^&*]/.test(password) },
  ];
  if (!password) return null;
  const score = checks.filter(c => c.ok).length;
  const colors = ["bg-[#ff6b6b]", "bg-amber-400", "bg-emerald"];
  const labels = ["Faible", "Moyen", "Fort"];

  return (
    <div className="mt-2 grid gap-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < score ? colors[score - 1] : "bg-white/[0.08]"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {checks.map(c => (
            <span key={c.label} className={`text-[10px] font-medium transition-colors ${c.ok ? "text-emerald" : "text-mut-2"}`}>
              {c.ok ? "✓" : "·"} {c.label}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span className={`text-[10px] font-bold ${colors[score - 1].replace("bg-", "text-")}`}>{labels[score - 1]}</span>
        )}
      </div>
    </div>
  );
}

export default function ActivateForm({ email, isReset }: Props) {
  const [state, formAction, isPending] = useActionState(setPassword, initialState);
  const [password, setPasswordValue] = useState("");
  const [closed, setClosed] = useState(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!state.success) return;

    // Essayer de fermer la fenêtre
    try { window.close(); } catch { /* ignore */ }

    // Si la fenêtre n'est pas fermée, démarrer un compte à rebours
    let seconds = 5;
    countdownRef.current = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);
      if (seconds <= 0) {
        clearInterval(countdownRef.current!);
        setClosed(true);
        window.location.href = "/connexion";
      }
    }, 1000);

    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [state.success]);

  // ── Écran de succès ─────────────────────────────────────────────────────────
  if (state.success) {
    return (
      <div className="surface-card w-full max-w-md rounded-[28px] p-10 text-center shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(46,230,168,0.15)", border: "1.5px solid rgba(46,230,168,0.4)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ee6a8" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="font-display text-2xl font-semibold text-ink">
          {isReset ? "Mot de passe mis à jour" : "Accès activé !"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-mut">
          {isReset
            ? "Votre mot de passe a bien été réinitialisé."
            : `Votre accès à l'espace client OptimalLogic est prêt.`}
        </p>

        {!closed && (
          <p className="mt-5 text-xs text-mut-2">
            Cet onglet se ferme dans <strong className="text-ink">{countdown}s</strong>…
          </p>
        )}

        <a
          href="/connexion"
          className="btn-grad mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
        >
          Se connecter maintenant
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    );
  }

  // ── Formulaire ───────────────────────────────────────────────────────────────
  return (
    <div className="surface-card w-full max-w-md rounded-[28px] p-8 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] sm:p-10">

      {/* Logo */}
      <div className="mb-6 flex items-center gap-3">
        <span
          className="grid h-9 w-9 place-items-center rounded-xl font-display text-sm font-bold text-white"
          style={{ background: "linear-gradient(110deg,#7c5cff,#b14dff 50%,#1fd5f0)" }}
        >
          OL
        </span>
        <span className="font-display text-base font-semibold text-ink">
          Optimal<span className="text-cyan">Logic</span>
        </span>
      </div>

      {/* Titre */}
      <p className="eyebrow-grad text-xs font-semibold uppercase tracking-[0.25em]">Espace client</p>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">
        {isReset ? "Nouveau mot de passe" : "Activer votre accès"}
      </h1>
      <p className="mt-2 text-sm leading-6 text-mut">
        {isReset
          ? "Choisissez un nouveau mot de passe pour vous connecter."
          : "Créez votre mot de passe pour accéder à votre espace client."}
      </p>

      {/* Formulaire */}
      <form action={formAction} className="mt-8 grid gap-5">

        {/* Email — lecture seule */}
        <div className="grid gap-2">
          <span className={labelTextClass}>Adresse e-mail</span>
          <input
            type="email"
            value={email}
            readOnly
            className={`${fieldClass} cursor-default opacity-60`}
            tabIndex={-1}
          />
          <p className="text-[11px] text-mut-2">Ce compte est associé à cette adresse e-mail.</p>
        </div>

        {/* Mot de passe */}
        <div className="grid gap-2">
          <span className={labelTextClass}>Mot de passe</span>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            placeholder="Minimum 8 caractères"
            className={fieldClass}
            autoFocus
            onChange={e => setPasswordValue(e.target.value)}
          />
          <PasswordStrength password={password} />
        </div>

        {/* Confirmer */}
        <div className="grid gap-2">
          <span className={labelTextClass}>Confirmer le mot de passe</span>
          <input
            type="password"
            name="confirmPassword"
            required
            minLength={8}
            placeholder="Retapez votre mot de passe"
            className={fieldClass}
          />
        </div>

        {/* Erreur */}
        {state.error && (
          <div
            className="rounded-xl border px-4 py-3 text-sm font-medium text-[#ff9db1]"
            style={{ background: "rgba(255,77,109,0.1)", borderColor: "rgba(255,77,109,0.4)" }}
          >
            {state.error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="btn-grad mt-1 inline-flex justify-center rounded-full px-6 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Activation en cours…"
            : isReset
              ? "Réinitialiser mon mot de passe"
              : "Activer mon accès →"}
        </button>

      </form>

      {/* Aide */}
      <p className="mt-6 text-center text-xs text-mut-2">
        Un problème ? Contactez{" "}
        <a href="mailto:contact@optimal-logic.com" className="text-mut underline underline-offset-2 hover:text-ink">
          contact@optimal-logic.com
        </a>
      </p>
    </div>
  );
}
