// Importe uniquement un type React.
// "import type" n'ajoute aucun JavaScript dans le navigateur.
import type { ComponentPropsWithoutRef } from "react";

// Importe notre fonction qui assemble les classes CSS.
// "@" représente le dossier src grâce à la configuration TypeScript.
import { cx } from "@/lib/cx";

// Importe les classes du fichier CSS Module.
import styles from "./primitives.module.css";

/*
 * Ce type limite les valeurs possibles de size.
 * Une autre valeur, comme size="small", produira une erreur TypeScript.
 */
type ContainerSize = "text" | "content" | "wide";

/*
 * ComponentPropsWithoutRef<"div"> récupère les propriétés normales
 * d'un élément HTML div : id, className, aria-label, children, etc.
 *
 * Le symbole "&" ajoute notre propriété personnalisée "size".
 * Le symbole "?" signifie que la propriété est facultative.
 */
type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

/*
 * Record associe chaque valeur de ContainerSize à une classe CSS.
 *
 * Cela donne :
 * text    → classe containerText
 * content → classe containerContent
 * wide    → classe containerWide
 */
const sizeClasses: Record<ContainerSize, string> = {
  text: styles.containerText,
  content: styles.containerContent,
  wide: styles.containerWide,
};

/*
 * Nous exportons le composant pour pouvoir l'utiliser ailleurs.
 *
 * La déstructuration extrait :
 * - size ;
 * - className ;
 * - le reste des propriétés dans "...props".
 */
export function Container({
  // "content" est la valeur utilisée si size n'est pas fourni.
  size = "content",

  // className permet d'ajouter une classe depuis le composant parent.
  className,

  // "...props" récupère children, id, aria-label et les autres propriétés.
  ...props
}: ContainerProps) {
  return (
    <div
      /*
       * cx rassemble :
       * - la classe de base container ;
       * - la classe correspondant à la taille ;
       * - une éventuelle classe ajoutée par le parent.
       */
      className={cx(styles.container, sizeClasses[size], className)}

      /*
       * Transmet toutes les propriétés restantes à la div.
       * Par exemple : id, children ou aria-label.
       */
      {...props}
    />
  );
}
