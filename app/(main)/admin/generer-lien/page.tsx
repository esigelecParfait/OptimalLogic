"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function GenererLienContent() {
  const searchParams = useSearchParams();
  const secret = searchParams.get("secret") ?? "";

  const [email, setEmail]     = useState("");
  const [link, setLink]       = useState<string | null>(null);
  const [copied, setCopied]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // Page protégée : si pas de secret dans l'URL, accès refusé
  if (!secret) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="text-center">
          <p className="text-4xl mb-3">🔒</p>
          <h1 className="font-display text-xl font-semibold text-ink">Accès restreint</h1>
          <p className="mt-2 text-sm text-mut">Utilisez le lien fourni par OptimalLogic.</p>
        </div>
      </main>
    );
  }

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
      <div className="w-full max-w-[440px]">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl font-display text-base font-bold text-white"
            style={{ background: "linear-gradient(135deg,#7c5cff,#b14dff 50%,#1fd5f0)" }}>
            OL
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink">Générer un lien d'accès</h1>
          <p className="mt-2 text-sm text-mut">Le lien expire après <strong className="text-ink">2 heures</strong> ou après utilisation.</p>
        </div>

        <div className="surface-card rounded-2xl p-7">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-mut-2">
                Email du client
              </label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="client@email.com"
                className={field}
              />
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

          {link && (
            <div className="mt-6 space-y-3">
              <div className="border-t border-white/[0.07]" />
              <p className="text-[11px] font-semibold uppercase tracking-widest text-mut-2">
                Lien à envoyer au client
              </p>
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
              <p className="text-center text-[11px] text-mut-2">⏱ Expire dans 2h · Usage unique</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function GenererLienPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" /></main>}>
      <GenererLienContent />
    </Suspense>
  );
}
