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
import type { BlockAction, BlockIntroContent, BlockTone } from "../types";

import styles from "./pricing.module.css";

export type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  action: BlockAction;
  badge?: string;
  highlighted?: boolean;
};

type PricingCommonProps = BlockIntroContent & {
  plans: PricingPlan[];
  tone?: BlockTone;
  id?: string;
};

// PricingCard renvoie une offre complète à partir de données explicites.
function PricingCard({ plan }: { plan: PricingPlan }) {
  const className = plan.highlighted
    ? `${styles.planCard} ${styles.planHighlighted}`
    : styles.planCard;

  return (
    <Surface
      className={className}
      appearance={plan.highlighted ? "floating" : "line"}
      padding="large"
    >
      <Stack gap="large">
        <Stack gap="small">
          {plan.badge && <span className={styles.badge}>{plan.badge}</span>}
          <Heading as="h3" variant="subtitle">
            {plan.name}
          </Heading>
          <p className={styles.price}>
            {plan.price}
            {plan.period && <span className={styles.period}> {plan.period}</span>}
          </p>
          {plan.description && <Text>{plan.description}</Text>}
        </Stack>

        <ul className={styles.features}>
          {plan.features.map((feature, index) => (
            <li className={styles.feature} key={`${feature}-${index}`}>
              {feature}
            </li>
          ))}
        </ul>

        <Button href={plan.action.href} variant={plan.action.variant ?? "primary"}>
          {plan.action.label}
        </Button>
      </Stack>
    </Surface>
  );
}

// PricingCards renvoie toutes les offres au même niveau dans une grille.
export function PricingCards({
  eyebrow,
  title,
  description,
  plans,
  tone = "canvas",
  id,
}: PricingCommonProps) {
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

          <Grid columns={3} gap="medium">
            {plans.map((plan, index) => (
              <PricingCard plan={plan} key={`${plan.name}-${index}`} />
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}

// PricingFeatured agrandit l'offre marquée highlighted, ou la première.
export function PricingFeatured({
  eyebrow,
  title,
  description,
  plans,
  tone = "muted",
  id,
}: PricingCommonProps) {
  const featuredPlan = plans.find((plan) => plan.highlighted) ?? plans[0];
  const alternativePlans = plans.filter((plan) => plan !== featuredPlan);

  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <div className={styles.featuredLayout}>
            {featuredPlan && <PricingCard plan={featuredPlan} />}

            <div className={styles.alternativeList}>
              {alternativePlans.map((plan, index) => (
                <PricingCard plan={plan} key={`${plan.name}-${index}`} />
              ))}
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

export function PricingComparison({
  eyebrow,
  title,
  description,
  plans,
  tone = "surface",
  id,
}: PricingCommonProps) {
  const features = Array.from(new Set(plans.flatMap((plan) => plan.features)));
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />
          <div className={styles.comparisonWrap}>
            <table className={styles.comparison}>
              <caption className={styles.srOnly}>{title}</caption>
              <thead>
                <tr>
                  <th scope="col">Inclus</th>
                  {plans.map((plan) => (
                    <th scope="col" key={plan.name}>
                      {plan.name}
                      <span>
                        {plan.price}
                        {plan.period && ` ${plan.period}`}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    {plans.map((plan) => (
                      <td key={plan.name}>
                        {plan.features.includes(feature) ? (
                          <span aria-label="Inclus">✓</span>
                        ) : (
                          <span aria-label="Non inclus">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Choisir</th>
                  {plans.map((plan) => (
                    <td key={plan.name}>
                      <Button
                        href={plan.action.href}
                        variant={plan.action.variant ?? "primary"}
                      >
                        {plan.action.label}
                      </Button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

export function PricingCompact({
  eyebrow,
  title,
  description,
  plans,
  tone = "canvas",
  id,
}: PricingCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />
          <div className={styles.compactList}>
            {plans.map((plan, index) => (
              <article className={styles.compactPlan} key={`${plan.name}-${index}`}>
                <div>
                  <Heading as="h3" variant="subtitle">
                    {plan.name}
                  </Heading>
                  {plan.description && <Text>{plan.description}</Text>}
                </div>
                <p className={styles.price}>
                  {plan.price}
                  {plan.period && <span className={styles.period}> {plan.period}</span>}
                </p>
                <Button
                  href={plan.action.href}
                  variant={plan.action.variant ?? "secondary"}
                >
                  {plan.action.label}
                </Button>
              </article>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
