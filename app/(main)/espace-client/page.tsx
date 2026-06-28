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
  if (key === "nb_vues_google") return value.toLocaleString("fr-FR");
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
    <div className="rounded-2xl border border-white/[0.07] p-6" style={{ background: "rgba(26,26,29,0.6)" }}>
      <p className="text-sm text-mut">{label}</p>
      <p className="mt-3 font-display text-4xl font-semibold text-ink">{value}</p>
      {sub && <p className={`mt-2 text-sm font-semibold ${subPositive ? "text-emerald" : "text-[#ff6b6b]"}`}>{sub}</p>}
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

  const actions: { label: string; badge: string; color: string; href: string }[] = [];
  if (paymentPending) {
    actions.push({ label: "Régulariser votre paiement", badge: "Urgent", color: "text-[#ff6b6b]", href: "/espace-client/mon-compte" });
  }
  if (hasData && current) {
    const rdv = getValue(current, "nb_rdv");
    const prevRdv = prev ? getValue(prev, "nb_rdv") : null;
    const avis = getValue(current, "nb_avis_google") ?? 0;
    const chatbot = getValue(current, "nb_sessions_chatbot") ?? 0;
    const demandes = getValue(current, "nb_demandes") ?? 0;

    if (rdv !== null && prevRdv !== null && rdv < prevRdv) {
      actions.push({ label: "Les RDV sont en baisse — revoir la visibilité Google", badge: "Attention", color: "text-[#ff6b6b]", href: "/espace-client/support" });
    }
    if (avis === 0 && config.cards.some(c => c.key === "nb_avis_google")) {
      actions.push({ label: "Aucun avis Google ce mois — relancer vos clients récents", badge: "Impact local", color: "text-amber-400", href: "/espace-client/support" });
    }
    if (chatbot > 10 && demandes < 3 && config.cards.some(c => c.key === "nb_sessions_chatbot")) {
      actions.push({ label: "Fort trafic chatbot mais peu de demandes — optimiser la conversion", badge: "Conversion", color: "text-amber-400", href: "/espace-client/support" });
    }
  }
  if (actions.length === 0 && hasData) {
    actions.push({ label: "Tout va bien — continuez sur cette lancée !", badge: "Excellent", color: "text-emerald", href: "/espace-client/suivi" });
  }
  if (!hasData) {
    actions.push({ label: "Vos données apparaîtront ici dès la fin du mois", badge: "Bientôt", color: "text-mut-2", href: "/espace-client/support" });
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="surface-card rounded-[28px] p-7 sm:p-9">
        <p className="text-sm tracking-wide text-mut-2">Tableau de bord</p>
        <div className="mt-1 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink">{config.dashboardTitle}</h1>
            {service?.offres?.nom_offre && <p className="mt-1 text-sm text-mut-2">Offre : {service.offres.nom_offre}</p>}
          </div>
          <span className="mt-1 flex-shrink-0 rounded-full border border-emerald/40 px-3 py-1 text-xs font-bold capitalize text-emerald" style={{ background: "rgba(46,230,168,0.1)" }}>{monthLabel}</span>
        </div>

        <div className="mt-5 h-px bg-white/[0.07]" />

        {hasData && current ? (
          <div className={`mt-6 grid gap-4 ${config.cards.length <= 4 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
            {config.cards.map((card) => {
              const curr = getValue(current, card.key);
              const prv = prev ? getValue(prev, card.key) : null;
              const isNote = card.key === "note_google";
              const sub = isNote ? null : (pctDiff(curr, prv) ?? absDiff(curr, prv));
              const positive = curr != null && prv != null ? curr >= prv : true;
              return <StatCard key={card.key} label={card.altLabel ?? card.label} value={formatValue(card.key, curr)} sub={sub} subPositive={positive} />;
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/[0.07] p-6 text-center" style={{ background: "rgba(26,26,29,0.5)" }}>
            <p className="text-sm leading-7 text-mut">Vos indicateurs de performance apparaîtront ici chaque mois.<br />OptimalLogic met à jour ces données après chaque rapport mensuel.</p>
            <Link href="/espace-client/support" className="mt-4 inline-block rounded-full border border-white/[0.13] px-4 py-2 text-xs font-semibold text-mut transition hover:border-white/30 hover:text-ink">Contacter mon conseiller</Link>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="surface-card rounded-[28px] p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-base font-bold text-ink">Actions recommandées</p>
          <p className="text-xs text-mut-2">{now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {actions.map((action, i) => (
            <Link key={i} href={action.href} className="group flex items-center justify-between py-4 text-sm text-mut transition hover:text-ink">
              <span className="underline-offset-2 group-hover:underline">{action.label}</span>
              <span className={`ml-4 flex-shrink-0 text-xs font-bold ${action.color}`}>{action.badge}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Comparaison */}
      {hasData && prev && current && (
        <div className="surface-card rounded-[28px] p-6 sm:p-8">
          <p className="mb-5 text-base font-bold text-ink">Comparaison mois précédent</p>
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
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm text-mut">{label}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-mut-2">{formatValue(key, getValue(prev, key))} le mois dernier</span>
                      <span className={`font-bold ${up ? "text-emerald" : "text-[#ff6b6b]"}`}>{formatValue(key, getValue(current, key))} ce mois</span>
                    </div>
                  </div>
                  <div className="flex h-2 gap-1.5">
                    <div className="flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full rounded-full bg-white/20" style={{ width: `${Math.round((prvVal / max) * 100)}%` }} />
                    </div>
                    <div className="flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full rounded-full" style={{ width: `${Math.round((currVal / max) * 100)}%`, background: up ? "var(--grad)" : "#ff6b6b" }} />
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
