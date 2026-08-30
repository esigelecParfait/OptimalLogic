import {
  Container,
  Grid,
  Heading,
  Section,
  Stack,
  Surface,
  Text,
} from "../../primitives";
import { BlockIntro } from "../shared/BlockIntro";
import type { BlockIntroContent, BlockTone } from "../types";

import styles from "./process.module.css";

export type ProcessItem = {
  title: string;
  description: string;
  detail?: string;
};

type ProcessCommonProps = BlockIntroContent & {
  steps: ProcessItem[];
  tone?: BlockTone;
  id?: string;
};

// Formate les numéros sur deux caractères : 01, 02, 03, etc.
function formatStep(index: number): string {
  return String(index + 1).padStart(2, "0");
}

// ProcessSteps renvoie des étapes indépendantes sous forme de cartes.
export function ProcessSteps({
  eyebrow,
  title,
  description,
  steps,
  tone = "canvas",
  id,
}: ProcessCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <Grid columns={3} gap="medium">
            {steps.map((step, index) => (
              <Surface
                className={styles.stepCard}
                padding="large"
                key={`${step.title}-${index}`}
              >
                <Stack gap="medium">
                  <span className={styles.stepNumber}>{formatStep(index)}</span>
                  <Heading as="h3" variant="subtitle">
                    {step.title}
                  </Heading>
                  <Text>{step.description}</Text>
                  {step.detail && <Text variant="small">{step.detail}</Text>}
                </Stack>
              </Surface>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}

// ProcessTimeline renvoie une suite verticale et ordonnée d'étapes.
export function ProcessTimeline({
  eyebrow,
  title,
  description,
  steps,
  tone = "surface",
  id,
}: ProcessCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="text">
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <ol className={styles.timeline}>
            {steps.map((step, index) => (
              <li className={styles.timelineItem} key={`${step.title}-${index}`}>
                <span className={styles.stepNumber}>{formatStep(index)}</span>

                <Stack className={styles.timelineContent} gap="small">
                  <Heading as="h3" variant="subtitle">
                    {step.title}
                  </Heading>
                  <Text>{step.description}</Text>
                  {step.detail && <Text variant="small">{step.detail}</Text>}
                </Stack>
              </li>
            ))}
          </ol>
        </Stack>
      </Container>
    </Section>
  );
}
