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
  return c.business_name
    ?? `${c.contact_first_name ?? ""} ${c.contact_last_name ?? ""}`.trim()
    || c.id_client.slice(0, 8);
}

export default function GoogleSetupClient({
  clients,
  adminSecret,
}: {
  clients: DbClient[];
  adminSecret: string;
}) {
  const [groups, setGroups]     = useState<GBPGroup[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  // État de sélection : locationName → clientId choisi
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    clients.forEach(c => {
      if (c.google_account_location_name) {
        init[c.google_account_location_name] = c.id_client;
      }
    });
    return init;
  });

  const [linkStates, setLinkStates] = useState<Record<string, LinkState>>({});

  // Charger les fiches Google
  const loadLocations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/google/locations", {
        headers: { "x-admin-secret": adminSecret },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur API");
      setGroups(data.groups ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [adminSecret]);

  useEffect(() => { loadLocations(); }, [loadLocations]);

  // Lier une fiche à un client
  const handleLink = async (location: GBPLocation) => {
    const clientId = selections[location.name];
    if (!clientId) return;

    setLinkStates(s => ({ ...s, [location.name]: "saving" }));

    try {
      const res = await fetch("/api/admin/google/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({
          clientId,
          locationName:    location.name,
          performanceName: location.performanceName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setLinkStates(s => ({ ...s, [location.name]: "saved" }));
      setTimeout(() => setLinkStates(s => ({ ...s, [location.name]: "idle" })), 3000);
    } catch (e) {
      setLinkStates(s => ({ ...s, [location.name]: "error" }));
      console.error(e);
    }
  };

  const totalLocations = groups.reduce((n, g) => n + g.locations.length, 0);
  const linkedCount    = clients.filter(c => c.google_account_location_name).length;

  // ── Chargement ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="surface-card rounded-2xl p-10 text-center">
      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
      <p className="text-sm text-mut">Récupération de vos fiches Google Business…</p>
    </div>
  );

  // ── Erreur ──────────────────────────────────────────────────────────────────
  if (error) return (
    <div className="surface-card rounded-2xl p-8">
      <p className="text-sm font-semibold text-[#ff6b6b]">⚠ Impossible de charger les fiches Google</p>
      <p className="mt-2 text-sm text-mut">{error}</p>
      <p className="mt-4 text-xs text-mut-2">
        Vérifiez que <code>GOOGLE_REFRESH_TOKEN</code>, <code>GOOGLE_CLIENT_ID</code> et <code>GOOGLE_CLIENT_SECRET</code> sont bien configurés dans Vercel, puis redéployez.
      </p>
      <button onClick={loadLocations} className="mt-4 btn-ghost rounded-full px-5 py-2 text-sm font-semibold">
        Réessayer
      </button>
    </div>
  );

  // ── Interface principale ────────────────────────────────────────────────────
  return (
    <div className="grid gap-6">

      {/* Résumé */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Fiches Google trouvées", value: totalLocations, color: "text-ink" },
          { label: "Clients dans Supabase",  value: clients.length, color: "text-ink" },
          { label: "Déjà liés",              value: linkedCount,    color: "text-emerald" },
        ].map(stat => (
          <div key={stat.label} className="surface-card rounded-2xl p-5 text-center">
            <p className={`font-display text-3xl font-semibold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-xs text-mut">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Fiches par compte Google */}
      {groups.map(group => (
        <div key={group.account.name} className="surface-card rounded-2xl overflow-hidden">
          {/* En-tête du compte */}
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-6 py-4">
            <div className="grid h-8 w-8 place-items-center rounded-lg text-sm" style={{ background: "rgba(66,133,244,0.15)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4285f4"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{group.account.accountName}</p>
              <p className="text-[11px] text-mut-2">{group.account.name}</p>
            </div>
            <span className="ml-auto rounded-full bg-white/[0.06] px-3 py-1 text-xs text-mut">
              {group.locations.length} fiche{group.locations.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Liste des fiches */}
          <div className="divide-y divide-white/[0.05]">
            {group.locations.map(loc => {
              const state    = linkStates[loc.name] ?? "idle";
              const selected = selections[loc.name] ?? "";
              const alreadyLinked = clients.find(
                c => c.google_account_location_name === loc.name
              );

              return (
                <div key={loc.name} className="flex items-center gap-4 px-6 py-4">
                  {/* Infos fiche */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{loc.locationName}</p>
                    <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
                      {loc.primaryCategory && (
                        <span className="text-[11px] text-mut-2">{loc.primaryCategory}</span>
                      )}
                      {loc.primaryPhone && (
                        <span className="text-[11px] text-mut-2">{loc.primaryPhone}</span>
                      )}
                    </div>
                  </div>

                  {/* Sélecteur client */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {alreadyLinked && !selected && (
                      <span className="text-[11px] text-emerald font-medium">
                        ✓ {clientLabel(alreadyLinked)}
                      </span>
                    )}
                    <select
                      value={selected}
                      onChange={e => setSelections(s => ({ ...s, [loc.name]: e.target.value }))}
                      className="h-9 rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.8)] px-3 text-xs text-ink outline-none focus:border-white/30 max-w-[180px]"
                    >
                      <option value="">— Choisir un client —</option>
                      {clients.map(c => (
                        <option key={c.id_client} value={c.id_client}>
                          {clientLabel(c)}
                        </option>
                      ))}
                    </select>

                    <button
                      disabled={!selected || state === "saving"}
                      onClick={() => handleLink(loc)}
                      className={`h-9 rounded-xl px-4 text-xs font-semibold transition-all ${
                        state === "saved"
                          ? "bg-emerald/20 text-emerald border border-emerald/30"
                          : state === "error"
                            ? "bg-[#ff6b6b]/20 text-[#ff6b6b] border border-[#ff6b6b]/30"
                            : "btn-grad disabled:opacity-40 disabled:cursor-not-allowed"
                      }`}
                    >
                      {state === "saving" ? "…" : state === "saved" ? "✓ Lié !" : state === "error" ? "Erreur" : "Lier"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {groups.length === 0 && (
        <div className="surface-card rounded-2xl p-8 text-center">
          <p className="text-sm text-mut">Aucune fiche Google Business trouvée.</p>
          <p className="mt-2 text-xs text-mut-2">
            Vérifiez que vous avez bien autorisé l'application avec le bon compte Google (celui qui gère vos fiches Business).
          </p>
        </div>
      )}
    </div>
  );
}
