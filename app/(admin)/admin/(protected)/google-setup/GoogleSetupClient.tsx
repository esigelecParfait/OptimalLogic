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
  const wa = new Set(na.split(" ").filter((w) => w.length > 2));
  const wb = new Set(nb.split(" ").filter((w) => w.length > 2));
  let common = 0;
  wa.forEach((w) => { if (wb.has(w)) common++; });
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
  const [groups, setGroups] = useState<GBPGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoLinking, setAutoLinking] = useState(false);
  const [autoResult, setAutoResult] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    clients.forEach((c) => {
      if (c.google_account_location_name) init[c.google_account_location_name] = c.id_client;
    });
    return init;
  });
  const [linkStates, setLinkStates] = useState<Record<string, LinkState>>({});

  const loadLocations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/google/locations", {
        headers: { "x-admin-secret": adminSecret },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur API");
      const fetchedGroups: GBPGroup[] = data.groups ?? [];
      setGroups(fetchedGroups);
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

  const linkOne = useCallback(async (loc: GBPLocation, clientId: string): Promise<boolean> => {
    const res = await fetch("/api/admin/google/link", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret },
      body: JSON.stringify({ clientId, locationName: loc.name, performanceName: loc.performanceName }),
    });
    return res.ok;
  }, [adminSecret]);

  const handleLinkOne = async (loc: GBPLocation) => {
    const clientId = selections[loc.name];
    if (!clientId) return;
    setLinkStates((s) => ({ ...s, [loc.name]: "saving" }));
    const ok = await linkOne(loc, clientId);
    setLinkStates((s) => ({ ...s, [loc.name]: ok ? "saved" : "error" }));
    if (ok) setTimeout(() => setLinkStates((s) => ({ ...s, [loc.name]: "idle" })), 3000);
  };

  const handleLinkAll = async () => {
    const toLink = groups.flatMap((g) => g.locations).filter((loc) => selections[loc.name]);
    if (toLink.length === 0) return;
    setAutoLinking(true);
    setAutoResult(null);
    let ok = 0;
    let fail = 0;
    for (const loc of toLink) {
      setLinkStates((s) => ({ ...s, [loc.name]: "saving" }));
      const success = await linkOne(loc, selections[loc.name]);
      setLinkStates((s) => ({ ...s, [loc.name]: success ? "saved" : "error" }));
      success ? ok++ : fail++;
    }
    setAutoLinking(false);
    setAutoResult(
      fail === 0
        ? `✓ ${ok} fiche${ok > 1 ? "s" : ""} liée${ok > 1 ? "s" : ""} avec succès !`
        : `${ok} liée${ok > 1 ? "s" : ""}, ${fail} erreur${fail > 1 ? "s" : ""}.`
    );
    setTimeout(() => { setAutoResult(null); setLinkStates({}); }, 5000);
  };

  const allLocations = groups.flatMap((g) => g.locations);
  const totalLocations = allLocations.length;
  const withSelection = allLocations.filter((l) => selections[l.name]).length;
  const alreadyLinked = clients.filter((c) => c.google_account_location_name).length;

  if (loading) return (
    <div className="surface-card rounded-2xl p-12 text-center">
      <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
      <p className="text-sm text-mut">Récupération des fiches Google Business…</p>
    </div>
  );

  if (error) return (
    <div className="surface-card rounded-2xl p-8">
      <p className="font-semibold text-[#ff6b6b]">Impossible de se connecter à Google Business</p>
      <p className="mt-1 text-sm text-mut">{error}</p>
      <button onClick={loadLocations} className="mt-4 btn-ghost rounded-full px-5 py-2 text-sm font-semibold">Réessayer</button>
    </div>
  );

  return (
    <div className="grid gap-5">
      <div className="surface-card rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-6">
          {[
            { val: totalLocations, label: "fiches Google" },
            { val: clients.length, label: "prospects Supabase", color: undefined },
            { val: alreadyLinked, label: "déjà liés", color: "text-emerald-400" },
            { val: withSelection, label: "prêts à lier", color: "text-[#b14dff]" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-6">
              {i > 0 && <div className="h-8 w-px bg-white/[0.07]" />}
              <div className="text-center">
                <p className={`font-display text-2xl font-semibold ${stat.color ?? "text-ink"}`}>{stat.val}</p>
                <p className="text-[11px] text-mut-2">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {autoResult && (
            <span className={`text-sm font-semibold ${autoResult.startsWith("✓") ? "text-emerald-400" : "text-amber-400"}`}>
              {autoResult}
            </span>
          )}
          <button
            onClick={handleLinkAll}
            disabled={withSelection === 0 || autoLinking}
            className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-40"
          >
            {autoLinking ? "Liaison en cours…" : `⚡ Lier tout (${withSelection})`}
          </button>
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.account.name} className="surface-card rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-6 py-3.5">
            <p className="text-sm font-semibold text-ink">{group.account.accountName}</p>
            <span className="ml-auto rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-mut-2">
              {group.locations.length} fiche{group.locations.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {group.locations.map((loc) => {
              const state = linkStates[loc.name] ?? "idle";
              const selected = selections[loc.name] ?? "";
              return (
                <div key={loc.name} className="flex items-center gap-3 px-5 py-3.5">
                  <div className={`h-2 w-2 shrink-0 rounded-full ${
                    state === "saved" ? "bg-emerald-400" :
                    state === "error" ? "bg-red-400" :
                    state === "saving" ? "bg-amber-400 animate-pulse" :
                    selected ? "bg-[#b14dff]" : "bg-white/20"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{loc.locationName}</p>
                    {loc.primaryCategory && <p className="text-[11px] text-mut-2 truncate">{loc.primaryCategory}</p>}
                  </div>
                  <select
                    value={selected}
                    onChange={(e) => setSelections((s) => ({ ...s, [loc.name]: e.target.value }))}
                    className="h-8 w-44 shrink-0 rounded-xl border border-white/[0.12] bg-[rgba(26,26,29,0.8)] px-2.5 text-xs text-ink outline-none"
                  >
                    <option value="">— Choisir —</option>
                    {clients.map((c) => (
                      <option key={c.id_client} value={c.id_client}>{clientLabel(c)}</option>
                    ))}
                  </select>
                  <button
                    disabled={!selected || state === "saving"}
                    onClick={() => handleLinkOne(loc)}
                    className={`h-8 shrink-0 rounded-xl px-3 text-xs font-semibold transition-all ${
                      state === "saved" ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-400" :
                      state === "error" ? "border border-red-400/30 bg-red-400/10 text-red-400" :
                      "btn-grad disabled:opacity-30"
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

      {groups.length === 0 && (
        <div className="surface-card rounded-2xl p-8 text-center text-sm text-mut">
          Aucune fiche Google Business trouvée.
        </div>
      )}
    </div>
  );
}
