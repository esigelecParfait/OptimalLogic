"use client";

import { useEffect, useState, useCallback } from "react";

type DbClient = {
  id_client: string;
  business_name: string | null;
  contact_first_name: string | null;
  contact_last_name: string | null;
  google_location_name: string | null;
  google_account_location_name: string | null;
};

type GBPLocation = {
  name: string;
  locationName: string;
  primaryPhone?: string;
  websiteUri?: string;
  primaryCategory?: string;
  locationId: string;
  accountId: string;
  performanceName: string;
};

type GBPGroup = {
  account: { name: string; accountName: string };
  locations: GBPLocation[];
};

type LinkState = "idle" | "saving" | "saved" | "error";

function clientLabel(c: DbClient) {
  if (c.business_name) return c.business_name;
  const name = `${c.contact_first_name ?? ""} ${c.contact_last_name ?? ""}`.trim();
  return name || c.id_client.slice(0, 8);
}

// ── Auto-matching : compare les noms de fiches avec les noms de clients ──────
function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function similarity(a: string, b: string): number {
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;
  if (na.includes(nb) || nb.includes(na)) return 0.9;
  // Mots en commun
  const wa = new Set(na.split(" ").filter(w => w.length > 2));
  const wb = new Set(nb.split(" ").filter(w => w.length > 2));
  let common = 0;
  wa.forEach(w => { if (wb.has(w)) common++; });
  const total = Math.max(wa.size, wb.size);
  return total > 0 ? common / total : 0;
}

function findBestMatch(locationName: string, clients: DbClient[]): { client: DbClient; score: number } | null {
  let best: { client: DbClient; score: number } | null = null;
  for (const client of clients) {
    const names = [
      client.business_name,
      `${client.contact_first_name ?? ""} ${client.contact_last_name ?? ""}`.trim(),
    ].filter(Boolean) as string[];

    for (const name of names) {
      const score = similarity(locationName, name);
      if (score > 0.5 && (!best || score > best.score)) {
        best = { client, score };
      }
    }
  }
  return best;
}

