import type { ReactNode } from "react";

import {
  Button,
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

import styles from "./services.module.css";

export type ServiceItem = {
  title: string;
  description: string;
  eyebrow?: string;
  href?: string;
  icon?: ReactNode;
};

type ServicesCommonProps = BlockIntroContent & {
  services: ServiceItem[];
  tone?: BlockTone;
  id?: string;
};

// ServiceCard est interne à cette famille et renvoie une carte Surface.
function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  return (
    <Surface className={styles.card} elevation="flat" padding="large">
      <Stack className={styles.cardContent} gap="medium">
        {/* L'icône reste facultative : le bloc ne choisit pas un style d'icônes. */}
        {service.icon}
        <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
        <Heading as="h3" variant="subtitle">
          {service.title}
        </Heading>
        <Text>{service.description}</Text>
        {service.href && (
          <Button href={service.href} variant="text">
            Découvrir
          </Button>
        )}
      </Stack>
    </Surface>
  );
}

// ServicesGrid renvoie des cartes régulières en grille responsive.
export function ServicesGrid({
  eyebrow,
  title,
  description,
  services,
  tone = "canvas",
  id,
}: ServicesCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <Grid columns={3} gap="medium">
            {services.map((service, index) => (
              <ServiceCard
                service={service}
                index={index}
                key={`${service.title}-${index}`}
              />
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}

// ServicesEditorial renvoie une liste horizontale plus éditoriale que des cartes.
export function ServicesEditorial({
  eyebrow,
  title,
  description,
  services,
  tone = "surface",
  id,
}: ServicesCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <div className={styles.editorialList}>
            {services.map((service, index) => (
              <article className={styles.editorialItem} key={`${service.title}-${index}`}>
                <span className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Heading as="h3" variant="subtitle">
                  {service.title}
                </Heading>

                <Stack gap="small">
                  <Text>{service.description}</Text>
                  {service.href && (
                    <Button href={service.href} variant="text">
                      Découvrir
                    </Button>
                  )}
                </Stack>
              </article>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

// ServicesFeatured met le premier service en avant et groupe les suivants.
export function ServicesFeatured({
  eyebrow,
  title,
  description,
  services,
  tone = "muted",
  id,
}: ServicesCommonProps) {
  const [featuredService, ...otherServices] = services;

  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <div className={styles.featuredLayout}>
            {featuredService && (
              <Surface className={styles.featuredCard} elevation="raised" padding="large">
                <Stack gap="medium">
                  <Text variant="small">Service principal</Text>
                  <Heading as="h3" variant="title">
                    {featuredService.title}
                  </Heading>
                  <Text variant="lead">{featuredService.description}</Text>
                  {featuredService.href && (
                    <Button href={featuredService.href} variant="text">
                      Découvrir
                    </Button>
                  )}
                </Stack>
              </Surface>
            )}

            <Stack gap="medium">
              {otherServices.map((service, index) => (
                <ServiceCard
                  service={service}
                  index={index + 1}
                  key={`${service.title}-${index}`}
                />
              ))}
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
