import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [
    prospectsRes,
    clientsRes,
    demandesRes,
    newThisMonthRes,
    recentDemandesRes,
  ] = await Promise.all([
    supabaseAdmin.from("client_prospects").select("id_client", { count: "exact", head: true }),
    supabaseAdmin.from("clients").select("id_client", { count: "exact", head: true }).eq("status", "active"),
    supabaseAdmin.from("demandes").select("id", { count: "exact", head: true }).in("request_status", ["nouveau", "a_contacter"]),
    supabaseAdmin.from("client_prospects").select("id_client", { count: "exact", head: true }).gte("created_at", startOfMonth),
    supabaseAdmin
      .from("demandes")
      .select("id, request_status, request_source, offer_code, created_at, id_client, client_prospects(contact_first_name, contact_last_name, business_name, type_client)")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const totalProspects  = prospectsRes.count ?? 0;
  const activeClients   = clientsRes.count ?? 0;
  const pendingDemandes = demandesRes.count ?? 0;
  const newThisMonth    = newThisMonthRes.count ?? 0;

  type RecentDemande = {
    id: string;
    request_status: string | null;
    request_source: string | null;
    created_at: string;
    client_prospects: { contact_first_name: string | null; contact_last_name: string | null; business_name: string | null; type_client: string | null }[] | null;
  };
  const recentDemandes = (recentDemandesRes.data ?? []) as unknown as RecentDemande[];

  const statusColors: Record<string, string> = {
    nouveau:        "text-blue-400 bg-blue-400/10 border-blue-400/20",
    a_contacter:    "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    contacte:       "text-purple-400 bg-purple-400/10 border-purple-400/20",
    rdv_planifie:   "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    devis_envoye:   "text-orange-400 bg-orange-400/10 border-orange-400/20",
    en_negociation: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    gagne:          "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    perdu:          "text-red-400 bg-red-400/10 border-red-400/20",
    archive:        "text-gray-400 bg-gray-400/10 border-gray-400/20",
  };

  const typeLabels: Record<string, string> = {
    commerce: "Commerce", tpe_pme: "TPE/PME", startup: "Startup", autre: "Autre",
  };

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const min  = Math.floor(diff / 60000);
    const h    = Math.floor(diff / 3600000);
    const d    = Math.floor(diff / 86400000);
    if (min < 60)  return `il y a ${min} min`;
    if (h   < 24)  return `il y a ${h}h`;
    if (d   === 1) return "hier";
    return `il y a ${d} jours`;
  }

  const stats = [
    { label: "Prospects",           value: totalProspects,  href: "/admin/prospects", color: "text-blue-400",    note: `+${newThisMonth} ce mois` },
    { label: "Clients actifs",      value: activeClients,   href: "/admin/clients",   color: "text-emerald-400", note: "abonnements actifs" },
    { label: "Demandes en attente", value: pendingDemandes, href: "/admin/prospects", color: "text-amber-400",   note: "nouveau / à contacter" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-mut-2">Administration</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Tableau de bord</h1>
        <p className="mt-1 text-sm text-mut">{now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="surface-card rounded-2xl p-5 hover:bg-white/[0.03] transition-colors">
            <p className="text-xs font-medium text-mut-2 uppercase tracking-wider mb-3">{s.label}</p>
            <p className={`font-display text-4xl font-semibold ${s.color} leading-none mb-2`}>{s.value}</p>
            <p className="text-xs text-mut">{s.note}</p>
          </Link>
        ))}
      </div>

      {/* Dernières demandes */}
      <section className="surface-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Dernières demandes</h2>
          <Link href="/admin/prospects" className="text-xs text-mut hover:text-ink transition-colors">Voir tout →</Link>
        </div>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-white/[0.04]">
            {recentDemandes.map((d) => {
              const p = Array.isArray(d.client_prospects) ? d.client_prospects[0] : d.client_prospects;
              const name = p?.business_name || `${p?.contact_first_name ?? ""} ${p?.contact_last_name ?? ""}`.trim() || "—";
              const status = d.request_status ?? "";
              return (
                <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-ink">{name}</p>
                    {p?.type_client && <p className="text-xs text-mut-2 mt-0.5">{typeLabels[p.type_client] ?? p.type_client}</p>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusColors[status] ?? "text-mut border-white/10"}`}>
                      {status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-mut capitalize">{d.request_source ?? "—"}</td>
                  <td className="px-5 py-3.5 text-xs text-mut text-right">{timeAgo(d.created_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {recentDemandes.length === 0 && (
          <div className="py-12 text-center text-sm text-mut">Aucune demande pour l&apos;instant.</div>
        )}
      </section>
    </div>
  );
}
