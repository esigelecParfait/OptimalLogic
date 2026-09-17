import type { Metadata } from "next";
import {
  Container,
  Stack,
  Grid,
  Heading,
  Text,
  Surface,
  Button,
  Section,
  Eyebrow,
} from "@/components/primitives";
import { FormField } from "@/components/primitives/FormField";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ThemePreview } from "./ThemePreview";
import { DemoForm } from "./DemoForm";
import styles from "./foundations.module.css";

export const metadata: Metadata = {
  title: "Fondations — 8 identités",
  robots: { index: false, follow: false },
};

export default function Foundations() {
  return (
    <ThemePreview>
      <SiteHeader
        brand="Atelier / Modèle"
        homeHref="/"
        links={[
          { label: "Composants", href: "#components" },
          { label: "Compositions", href: "/showroom/compositions" },
          { label: "Layouts", href: "/showroom/layouts" },
          { label: "Motion", href: "/showroom/motion" },
        ]}
        account={{ label: "Connexion", href: "#account" }}
      />
      <main id="main-content">
        <Section>
          <Container size="wide">
            <Stack gap="large">
              <Eyebrow>Collection 01 / Fondations</Eyebrow>
              <Heading as="h1" variant="display">
                Une identité cohérente, jusque dans les détails.
              </Heading>
              <Text variant="lead">
                Explorez huit univers à travers les mêmes composants : une base commune
                pour des sites et des espaces clients singuliers.
              </Text>
              <div className={styles.actions}>
                <Button href="#components">Explorer les composants</Button>
                <Button href="#form" variant="secondary">
                  Tester les interactions
                </Button>
              </div>
              <div className={styles.swatches} aria-label="Palette du thème">
                {["canvas", "surface", "surface-muted", "text", "action"].map((role) => (
                  <div key={role}>
                    <span style={{ background: "var(--color-" + role + ")" }} />
                    <small>{role}</small>
                  </div>
                ))}
              </div>
            </Stack>
          </Container>
        </Section>
        <Section id="components" treatment="soft">
          <Container>
            <Stack gap="large">
              <Heading as="h2" variant="title">
                Surfaces, rythme et hiérarchie
              </Heading>
              <Grid columns={3} gap="medium">
                <Surface appearance="open">
                  <Stack gap="medium">
                    <Eyebrow>01 / Structure</Eyebrow>
                    <Heading as="h3" variant="subtitle">
                      Le bon espace
                    </Heading>
                    <Text>Des marges et des largeurs de lecture partagées.</Text>
                  </Stack>
                </Surface>
                <Surface appearance="line">
                  <Stack gap="medium">
                    <Eyebrow>02 / Profondeur</Eyebrow>
                    <Heading as="h3" variant="subtitle">
                      Une priorité visible
                    </Heading>
                    <Text>Une surface surélevée pour attirer l’attention.</Text>
                  </Stack>
                </Surface>
                <Surface appearance="soft">
                  <Stack gap="medium">
                    <Eyebrow>03 / Confort</Eyebrow>
                    <Heading as="h3" variant="subtitle">
                      Une lecture fluide
                    </Heading>
                    <Text>Les textes et leurs contrastes suivent le thème.</Text>
                  </Stack>
                </Surface>
                <Surface appearance="floating">
                  <Stack gap="medium">
                    <Eyebrow>04 / Focus</Eyebrow>
                    <Heading as="h3" variant="subtitle">
                      Un plan flottant
                    </Heading>
                    <Text>Réservé aux moments qui demandent une priorité nette.</Text>
                  </Stack>
                </Surface>
                <Surface appearance="layered">
                  <Stack gap="medium">
                    <Eyebrow>05 / Strates</Eyebrow>
                    <Heading as="h3" variant="subtitle">
                      Une profondeur calme
                    </Heading>
                    <Text>Une composition nuancée, sans empiler des cartes.</Text>
                  </Stack>
                </Surface>
                <Surface appearance="immersive">
                  <Stack gap="medium">
                    <Eyebrow>06 / Immersion</Eyebrow>
                    <Heading as="h3" variant="subtitle">
                      Un changement de scène
                    </Heading>
                    <Text>Une atmosphère pleine largeur pour ponctuer le récit.</Text>
                  </Stack>
                </Surface>
              </Grid>
              <Surface appearance="line">
                <Stack gap="medium">
                  <Heading as="h3" variant="subtitle">
                    Actions et états
                  </Heading>
                  <div className={styles.actions}>
                    <Button size="small">Petit</Button>
                    <Button>Standard</Button>
                    <Button size="large">Grand</Button>
                    <Button variant="secondary">Secondaire</Button>
                    <Button
                      variant="text"
                      href="#form"
                      aria-label="Accéder au formulaire"
                    >
                      Lien
                    </Button>
                    <Button disabled>Indisponible</Button>
                    <Button loading>Envoyer</Button>
                  </div>
                </Stack>
              </Surface>
            </Stack>
          </Container>
        </Section>
        <Section id="form">
          <Container>
            <Grid columns={2} gap="large">
              <Stack gap="large">
                <Eyebrow>Interaction / Formulaires</Eyebrow>
                <Heading as="h2" variant="title">
                  Chaque état mérite la même attention.
                </Heading>
                <Text>
                  Champs associés à leurs libellés, aide explicite, focus visible et
                  validation native.
                </Text>
                <FormField
                  id="error-example"
                  label="Exemple d’erreur"
                  defaultValue="adresse-incomplete"
                  error="Saisissez une adresse email complète."
                />
                <FormField
                  id="disabled-example"
                  label="Champ indisponible"
                  disabled
                  defaultValue="En attente de validation"
                />
                <p className={styles.success}>
                  Exemple : votre demande a bien été enregistrée.
                </p>
              </Stack>
              <Surface elevation="raised" padding="large">
                <DemoForm />
              </Surface>
            </Grid>
          </Container>
        </Section>
        <Section id="account" treatment="line">
          <Container>
            <Heading as="h2" variant="title">
              Accès au compte
            </Heading>
            <Text>
              Emplacement de démonstration du lien Connexion. Le parcours
              d’authentification sera intégré à son étape dédiée.
            </Text>
          </Container>
        </Section>
      </main>
      <footer className={styles.footer}>
        <Container>
          <Text variant="small">Dépôt modèle · Démonstration interne des fondations</Text>
        </Container>
      </footer>
    </ThemePreview>
  );
}
