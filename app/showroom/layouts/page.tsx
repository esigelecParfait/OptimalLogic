import {
  BookingCompact,
  ContactMinimal,
  ContactPanel,
  ContactSplit,
  CtaBand,
  FaqColumns,
  FaqSplit,
  GalleryEditorial,
  GallerySpotlight,
  HeroBento,
  HeroEditorial,
  HeroPanel,
  HeroSignal,
  PricingCompact,
  PricingFeatured,
  ProofCaseStudy,
  ProofMetricsBand,
  ServicesBento,
  ServicesEditorial,
  ServicesIndex,
  ServicesRail,
} from "@/components/blocks";
import { ThemePreview } from "../foundations/ThemePreview";

import styles from "./layouts.module.css";

const action = { label: "Parler du projet", href: "#contact" };
const media = { label: "Média ou composition code-native", ratio: "landscape" as const };
const intro = {
  eyebrow: "Layout de démonstration",
  title: "Un parcours public complet et cohérent",
  description:
    "Ces contenus neutres permettent d’évaluer l’enchaînement des blocs sans inventer de promesse commerciale.",
};
const services = ["Diagnostic", "Conception", "Déploiement", "Suivi"].map((title) => ({
  title,
  description: "Description validée à injecter depuis les données du projet.",
  href: "#contact",
}));
const channels = [
  { label: "E-mail", value: "contact@exemple.fr", href: "mailto:contact@exemple.fr" },
  { label: "Téléphone", value: "Coordonnée à confirmer" },
];
const steps = [
  { title: "Cadrage", description: "Comprendre le besoin." },
  { title: "Créneau", description: "Choisir une disponibilité réelle." },
  { title: "Confirmation", description: "Préparer l’échange." },
];
const plans = [
  {
    name: "Point de départ",
    price: "Prix à confirmer",
    features: ["Périmètre validé", "Livraison documentée"],
    action,
  },
  {
    name: "Développement",
    price: "Sur devis",
    features: ["Cadrage spécifique", "Suivi facultatif"],
    action,
    highlighted: true,
  },
];
const faq = [
  {
    question: "Quelle est la prochaine étape ?",
    answer: "La réponse validée sera injectée ici.",
  },
  {
    question: "Comment se déroule la livraison ?",
    answer: "Le processus contractuel du projet remplacera ce texte.",
  },
];

export default function LayoutShowroom() {
  return (
    <ThemePreview>
      <main className={styles.page}>
        <header className={styles.header}>
          <p>Étape 4 · Showroom layouts</p>
          <h1>Quatre rythmes de pages publiques</h1>
          <p>
            Chaque layout assemble des variantes différentes et reste compatible avec les
            huit thèmes.
          </p>
          <nav aria-label="Layouts">
            <ul className={styles.nav}>
              {[
                ["conversion", "Conversion"],
                ["editorial", "Éditorial"],
                ["showcase", "Showcase"],
                ["local", "Service local"],
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <div className={styles.layout} id="conversion">
          <h2 className={styles.layoutTitle}>Layout 01 · Conversion structurée</h2>
          <HeroPanel {...intro} headingAs="h2" media={media} primaryAction={action} />
          <ServicesBento {...intro} services={services} />
          <ProofMetricsBand
            {...intro}
            stats={[
              { value: "—", label: "Résultat sourcé" },
              { value: "—", label: "Indicateur vérifié" },
            ]}
          />
          <PricingFeatured {...intro} plans={plans} />
          <FaqSplit {...intro} items={faq} action={action} />
          <ContactPanel {...intro} channels={channels} action={action} id="contact" />
        </div>
        <div className={styles.layout} id="editorial">
          <h2 className={styles.layoutTitle}>Layout 02 · Éditorial manifeste</h2>
          <HeroEditorial
            {...intro}
            headingAs="h2"
            aside={{ text: "Une note courte apporte le contexte utile." }}
            primaryAction={action}
          />
          <ServicesEditorial {...intro} services={services} />
          <GalleryEditorial {...intro} items={[media, media, media]} />
          <ProofCaseStudy
            {...intro}
            challenge="Situation à documenter."
            outcome="Résultat à sourcer."
            media={media}
          />
          <PricingCompact {...intro} plans={plans} />
          <CtaBand {...intro} primaryAction={action} />
        </div>
        <div className={styles.layout} id="showcase">
          <h2 className={styles.layoutTitle}>Layout 03 · Produit et réalisations</h2>
          <HeroBento
            {...intro}
            headingAs="h2"
            media={media}
            highlights={["Clarté", "Preuve", "Action"]}
            primaryAction={action}
          />
          <ServicesRail {...intro} services={services} />
          <GallerySpotlight {...intro} items={[media, media, media]} />
          <FaqColumns {...intro} items={faq} />
          <ContactSplit {...intro} channels={channels} action={action} />
        </div>
        <div className={styles.layout} id="local">
          <h2 className={styles.layoutTitle}>Layout 04 · Service local direct</h2>
          <HeroSignal
            {...intro}
            headingAs="h2"
            signals={["Besoin", "Réponse", "Rendez-vous"]}
            primaryAction={action}
          />
          <ServicesIndex {...intro} services={services} />
          <BookingCompact {...intro} steps={steps} action={action} />
          <ContactMinimal {...intro} channels={channels} action={action} />
        </div>
      </main>
    </ThemePreview>
  );
}
