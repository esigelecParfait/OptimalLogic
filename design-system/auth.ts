export const authFamilies = [
  { id: "sign-in", label: "Connexion", count: 6 },
  { id: "sign-up", label: "Inscription autorisée", count: 6 },
  { id: "activation", label: "Activation", count: 6 },
  { id: "recovery", label: "Récupération", count: 6 },
  { id: "verification", label: "Vérification d’email", count: 6 },
] as const;

export type AuthFamily = (typeof authFamilies)[number]["id"];
export type RegistrationMode = "disabled" | "invite_only" | "public";
export type AuthState =
  | "initial"
  | "valid"
  | "invalid"
  | "loading"
  | "success"
  | "generic_error"
  | "expired_link"
  | "used_link"
  | "disabled"
  | "email_resent"
  | "session_active";

export const registrationModes: Array<{ id: RegistrationMode; label: string }> = [
  { id: "disabled", label: "Inscription désactivée" },
  { id: "invite_only", label: "Sur invitation" },
  { id: "public", label: "Inscription publique" },
];

export const authStates: Array<{ id: AuthState; label: string }> = [
  { id: "initial", label: "État initial" },
  { id: "valid", label: "Saisie valide" },
  { id: "invalid", label: "Champs invalides" },
  { id: "loading", label: "Chargement" },
  { id: "success", label: "Succès" },
  { id: "generic_error", label: "Erreur générique" },
  { id: "expired_link", label: "Lien expiré" },
  { id: "used_link", label: "Lien déjà utilisé" },
  { id: "disabled", label: "Accès désactivé" },
  { id: "email_resent", label: "Email renvoyé" },
  { id: "session_active", label: "Session déjà active" },
];

const familyLabels: Record<AuthFamily, string> = {
  "sign-in": "Connexion",
  "sign-up": "Inscription",
  activation: "Activation",
  recovery: "Récupération",
  verification: "Vérification",
};

const layouts = [
  ["centered", "Carte centrée"],
  ["split", "Panneau partagé"],
  ["floating", "Carte flottante"],
  ["immersive", "Immersion de marque"],
  ["guided", "Parcours guidé"],
  ["portal", "Portail client"],
] as const;

export type AuthVariant = {
  id: string;
  family: AuthFamily;
  layout: (typeof layouts)[number][0];
  label: string;
};

export const authVariants: AuthVariant[] = authFamilies.flatMap((family) =>
  layouts.map(([layout, label]) => ({
    id: `${family.id}-${layout}`,
    family: family.id,
    layout,
    label: `${familyLabels[family.id]} — ${label}`,
  })),
);

export function getAuthVariant(id: string) {
  return authVariants.find((variant) => variant.id === id) ?? authVariants[0];
}
