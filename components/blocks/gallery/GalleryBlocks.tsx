import { Container, Heading, Section, Stack, Text } from "../../primitives";
import { BlockIntro } from "../shared/BlockIntro";
import { BlockMediaFrame } from "../shared/BlockMediaFrame";
import type { BlockIntroContent, BlockMedia, BlockTone } from "../types";

import styles from "./gallery.module.css";

export type GalleryItem = BlockMedia & {
  title?: string;
  caption?: string;
};

type GalleryCommonProps = BlockIntroContent & {
  items: GalleryItem[];
  tone?: BlockTone;
  id?: string;
};

// GalleryFigure renvoie un média accompagné de sa légende facultative.
function GalleryFigure({ item }: { item: GalleryItem }) {
  return (
    <figure>
      <BlockMediaFrame media={item} />

      {(item.title || item.caption) && (
        <figcaption>
          <Stack gap="small">
            {item.title && (
              <Heading as="h3" variant="subtitle">
                {item.title}
              </Heading>
            )}
            {item.caption && <Text variant="small">{item.caption}</Text>}
          </Stack>
        </figcaption>
      )}
    </figure>
  );
}

// GalleryGrid renvoie une mosaïque éditoriale de médias.
export function GalleryGrid({
  eyebrow,
  title,
  description,
  items,
  tone = "canvas",
  id,
}: GalleryCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <div className={styles.galleryGrid}>
            {items.map((item, index) => (
              <div className={styles.galleryCard} key={`${item.title}-${index}`}>
                <GalleryFigure item={item} />
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

// GallerySpotlight agrandit le premier média et place les autres à côté.
export function GallerySpotlight({
  eyebrow,
  title,
  description,
  items,
  tone = "muted",
  id,
}: GalleryCommonProps) {
  const [featuredItem, ...supportingItems] = items;

  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <div className={styles.spotlightLayout}>
            {featuredItem && <GalleryFigure item={featuredItem} />}

            <div className={styles.supportingGrid}>
              {supportingItems.map((item, index) => (
                <GalleryFigure item={item} key={`${item.title}-${index}`} />
              ))}
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
