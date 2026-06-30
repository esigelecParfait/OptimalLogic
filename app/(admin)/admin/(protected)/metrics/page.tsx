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

export default async function MetricsPage() {
  const { data: metrics } = await supabaseAdmin
    .from("client_metrics")
    .select("id, id_client, mois, nb_rdv, nb_demandes, nb_appels, nb_avis_google, note_google, nb_vues_google, nb_clics_google, nb_sessions_chatbot")
    .order("mois", { ascending: false })
    .limit(200);

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

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-mut-2">Administration</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Métriques</h1>
          <p className="mt-1 text-sm text-mut">Performance mensuelle par client (RDV, appels, avis Google, chatbot…)</p>
        </div>
        <RefreshButton />
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
          <tbody className="divide-y divide-white/[0.04]">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3.5 font-medium text-ink">{clientLabel(r.id_client)}</td>
                <td className="px-5 py-3.5 text-mut">{r.mois}</td>
                <td className="px-5 py-3.5 text-mut">{r.nb_rdv ?? "—"}</td>
                <td className="px-5 py-3.5 text-mut">{r.nb_demandes ?? "—"}</td>
                <td className="px-5 py-3.5 text-mut">{r.nb_appels ?? "—"}</td>
                <td className="px-5 py-3.5 text-mut">{r.nb_avis_google ?? "—"}</td>
                <td className="px-5 py-3.5 text-mut">{r.note_google ?? "—"}</td>
                <td className="px-5 py-3.5 text-mut">{r.nb_vues_google ?? "—"}</td>
                <td className="px-5 py-3.5 text-mut">{r.nb_clics_google ?? "—"}</td>
                <td className="px-5 py-3.5 text-mut">{r.nb_sessions_chatbot ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="py-16 text-center text-sm text-mut">
            Aucune métrique pour l&apos;instant. Clique sur &quot;Rafraîchir&quot; pour lancer l&apos;agrégation.
          </div>
        )}
      </section>
    </div>
  );
}
