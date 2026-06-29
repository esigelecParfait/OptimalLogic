"use client";

import { useState } from "react";

export default function GenererLienPage() {
  const [secret, setSecret]     = useState("");
  const [email, setEmail]       = useState("");
  const [link, setLink]         = useState<string | null>(null);
  const [copied, setCopied]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLink(null);
    setCopied(false);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/clients/generate-link", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setLink(data.link);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const field = "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/30 focus:ring-2 focus:ring-white/[0.08]";

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-20">
      <div className="w-full max-w-[460px]">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl font-display text-base font-bold text-white"
            style={{ background: "linear-gradient(135deg,#7c5cff,#b14dff 50%,#1fd5f0)" }}>
            OL
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink">Générer un lien d'accès</h1>
          <p className="mt-2 text-sm text-mut">Le lien sera valable <strong className="text-ink">1 heure</strong> et à usage unique.</p>
        </div>

        <div className="surface-card rounded-2xl p-7">
          <form onSubmit={handleGenerate} className="space-y-4">

            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-mut-2">Code admin</label>
              <input type="password" required value={secret} onChange={e => setSecret(e.target.value)}
                placeholder="Votre code secret" className={field} />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-mut-2">Email du client</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="client@email.com" className={field} />
            </div>

            {error && (
              <p className="rounded-xl border border-[rgba(255,77,109,0.3)] bg-[rgba(255,77,109,0.08)] px-4 py-3 text-sm text-[#ff9db1]">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}
              className="btn-grad w-full rounded-xl py-3.5 text-sm font-semibold disabled:opacity-50">
              {loading ? "Génération…" : "Générer le lien →"}
            </button>
          </form>

          {/* Lien généré */}
          {link && (
            <div className="mt-6 space-y-3">
              <div className="border-t border-white/[0.07]"/>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-mut-2">Lien à copier et envoyer au client</p>
              <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-3">
                <p className="break-all text-xs text-mut">{link}</p>
              </div>
              <button onClick={handleCopy}
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  copied
                    ? "border border-emerald/30 bg-emerald/10 text-emerald"
                    : "border border-white/[0.13] text-ink hover:bg-white/[0.05]"
                }`}>
                {copied ? "✓ Copié !" : "📋 Copier le lien"}
              </button>
              <p className="text-center text-[11px] text-mut-2">⏱ Expire dans 1 heure · Usage unique</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
