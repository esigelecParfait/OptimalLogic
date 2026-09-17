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

export function GalleryEditorial({
  eyebrow,
  title,
  description,
  items,
  tone = "surface",
  id,
}: GalleryCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <div className={styles.editorial}>
          <div className={styles.stickyIntro}>
            <BlockIntro eyebrow={eyebrow} title={title} description={description} />
          </div>
          <div className={styles.editorialItems}>
            {items.map((item, index) => (
              <div className={styles.editorialItem} key={`${item.title}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <GalleryFigure item={item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function GalleryArchive({
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
          <div className={styles.archive}>
            {items.map((item, index) => (
              <article key={`${item.title}-${index}`}>
                <div className={styles.archiveMeta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.title && (
                    <Heading as="h3" variant="subtitle">
                      {item.title}
                    </Heading>
                  )}
                </div>
                <BlockMediaFrame
                  media={item}
                  defaultRatio={index % 2 === 0 ? "wide" : "landscape"}
                />
                {item.caption && <Text variant="small">{item.caption}</Text>}
              </article>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
