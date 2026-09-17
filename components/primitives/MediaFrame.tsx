// Importe les propriétés HTML acceptées par une balise <div>.
import type { ComponentPropsWithoutRef } from "react";

// Importe la fonction qui assemble les classes CSS.
import { cx } from "@/lib/cx";

// Importe les styles locaux des primitives.
import styles from "./primitives.module.css";

// Liste les proportions disponibles pour le cadre.
type MediaRatio = "square" | "portrait" | "landscape" | "wide";

// "cover" remplit le cadre en recadrant éventuellement le média.
// "contain" affiche tout le média, quitte à laisser de l'espace.
type MediaFit = "cover" | "contain";

// Fusionne les propriétés normales d'un <div>
// avec les options spécifiques de MediaFrame.
type MediaFrameProps = ComponentPropsWithoutRef<"div"> & {
  ratio?: MediaRatio;
  fit?: MediaFit;
};

// Associe chaque ratio à sa classe CSS.
//
// Record oblige TypeScript à vérifier que chaque ratio
// possède bien une classe correspondante.
const ratioClassNames: Record<MediaRatio, string> = {
  square: styles.mediaFrameSquare,
  portrait: styles.mediaFramePortrait,
  landscape: styles.mediaFrameLandscape,
  wide: styles.mediaFrameWide,
};

// Associe chaque mode de recadrage à sa classe CSS.
const fitClassNames: Record<MediaFit, string> = {
  cover: styles.mediaFrameCover,
  contain: styles.mediaFrameContain,
};

// Exporte la primitive afin qu'elle soit utilisable dans les futurs blocs.
export function MediaFrame({
  // Contenu placé entre <MediaFrame> et </MediaFrame>.
  children,

  // Classe CSS supplémentaire éventuellement fournie par le parent.
  className,

  // Valeurs utilisées si aucune option n'est précisée.
  ratio = "landscape",
  fit = "cover",

  // Récupère les autres propriétés HTML : id, aria-label, etc.
  ...props
}: MediaFrameProps) {
  return (
    <div
      // Assemble la base, le ratio, le recadrage et la classe externe.
      className={cx(
        styles.mediaFrame,
        ratioClassNames[ratio],
        fitClassNames[fit],
        className,
      )}

      // Transmet les autres propriétés à la balise <div>.
      {...props}
    >
      {/* Affiche l'image, la vidéo ou l'iframe reçue. */}
      {children}
    </div>
  );
}
