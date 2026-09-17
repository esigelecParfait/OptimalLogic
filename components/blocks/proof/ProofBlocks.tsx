import type { ReactNode } from "react";

import {
  Button,
  Container,
  Eyebrow,
  Section,
  Stack,
  Surface,
  Text,
} from "../../primitives";
import { BlockIntro } from "../shared/BlockIntro";
import { BlockMediaFrame } from "../shared/BlockMediaFrame";
import type { BlockIntroContent, BlockMedia, BlockTone } from "../types";

import styles from "./proof.module.css";

type ProofLogo = {
  name: string;
  mark?: ReactNode;
};

type ProofLogoCloudProps = BlockIntroContent & {
  logos: ProofLogo[];
  tone?: BlockTone;
  id?: string;
};

// ProofLogoCloud renvoie une liste de logos ou de noms réellement autorisés.
export function ProofLogoCloud({
  eyebrow,
  title,
  description,
  logos,
  tone = "surface",
  id,
}: ProofLogoCloudProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />

          <ul className={styles.logoList} aria-label={title}>
            {logos.map((logo, index) => (
              <li className={styles.logoItem} key={`${logo.name}-${index}`}>
                {/* Le nom reste disponible si aucun fichier de logo n'est fourni. */}
                {logo.mark ?? logo.name}
              </li>
            ))}
          </ul>
        </Stack>
      </Container>
    </Section>
  );
}

type ProofStat = {
  value: string;
  label: string;
  detail?: string;
};

export type ProofMetric = ProofStat;

type ProofStatsProps = BlockIntroContent & {
  stats: ProofStat[];
  tone?: BlockTone;
  id?: string;
};

// ProofStats renvoie une liste sémantique <dl> de chiffres validés.
export function ProofStats({
  eyebrow,
  title,
  description,
  stats,
  tone = "canvas",
  id,
}: ProofStatsProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <dl className={styles.stats}>
            {stats.map((stat, index) => (
              <div className={styles.stat} key={`${stat.label}-${index}`}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={styles.statValue}>{stat.value}</dd>
                {stat.detail && <dd className={styles.statDetail}>{stat.detail}</dd>}
              </div>
            ))}
          </dl>
        </Stack>
      </Container>
    </Section>
  );
}

type ProofQuoteProps = {
  quote: string;
  authorName: string;
  authorRole?: string;
  eyebrow?: string;
  media?: BlockMedia;
  tone?: BlockTone;
  id?: string;
};

// ProofQuote renvoie une citation avec son attribution et un média facultatif.
export function ProofQuote({
  quote,
  authorName,
  authorRole,
  eyebrow,
  media,
  tone = "muted",
  id,
}: ProofQuoteProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <div className={styles.quoteLayout}>
          {media && <BlockMediaFrame media={media} defaultRatio="portrait" />}

          <Stack gap="medium">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>{quote}</p>
              <footer className={styles.quoteFooter}>
                <Text>{authorName}</Text>
                {authorRole && <Text variant="small">{authorRole}</Text>}
              </footer>
            </blockquote>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}

export function ProofWall({
  eyebrow,
  title,
  description,
  logos,
  tone = "muted",
  id,
}: ProofLogoCloudProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <div className={styles.wall}>
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />
          <ul>
            {logos.map((logo, index) => (
              <li key={`${logo.name}-${index}`}>{logo.mark ?? logo.name}</li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

type ProofCaseStudyProps = BlockIntroContent & {
  challenge: string;
  outcome: string;
  media?: BlockMedia;
  action?: { label: string; href: string };
  tone?: BlockTone;
  id?: string;
};
export function ProofCaseStudy({
  eyebrow,
  title,
  description,
  challenge,
  outcome,
  media,
  action,
  tone = "surface",
  id,
}: ProofCaseStudyProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <div className={styles.caseStudy}>
          {media && <BlockMediaFrame media={media} defaultRatio="landscape" />}
          <Stack gap="large">
            <BlockIntro eyebrow={eyebrow} title={title} description={description} />
            <div className={styles.caseFacts}>
              <Surface padding="medium" appearance="line">
                <Eyebrow>Situation</Eyebrow>
                <Text>{challenge}</Text>
              </Surface>
              <Surface padding="medium" appearance="soft">
                <Eyebrow>Résultat vérifié</Eyebrow>
                <Text>{outcome}</Text>
              </Surface>
            </div>
            {action && <Button href={action.href}>{action.label}</Button>}
          </Stack>
        </div>
      </Container>
    </Section>
  );
}

export function ProofMetricsBand({
  eyebrow,
  title,
  description,
  stats,
  tone = "canvas",
  id,
}: ProofStatsProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <div className={styles.metricsBand}>
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />
          <dl>
            {stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
                {stat.detail && <dd>{stat.detail}</dd>}
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
