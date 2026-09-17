export const clientAreaFamilies = [
  { id: "dashboard", label: "Tableaux de bord", count: 6 },
  { id: "profile", label: "Profil", count: 6 },
  { id: "requests", label: "Demandes", count: 6 },
  { id: "appointments", label: "Rendez-vous", count: 6 },
  { id: "documents", label: "Documents", count: 6 },
  { id: "support", label: "Support", count: 6 },
] as const;

export type ClientAreaFamily = (typeof clientAreaFamilies)[number]["id"];
export type ClientAreaState =
  "normal" | "loading" | "empty" | "partial" | "error" | "restricted" | "success";

export const clientAreaStates: Array<{ id: ClientAreaState; label: string }> = [
  { id: "normal", label: "État normal" },
  { id: "loading", label: "Chargement" },
  { id: "empty", label: "État vide" },
  { id: "partial", label: "Données partielles" },
  { id: "error", label: "Erreur" },
  { id: "restricted", label: "Accès limité" },
  { id: "success", label: "Action réussie" },
];

export const clientNavigationVariants = [
  { id: "sidebar", label: "Barre latérale" },
  { id: "topbar", label: "Barre supérieure" },
  { id: "hybrid", label: "Navigation hybride" },
  { id: "compact", label: "Rail compact" },
  { id: "contextual", label: "Navigation contextuelle" },
  { id: "mobile-first", label: "Mobile-first" },
] as const;

export type ClientNavigationVariant = (typeof clientNavigationVariants)[number]["id"];

const layouts = [
  ["overview", "Vue synthétique"],
  ["activity", "Fil d’activité"],
  ["workspace", "Espace de pilotage"],
  ["split", "Vue fractionnée"],
  ["timeline", "Parcours chronologique"],
  ["focused", "Vue ciblée"],
] as const;

const familyLabels: Record<ClientAreaFamily, string> = {
  dashboard: "Tableau de bord",
  profile: "Profil",
  requests: "Demandes",
  appointments: "Rendez-vous",
  documents: "Documents",
  support: "Support",
};

export type ClientAreaVariant = {
  id: string;
  family: ClientAreaFamily;
  layout: (typeof layouts)[number][0];
  label: string;
};

export const clientAreaVariants: ClientAreaVariant[] = clientAreaFamilies.flatMap(
  (family) =>
    layouts.map(([layout, label]) => ({
      id: `${family.id}-${layout}`,
      family: family.id,
      layout,
      label: `${familyLabels[family.id]} — ${label}`,
    })),
);

export function getClientAreaVariant(id: string) {
  return clientAreaVariants.find((variant) => variant.id === id) ?? clientAreaVariants[0];
}
