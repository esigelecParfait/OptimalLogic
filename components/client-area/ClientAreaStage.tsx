import { getClientAreaVariant, type ClientAreaState } from "@/design-system/client-area";

import styles from "./client-area.module.css";

type Props = { variantId: string; state: ClientAreaState };

const content = {
  dashboard: {
    title: "Vue d’ensemble",
    intro: "Retrouvez l’essentiel de votre activité.",
    action: "Voir l’activité",
    metrics: [
      ["Demandes ouvertes", "8"],
      ["Rendez-vous", "3"],
      ["Documents", "12"],
    ],
    rows: ["Demande de rappel", "Rendez-vous confirmé", "Document ajouté"],
  },
  profile: {
    title: "Mon profil",
    intro: "Coordonnées, entreprise et préférences.",
    action: "Modifier le profil",
    metrics: [
      ["Profil complété", "80 %"],
      ["Membres", "4"],
      ["Accès", "Client"],
    ],
    rows: ["Informations personnelles", "Coordonnées de l’entreprise", "Préférences"],
  },
  requests: {
    title: "Mes demandes",
    intro: "Suivez chaque demande et sa prochaine étape.",
    action: "Nouvelle demande",
    metrics: [
      ["Ouvertes", "8"],
      ["En cours", "5"],
      ["Terminées", "24"],
    ],
    rows: ["Mise à jour du site", "Question sur une offre", "Ajout d’un utilisateur"],
  },
  appointments: {
    title: "Mes rendez-vous",
    intro: "Préparez vos prochains échanges.",
    action: "Planifier",
    metrics: [
      ["À venir", "3"],
      ["Cette semaine", "2"],
      ["Terminés", "18"],
    ],
    rows: ["Point de lancement · 09:30", "Suivi mensuel · 14:00", "Bilan · Vendredi"],
  },
  documents: {
    title: "Mes documents",
    intro: "Accédez aux fichiers partagés avec votre équipe.",
    action: "Ajouter un document",
    metrics: [
      ["Fichiers", "12"],
      ["Partagés", "7"],
      ["Récents", "3"],
    ],
    rows: ["Compte rendu.pdf", "Brief projet.docx", "Planning.xlsx"],
  },
  support: {
    title: "Centre de support",
    intro: "Obtenez une réponse et suivez vos échanges.",
    action: "Contacter le support",
    metrics: [
      ["Ouverts", "1"],
      ["Réponse moyenne", "2 h"],
      ["Résolus", "9"],
    ],
    rows: ["Configurer mon espace", "Comprendre une facture", "Gérer les accès"],
  },
} as const;

export function ClientAreaStage({ variantId, state }: Props) {
  const variant = getClientAreaVariant(variantId);
  const copy = content[variant.family];
  const stateMessages: Partial<Record<ClientAreaState, string>> = {
    empty: "Aucun élément à afficher pour le moment.",
    partial: "Certaines informations sont temporairement indisponibles.",
    error: "Impossible de charger ce module. Réessayez plus tard.",
    restricted: "Votre rôle ne permet pas d’accéder à cette information.",
    success: "Votre action a bien été prise en compte.",
  };
  const message = stateMessages[state];

  return (
    <article
      className={styles.stage}
      data-client-variant={variant.id}
      data-layout={variant.layout}
      data-state={state}
      aria-busy={state === "loading"}
    >
      <header className={styles.heading}>
        <div>
          <span>{variant.label}</span>
          <h2>{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>
        <button type="button" disabled={state === "loading" || state === "restricted"}>
          {copy.action}
        </button>
      </header>
      {message && (
        <p className={styles.notice} role={state === "error" ? "alert" : "status"}>
          {message}
        </p>
      )}
      {state === "loading" ? (
        <div className={styles.skeletons} aria-label="Chargement du module">
          <i />
          <i />
          <i />
        </div>
      ) : state === "empty" ? (
        <div className={styles.empty}>
          <strong>Votre espace est prêt.</strong>
          <span>Les prochains éléments apparaîtront ici.</span>
        </div>
      ) : (
        <div className={styles.workspace}>
          <section className={styles.metrics} aria-label="Indicateurs fictifs">
            {copy.metrics.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </section>
          <section className={styles.list} aria-label="Activité fictive">
            <header>
              <strong>Activité récente</strong>
              <span>Données de démonstration</span>
            </header>
            {copy.rows.map((row, index) => (
              <div key={row}>
                <span className={styles.marker}>{index + 1}</span>
                <strong>{row}</strong>
                <small>{index === 0 ? "À traiter" : "Mis à jour"}</small>
              </div>
            ))}
          </section>
          <aside className={styles.detail}>
            <span>Prochaine étape</span>
            <strong>{copy.rows[0]}</strong>
            <p>Un aperçu contextuel facilite la décision sans quitter la page.</p>
            <button type="button">Ouvrir le détail</button>
          </aside>
        </div>
      )}
      <footer>Démonstration fictive · aucune donnée client réelle</footer>
    </article>
  );
}
