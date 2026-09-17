export const themes = [
  {
    id: "editorial",
    label: "Éditorial chaleureux",
  },
  {
    id: "technology",
    label: "Technologique sombre",
  },
  {
    id: "professional",
    label: "Professionnel clair",
  },
  {
    id: "luxury",
    label: "Luxe minimal",
  },
  {
    id: "creative",
    label: "Créatif expressif",
  },
  {
    id: "organic",
    label: "Nature organique",
  },
  {
    id: "industrial",
    label: "Industriel précis",
  },
  {
    id: "accessible",
    label: "Produit accessible",
  },
] as const;
export type ThemeId = (typeof themes)[number]["id"];
