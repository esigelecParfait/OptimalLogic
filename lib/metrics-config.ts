export type MetricKey =
  | "nb_rdv"
  | "nb_demandes"
  | "nb_appels"
  | "nb_avis_google"
  | "note_google"
  | "nb_vues_google"
  | "nb_clics_google"
  | "nb_sessions_chatbot";

export type MetricCard = {
  key: MetricKey;
  label: string;
  // label alternatif selon le contexte (ex: "Inscriptions" au lieu de "Demandes")
  altLabel?: string;
};

export type OfferMetricsConfig = {
  dashboardTitle: string;
  cards: MetricCard[];
  comparisonKeys: MetricKey[];
};

const METRICS_BY_OFFER: Record<string, OfferMetricsConfig> = {
  // ── Commerce local ───────────────────────────────────────────────
  commerce_intelligent: {
    dashboardTitle: "Présence & visibilité locale",
    cards: [
      { key: "nb_vues_google",      label: "Vues Google Business" },
      { key: "nb_avis_google",      label: "Nouveaux avis Google" },
      { key: "note_google",         label: "Note Google actuelle" },
      { key: "nb_sessions_chatbot", label: "Conversations chatbot" },
    ],
    comparisonKeys: ["nb_vues_google", "nb_avis_google", "nb_sessions_chatbot"],
  },

  commerce_premium: {
    dashboardTitle: "Performance commerciale",
    cards: [
      { key: "nb_demandes",         label: "Nouvelles demandes clients" },
      { key: "nb_rdv",              label: "RDV confirmés" },
      { key: "nb_appels",           label: "Appels entrants" },
      { key: "nb_vues_google",      label: "Vues Google Business" },
      { key: "nb_avis_google",      label: "Nouveaux avis Google" },
      { key: "nb_sessions_chatbot", label: "Conversations chatbot" },
    ],
    comparisonKeys: ["nb_demandes", "nb_rdv", "nb_vues_google", "nb_avis_google"],
  },

  // ── TPE / PME ────────────────────────────────────────────────────
  presence_pro: {
    dashboardTitle: "Visibilité en ligne",
    cards: [
      { key: "nb_vues_google",      label: "Vues du site / fiche Google" },
      { key: "nb_demandes",         label: "Formulaires de contact reçus" },
      { key: "nb_sessions_chatbot", label: "Sessions chatbot" },
      { key: "nb_avis_google",      label: "Nouveaux avis Google" },
    ],
    comparisonKeys: ["nb_vues_google", "nb_demandes", "nb_sessions_chatbot"],
  },

  croissance: {
    dashboardTitle: "Génération de prospects",
    cards: [
      { key: "nb_demandes",         label: "Prospects qualifiés" },
      { key: "nb_rdv",              label: "RDV en ligne générés" },
      { key: "nb_sessions_chatbot", label: "Sessions chatbot" },
      { key: "nb_vues_google",      label: "Vues Google / site" },
      { key: "nb_avis_google",      label: "Nouveaux avis Google" },
    ],
    comparisonKeys: ["nb_demandes", "nb_rdv", "nb_sessions_chatbot", "nb_vues_google"],
  },

  performance: {
    dashboardTitle: "Performance & conversion",
    cards: [
      { key: "nb_demandes",         label: "Nouveaux prospects" },
      { key: "nb_rdv",              label: "RDV convertis" },
      { key: "nb_appels",           label: "Appels entrants" },
      { key: "nb_sessions_chatbot", label: "Sessions chatbot" },
      { key: "nb_vues_google",      label: "Vues Google / site" },
      { key: "nb_avis_google",      label: "Nouveaux avis Google" },
    ],
    comparisonKeys: ["nb_demandes", "nb_rdv", "nb_appels", "nb_vues_google"],
  },

  // ── Startup ──────────────────────────────────────────────────────
  startup_validation: {
    dashboardTitle: "Traction & validation",
    cards: [
      { key: "nb_demandes",         label: "Inscriptions waitlist", altLabel: "Inscriptions" },
      { key: "nb_vues_google",      label: "Vues de la landing page" },
      { key: "nb_sessions_chatbot", label: "Interactions chatbot" },
    ],
    comparisonKeys: ["nb_demandes", "nb_vues_google", "nb_sessions_chatbot"],
  },

  startup_launch: {
    dashboardTitle: "Acquisition & démos",
    cards: [
      { key: "nb_rdv",              label: "Démos planifiées" },
      { key: "nb_demandes",         label: "Prospects pipeline" },
      { key: "nb_sessions_chatbot", label: "Leads chatbot" },
      { key: "nb_vues_google",      label: "Vues du site" },
    ],
    comparisonKeys: ["nb_rdv", "nb_demandes", "nb_sessions_chatbot", "nb_vues_google"],
  },

  startup_growth: {
    dashboardTitle: "Croissance & conversions",
    cards: [
      { key: "nb_rdv",              label: "Conversions (démos → clients)" },
      { key: "nb_demandes",         label: "Nouveaux prospects" },
      { key: "nb_appels",           label: "Appels commerciaux" },
      { key: "nb_sessions_chatbot", label: "Sessions chatbot" },
      { key: "nb_vues_google",      label: "Vues du site" },
      { key: "nb_avis_google",      label: "Avis / témoignages" },
    ],
    comparisonKeys: ["nb_rdv", "nb_demandes", "nb_vues_google", "nb_sessions_chatbot"],
  },
};

// Fallback si l'offre n'est pas reconnue
const DEFAULT_CONFIG: OfferMetricsConfig = {
  dashboardTitle: "Performance digitale",
  cards: [
    { key: "nb_demandes",         label: "Nouvelles demandes" },
    { key: "nb_rdv",              label: "RDV générés" },
    { key: "nb_vues_google",      label: "Vues Google" },
    { key: "nb_sessions_chatbot", label: "Sessions chatbot" },
  ],
  comparisonKeys: ["nb_demandes", "nb_rdv", "nb_vues_google"],
};

export function getMetricsConfig(offerCode: string | null | undefined): OfferMetricsConfig {
  if (!offerCode) return DEFAULT_CONFIG;
  return METRICS_BY_OFFER[offerCode.toLowerCase()] ?? DEFAULT_CONFIG;
}
