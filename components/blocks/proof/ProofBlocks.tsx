import type { ReactNode } from "react";

import { Container, Eyebrow, Section, Stack, Text } from "../../primitives";
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
