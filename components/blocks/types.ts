import type { ReactNode } from "react";

// Fonds clairs acceptés par les blocs qui contiennent des cartes Surface.
export type BlockTone = "canvas" | "surface" | "muted";

// Structure commune d'un lien d'action transmis depuis le contenu du site.
export type BlockAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "text";
};

// Structure commune de l'introduction éditoriale d'une section.
export type BlockIntroContent = {
  eyebrow?: string;
  title: string;
  description?: string;
};

// Un média reste un ReactNode : image Next.js, vidéo ou composant graphique.
export type BlockMedia = {
  content?: ReactNode;
  label?: string;
  ratio?: "landscape" | "portrait" | "square" | "wide";
  fit?: "cover" | "contain";
};