export default function GoogleSetupClient({
  clients,
  adminSecret,
}: {
  clients: DbClient[];
  adminSecret: string;
}) {
  const [groups, setGroups]   = useState<GBPGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [autoLinking, setAutoLinking] = useState(false);
  const [autoResult, setAutoResult]   = useState<string | null>(null);

  // sélections : locationName → clientId
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    clients.forEach(c => {
      if (c.google_account_location_name) init[c.google_account_location_name] = c.id_client;
    });
    return init;
  });

  const [linkStates, setLinkStates] = useState<Record<string, LinkState>>({});

  // ── Charger les fiches ─────────────────────────────────────────────────────
  const loadLocations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch("/api/admin/google/locations", {
        headers: { "x-admin-secret": adminSecret },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur API");

      const fetchedGroups: GBPGroup[] = data.groups ?? [];
      setGroups(fetchedGroups);

      // Auto-suggestion : pré-remplir les menus déroulants
      const autoSel: Record<string, string> = { ...selections };
      for (const group of fetchedGroups) {
        for (const loc of group.locations) {
          if (!autoSel[loc.name]) {
            const match = findBestMatch(loc.locationName, clients);
            if (match) autoSel[loc.name] = match.client.id_client;
          }
        }
      }
      setSelections(autoSel);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [adminSecret, clients]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { loadLocations(); }, [loadLocations]);

  // ── Lier une fiche ─────────────────────────────────────────────────────────
  const linkOne = useCallback(async (loc: GBPLocation, clientId: string): Promise<boolean> => {
    const res = await fetch("/api/admin/google/link", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret },
      body: JSON.stringify({
        clientId,
        locationName:    loc.name,
        performanceName: loc.performanceName,
      }),
    });
    return res.ok;
  }, [adminSecret]);

  const handleLinkOne = async (loc: GBPLocation) => {
    const clientId = selections[loc.name];
    if (!clientId) return;
    setLinkStates(s => ({ ...s, [loc.name]: "saving" }));
    const ok = await linkOne(loc, clientId);
    setLinkStates(s => ({ ...s, [loc.name]: ok ? "saved" : "error" }));
    if (ok) setTimeout(() => setLinkStates(s => ({ ...s, [loc.name]: "idle" })), 3000);
  };

  // ── Lier tout en un clic ───────────────────────────────────────────────────
  const handleLinkAll = async () => {
    const toLink = groups
      .flatMap(g => g.locations)
      .filter(loc => selections[loc.name]);

    if (toLink.length === 0) return;
    setAutoLinking(true);
    setAutoResult(null);

    let ok = 0;
    let fail = 0;
    for (const loc of toLink) {
      setLinkStates(s => ({ ...s, [loc.name]: "saving" }));
      const success = await linkOne(loc, selections[loc.name]);
      setLinkStates(s => ({ ...s, [loc.name]: success ? "saved" : "error" }));
      success ? ok++ : fail++;
    }

    setAutoLinking(false);
    setAutoResult(
      fail === 0
        ? `✓ ${ok} fiche${ok > 1 ? "s" : ""} liée${ok > 1 ? "s" : ""} avec succès !`
        : `${ok} liée${ok > 1 ? "s" : ""}, ${fail} erreur${fail > 1 ? "s" : ""}.`
    );
    setTimeout(() => {
      setAutoResult(null);
      setLinkStates({});
    }, 5000);
  };

  const allLocations  = groups.flatMap(g => g.locations);
  const totalLocations = allLocations.length;
  const withSelection  = allLocations.filter(l => selections[l.name]).length;
  const alreadyLinked  = clients.filter(c => c.google_account_location_name).length;

  // ── Chargement ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="surface-card rounded-2xl p-12 text-center">
      <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
      <p className="text-sm text-mut">Récupération de vos fiches Google Business…</p>
      <p className="mt-1 text-xs text-mut-2">Connexion à l'API Google en cours.</p>
    </div>
  );

  // ── Erreur ──────────────────────────────────────────────────────────────────
  if (error) return (
    <div className="surface-card rounded-2xl p-8">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="font-semibold text-[#ff6b6b]">Impossible de se connecter à Google Business</p>
          <p className="mt-1 text-sm text-mut">{error}</p>
          <div className="mt-4 rounded-xl border border-white/[0.07] p-4 text-xs text-mut-2 space-y-1">
            <p>Vérifiez dans Vercel :</p>
            <p>• <code>GOOGLE_REFRESH_TOKEN</code> est présent</p>
            <p>• <code>GOOGLE_CLIENT_ID</code> et <code>GOOGLE_CLIENT_SECRET</code> sont corrects</p>
            <p>• L'application a été redéployée après l'ajout des variables</p>
          </div>
          <button onClick={loadLocations} className="mt-4 btn-ghost rounded-full px-5 py-2 text-sm font-semibold">
            Réessayer
          </button>
        </div>
      </div>
    </div>
  );

  // ── Interface principale ────────────────────────────────────────────────────
  return (
    <div className="grid gap-5">

      {/* Barre d'action principale */}
      <div className="surface-card rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="font-display text-2xl font-semibold text-ink">{totalLocations}</p>
            <p className="text-[11px] text-mut-2">fiches Google</p>
          </div>
          <div className="h-8 w-px bg-white/[0.07]" />
          <div className="text-center">
            <p className="font-display text-2xl font-semibold text-ink">{clients.length}</p>
            <p className="text-[11px] text-mut-2">clients Supabase</p>
          </div>
          <div className="h-8 w-px bg-white/[0.07]" />
          <div className="text-center">
            <p className="font-display text-2xl font-semibold text-emerald">{alreadyLinked}</p>
            <p className="text-[11px] text-mut-2">déjà liés</p>
          </div>
          <div className="h-8 w-px bg-white/[0.07]" />
          <div className="text-center">
            <p className="font-display text-2xl font-semibold" style={{ color: "#b14dff" }}>{withSelection}</p>
            <p className="text-[11px] text-mut-2">prêts à lier</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {autoResult && (
            <span className={`text-sm font-semibold ${autoResult.startsWith("✓") ? "text-emerald" : "text-amber-400"}`}>
              {autoResult}
            </span>
          )}
          <button
            onClick={handleLinkAll}
            disabled={withSelection === 0 || autoLinking}
            className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {autoLinking ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Liaison en cours…
              </>
            ) : (
              <>
                ⚡ Lier tout en un clic
                {withSelection > 0 && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">{withSelection}</span>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info auto-matching */}
      {withSelection > 0 && !autoLinking && !autoResult && (
        <div
          className="rounded-xl border px-4 py-3 text-xs text-mut flex items-center gap-2"
          style={{ background: "rgba(177,77,255,0.06)", borderColor: "rgba(177,77,255,0.2)" }}
        >
          <span style={{ color: "#b14dff" }}>✦</span>
          <span>
            <strong style={{ color: "#b14dff" }}>Correspondances détectées automatiquement</strong> — les menus sont pré-remplis par similarité de nom. Vérifiez et cliquez <strong>"Lier tout"</strong>.
          </span>
        </div>
      )}

      {/* Groupes par compte Google */}
      {groups.map(group => (
        <div key={group.account.name} className="surface-card rounded-2xl overflow-hidden">
          {/* En-tête compte */}
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-6 py-3.5">
            <div className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: "rgba(66,133,244,0.15)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4285f4"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-ink">{group.account.accountName}</p>
            <span className="ml-auto rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-mut-2">
              {group.locations.length} fiche{group.locations.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Fiches */}
          <div className="divide-y divide-white/[0.05]">
            {group.locations.map(loc => {
              const state    = linkStates[loc.name] ?? "idle";
              const selected = selections[loc.name] ?? "";
              const match    = findBestMatch(loc.locationName, clients);
              const isAutoMatch = match && match.score >= 0.9 && !loc.name;

              return (
                <div key={loc.name} className="flex items-center gap-3 px-5 py-3.5">
                  {/* Statut */}
                  <div className={`h-2 w-2 flex-shrink-0 rounded-full ${
                    state === "saved" ? "bg-emerald" :
                    state === "error" ? "bg-[#ff6b6b]" :
                    state === "saving" ? "bg-amber-400 animate-pulse" :
                    selected ? "bg-[#b14dff]" : "bg-white/20"
                  }`} />

                  {/* Nom + catégorie */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{loc.locationName}</p>
                    {loc.primaryCategory && (
                      <p className="text-[11px] text-mut-2 truncate">{loc.primaryCategory}</p>
                    )}
                  </div>

                  {/* Match confidence */}
                  {match && match.score >= 0.9 && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: "rgba(46,230,168,0.1)", color: "#2ee6a8" }}
                    >
                      Auto ✓
                    </span>
                  )}

                  {/* Sélecteur */}
                  <select
                    value={selected}
                    onChange={e => setSelections(s => ({ ...s, [loc.name]: e.target.value }))}
                    className="h-8 flex-shrink-0 w-44 rounded-xl border border-white/[0.12] bg-[rgba(26,26,29,0.8)] px-2.5 text-xs text-ink outline-none focus:border-white/30"
                  >
                    <option value="">— Choisir —</option>
                    {clients.map(c => (
                      <option key={c.id_client} value={c.id_client}>{clientLabel(c)}</option>
                    ))}
                  </select>

                  {/* Bouton individuel */}
                  <button
                    disabled={!selected || state === "saving"}
                    onClick={() => handleLinkOne(loc)}
                    className={`h-8 flex-shrink-0 rounded-xl px-3 text-xs font-semibold transition-all ${
                      state === "saved"  ? "border border-emerald/30 bg-emerald/10 text-emerald" :
                      state === "error"  ? "border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 text-[#ff6b6b]" :
                      state === "saving" ? "opacity-50 cursor-wait btn-grad" :
                      "btn-grad disabled:opacity-30 disabled:cursor-not-allowed"
                    }`}
                  >
                    {state === "saving" ? "…" : state === "saved" ? "✓" : state === "error" ? "✗" : "Lier"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {groups.length === 0 && !loading && (
        <div className="surface-card rounded-2xl p-8 text-center">
          <p className="text-sm text-mut">Aucune fiche Google Business trouvée.</p>
          <p className="mt-1 text-xs text-mut-2">
            Assurez-vous d'avoir autorisé le bon compte Google (celui qui gère vos fiches Business).
          </p>
        </div>
      )}
    </div>
  );
}
