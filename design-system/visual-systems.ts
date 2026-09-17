export const visualSystemFamilies = [
  { id: "diagram", label: "Diagrammes", count: 6 },
  { id: "flow", label: "Flux", count: 6 },
  { id: "interface", label: "Interfaces illustratives", count: 6 },
  { id: "chart", label: "Graphiques narratifs", count: 6 },
  { id: "transformation", label: "Transformations avant/après", count: 6 },
] as const;

export type VisualSystemFamily = (typeof visualSystemFamilies)[number]["id"];

export type VisualSystemVariant = {
  id: string;
  family: VisualSystemFamily;
  label: string;
  purpose: string;
  density: "light" | "balanced" | "detailed";
  accessibilityLabel: string;
};

const definitions: Array<
  [VisualSystemFamily, string, string, string, VisualSystemVariant["density"]]
> = [
  [
    "diagram",
    "radial",
    "Écosystème radial",
    "Relier une proposition centrale à ses capacités",
    "balanced",
  ],
  [
    "diagram",
    "hierarchy",
    "Hiérarchie progressive",
    "Présenter des niveaux de décision",
    "light",
  ],
  [
    "diagram",
    "matrix",
    "Matrice de capacités",
    "Comparer des axes complémentaires",
    "detailed",
  ],
  [
    "diagram",
    "ecosystem",
    "Constellation de services",
    "Montrer des relations non linéaires",
    "balanced",
  ],
  [
    "diagram",
    "layers",
    "Architecture en couches",
    "Expliquer un système composé",
    "detailed",
  ],
  ["diagram", "roadmap", "Feuille de route", "Rendre une progression lisible", "light"],
  ["flow", "linear", "Flux linéaire", "Décomposer un traitement séquentiel", "light"],
  [
    "flow",
    "branching",
    "Flux à embranchements",
    "Présenter plusieurs décisions possibles",
    "detailed",
  ],
  [
    "flow",
    "convergence",
    "Convergence qualifiée",
    "Réunir plusieurs signaux vers une décision",
    "balanced",
  ],
  ["flow", "loop", "Boucle d’amélioration", "Illustrer un suivi continu", "balanced"],
  [
    "flow",
    "pipeline",
    "Pipeline opérationnel",
    "Montrer le passage entre plusieurs traitements",
    "detailed",
  ],
  [
    "flow",
    "handoff",
    "Passage de relais",
    "Clarifier une transmission entre acteurs",
    "light",
  ],
  [
    "interface",
    "dashboard",
    "Pilotage synthétique",
    "Illustrer un espace client central",
    "balanced",
  ],
  [
    "interface",
    "inbox",
    "Boîte de demandes",
    "Présenter une file de conversations",
    "detailed",
  ],
  [
    "interface",
    "calendar",
    "Agenda illustratif",
    "Montrer une organisation de rendez-vous",
    "balanced",
  ],
  [
    "interface",
    "workspace",
    "Espace de travail",
    "Réunir tâches, contexte et actions",
    "detailed",
  ],
  [
    "interface",
    "analytics",
    "Lecture d’activité",
    "Hiérarchiser des indicateurs fictifs",
    "balanced",
  ],
  [
    "interface",
    "profile",
    "Configuration client",
    "Illustrer des préférences et autorisations",
    "light",
  ],
  ["chart", "bars", "Barres commentées", "Comparer des catégories fictives", "light"],
  [
    "chart",
    "line",
    "Courbe guidée",
    "Raconter une évolution sans promesse chiffrée",
    "balanced",
  ],
  [
    "chart",
    "area",
    "Tendance par zones",
    "Comparer deux dynamiques fictives",
    "detailed",
  ],
  [
    "chart",
    "donut",
    "Répartition annotée",
    "Expliquer la composition d’un ensemble",
    "balanced",
  ],
  [
    "chart",
    "timeline",
    "Chronologie narrative",
    "Associer événements et explications",
    "light",
  ],
  [
    "chart",
    "comparison",
    "Comparaison indexée",
    "Opposer deux états de référence",
    "detailed",
  ],
  [
    "transformation",
    "split",
    "Séparation franche",
    "Comparer directement deux états",
    "light",
  ],
  [
    "transformation",
    "slider",
    "Révélation progressive",
    "Faire apparaître une organisation améliorée",
    "balanced",
  ],
  [
    "transformation",
    "morph",
    "Transformation centrale",
    "Montrer un signal rendu exploitable",
    "balanced",
  ],
  [
    "transformation",
    "journey",
    "Parcours transformé",
    "Comparer deux cheminements",
    "detailed",
  ],
  [
    "transformation",
    "layers",
    "Couches réorganisées",
    "Rendre visible une simplification structurelle",
    "detailed",
  ],
  [
    "transformation",
    "metrics",
    "Repères comparés",
    "Présenter des changements qualitatifs",
    "light",
  ],
];

export const visualSystemVariants: VisualSystemVariant[] = definitions.map(
  ([family, slug, label, purpose, density]) => ({
    id: `${family}-${slug}`,
    family,
    label,
    purpose,
    density,
    accessibilityLabel: `${label}. ${purpose}. Données de démonstration fictives.`,
  }),
);

export function getVisualSystemVariant(id: string) {
  return (
    visualSystemVariants.find((variant) => variant.id === id) ?? visualSystemVariants[0]
  );
}
