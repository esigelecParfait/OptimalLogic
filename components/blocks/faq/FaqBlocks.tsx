import type { ReactNode } from "react";

import { Container, Section, Stack } from "../../primitives";
import { BlockIntro } from "../shared/BlockIntro";
import type { BlockIntroContent, BlockTone } from "../types";

import styles from "./faq.module.css";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

type FaqCommonProps = BlockIntroContent & {
  items: FaqItem[];
  tone?: BlockTone;
  id?: string;
};

// FaqDetails utilise <details>, donc le clavier fonctionne sans JavaScript.
function FaqDetails({ item }: { item: FaqItem }) {
  return (
    <details className={styles.faqItem}>
      <summary className={styles.faqSummary}>{item.question}</summary>
      <div className={styles.faqAnswer}>{item.answer}</div>
    </details>
  );
}

// FaqList renvoie une FAQ étroite, adaptée aux longues réponses.
export function FaqList({
  eyebrow,
  title,
  description,
  items,
  tone = "canvas",
  id,
}: FaqCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="text">
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <div className={styles.faqList}>
            {items.map((item, index) => (
              <FaqDetails item={item} key={`${item.question}-${index}`} />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

// FaqColumns renvoie deux colonnes sur ordinateur et une sur mobile.
export function FaqColumns({
  eyebrow,
  title,
  description,
  items,
  tone = "surface",
  id,
}: FaqCommonProps) {
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

          <div className={styles.faqColumns}>
            {items.map((item, index) => (
              <FaqDetails item={item} key={`${item.question}-${index}`} />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
