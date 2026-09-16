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

import styles from "./narrative.module.css";

export type NarrativeItem = {
  title: string;
  description: string;
  label?: string;
  featured?: boolean;
};

type NarrativeMosaicProps = BlockIntroContent & {
  items: NarrativeItem[];
  tone?: BlockTone;
  id?: string;
};

// NarrativeMosaic organise des problèmes ou convictions avec une hiérarchie non uniforme.
export function NarrativeMosaic({
  eyebrow,
  title,
  description,
  items,
  tone = "canvas",
  id,
}: NarrativeMosaicProps) {
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

          <div className={styles.mosaic}>
            {items.map((item, index) => (
              <Surface
                appearance={item.featured ? "accent" : "glass"}
                className={item.featured ? styles.mosaicFeatured : styles.mosaicCard}
                elevation={item.featured ? "floating" : "flat"}
                interactive
                key={`${item.title}-${index}`}
                padding="large"
              >
                <Stack className={styles.cardBody} gap="medium">
                  <span className={styles.index}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label && <Eyebrow>{item.label}</Eyebrow>}
                  <Heading as="h3" variant={item.featured ? "title" : "subtitle"}>
                    {item.title}
                  </Heading>
                  <Text variant={item.featured ? "lead" : "body"}>
                    {item.description}
                  </Text>
                </Stack>
              </Surface>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

type NarrativeManifestoProps = {
  statement: string;
  body: string;
  principles: string[];
  eyebrow?: string;
  tone?: BlockTone;
  id?: string;
};

// NarrativeManifesto met une conviction centrale face à des principes vérifiables.
export function NarrativeManifesto({
  statement,
  body,
  principles,
  eyebrow,
  tone = "muted",
  id,
}: NarrativeManifestoProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <div className={styles.manifesto}>
          <Stack className={styles.manifestoStatement} gap="large">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Heading as="h2" variant="display">
              {statement}
            </Heading>
          </Stack>

          <Stack gap="large">
            <Text variant="lead">{body}</Text>
            <ol className={styles.principles}>
              {principles.map((principle, index) => (
                <li key={`${principle}-${index}`}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <Text>{principle}</Text>
                </li>
              ))}
            </ol>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}
