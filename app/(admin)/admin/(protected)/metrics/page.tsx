import { Fragment } from "react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import RefreshButton from "./RefreshButton";

export const dynamic = "force-dynamic";

type MetricRow = {
  id: string;
  id_client: string;
  mois: string;
  nb_rdv: number | null;
  nb_demandes: number | null;
  nb_appels: number | null;
  nb_avis_google: number | null;
  note_google: number | null;
  nb_vues_google: number | null;
  nb_clics_google: number | null;
  nb_sessions_chatbot: number | null;
};

type ProspectRow = {
  id_client: string;
  contact_first_name: string | null;
  contact_last_name: string | null;
  business_name: string | null;
};

export default async function MetricsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const { data: metrics } = await supabaseAdmin
    .from("client_metrics")
    .select("id, id_client, mois, nb_rdv, nb_demandes, nb_appels, nb_avis_google, note_google, nb_vues_google, nb_clics_google, nb_sessions_chatbot")
    .order("mois", { ascending: false })
    .limit(500);

  const rows: MetricRow[] = metrics ?? [];
  const prospectIds = [...new Set(rows.map((r) => r.id_client))];

  const prospectsRes = prospectIds.length > 0
    ? await supabaseAdmin
        .from("client_prospects")
        .select("id_client, contact_first_name, contact_last_name, business_name")
        .in("id_client", prospectIds)
    : { data: [] };

  const prospectMap = new Map<string, ProspectRow>(
    (prospectsRes.data ?? []).map((p) => [p.id_client, p as ProspectRow])
  );

  const clientLabel = (id: string) => {
    const p = prospectMap.get(id);
    if (!p) return "—";
    return p.business_name || `${p.contact_first_name ?? ""} ${p.contact_last_name ?? ""}`.trim() || "—";
  };

  const query = (q ?? "").trim().toLowerCase();

  // Filtrer par nom d'entreprise / contact
  const filteredRows = query
    ? rows.filter((r) => {
        const p = prospectMap.get(r.id_client);
        const haystack = [p?.business_name, p?.contact_first_name, p?.contact_last_name]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
    : rows;

  // Regrouper par entreprise (id_client), puis trier par mois desc dans chaque groupe
  const grouped = new Map<string, MetricRow[]>();
  for (const r of filteredRows) {
    const group = grouped.get(r.id_client) ?? [];
    group.push(r);
    grouped.set(r.id_client, group);
  }
  // Trier les groupes par nom d'entreprise
  const sortedGroups = [...grouped.entries()].sort(([a], [b]) =>
    clientLabel(a).localeCompare(clientLabel(b), "fr")
  );

  const clientCount = sortedGroups.length;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-mut-2">Administration</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Métriques</h1>
          <p className="mt-1 text-sm text-mut">
            {clientCount} entreprise{clientCount !== 1 ? "s" : ""} · {filteredRows.length} entrée{filteredRows.length !== 1 ? "s" : ""}
            {query ? " trouvées" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <form method="GET" className="shrink-0">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Rechercher une entreprise…"
              className="h-10 w-64 rounded-xl border border-white/[0.12] bg-[rgba(26,26,29,0.8)] px-3.5 text-sm text-ink outline-none placeholder:text-mut-2 focus:border-white/30"
            />
          </form>
          <RefreshButton />
        </div>
      </div>

      <section className="surface-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Client</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Mois</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">RDV</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Demandes</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Appels</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Avis Google</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Note</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Vues</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Clics</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Chatbot</th>
            </tr>
          </thead>
          <tbody>
            {sortedGroups.map(([clientId, clientRows]) => (
              <Fragment key={clientId}>
                {/* En-tête de groupe entreprise */}
                <tr key={`group-${clientId}`} className="bg-white/[0.03] border-t border-white/[0.07]">
                  <td colSpan={10} className="px-5 py-2.5">
                    <span className="text-xs font-semibold text-ink">{clientLabel(clientId)}</span>
                    <span className="ml-2 text-[11px] text-mut-2">{clientRows.length} mois</span>
                  </td>
                </tr>
                {/* Lignes de métriques */}
                {clientRows.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors border-t border-white/[0.03]">
                    <td className="px-5 py-3 text-mut pl-8">—</td>
                    <td className="px-5 py-3 text-mut">{r.mois}</td>
                    <td className="px-5 py-3 text-mut">{r.nb_rdv ?? "—"}</td>
                    <td className="px-5 py-3 text-mut">{r.nb_demandes ?? "—"}</td>
                    <td className="px-5 py-3 text-mut">{r.nb_appels ?? "—"}</td>
                    <td className="px-5 py-3 text-mut">{r.nb_avis_google ?? "—"}</td>
                    <td className="px-5 py-3 text-mut">{r.note_google ?? "—"}</td>
                    <td className="px-5 py-3 text-mut">{r.nb_vues_google ?? "—"}</td>
                    <td className="px-5 py-3 text-mut">{r.nb_clics_google ?? "—"}</td>
                    <td className="px-5 py-3 text-mut">{r.nb_sessions_chatbot ?? "—"}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>

        {filteredRows.length === 0 && (
          <div className="py-16 text-center text-sm text-mut">
            {query ? "Aucun résultat pour cette recherche." : "Aucune métrique pour l'instant. Clique sur \"Rafraîchir\" pour lancer l'agrégation."}
          </div>
        )}
      </section>
    </div>
  );
}
