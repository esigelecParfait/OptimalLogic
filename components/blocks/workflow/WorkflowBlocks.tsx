import type { ReactNode } from "react";

import {
  Container,
  Eyebrow,
  Heading,
  Section,
  Stack,
  Surface,
  Text,
} from "../../primitives";
import { BlockIntro } from "../shared/BlockIntro";
import type { BlockIntroContent, BlockTone } from "../types";

import styles from "./workflow.module.css";

export type WorkflowNode = {
  title: string;
  description: string;
  label?: string;
  icon?: ReactNode;
};

type WorkflowPipelineProps = BlockIntroContent & {
  steps: WorkflowNode[];
  outcome?: WorkflowNode;
  tone?: BlockTone;
  id?: string;
};

// WorkflowPipeline explique une transformation séquentielle avec un résultat observable.
export function WorkflowPipeline({
  eyebrow,
  title,
  description,
  steps,
  outcome,
  tone = "surface",
  id,
}: WorkflowPipelineProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Stack gap="extraLarge">
          <BlockIntro
            eyebrow={eyebrow}
            title={title}
            description={description}
            headingVariant="display"
          />

          <ol className={styles.pipeline}>
            {steps.map((step, index) => (
              <li className={styles.pipelineStep} key={`${step.title}-${index}`}>
                <div className={styles.stepRail} aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <Stack gap="small">
                  {step.label && <Eyebrow>{step.label}</Eyebrow>}
                  <Heading as="h3" variant="subtitle">
                    {step.title}
                  </Heading>
                  <Text>{step.description}</Text>
                </Stack>
              </li>
            ))}
          </ol>

          {outcome && (
            <Surface appearance="accent" elevation="floating" padding="large">
              <div className={styles.outcome}>
                <Eyebrow>{outcome.label ?? "Résultat"}</Eyebrow>
                <Heading as="h3" variant="title">
                  {outcome.title}
                </Heading>
                <Text variant="lead">{outcome.description}</Text>
              </div>
            </Surface>
          )}
        </Stack>
      </Container>
    </Section>
  );
}

type WorkflowRoutingProps = BlockIntroContent & {
  sources: WorkflowNode[];
  decision: WorkflowNode;
  outcomes: WorkflowNode[];
  tone?: BlockTone;
  id?: string;
};

function CompactNode({ node }: { node: WorkflowNode }) {
  return (
    <Surface appearance="glass" className={styles.compactNode} padding="medium">
      <Stack gap="small">
        {node.icon}
        {node.label && <Eyebrow>{node.label}</Eyebrow>}
        <Heading as="h3" variant="subtitle">
          {node.title}
        </Heading>
        <Text variant="small">{node.description}</Text>
      </Stack>
    </Surface>
  );
}

// WorkflowRouting montre plusieurs entrées, une règle de décision et plusieurs issues.
export function WorkflowRouting({
  eyebrow,
  title,
  description,
  sources,
  decision,
  outcomes,
  tone = "muted",
  id,
}: WorkflowRoutingProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Stack gap="extraLarge">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <div className={styles.routing}>
            <Stack className={styles.nodeColumn} gap="small">
              <Eyebrow>Entrées</Eyebrow>
              {sources.map((source, index) => (
                <CompactNode key={`${source.title}-${index}`} node={source} />
              ))}
            </Stack>

            <div className={styles.routeConnector} aria-hidden="true">
              <span />
            </div>

            <Surface
              appearance="accent"
              className={styles.decision}
              elevation="floating"
              padding="large"
            >
              <Stack gap="medium">
                <Eyebrow>{decision.label ?? "Traitement"}</Eyebrow>
                <Heading as="h3" variant="title">
                  {decision.title}
                </Heading>
                <Text>{decision.description}</Text>
              </Stack>
            </Surface>

            <div className={styles.routeConnector} aria-hidden="true">
              <span />
            </div>

            <Stack className={styles.nodeColumn} gap="small">
              <Eyebrow>Résultats</Eyebrow>
              {outcomes.map((outcome, index) => (
                <CompactNode key={`${outcome.title}-${index}`} node={outcome} />
              ))}
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
