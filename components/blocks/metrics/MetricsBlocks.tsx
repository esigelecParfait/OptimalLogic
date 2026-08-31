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

import styles from "./metrics.module.css";

export type MetricItem = {
  label: string;
  value: string;
  detail?: string;
  trend?: string;
};

type MetricsDashboardProps = BlockIntroContent & {
  metrics: MetricItem[];
  note?: string;
  tone?: BlockTone;
  id?: string;
};

// MetricsDashboard présente un état opérationnel. Les valeurs doivent être sourcées.
export function MetricsDashboard({
  eyebrow,
  title,
  description,
  metrics,
  note,
  tone = "muted",
  id,
}: MetricsDashboardProps) {
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

          <Surface appearance="glass" elevation="floating" padding="large">
            <div className={styles.dashboardHeader}>
              <Eyebrow>Vue synthétique</Eyebrow>
              {note && <Text variant="small">{note}</Text>}
            </div>

            <dl className={styles.dashboardGrid}>
              {metrics.map((metric, index) => (
                <div className={styles.dashboardMetric} key={`${metric.label}-${index}`}>
                  <dt className={styles.label}>{metric.label}</dt>
                  <dd className={styles.value}>{metric.value}</dd>
                  {metric.detail && <dd className={styles.detail}>{metric.detail}</dd>}
                  {metric.trend && <dd className={styles.trend}>{metric.trend}</dd>}
                </div>
              ))}
            </dl>
          </Surface>
        </Stack>
      </Container>
    </Section>
  );
}

type MetricsStripProps = {
  metrics: MetricItem[];
  eyebrow?: string;
  title?: string;
  tone?: BlockTone;
  id?: string;
};

// MetricsStrip apporte une lecture compacte sans transformer les indicateurs en preuve.
export function MetricsStrip({
  metrics,
  eyebrow,
  title,
  tone = "surface",
  id,
}: MetricsStripProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Stack gap="large">
          {(eyebrow || title) && (
            <div className={styles.stripIntro}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {title && (
                <Heading as="h2" variant="title">
                  {title}
                </Heading>
              )}
            </div>
          )}

          <dl className={styles.strip}>
            {metrics.map((metric, index) => (
              <div className={styles.stripMetric} key={`${metric.label}-${index}`}>
                <dt className={styles.label}>{metric.label}</dt>
                <dd className={styles.stripValue}>{metric.value}</dd>
                {metric.detail && <dd className={styles.detail}>{metric.detail}</dd>}
              </div>
            ))}
          </dl>
        </Stack>
      </Container>
    </Section>
  );
}
