export const motionTokens = {
  duration: { instant: 0.12, fast: 0.2, base: 0.42, slow: 0.72, narrative: 1.1 },
  distance: { small: 8, medium: 20, large: 48 },
  easing: { standard: [0.22, 1, 0.36, 1], emphasized: [0.16, 1, 0.3, 1] },
  stagger: { tight: 0.04, base: 0.08, relaxed: 0.14, maximumItems: 5 },
} as const;

export type MotionFamily = "micro" | "typography" | "svg" | "scroll" | "css3d" | "webgl";
export type MotionPreset = {
  id: string;
  label: string;
  family: MotionFamily;
  intensity: "subtle" | "balanced" | "strong";
  cost: "css" | "svg" | "webgl";
};

export const motionPresets: MotionPreset[] = [
  ...[
    ["micro-lift", "Élévation"],
    ["micro-press", "Pression"],
    ["micro-magnetic", "Attraction"],
    ["micro-border", "Contour"],
    ["micro-fill", "Remplissage"],
    ["micro-icon", "Icône directionnelle"],
    ["micro-focus", "Focus amplifié"],
    ["micro-success", "Confirmation"],
  ].map(([id, label], index) => ({
    id,
    label,
    family: "micro" as const,
    intensity: index > 5 ? ("balanced" as const) : ("subtle" as const),
    cost: "css" as const,
  })),
  ...[
    ["type-mask", "Masque vertical"],
    ["type-lines", "Cascade de lignes"],
    ["type-words", "Décalage de mots"],
    ["type-focus", "Mise au point"],
    ["type-weight", "Accent de poids"],
    ["type-counter", "Compteur éditorial"],
  ].map(([id, label], index) => ({
    id,
    label,
    family: "typography" as const,
    intensity: index === 2 ? ("strong" as const) : ("balanced" as const),
    cost: "css" as const,
  })),
  ...[
    ["svg-draw", "Tracé progressif"],
    ["svg-flow", "Flux de signal"],
    ["svg-orbit", "Orbite"],
    ["svg-converge", "Convergence"],
    ["svg-pulse", "Impulsion"],
    ["svg-route", "Itinéraire"],
  ].map(([id, label], index) => ({
    id,
    label,
    family: "svg" as const,
    intensity: index === 3 ? ("strong" as const) : ("balanced" as const),
    cost: "svg" as const,
  })),
  ...[
    ["scroll-reveal", "Révélation"],
    ["scroll-stagger", "Stagger limité"],
    ["scroll-progress", "Progression"],
    ["scroll-sticky", "Relais sticky"],
    ["scroll-depth", "Profondeur"],
    ["scroll-sequence", "Séquence narrative"],
  ].map(([id, label], index) => ({
    id,
    label,
    family: "scroll" as const,
    intensity: index > 3 ? ("strong" as const) : ("balanced" as const),
    cost: "css" as const,
  })),
  ...[
    ["css3d-tilt", "Carte inclinée"],
    ["css3d-layers", "Plans superposés"],
    ["css3d-carousel", "Carrousel spatial"],
    ["css3d-fold", "Pli éditorial"],
  ].map(([id, label], index) => ({
    id,
    label,
    family: "css3d" as const,
    intensity: index > 1 ? ("strong" as const) : ("balanced" as const),
    cost: "css" as const,
  })),
  ...[
    ["webgl-orbit", "Système orbital"],
    ["webgl-network", "Réseau de signaux"],
    ["webgl-stack", "Architecture modulaire"],
    ["webgl-wave", "Onde de données"],
  ].map(([id, label]) => ({
    id,
    label,
    family: "webgl" as const,
    intensity: "strong" as const,
    cost: "webgl" as const,
  })),
];

export const motionFamilies: { id: MotionFamily; label: string; count: number }[] = [
  { id: "micro", label: "Micro-interactions", count: 8 },
  { id: "typography", label: "Typographie", count: 6 },
  { id: "svg", label: "Trajectoires SVG", count: 6 },
  { id: "scroll", label: "Défilement", count: 6 },
  { id: "css3d", label: "3D CSS", count: 4 },
  { id: "webgl", label: "3D WebGL", count: 4 },
];

export function getMotionPreset(id: string) {
  return motionPresets.find((preset) => preset.id === id) ?? motionPresets[0];
}
