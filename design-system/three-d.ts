export const threeDFamilies = [
  { id: "perspective", label: "Perspectives CSS", count: 6, cost: "light" },
  { id: "depth", label: "Panneaux en profondeur", count: 6, cost: "balanced" },
  { id: "webgl", label: "Scènes WebGL", count: 6, cost: "strong" },
] as const;

export type ThreeDFamily = (typeof threeDFamilies)[number]["id"];

export type ThreeDVariant = {
  id: string;
  family: ThreeDFamily;
  label: string;
  purpose: string;
  cost: "light" | "balanced" | "strong";
  fallback: string;
};

export const threeDVariants: ThreeDVariant[] = [
  ["perspective-tilt", "Carte inclinée", "Mettre en valeur une promesse"],
  ["perspective-stack", "Pile éclatée", "Présenter plusieurs capacités"],
  ["perspective-grid", "Grille fuyante", "Structurer un catalogue"],
  ["perspective-tunnel", "Tunnel d’interface", "Matérialiser une progression"],
  ["perspective-float", "Panneau flottant", "Isoler une information clé"],
  ["perspective-orbit", "Orbite CSS", "Relier une offre à ses bénéfices"],
].map(([id, label, purpose]) => ({
  id,
  family: "perspective",
  label,
  purpose,
  cost: "light",
  fallback: `Composition statique — ${label.toLowerCase()}`,
}));

threeDVariants.push(
  ...[
    ["depth-layers", "Interface multicouche", "Expliquer la structure d’un service"],
    ["depth-dashboard", "Tableau de bord spatial", "Présenter une interface privée"],
    ["depth-satellites", "Panneau et satellites", "Relier un centre à ses signaux"],
    ["depth-reveal", "Cartes révélées", "Dérouler des étapes successives"],
    ["depth-gallery", "Galerie profonde", "Hiérarchiser des réalisations"],
    ["depth-journey", "Parcours en plans", "Montrer une transformation client"],
  ].map(([id, label, purpose]) => ({
    id,
    family: "depth" as const,
    label,
    purpose,
    cost: "balanced" as const,
    fallback: `Plans aplatis — ${label.toLowerCase()}`,
  })),
  ...[
    ["webgl-network", "Réseau de nœuds", "Visualiser des connexions qualifiées"],
    ["webgl-flow", "Flux de données", "Transformer un signal en décision"],
    ["webgl-rings", "Anneaux orbitaux", "Présenter un système coordonné"],
    ["webgl-object", "Objet réactif", "Créer un emblème abstrait de marque"],
    [
      "webgl-architecture",
      "Architecture spatiale",
      "Composer des services en profondeur",
    ],
    ["webgl-particles", "Constellation structurée", "Représenter des données organisées"],
  ].map(([id, label, purpose]) => ({
    id,
    family: "webgl" as const,
    label,
    purpose,
    cost: "strong" as const,
    fallback: `Diagramme statique — ${label.toLowerCase()}`,
  })),
);

export function getThreeDVariant(id: string) {
  return threeDVariants.find((variant) => variant.id === id) ?? threeDVariants[0];
}
