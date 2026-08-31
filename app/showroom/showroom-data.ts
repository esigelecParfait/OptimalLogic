import type {
  FaqItem,
  GalleryItem,
  MetricItem,
  NarrativeItem,
  PricingPlan,
  ProcessItem,
  ServiceItem,
  TeamMember,
  WorkflowNode,
} from "../../components/blocks";

// Ces données servent uniquement à exercer les contrats TypeScript des blocs.
// Elles ne constituent ni des avis, ni des résultats, ni une offre commerciale.
export const showroomServices: ServiceItem[] = [
  {
    title: "Service principal à définir",
    description: "Description issue du site-spec validé du futur client.",
    href: "#showroom-top",
  },
  {
    title: "Service complémentaire à définir",
    description: "Bénéfice client et périmètre à renseigner avant publication.",
    href: "#showroom-top",
  },
  {
    title: "Accompagnement à définir",
    description: "Modalités réelles à remplacer depuis le contenu client.",
    href: "#showroom-top",
  },
];

export const showroomProcess: ProcessItem[] = [
  {
    title: "Cadrage",
    description: "Étape et responsabilité à valider avec le client.",
    detail: "Délai à fournir",
  },
  {
    title: "Conception",
    description: "Livrable attendu à décrire dans le site-spec.",
    detail: "Validation requise",
  },
  {
    title: "Réalisation",
    description: "Périmètre réel à renseigner avant la mise en ligne.",
  },
  {
    title: "Livraison",
    description: "Critères d'acceptation et responsabilités à confirmer.",
  },
];

export const showroomGallery: GalleryItem[] = [
  {
    title: "Média principal",
    caption: "Visuel autorisé à fournir.",
    label: "Emplacement média principal",
    ratio: "landscape",
  },
  {
    title: "Média secondaire",
    caption: "Légende réelle à renseigner.",
    label: "Emplacement média secondaire",
    ratio: "portrait",
  },
  {
    title: "Détail",
    caption: "Description accessible à préparer avec le média final.",
    label: "Emplacement média de détail",
    ratio: "square",
  },
  {
    title: "Contexte",
    caption: "Contenu à valider avant publication.",
    label: "Emplacement média de contexte",
    ratio: "landscape",
  },
];

export const showroomFaq: FaqItem[] = [
  {
    question: "Question fréquente validée numéro 1 ?",
    answer: "Réponse client à renseigner depuis le site-spec.",
  },
  {
    question: "Question fréquente validée numéro 2 ?",
    answer: "Ne publier que les modalités réellement confirmées.",
  },
  {
    question: "Question fréquente validée numéro 3 ?",
    answer: "Cette réponse est un placeholder de démonstration.",
  },
  {
    question: "Question fréquente validée numéro 4 ?",
    answer: "Les informations légales doivent être contrôlées séparément.",
  },
];

export const showroomTeam: TeamMember[] = [
  {
    name: "Membre 01",
    role: "Fonction à confirmer",
    bio: "Biographie professionnelle autorisée à fournir.",
  },
  {
    name: "Membre 02",
    role: "Fonction à confirmer",
    bio: "Expertise réelle à valider avant publication.",
  },
  {
    name: "Membre 03",
    role: "Fonction à confirmer",
    bio: "Présentation volontairement neutre pour le showroom.",
  },
];

export const showroomPricing: PricingPlan[] = [
  {
    name: "Formule essentielle",
    price: "Sur devis",
    description: "Périmètre à définir avec le client.",
    features: ["Élément inclus à confirmer", "Modalité à confirmer"],
    action: { label: "Action de démonstration", href: "#showroom-top" },
  },
  {
    name: "Formule recommandée",
    price: "Sur devis",
    description: "Cette formule ne représente aucune offre réelle.",
    features: ["Élément inclus à confirmer", "Condition à confirmer"],
    action: { label: "Action de démonstration", href: "#showroom-top" },
    badge: "Exemple de mise en avant",
    highlighted: true,
  },
  {
    name: "Formule avancée",
    price: "Sur devis",
    description: "Prix et prestations doivent venir du site-spec.",
    features: ["Élément inclus à confirmer", "Accompagnement à confirmer"],
    action: { label: "Action de démonstration", href: "#showroom-top" },
  },
];

export const showroomNarrative: NarrativeItem[] = [
  {
    label: "Constat",
    title: "Un enjeu prioritaire à clarifier",
    description:
      "La formulation définitive doit provenir du cadrage et des sources validées.",
    featured: true,
  },
  {
    label: "Friction",
    title: "Une difficulté observable à documenter",
    description: "Le bloc hiérarchise le récit sans inventer de résultat ni de preuve.",
  },
  {
    label: "Décision",
    title: "Un choix rendu plus simple",
    description:
      "La prochaine étape et sa destination doivent être confirmées avant publication.",
  },
];

export const showroomWorkflow: WorkflowNode[] = [
  {
    label: "Étape",
    title: "Collecter",
    description: "Rassembler les entrées autorisées dans un même parcours.",
  },
  {
    label: "Étape",
    title: "Qualifier",
    description: "Appliquer des critères définis avec le responsable du site.",
  },
  {
    label: "Étape",
    title: "Orienter",
    description: "Déclencher l'action confirmée pour chaque situation.",
  },
];

export const showroomMetrics: MetricItem[] = [
  { label: "Indicateur 01", value: "À relier", detail: "Source requise" },
  { label: "Indicateur 02", value: "À définir", detail: "Période requise" },
  { label: "Indicateur 03", value: "À valider", detail: "Responsable requis" },
  { label: "Indicateur 04", value: "À suivre", detail: "Seuil requis" },
];
