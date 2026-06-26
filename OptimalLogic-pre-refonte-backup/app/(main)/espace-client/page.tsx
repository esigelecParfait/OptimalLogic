import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getMetricsConfig, type MetricKey } from "@/lib/metrics-config";

export const dynamic = "force-dynamic";

type Metrics = {
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

type ClientService = {
  offer_code: string;
  service_status: string;
  payment_status: string;
  start_date: string | null;
  offres: { nom_offre: string } | null;
};

function getValue(m: Metrics, key: MetricKey): number | null {
  return m[key] as number | null;
}

function formatValue(key: MetricKey, value: number | null): string {
  if (value == null) return "—";
  if (key === "note_google") return `${value}/5`;
  if (key === "nb_vues_google" || key === "nb_clics_google") return value.toLocaleString("fr-FR");
  return `${value}`;
}

function pctDiff(curr: number | null, prev: number | null): string | null {
  if (curr == null || prev == null || prev === 0) return null;
  const p = Math.round(((curr - prev) / prev) * 100);
  return p > 0 ? `+${p}%` : `${p}%`;
}

function absDiff(curr: number | null, prev: number | null): string | null {
  if (curr == null || prev == null) return null;
  const d = curr - prev;
  return d > 0 ? `+${d}` : d < 0 ? `${d}` : null;
}

function StatCard({ label, value, sub, subPositive }: { label: string; value: string; sub?: string | null; subPositive?: boolean }) {
  return (
    <div className="rounded-2xl bg-slate-800 p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-bold tracking-tight text-white">{value}</p>
      {sub && (
        <p className={`mt-2 text-sm font-semibold ${subPositive ? "text-emerald-400" : "text-red-400"}`}>{sub}</p>
      )}
    </div>
  );
}

export default async function TableauDeBordPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const { data: client } = await supabase
    .from("clients")
    .select("id_client, contact_first_name")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  const { data: rawService } = client
    ? await supabase
        .from("client_services")
        .select("offer_code, service_status, payment_status, start_date, offres(nom_offre)")
        .eq("id_client", client.id_client)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  const service = rawService as unknown as ClientService | null;
  const config = getMetricsConfig(service?.offer_code);

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

  const { data: metricsRows } = client
    ? await supabase
        .from("client_metrics")
        .select("mois, nb_rdv, nb_demandes, nb_appels, nb_avis_google, note_google, nb_vues_google, nb_clics_google, nb_sessions_chatbot")
        .eq("id_client", client.id_client)
        .in("mois", [currentMonth, prevMonth])
        .order("mois", { ascending: false })
    : { data: null };

  const current = (metricsRows ?? []).find((r: Metrics) => r.mois === currentMonth) as Metrics | undefined;
  const prev = (metricsRows ?? []).find((r: Metrics) => r.mois === prevMonth) as Metrics | undefined;
  const hasData = !!current;

  const paymentPending = service?.payment_status === "en_attente" || service?.payment_status === "impaye";
  const monthLabel = now.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  // Actions dynamiques
  const actions: { label: string; badge: string; color: string; href: string }[] = [];
  if (paymentPending) {
    actions.push({ label: "Régulariser votre paiement", badge: "Urgent", color: "text-red-500", href: "/espace-client/mon-compte" });
  }
  if (hasData && current) {
    const rdv = getValue(current, "nb_rdv");
    const prevRdv = prev ? getValue(prev, "nb_rdv") : null;
    const avis = getValue(current, "nb_avis_google") ?? 0;
    const chatbot = getValue(current, "nb_sessions_chatbot") ?? 0;
    const demandes = getValue(current, "nb_demandes") ?? 0;

    if (rdv !== null && prevRdv !== null && rdv < prevRdv) {
      actions.push({ label: "Les RDV sont en baisse — revoir la visibilité Google", badge: "Attention", color: "text-red-500", href: "/espace-client/support" });
    }
    if (avis === 0 && config.cards.some(c => c.key === "nb_avis_google")) {
      actions.push({ label: "Aucun avis Google ce mois — relancer vos clients récents", badge: "Impact local", color: "text-amber-500", href: "/espace-client/support" });
    }
    if (chatbot > 10 && demandes < 3 && config.cards.some(c => c.key === "nb_sessions_chatbot")) {
      actions.push({ label: "Fort trafic chatbot mais peu de demandes — optimiser la conversion", badge: "Conversion", color: "text-amber-500", href: "/espace-client/support" });
    }
  }
  if (actions.length === 0 && hasData) {
    actions.push({ label: "Tout va bien — continuez sur cette lancée !", badge: "Excellent", color: "text-emerald-600", href: "/espace-client/suivi" });
  }
  if (!hasData) {
    actions.push({ label: "Vos données apparaîtront ici dès la fin du mois", badge: "Bientôt", color: "text-slate-400", href: "/espace-client/support" });
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="rounded-[2rem] bg-slate-950 p-7 sm:p-9">
        <p className="text-sm text-slate-500 tracking-wide">Tableau de bord</p>
        <div className="mt-1 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">{config.dashboardTitle}</h1>
            {service?.offres?.nom_offre && (
              <p className="mt-1 text-sm text-slate-500">Offre : {service.offres.nom_offre}</p>
            )}
          </div>
          <span className="mt-1 flex-shrink-0 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 capitalize">
            {monthLabel}
          </span>
        </div>

        <div className="mt-5 h-px bg-slate-800" />

        {hasData && current ? (
          <div className={`mt-6 grid gap-4 ${config.cards.length <= 4 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
            {config.cards.map((card) => {
              const curr = getValue(current, card.key);
              const prv = prev ? getValue(prev, card.key) : null;
              const isNote = card.key === "note_google";
              const sub = isNote ? null : (pctDiff(curr, prv) ?? absDiff(curr, prv));
              const positive = curr != null && prv != null ? curr >= prv : true;
              return (
                <StatCard
                  key={card.key}
                  label={card.altLabel ?? card.label}
                  value={formatValue(card.key, curr)}
                  sub={sub}
                  subPositive={positive}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-slate-800/60 p-6 text-center">
            <p className="text-sm text-slate-400 leading-7">
              Vos indicateurs de performance apparaîtront ici chaque mois.<br />
              OptimalLogic met à jour ces données après chaque rapport mensuel.
            </p>
            <Link href="/espace-client/support"
              className="mt-4 inline-block rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-white hover:text-white transition">
              Contacter mon conseiller
            </Link>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-base font-bold text-slate-950">Actions recommandées</p>
          <p className="text-xs text-slate-400">
            {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        <div className="divide-y divide-slate-100">
          {actions.map((action, i) => (
            <Link key={i} href={action.href}
              className="flex items-center justify-between py-4 text-sm text-slate-700 transition hover:text-slate-950 group">
              <span className="group-hover:underline underline-offset-2">{action.label}</span>
              <span className={`ml-4 flex-shrink-0 text-xs font-bold ${action.color}`}>{action.badge}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Comparaison */}
      {hasData && prev && current && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-base font-bold text-slate-950 mb-5">Comparaison mois précédent</p>
          <div className="space-y-5">
            {config.comparisonKeys.map((key) => {
              const card = config.cards.find(c => c.key === key);
              const label = card?.altLabel ?? card?.label ?? key;
              const currVal = getValue(current, key) ?? 0;
              const prvVal = getValue(prev, key) ?? 0;
              const max = Math.max(currVal, prvVal, 1);
              const up = currVal >= prvVal;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-600">{label}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400">{formatValue(key, getValue(prev, key))} le mois dernier</span>
                      <span className={`font-bold ${up ? "text-emerald-600" : "text-red-500"}`}>
                        {formatValue(key, getValue(current, key))} ce mois
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 h-2">
                    <div className="flex-1 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-slate-300" style={{ width: `${Math.round((prvVal / max) * 100)}%` }} />
                    </div>
                    <div className="flex-1 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${up ? "bg-emerald-500" : "bg-red-400"}`} style={{ width: `${Math.round((currVal / max) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
