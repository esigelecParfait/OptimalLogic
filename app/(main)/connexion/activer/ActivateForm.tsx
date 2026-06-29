"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
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
        {[0,1,2,3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < score ? colors[score-1] : "bg-white/[0.08]"}`} />
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
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPwd, setShowPwd]       = useState(false);
  const [showCfm, setShowCfm]       = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [loading, setLoading]       = useState(false);
  const [done, setDone]             = useState(false);

  const field = "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 pr-12 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/30 focus:ring-2 focus:ring-white/[0.08]";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError("Veuillez saisir votre adresse e-mail.");
    if (password.length < 8) return setError("Le mot de passe doit contenir au moins 8 caractères.");
    if (password !== confirm) return setError("Les deux mots de passe ne correspondent pas.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur inconnue");
      router.push("/connexion");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  // ── Succès ─────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="mx-auto w-full max-w-[420px] text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "radial-gradient(circle, rgba(46,230,168,0.15), transparent)", border: "1.5px solid rgba(46,230,168,0.35)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ee6a8" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink">Mot de passe enregistré !</h1>
        <p className="mt-2 text-sm text-mut">Vous allez être redirigé vers la connexion…</p>
        <div className="mx-auto mt-4 h-0.5 w-32 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full rounded-full bg-emerald" style={{ animation: "progress 2.5s linear forwards" }}/>
        </div>
        <style>{`@keyframes progress{from{width:0%}to{width:100%}}`}</style>
      </div>
    );
  }

  // ── Formulaire ─────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-[420px]">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl font-display text-lg font-bold text-white"
          style={{ background: "linear-gradient(135deg,#7c5cff,#b14dff 50%,#1fd5f0)", boxShadow: "0 0 40px rgba(124,92,255,0.4)" }}>
          OL
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink">Configurer votre accès</h1>
        <p className="mt-2 text-sm text-mut">Entrez votre email et choisissez un mot de passe.</p>
      </div>

      <div className="surface-card rounded-2xl p-7">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-mut-2">
              Adresse e-mail
            </label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="vous@email.com"
              className={field.replace("pr-12", "pr-4")}
            />
          </div>

          <div className="border-t border-white/[0.06]"/>

          {/* Mot de passe */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-mut-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 8 caractères"
                className={field}
              />
              <button type="button" onClick={() => setShowPwd(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mut-2 hover:text-ink" tabIndex={-1}>
                <EyeIcon open={showPwd}/>
              </button>
            </div>
            <StrengthBar password={password}/>
          </div>

          {/* Confirmation */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-mut-2">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                type={showCfm ? "text" : "password"}
                required
                minLength={8}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Retapez votre mot de passe"
                className={field}
              />
              <button type="button" onClick={() => setShowCfm(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mut-2 hover:text-ink" tabIndex={-1}>
                <EyeIcon open={showCfm}/>
              </button>
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl border px-4 py-3"
              style={{ background: "rgba(255,77,109,0.08)", borderColor: "rgba(255,77,109,0.25)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff9db1" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-sm text-[#ff9db1]">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="btn-grad w-full rounded-xl py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"/>
                Enregistrement…
              </span>
            ) : "Enregistrer mon mot de passe →"}
          </button>

        </form>
      </div>

      <p className="mt-5 text-center text-[11px] text-mut-2">
        Déjà un compte ? <a href="/connexion" className="text-mut underline underline-offset-2 hover:text-ink">Se connecter</a>
      </p>
    </div>
  );
}
