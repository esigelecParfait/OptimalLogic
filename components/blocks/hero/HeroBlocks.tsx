import { Container, Eyebrow, Heading, Section, Stack, Text } from "../../primitives";
import { BlockActions } from "../shared/BlockActions";
import { BlockIntro } from "../shared/BlockIntro";
import { BlockMediaFrame } from "../shared/BlockMediaFrame";
import type { BlockAction, BlockIntroContent, BlockMedia, BlockTone } from "../types";

import styles from "./hero.module.css";

type HeroCommonProps = BlockIntroContent & {
  primaryAction?: BlockAction;
  secondaryAction?: BlockAction;
  headingAs?: "h1" | "h2";
  tone?: BlockTone;
  id?: string;
};

type HeroSplitProps = HeroCommonProps & {
  media: BlockMedia;
  mediaPosition?: "left" | "right";
};

// HeroSplit renvoie un hero à deux colonnes : contenu éditorial et média.
export function HeroSplit({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  headingAs = "h1",
  media,
  mediaPosition = "right",
  tone = "canvas",
  id,
}: HeroSplitProps) {
  const layoutClassName =
    mediaPosition === "left"
      ? `${styles.splitLayout} ${styles.splitMediaLeft}`
      : styles.splitLayout;

  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <div className={layoutClassName}>
          <Stack className={styles.splitCopy} gap="large">
            <BlockIntro
              eyebrow={eyebrow}
              title={title}
              description={description}
              headingAs={headingAs}
              headingVariant="display"
            />

            <BlockActions primary={primaryAction} secondary={secondaryAction} />
          </Stack>

          <div className={styles.splitMedia}>
            <BlockMediaFrame media={media} defaultRatio="portrait" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

type HeroCenteredProps = HeroCommonProps & {
  media?: BlockMedia;
};

// HeroCentered renvoie un message centré avec un média large facultatif.
export function HeroCentered({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  headingAs = "h1",
  media,
  tone = "canvas",
  id,
}: HeroCenteredProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Stack className={styles.centered} gap="extraLarge">
          <Stack gap="large">
            <BlockIntro
              eyebrow={eyebrow}
              title={title}
              description={description}
              align="center"
              headingAs={headingAs}
              headingVariant="display"
            />

            <div className={styles.centeredActions}>
              <BlockActions
                primary={primaryAction}
                secondary={secondaryAction}
                align="center"
              />
            </div>
          </Stack>

          {/* Le hero reste valable sans média lorsque la marque privilégie le texte. */}
          {media && (
            <div className={styles.centeredMedia}>
              <BlockMediaFrame media={media} />
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
}

type HeroEditorialProps = HeroCommonProps & {
  aside?: {
    label?: string;
    text: string;
  };
  media?: BlockMedia;
};

// HeroEditorial renvoie une grande accroche accompagnée d'une note latérale.
export function HeroEditorial({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  headingAs = "h1",
  aside,
  media,
  tone = "canvas",
  id,
}: HeroEditorialProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Stack gap="extraLarge">
          <div className={styles.editorialLayout}>
            <Stack gap="medium">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              <Heading as={headingAs} variant="display">
                {title}
              </Heading>
              {description && <Text variant="lead">{description}</Text>}
            </Stack>

            {aside && (
              <Stack className={styles.editorialAside} gap="small">
                {aside.label && <Eyebrow>{aside.label}</Eyebrow>}
                <Text>{aside.text}</Text>
              </Stack>
            )}
          </div>

          <BlockActions primary={primaryAction} secondary={secondaryAction} />

          {media && (
            <div className={styles.editorialMedia}>
              <BlockMediaFrame media={media} />
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
}
