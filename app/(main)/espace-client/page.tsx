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
  if (key === "nb_vues_google") return value >= 1000
    ? `${(value / 1000).toFixed(1)}k`
    : `${value}`;
  return `${value}`;
}

function pctDiff(curr: number | null, prev: number | null): number | null {
  if (curr == null || prev == null || prev === 0) return null;
  return Math.round(((curr - prev) / prev) * 100);
}

type ActionCTA = {
  type: "copy" | "external";
  label: string;
  value: string;       // texte à copier OU url à ouvrir
};

type Action = {
  label: string;       // titre court, affiché en gras
  tip: string;         // encouragement, affiché en petit en dessous
  badge: string;
  color: string;
  bg: string;
  dot: string;
  href: string;
  cta?: ActionCTA;     // bouton d'action directe (optionnel)
  priority: number;
};

function buildActions(
  current: Metrics | undefined,
  prev: Metrics | undefined,
  config: ReturnType<typeof getMetricsConfig>,
  paymentPending: boolean,
  clientData: { googleUrl: string | null; siteUrl: string | null; rdvUrl: string | null; businessName: string | null }
): Action[] {
  const actions: Action[] = [];

  // ── Urgent ──────────────────────────────────────────────────────────────────
  if (paymentPending) {
    actions.push({
      label: "Régulariser votre paiement",
      tip: "Votre service risque d'être suspendu — réglez ça rapidement pour continuer à recevoir des clients sans interruption.",
      badge: "Urgent",
      color: "text-[#ff6b6b]",
      bg: "rgba(255,107,107,0.08)",
      dot: "#ff6b6b",
      href: "/espace-client/mon-compte",
      cta: { type: "external", label: "Mettre à jour", value: "/espace-client/mon-compte" },
      priority: 0,
    });
  }

  if (!current) {
    actions.push({
      label: "Votre tableau de bord se prépare",
      tip: "Vos premiers chiffres apparaîtront ici très bientôt — mis à jour chaque lundi automatiquement. 🚀",
      badge: "Bientôt",
      color: "text-mut-2",
      bg: "rgba(255,255,255,0.03)",
      dot: "#5e6788",
      href: "/espace-client/support",
      priority: 10,
    });
    return actions;
  }

  const hasKey = (k: MetricKey) => config.cards.some(c => c.key === k);

  const rdv        = getValue(current, "nb_rdv")              ?? 0;
  const prevRdv    = prev ? (getValue(prev, "nb_rdv")         ?? 0) : null;
  const avis       = getValue(current, "nb_avis_google")      ?? 0;
  const note       = getValue(current, "note_google");
  const vues       = getValue(current, "nb_vues_google")      ?? 0;
  const prevVues   = prev ? (getValue(prev, "nb_vues_google") ?? 0) : null;
  const clics      = getValue(current, "nb_clics_google")     ?? 0;
  const chatbot    = getValue(current, "nb_sessions_chatbot") ?? 0;
  const prevChat   = prev ? (getValue(prev, "nb_sessions_chatbot") ?? 0) : null;
  const demandes   = getValue(current, "nb_demandes")         ?? 0;
  const prevDem    = prev ? (getValue(prev, "nb_demandes")    ?? 0) : null;
  const appels     = getValue(current, "nb_appels")           ?? 0;

  // ── Réputation ──────────────────────────────────────────────────────────────

  // Note très basse
  if (note !== null && note < 4.0 && hasKey("nb_avis_google")) {
    actions.push({
      label: `Répondre à vos avis négatifs`,
      tip: `Votre note est à ${note}/5 — une réponse bienveillante peut vraiment inverser la tendance. 2 minutes suffisent. 💪`,
      badge: "Réputation ⚠",
      cta: clientData.googleUrl ? { type: "external" as const, label: "Ouvrir Google Business", value: clientData.googleUrl } : undefined,
      color: "text-[#ff6b6b]",
      bg: "rgba(255,107,107,0.06)",
      dot: "#ff6b6b",
      href: "/espace-client/support",
      priority: 1,
    });
  }

  // Note correcte mais améliorable
  if (note !== null && note >= 4.0 && note < 4.4 && hasKey("nb_avis_google")) {
    actions.push({
      label: `Booster votre note Google`,
      tip: `À ${note}/5 vous êtes bien placé — quelques avis 5 étoiles de plus et vous passez devant la concurrence. ⭐`,
      badge: "Réputation",
      get cta() {
        const msg = `Bonjour ! Si vous avez été satisfait de nos services, un petit avis Google nous aiderait beaucoup ⭐ : ${clientData.googleUrl ?? "[lien Google Business]"}`;
        return { type: "copy" as const, label: "Copier le message", value: msg };
      },
      color: "text-amber-400",
      bg: "rgba(251,191,36,0.06)",
      dot: "#fbbf24",
      href: "/espace-client/support",
      priority: 5,
    });
  }

  // Aucun avis ce mois
  if (avis === 0 && hasKey("nb_avis_google")) {
    actions.push({
      label: "Demander des avis à vos clients",
      tip: "Vos clients satisfaits adorent partager leur expérience, il suffit de leur demander ! Un message rapide peut rapporter 3 à 5 avis dès aujourd'hui. 🌟",
      badge: "Impact local",
      get cta() {
        const msg = `Bonjour ! Merci de nous avoir fait confiance 🙏 Si vous avez été satisfait, pourriez-vous nous laisser un avis Google en 30 secondes ? Ça nous aide beaucoup : ${clientData.googleUrl ?? "[lien Google Business]"}`;
        return { type: "copy" as const, label: "Copier le message", value: msg };
      },
      color: "text-amber-400",
      bg: "rgba(251,191,36,0.06)",
      dot: "#fbbf24",
      href: "/espace-client/support",
      priority: 2,
    });
  }

  // Bon rythme d'avis
  if (avis >= 5 && hasKey("nb_avis_google")) {
    actions.push({
      label: `${avis} avis ce mois — continuez !`,
      tip: "Bravo ! 🎉 Vous êtes sur une excellente lancée. Demander un avis après chaque client, c'est votre meilleure pub locale.",
      badge: "Avis ✓",
      color: "text-emerald",
      bg: "rgba(46,230,168,0.05)",
      dot: "#2ee6a8",
      href: "/espace-client/support",
      priority: 9,
    });
  }

  // ── Visibilité ──────────────────────────────────────────────────────────────

  // Vues Google en baisse
  const vuesDiff = pctDiff(vues, prevVues);
  if (vuesDiff !== null && vuesDiff < -20 && hasKey("nb_vues_google")) {
    actions.push({
      label: `Relancer votre visibilité Google`,
      tip: `Vos vues ont baissé de ${Math.abs(vuesDiff)}% — une nouvelle photo sur votre fiche suffit souvent à relancer l'algorithme. Rapide et efficace ! 📸`,
      badge: "Visibilité ↘",
      cta: clientData.googleUrl ? { type: "external" as const, label: "Ouvrir Google Business", value: clientData.googleUrl } : undefined,
      color: "text-amber-400",
      bg: "rgba(251,191,36,0.06)",
      dot: "#fbbf24",
      href: "/espace-client/support",
      priority: 3,
    });
  }

  // Vues Google en forte hausse
  if (vuesDiff !== null && vuesDiff >= 30 && hasKey("nb_vues_google")) {
    actions.push({
      label: `Profiter de votre bon référencement`,
      tip: `Vos vues Google ont bondi de ${vuesDiff}% — vous êtes dans le bon timing pour demander des avis et convertir cette visibilité ! 🚀`,
      badge: "Visibilité ↗",
      color: "text-emerald",
      bg: "rgba(46,230,168,0.05)",
      dot: "#2ee6a8",
      href: "/espace-client/support",
      priority: 8,
    });
  }

  // Beaucoup de vues mais peu de clics (fiche peu attractive)
  if (vues > 200 && clics < vues * 0.04 && hasKey("nb_vues_google")) {
    actions.push({
      label: "Rendre votre fiche Google plus attractive",
      tip: `Vous avez ${vues} vues mais peu de clics — une belle photo suffit souvent à doubler les résultats. Votre fiche mérite de briller ! ✨`,
      badge: "Attractivité",
      cta: clientData.googleUrl ? { type: "external" as const, label: "Ouvrir Google Business", value: clientData.googleUrl } : undefined,
      color: "text-amber-400",
      bg: "rgba(251,191,36,0.06)",
      dot: "#fbbf24",
      href: "/espace-client/support",
      priority: 4,
    });
  }

  // ── Conversions / RDV ───────────────────────────────────────────────────────

  // Aucun RDV ce mois
  if (rdv === 0 && hasKey("nb_rdv")) {
    actions.push({
      label: "Partager votre lien de réservation",
      tip: "Partagez votre lien à vos contacts — c'est souvent le petit geste qui déclenche les premières réservations ! 📅",
      badge: "RDV ⚠",
      cta: clientData.rdvUrl ? { type: "copy" as const, label: "Copier le lien RDV", value: clientData.rdvUrl } : undefined,
      color: "text-[#ff6b6b]",
      bg: "rgba(255,107,107,0.06)",
      dot: "#ff6b6b",
      href: "/espace-client/support",
      priority: 2,
    });
  }

  // RDV en baisse
  if (prevRdv !== null && rdv < prevRdv && rdv > 0) {
    const diff = prevRdv - rdv;
    actions.push({
      label: `Relancer vos réservations`,
      tip: `${diff} RDV de moins — pas de panique, ça fluctue ! Partagez votre lien à vos clients habituels, un rappel suffit souvent. 💡`,
      badge: "RDV ↘",
      cta: clientData.rdvUrl ? { type: "copy" as const, label: "Copier le lien RDV", value: clientData.rdvUrl } : undefined,
      color: "text-amber-400",
      bg: "rgba(251,191,36,0.06)",
      dot: "#fbbf24",
      href: "/espace-client/support",
      priority: 3,
    });
  }

  // RDV en hausse
  const rdvDiff = pctDiff(rdv, prevRdv);
  if (rdvDiff !== null && rdvDiff >= 10) {
    actions.push({
      label: `RDV en hausse de ${rdvDiff}% — continuez !`,
      tip: "Votre système de réservation tourne bien. 🎯 Profitez de cet élan pour demander des avis à vos nouveaux clients.",
      badge: "RDV ↗",
      color: "text-emerald",
      bg: "rgba(46,230,168,0.05)",
      dot: "#2ee6a8",
      href: "/espace-client/support",
      priority: 8,
    });
  }

  // Appels entrants mais aucun RDV → proposer la réservation en ligne
  if (appels > 5 && rdv === 0 && hasKey("nb_appels")) {
    actions.push({
      label: `Convertir vos appels en réservations en ligne`,
      tip: `${appels} appels reçus, c'est bien ! Imaginez si la moitié réservait directement en ligne — partagez votre lien RDV et gagnez du temps. ⏱️`,
      badge: "Opportunité",
      cta: clientData.rdvUrl ? { type: "copy" as const, label: "Copier le lien RDV", value: clientData.rdvUrl } : undefined,
      color: "text-violet",
      bg: "rgba(124,92,255,0.06)",
      dot: "#7c5cff",
      href: "/espace-client/support",
      priority: 4,
    });
  }

  // ── Chatbot / Demandes ──────────────────────────────────────────────────────

  // Aucune demande reçue
  if (demandes === 0 && hasKey("nb_demandes")) {
    actions.push({
      label: "Partager votre site sur vos réseaux",
      tip: "Pas encore de demande ce mois — un simple post sur vos réseaux suffit souvent à générer les premiers contacts ! 📣",
      badge: "Contact ⚠",
      color: "text-[#ff6b6b]",
      bg: "rgba(255,107,107,0.06)",
      dot: "#ff6b6b",
      href: "/espace-client/support",
      priority: 2,
    });
  }

  // Fort trafic chatbot sans conversion
  if (chatbot > 10 && demandes < 3 && hasKey("nb_sessions_chatbot")) {
    actions.push({
      label: `Améliorer la conversion de votre site`,
      tip: `${chatbot} visiteurs curieux mais peu de conversions — vos horaires, prix et services sont peut-être à compléter en ligne. 🔧`,
      badge: "Conversion",
      color: "text-amber-400",
      bg: "rgba(251,191,36,0.06)",
      dot: "#fbbf24",
      href: "/espace-client/support",
      priority: 4,
    });
  }

  // Chatbot en forte baisse
  const chatDiff = pctDiff(chatbot, prevChat);
  if (chatDiff !== null && chatDiff < -30 && hasKey("nb_sessions_chatbot")) {
    actions.push({
      label: `Donner plus de visibilité à votre site`,
      tip: `Le trafic a baissé de ${Math.abs(chatDiff)}% — partagez votre site sur vos réseaux, chaque partage compte ! 📲`,
      badge: "Chatbot",
      color: "text-amber-400",
      bg: "rgba(251,191,36,0.06)",
      dot: "#fbbf24",
      href: "/espace-client/support",
      priority: 5,
    });
  }

  // Demandes en forte hausse
  const demDiff = pctDiff(demandes, prevDem);
  if (demDiff !== null && demDiff >= 20) {
    actions.push({
      label: `+${demDiff}% de demandes — répondez vite !`,
      tip: "Vous êtes en plein élan ! 🔥 Les clients qui reçoivent une réponse rapide convertissent 3x plus — ne laissez pas refroidir.",
      badge: "Demandes ↗",
      cta: { type: "external" as const, label: "Voir les demandes", value: "/espace-client/support" },
      color: "text-emerald",
      bg: "rgba(46,230,168,0.05)",
      dot: "#2ee6a8",
      href: "/espace-client/support",
      priority: 7,
    });
  }

  // ── Fallback ─────────────────────────────────────────────────────────────────
  if (actions.filter(a => a.priority < 7).length === 0) {
    actions.push({
      label: "Demander un avis à vos derniers clients",
      tip: "Tout est au vert — excellent travail ! 🌟 Un avis Google demandé à vos derniers clients, c'est le meilleur investissement de 30 secondes.",
      badge: "Excellent ✓",
      get cta() {
        const msg = `Bonjour ! Merci pour votre confiance 🙏 Si vous avez un instant, un avis Google nous aide énormément : ${clientData.googleUrl ?? "[lien Google Business]"}`;
        return { type: "copy" as const, label: "Copier le message", value: msg };
      },
      color: "text-emerald",
      bg: "rgba(46,230,168,0.06)",
      dot: "#2ee6a8",
      href: "/espace-client/support",
      priority: 10,
    });
  }

  return actions.sort((a, b) => a.priority - b.priority).slice(0, 6);
}

