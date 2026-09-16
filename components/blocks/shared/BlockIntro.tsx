import { Eyebrow, Heading, Stack, Text } from "../../primitives";
import type { BlockIntroContent } from "../types";

import styles from "./shared.module.css";

type BlockIntroProps = BlockIntroContent & {
  align?: "start" | "center";
  headingAs?: "h1" | "h2" | "h3";
  headingVariant?: "hero" | "display" | "title" | "subtitle";
};

// BlockIntro renvoie l'en-tête éditorial réutilisé en haut des sections.
export function BlockIntro({
  eyebrow,
  title,
  description,
  align = "start",
  headingAs = "h2",
  headingVariant = "title",
}: BlockIntroProps) {
  const className =
    align === "center" ? `${styles.intro} ${styles.introCenter}` : styles.intro;

  return (
    <Stack className={className} gap="medium">
      {/* Une valeur absente ne crée aucun élément vide dans le DOM. */}
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

      <Heading as={headingAs} variant={headingVariant}>
        {title}
      </Heading>

      {description && <Text variant="lead">{description}</Text>}
    </Stack>
  );
}
