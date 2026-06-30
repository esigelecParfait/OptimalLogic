"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function StrengthBar({ password }: { password: string }) {
  if (!password) return null;

  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const colors = ["bg-[#ff6b6b]", "bg-amber-400", "bg-amber-400", "bg-emerald"];
  const labels = ["Trop court", "Faible", "Moyen", "Fort"];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < score ? colors[score - 1] : "bg-white/[0.08]"}`} />
        ))}
      </div>
      <p className={`text-[11px] font-medium ${score <= 1 ? "text-[#ff6b6b]" : score <= 3 ? "text-amber-400" : "text-emerald"}`}>
        {labels[Math.max(0, score - 1)]}
      </p>
    </div>
  );
}

export default function ActivateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [tokenEmail, setTokenEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [done, setDone] = useState(false);

  const field =
    "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 pr-12 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/30 focus:ring-2 focus:ring-white/[0.08]";

  useEffect(() => {
    if (!token) return;

    Promise.resolve().then(() => setValidating(true));
    fetch(`/api/auth/validate-token?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.email) setTokenEmail(data.email);
        else setError(data.error ?? "Lien invalide ou expiré.");
      })
      .catch(() => setError("Impossible de valider le lien."))
      .finally(() => setValidating(false));
  }, [token]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const finalEmail = tokenEmail ?? email.trim().toLowerCase();
    if (!finalEmail) return setError("Veuillez saisir votre adresse e-mail.");
    if (password.length < 8) return setError("Le mot de passe doit contenir au moins 8 caractères.");
    if (password !== confirm) return setError("Les deux mots de passe ne correspondent pas.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token ?? null, email: finalEmail, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur inconnue");
      setDone(true);
      router.push("/connexion");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  if (validating) {
    return (
      <div className="mx-auto w-full max-w-[420px] text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
        <p className="mt-4 text-sm text-mut">Vérification du lien...</p>
      </div>
    );
  }

  if (token && error && !tokenEmail) {
    return (
      <div className="mx-auto w-full max-w-[420px] text-center">
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(255,77,109,0.1)", border: "1.5px solid rgba(255,77,109,0.3)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="font-display text-xl font-semibold text-ink">Lien expiré ou invalide</h1>
        <p className="mt-2 text-sm text-mut">{error}</p>
        <p className="mt-4 text-xs text-mut-2">Contactez le support pour recevoir un nouveau lien.</p>
        <a href="/contact" className="mt-5 inline-block text-sm text-mut underline underline-offset-2 hover:text-ink">
          Contacter le support
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="mb-8 text-center">
        <p className="eyebrow-grad text-xs font-semibold uppercase tracking-[0.22em]">Activation</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">Configurer votre accès</h1>
        <p className="mt-2 text-sm text-mut">
          {tokenEmail ? "Choisissez un mot de passe pour accéder à votre espace client." : "Entrez votre e-mail et choisissez un mot de passe."}
        </p>
      </div>

      <div className="surface-card rounded-2xl p-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-mut-2">Adresse e-mail</label>
            {tokenEmail ? (
              <div className="flex h-12 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-mut-2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
                <span className="text-sm text-mut">{tokenEmail}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-mut-2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            ) : (
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@email.com"
                className={field.replace("pr-12", "pr-4")}
              />
            )}
          </div>

          <div className="border-t border-white/[0.06]" />

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-mut-2">Mot de passe</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 caractères"
                className={field}
                autoFocus={!!tokenEmail}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mut-2 hover:text-ink"
                tabIndex={-1}
              >
                <EyeIcon open={showPwd} />
              </button>
            </div>
            <StrengthBar password={password} />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-mut-2">Confirmer le mot de passe</label>
            <div className="relative">
              <input
                type={showCfm ? "text" : "password"}
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Retapez votre mot de passe"
                className={field}
              />
              <button
                type="button"
                onClick={() => setShowCfm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mut-2 hover:text-ink"
                tabIndex={-1}
              >
                <EyeIcon open={showCfm} />
              </button>
            </div>
          </div>

          {error && (
            <div
              className="flex items-start gap-3 rounded-xl border px-4 py-3"
              style={{ background: "rgba(255,77,109,0.08)", borderColor: "rgba(255,77,109,0.25)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff9db1" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-[#ff9db1]">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading || done} className="btn-grad w-full rounded-xl py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                Enregistrement...
              </span>
            ) : (
              "Enregistrer mon mot de passe"
            )}
          </button>

          {tokenEmail && <p className="text-center text-[11px] text-mut-2">Ce lien est valable 2 heures et à usage unique.</p>}
        </form>
      </div>

      <p className="mt-5 text-center text-[11px] text-mut-2">
        Déjà un compte ?{" "}
        <a href="/connexion" className="text-mut underline underline-offset-2 hover:text-ink">
          Se connecter
        </a>
      </p>
    </div>
  );
}
