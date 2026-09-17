import type { ThemeId } from "./themes";

export type DemoRecipe = {
  slug: string;
  theme: ThemeId;
  category: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  hero: "split" | "centered" | "editorial" | "immersive";
  services: "grid" | "editorial" | "featured";
  proof: "metrics" | "quote" | "logos";
  motion: string;
  depth: string;
  visualSystem: string;
  authVariant: string;
  clientVariant: string;
  clientNavigation: string;
};

export const demoRecipes: DemoRecipe[] = [
  {
    slug: "conseil-editorial",
    theme: "editorial",
    category: "Cabinet de conseil fictif",
    name: "Perspective Conseil",
    eyebrow: "Décider avec méthode",
    headline: "Transformer une situation complexe en décision claire.",
    summary:
      "Une démonstration éditoriale centrée sur l’expertise, la méthode et la lisibilité.",
    hero: "editorial",
    services: "editorial",
    proof: "quote",
    motion: "type-lines",
    depth: "perspective-float",
    visualSystem: "diagram-radial",
    authVariant: "sign-in-centered",
    clientVariant: "dashboard-activity",
    clientNavigation: "contextual",
  },
  {
    slug: "saas-technology",
    theme: "technology",
    category: "Produit SaaS fictif",
    name: "Signal Flow",
    eyebrow: "Du signal à l’action",
    headline: "Une interface qui rend chaque prochaine étape évidente.",
    summary:
      "Une démonstration technologique associant flux, interfaces et mouvement fonctionnel.",
    hero: "immersive",
    services: "featured",
    proof: "metrics",
    motion: "svg-flow",
    depth: "webgl-network",
    visualSystem: "flow-pipeline",
    authVariant: "sign-in-portal",
    clientVariant: "requests-workspace",
    clientNavigation: "hybrid",
  },
  {
    slug: "services-professional",
    theme: "professional",
    category: "Services B2B fictifs",
    name: "Axe Partenaires",
    eyebrow: "Avancer sans dispersion",
    headline: "Un accompagnement structuré autour de vos priorités.",
    summary:
      "Une démonstration directe, rassurante et conçue pour faciliter la conversion.",
    hero: "split",
    services: "grid",
    proof: "logos",
    motion: "scroll-stagger",
    depth: "depth-layers",
    visualSystem: "interface-dashboard",
    authVariant: "sign-in-split",
    clientVariant: "dashboard-overview",
    clientNavigation: "sidebar",
  },
  {
    slug: "marque-luxury",
    theme: "luxury",
    category: "Marque haut de gamme fictive",
    name: "Maison Nacre",
    eyebrow: "Le détail comme signature",
    headline: "Une présence mesurée, pensée pour laisser une impression durable.",
    summary:
      "Une démonstration minimaliste portée par la typographie, le rythme et la profondeur.",
    hero: "centered",
    services: "editorial",
    proof: "quote",
    motion: "scroll-reveal",
    depth: "depth-gallery",
    visualSystem: "transformation-slider",
    authVariant: "sign-in-floating",
    clientVariant: "documents-focused",
    clientNavigation: "contextual",
  },
  {
    slug: "studio-creative",
    theme: "creative",
    category: "Studio créatif fictif",
    name: "Forme Libre",
    eyebrow: "Créer un écart mémorable",
    headline: "Des idées fortes, construites pour prendre forme.",
    summary: "Une démonstration expressive où asymétrie et mouvement servent le récit.",
    hero: "immersive",
    services: "featured",
    proof: "logos",
    motion: "type-words",
    depth: "webgl-object",
    visualSystem: "transformation-split",
    authVariant: "sign-in-immersive",
    clientVariant: "profile-split",
    clientNavigation: "topbar",
  },
  {
    slug: "entreprise-organic",
    theme: "organic",
    category: "Entreprise responsable fictive",
    name: "Cycle Commun",
    eyebrow: "Progresser avec cohérence",
    headline: "Une démarche lisible, de l’intention aux résultats.",
    summary:
      "Une démonstration chaleureuse fondée sur la continuité, la proximité et les étapes.",
    hero: "split",
    services: "grid",
    proof: "metrics",
    motion: "svg-route",
    depth: "depth-journey",
    visualSystem: "flow-loop",
    authVariant: "sign-in-guided",
    clientVariant: "appointments-timeline",
    clientNavigation: "mobile-first",
  },
  {
    slug: "service-industrial",
    theme: "industrial",
    category: "Service industriel fictif",
    name: "Précision Industrie",
    eyebrow: "Maîtriser chaque intervention",
    headline: "Des opérations suivies, documentées et prévisibles.",
    summary:
      "Une démonstration robuste centrée sur les processus, les délais et le pilotage.",
    hero: "editorial",
    services: "featured",
    proof: "metrics",
    motion: "scroll-progress",
    depth: "depth-dashboard",
    visualSystem: "diagram-layers",
    authVariant: "sign-in-portal",
    clientVariant: "requests-timeline",
    clientNavigation: "compact",
  },
  {
    slug: "service-accessible",
    theme: "accessible",
    category: "Service inclusif fictif",
    name: "Accès Simple",
    eyebrow: "Comprendre et agir",
    headline: "Chaque parcours doit rester clair pour chaque personne.",
    summary:
      "Une démonstration inclusive privilégiant la compréhension, le contraste et le contrôle.",
    hero: "centered",
    services: "grid",
    proof: "logos",
    motion: "micro-focus",
    depth: "perspective-stack",
    visualSystem: "interface-profile",
    authVariant: "sign-in-centered",
    clientVariant: "support-focused",
    clientNavigation: "mobile-first",
  },
];

export function getDemoRecipe(slug: string) {
  return demoRecipes.find((recipe) => recipe.slug === slug);
}