function StatCard({
  label, value, pct, up, noData,
}: {
  label: string; value: string; pct: number | null; up: boolean; noData?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] p-5" style={{ background: "rgba(26,26,29,0.6)" }}>
      <p className="text-xs font-medium text-mut-2 uppercase tracking-wider">{label}</p>
      <p className="font-display text-3xl font-semibold text-ink leading-none">{value}</p>
      {!noData && pct !== null ? (
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-bold ${up ? "text-emerald" : "text-[#ff6b6b]"}`}>
            {up ? "▲" : "▼"} {Math.abs(pct)}%
          </span>
          <span className="text-[11px] text-mut-2">vs mois préc.</span>
        </div>
      ) : !noData && pct === null ? (
        <span className="text-[11px] text-mut-2">Pas de données N–1</span>
      ) : null}
    </div>
  );
}

export default async function TableauDeBordPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const { data: client } = await supabase
    .from("clients")
    .select("id_client, contact_first_name, business_name, google_business_url, business_website_url")
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
  const prevMonthLabel = prevDate.toLocaleDateString("fr-FR", { month: "long" });

  const clientData = {
    googleUrl:    (client as Record<string,unknown> | null)?.google_business_url as string | null ?? null,
    siteUrl:      (client as Record<string,unknown> | null)?.business_website_url as string | null ?? null,
    businessName: (client as Record<string,unknown> | null)?.business_name as string | null ?? null,
    rdvUrl:       "/prise-de-rdv", // lien de RDV global — à personnaliser par client si nécessaire
  };

  const actions = buildActions(current, prev, config, paymentPending, clientData);

  return (
    <div className="grid gap-5">

      {/* ── MÉTRIQUES ── */}
      <div className="surface-card rounded-[28px] p-7 sm:p-9">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="eyebrow-grad text-xs font-semibold uppercase tracking-widest mb-1">Tableau de bord</p>
            <h1 className="font-display text-2xl font-semibold text-ink">{config.dashboardTitle}</h1>
            {service?.offres?.nom_offre && (
              <p className="mt-1 text-sm text-mut-2">Offre : <span className="text-mut">{service.offres.nom_offre}</span></p>
            )}
          </div>
          <span className="flex-shrink-0 rounded-full border border-emerald/40 px-3 py-1 text-xs font-bold capitalize text-emerald" style={{ background: "rgba(46,230,168,0.1)" }}>
            {monthLabel}
          </span>
        </div>

        <div className="mt-5 h-px bg-white/[0.07]" />

        {hasData && current ? (
          <div className={`mt-6 grid gap-3 ${config.cards.length <= 3 ? "grid-cols-1 sm:grid-cols-3" : config.cards.length <= 4 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
            {config.cards.map((card) => {
              const curr = getValue(current, card.key);
              const prv = prev ? getValue(prev, card.key) : null;
              const pct = card.key === "note_google" ? null : pctDiff(curr, prv);
              const up = curr != null && prv != null ? curr >= prv : true;
              return (
                <StatCard
                  key={card.key}
                  label={card.altLabel ?? card.label}
                  value={formatValue(card.key, curr)}
                  pct={pct}
                  up={up}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/[0.07] p-8 text-center" style={{ background: "rgba(26,26,29,0.5)" }}>
            <p className="text-3xl mb-3">📊</p>
            <p className="text-sm leading-7 text-mut">
              Vos indicateurs de performance apparaîtront ici chaque mois.<br />
              OptimalLogic met à jour ces données après chaque rapport mensuel.
            </p>
            <Link href="/espace-client/support" className="mt-4 inline-block rounded-full border border-white/[0.13] px-4 py-2 text-xs font-semibold text-mut transition hover:border-white/30 hover:text-ink">
              Contacter mon conseiller
            </Link>
          </div>
        )}
      </div>

      {/* ── ACTIONS RECOMMANDÉES ── */}
      <div className="surface-card rounded-[28px] p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-base font-bold text-ink">Actions recommandées</p>
          <p className="text-xs text-mut-2">{now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
        <div className="grid gap-2">
          {actions.map((action, i) => (
            <div
              key={i}
              className="rounded-xl px-4 py-3.5"
              style={{ background: action.bg }}
            >
              <div className="flex items-start gap-3">
                <span className="mt-[5px] h-2 w-2 flex-shrink-0 rounded-full" style={{ background: action.dot }} />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-ink">{action.label}</span>
                  <span className="block text-xs text-mut leading-relaxed mt-0.5">{action.tip}</span>
                </span>
                <span className={`flex-shrink-0 mt-0.5 text-[11px] font-bold ${action.color}`}>{action.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COMPARAISON MOIS PRÉCÉDENT ── */}
      {hasData && current && (
        <div className="surface-card rounded-[28px] p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-base font-bold text-ink">Comparaison mensuelle</p>
            <div className="flex items-center gap-4 text-xs text-mut-2">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                {prevMonthLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--grad)" }} />
                Ce mois
              </span>
            </div>
          </div>

          <div className="grid gap-5">
            {config.comparisonKeys.map((key) => {
              const card = config.cards.find(c => c.key === key);
              const label = card?.altLabel ?? card?.label ?? key;
              const currVal = getValue(current, key) ?? 0;
              const prvVal = prev ? (getValue(prev, key) ?? 0) : null;
              const max = Math.max(currVal, prvVal ?? 0, 1);
              const pct = prvVal !== null ? pctDiff(currVal, prvVal) : null;
              const up = prvVal !== null ? currVal >= prvVal : true;

              return (
                <div key={key} className="rounded-xl border border-white/[0.06] p-4" style={{ background: "rgba(26,26,29,0.4)" }}>
                  <div className="mb-3 flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-sm font-medium text-mut">{label}</p>
                    <div className="flex items-center gap-3">
                      {prvVal !== null && (
                        <span className="text-xs text-mut-2">{formatValue(key, prvVal)}</span>
                      )}
                      <span className="text-sm font-bold text-ink">{formatValue(key, currVal)}</span>
                      {pct !== null && (
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${up ? "text-emerald" : "text-[#ff6b6b]"}`}
                          style={{ background: up ? "rgba(46,230,168,0.12)" : "rgba(255,107,107,0.1)" }}>
                          {up ? "▲" : "▼"} {Math.abs(pct)}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Barres côte à côte */}
                  <div className="flex items-end gap-2 h-10">
                    {/* Mois précédent */}
                    <div className="flex-1 flex flex-col justify-end">
                      <div
                        className="w-full rounded-t-md transition-all"
                        style={{
                          height: `${prvVal !== null ? Math.max(Math.round((prvVal / max) * 36), 4) : 0}px`,
                          background: "rgba(255,255,255,0.15)",
                        }}
                      />
                    </div>
                    {/* Mois actuel */}
                    <div className="flex-1 flex flex-col justify-end">
                      <div
                        className="w-full rounded-t-md transition-all"
                        style={{
                          height: `${Math.max(Math.round((currVal / max) * 36), currVal > 0 ? 4 : 0)}px`,
                          background: up ? "var(--grad)" : "#ff6b6b",
                        }}
                      />
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
