import type { ReactNode } from "react";

import {
  Button,
  Container,
  Heading,
  Section,
  Stack,
  Surface,
  Text,
} from "../../primitives";
import { BlockIntro } from "../shared/BlockIntro";
import type { BlockAction, BlockIntroContent, BlockTone } from "../types";

import styles from "./booking.module.css";

export type BookingStep = { title: string; description: string };
type BookingCommonProps = BlockIntroContent & {
  steps: BookingStep[];
  action: BlockAction;
  scheduler?: ReactNode;
  note?: string;
  tone?: BlockTone;
  id?: string;
};

function Steps({ steps }: { steps: BookingStep[] }) {
  return (
    <ol className={styles.steps}>
      {steps.map((step, index) => (
        <li key={`${step.title}-${index}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <Heading as="h3" variant="subtitle">
              {step.title}
            </Heading>
            <Text>{step.description}</Text>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function BookingSplit({
  eyebrow,
  title,
  description,
  steps,
  action,
  scheduler,
  note,
  tone = "canvas",
  id,
}: BookingCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <div className={styles.split}>
          <Stack gap="large">
            <BlockIntro eyebrow={eyebrow} title={title} description={description} />
            <Steps steps={steps} />
            {note && <Text variant="small">{note}</Text>}
          </Stack>
          <Surface padding="large" appearance="floating">
            {scheduler ?? (
              <Stack gap="large">
                <Heading as="h3" variant="subtitle">
                  Choisissez votre créneau
                </Heading>
                <Text>Le module de réservation autorisé sera intégré ici.</Text>
                <Button href={action.href}>{action.label}</Button>
              </Stack>
            )}
          </Surface>
        </div>
      </Container>
    </Section>
  );
}

export function BookingSteps({
  eyebrow,
  title,
  description,
  steps,
  action,
  note,
  tone = "surface",
  id,
}: BookingCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Stack gap="extraLarge">
          <BlockIntro
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
          <Steps steps={steps} />
          <div className={styles.center}>
            {note && <Text variant="small">{note}</Text>}
            <Button href={action.href}>{action.label}</Button>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

export function BookingPanel({
  eyebrow,
  title,
  description,
  steps,
  action,
  scheduler,
  note,
  tone = "muted",
  id,
}: BookingCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Surface className={styles.panel} padding="large" appearance="immersive">
          <div>
            <BlockIntro eyebrow={eyebrow} title={title} description={description} />
            <Steps steps={steps} />
            {note && <Text variant="small">{note}</Text>}
          </div>
          <div>{scheduler ?? <Button href={action.href}>{action.label}</Button>}</div>
        </Surface>
      </Container>
    </Section>
  );
}

export function BookingCompact({
  eyebrow,
  title,
  description,
  steps,
  action,
  note,
  tone = "canvas",
  id,
}: BookingCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <div className={styles.compact}>
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />
          <div>
            <Text variant="small">{steps.map((step) => step.title).join(" · ")}</Text>
            {note && <Text variant="small">{note}</Text>}
          </div>
          <Button href={action.href}>{action.label}</Button>
        </div>
      </Container>
    </Section>
  );
}
