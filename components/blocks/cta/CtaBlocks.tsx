import { Container, Section, Stack, Text } from "../../primitives";
import { BlockActions } from "../shared/BlockActions";
import { BlockIntro } from "../shared/BlockIntro";
import type { BlockAction, BlockIntroContent, BlockTone } from "../types";

import styles from "./cta.module.css";

type CtaCommonProps = BlockIntroContent & {
  primaryAction: BlockAction;
  secondaryAction?: BlockAction;
  tone?: BlockTone;
  id?: string;
};

// CtaCentered renvoie un appel à l'action centré dans un panneau.
export function CtaCentered({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = "muted",
  id,
}: CtaCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack className={`${styles.panel} ${styles.centered}`} gap="large">
          <BlockIntro
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
          <BlockActions
            primary={primaryAction}
            secondary={secondaryAction}
            align="center"
          />
        </Stack>
      </Container>
    </Section>
  );
}

type CtaSplitProps = CtaCommonProps & {
  note?: string;
};

// CtaSplit renvoie le message à gauche et les actions à droite.
export function CtaSplit({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  note,
  tone = "surface",
  id,
}: CtaSplitProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <div className={`${styles.panel} ${styles.split}`}>
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <Stack gap="medium">
            <BlockActions primary={primaryAction} secondary={secondaryAction} />
            {note && (
              <Text className={styles.note} variant="small">
                {note}
              </Text>
            )}
          </Stack>
        </div>
      </Container>
    </Section>
  );
}

type CtaBandProps = Omit<CtaCommonProps, "tone"> & {
  tone?: BlockTone | "inverse";
};

// CtaBand renvoie une bande compacte, adaptée à une fin de page.
export function CtaBand({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = "inverse",
  id,
}: CtaBandProps) {
  const isInverse = tone === "inverse";

  return (
    <Section
      className={isInverse ? styles.inverseSection : undefined}
      id={id}
      tone={isInverse ? "canvas" : tone}
    >
      <Container size="wide">
        <div className={styles.band}>
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <BlockActions primary={primaryAction} secondary={secondaryAction} />
        </div>
      </Container>
    </Section>
  );
}
