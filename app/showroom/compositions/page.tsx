import type { ReactNode } from "react";

import {
  BookingCompact,
  BookingPanel,
  BookingSplit,
  BookingSteps,
  ContactDirectory,
  ContactMinimal,
  ContactPanel,
  ContactSplit,
  FaqColumns,
  FaqGrouped,
  FaqList,
  FaqSplit,
  GalleryArchive,
  GalleryEditorial,
  GalleryGrid,
  GallerySpotlight,
  HeroBento,
  HeroCentered,
  HeroEditorial,
  HeroPanel,
  HeroSignal,
  HeroSplit,
  PricingCards,
  PricingCompact,
  PricingComparison,
  PricingFeatured,
  ProofCaseStudy,
  ProofLogoCloud,
  ProofMetricsBand,
  ProofQuote,
  ProofStats,
  ProofWall,
  ServicesBento,
  ServicesEditorial,
  ServicesFeatured,
  ServicesGrid,
  ServicesIndex,
  ServicesRail,
  type FaqItem,
} from "@/components/blocks";
import { Button, Stack } from "@/components/primitives";
import { ThemePreview } from "../foundations/ThemePreview";

import styles from "./compositions.module.css";

const action = { label: "Découvrir", href: "#contact" };
const media = { label: "Composition visuelle autorisée", ratio: "landscape" as const };
const intro = {
  eyebrow: "Démonstration",
  title: "Une composition qui organise la décision",
  description:
    "Le contenu est neutre : seule la structure, la hiérarchie et le rythme sont évalués.",
};
const services = [
  {
    title: "Clarifier",
    description: "Structurer le besoin et rendre la prochaine action évidente.",
    href: "#contact",
  },
  {
    title: "Construire",
    description: "Assembler une expérience cohérente avec l’identité choisie.",
    href: "#contact",
  },
  {
    title: "Mesurer",
    description: "Vérifier la qualité avant la mise à disposition.",
    href: "#contact",
  },
  {
    title: "Améliorer",
    description: "Faire évoluer le dispositif sans casser ses fondations.",
    href: "#contact",
  },
];
const plans = [
  {
    name: "Essentiel",
    price: "Prix validé à fournir",
    features: ["Périmètre défini", "Livraison documentée"],
    action,
  },
  {
    name: "Évolution",
    price: "Prix validé à fournir",
    features: ["Périmètre défini", "Livraison documentée", "Suivi optionnel"],
    action,
    highlighted: true,
    badge: "À comparer",
  },
  {
    name: "Sur mesure",
    price: "Sur devis",
    features: ["Cadrage spécifique", "Livraison documentée"],
    action,
  },
];
const gallery = [1, 2, 3, 4].map((item) => ({
  ...media,
  title: `Réalisation ${item}`,
  caption: "Cas autorisé à documenter.",
}));
const stats = [
  { value: "—", label: "Indicateur vérifié", detail: "Source à fournir" },
  { value: "—", label: "Résultat mesuré", detail: "Période à préciser" },
  { value: "—", label: "Satisfaction", detail: "Méthode à documenter" },
];
const logos = [
  "Référence autorisée A",
  "Référence autorisée B",
  "Référence autorisée C",
  "Référence autorisée D",
].map((name) => ({ name }));
const faq: FaqItem[] = [
  {
    question: "Que comprend la prestation ?",
    answer: "La réponse finale doit provenir du contenu validé.",
  },
  {
    question: "Quel est le délai ?",
    answer: "Le délai est affiché uniquement lorsqu’il a été confirmé.",
  },
  {
    question: "Le suivi est-il obligatoire ?",
    answer: "Le caractère facultatif ou obligatoire doit être explicite.",
  },
  {
    question: "Comment commencer ?",
    answer: "L’action suivante doit être simple et immédiatement compréhensible.",
  },
];
const channels = [
  {
    label: "E-mail",
    value: "contact@exemple.fr",
    href: "mailto:contact@exemple.fr",
    detail: "Adresse de démonstration",
  },
  { label: "Téléphone", value: "+33 0 00 00 00 00", detail: "Numéro validé à fournir" },
  {
    label: "Disponibilité",
    value: "Horaires à confirmer",
    detail: "Aucune disponibilité inventée",
  },
];
const steps = [
  { title: "Choisir", description: "Sélectionner le motif du rendez-vous." },
  { title: "Planifier", description: "Retenir un créneau réellement disponible." },
  { title: "Confirmer", description: "Recevoir les informations utiles." },
];

function ContactForm() {
  return (
    <form className={styles.form}>
      <label className={styles.field}>
        Nom
        <input name="name" autoComplete="name" />
      </label>
      <label className={styles.field}>
        E-mail
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label className={styles.field}>
        Message
        <textarea name="message" />
      </label>
      <Button type="submit">Prévisualiser l’envoi</Button>
    </form>
  );
}
function Scheduler() {
  return (
    <Stack gap="medium">
      <strong>Créneaux de démonstration</strong>
      <div className={styles.scheduler}>
        {["09:00", "10:30", "14:00", "16:30"].map((slot) => (
          <button className={styles.slot} type="button" key={slot}>
            {slot}
          </button>
        ))}
      </div>
      <Button href="#contact">Continuer</Button>
    </Stack>
  );
}
function Variant({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className={styles.variant} data-variant={name}>
      <p className={styles.label}>{name}</p>
      {children}
    </div>
  );
}
function Family({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section className={styles.family} id={id}>
      <header className={styles.familyHeader}>
        <div>
          <h2>{title}</h2>
          <p>{count} variantes réutilisables</p>
        </div>
      </header>
      {children}
    </section>
  );
}

export default function CompositionsShowroom() {
  return (
    <ThemePreview>
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <p>Étape 4 · Catalogue public</p>
            <h1>38 compositions, huit familles</h1>
            <p>
              Chaque bloc utilise les mêmes contrats sémantiques sous les huit thèmes. Les
              preuves, prix et disponibilités de cette page sont volontairement
              neutralisés.
            </p>
            <nav aria-label="Familles">
              <ul className={styles.index}>
                {[
                  ["hero", "Heros"],
                  ["services", "Services"],
                  ["pricing", "Tarifs"],
                  ["gallery", "Réalisations"],
                  ["proof", "Preuves"],
                  ["faq", "FAQ"],
                  ["contact", "Contact"],
                  ["booking", "Réservation"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={`#${href}`}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <Family id="hero" title="Heros" count={6}>
          <Variant name="HeroSplit">
            <HeroSplit {...intro} headingAs="h2" media={media} primaryAction={action} />
          </Variant>
          <Variant name="HeroCentered">
            <HeroCentered
              {...intro}
              headingAs="h2"
              media={media}
              primaryAction={action}
            />
          </Variant>
          <Variant name="HeroEditorial">
            <HeroEditorial
              {...intro}
              headingAs="h2"
              aside={{
                label: "Repère",
                text: "Une note latérale donne du contexte sans détourner du message.",
              }}
              media={media}
              primaryAction={action}
            />
          </Variant>
          <Variant name="HeroPanel">
            <HeroPanel
              {...intro}
              headingAs="h2"
              media={media}
              note="Information secondaire validée"
              primaryAction={action}
            />
          </Variant>
          <Variant name="HeroBento">
            <HeroBento
              {...intro}
              headingAs="h2"
              media={media}
              highlights={["Message", "Preuve", "Action"]}
              primaryAction={action}
            />
          </Variant>
          <Variant name="HeroSignal">
            <HeroSignal
              {...intro}
              headingAs="h2"
              signals={["Besoin compris", "Solution cadrée", "Décision simple"]}
              primaryAction={action}
            />
          </Variant>
        </Family>
        <Family id="services" title="Services" count={6}>
          <Variant name="ServicesGrid">
            <ServicesGrid {...intro} services={services} />
          </Variant>
          <Variant name="ServicesEditorial">
            <ServicesEditorial {...intro} services={services} />
          </Variant>
          <Variant name="ServicesFeatured">
            <ServicesFeatured {...intro} services={services} />
          </Variant>
          <Variant name="ServicesRail">
            <ServicesRail {...intro} services={services} />
          </Variant>
          <Variant name="ServicesBento">
            <ServicesBento {...intro} services={services} />
          </Variant>
          <Variant name="ServicesIndex">
            <ServicesIndex {...intro} services={services} />
          </Variant>
        </Family>
        <Family id="pricing" title="Tarifs" count={4}>
          <Variant name="PricingCards">
            <PricingCards {...intro} plans={plans} />
          </Variant>
          <Variant name="PricingFeatured">
            <PricingFeatured {...intro} plans={plans} />
          </Variant>
          <Variant name="PricingComparison">
            <PricingComparison {...intro} plans={plans} />
          </Variant>
          <Variant name="PricingCompact">
            <PricingCompact {...intro} plans={plans} />
          </Variant>
        </Family>
        <Family id="gallery" title="Réalisations" count={4}>
          <Variant name="GalleryGrid">
            <GalleryGrid {...intro} items={gallery} />
          </Variant>
          <Variant name="GallerySpotlight">
            <GallerySpotlight {...intro} items={gallery} />
          </Variant>
          <Variant name="GalleryEditorial">
            <GalleryEditorial {...intro} items={gallery} />
          </Variant>
          <Variant name="GalleryArchive">
            <GalleryArchive {...intro} items={gallery} />
          </Variant>
        </Family>
        <Family id="proof" title="Preuves" count={6}>
          <Variant name="ProofLogoCloud">
            <ProofLogoCloud {...intro} logos={logos} />
          </Variant>
          <Variant name="ProofStats">
            <ProofStats {...intro} stats={stats} />
          </Variant>
          <Variant name="ProofQuote">
            <ProofQuote
              eyebrow="Citation autorisée"
              quote="Témoignage vérifié à fournir avant publication."
              authorName="Identité à confirmer"
            />
          </Variant>
          <Variant name="ProofWall">
            <ProofWall {...intro} logos={logos} />
          </Variant>
          <Variant name="ProofCaseStudy">
            <ProofCaseStudy
              {...intro}
              challenge="Contexte documenté à fournir."
              outcome="Résultat sourcé à fournir."
              media={media}
            />
          </Variant>
          <Variant name="ProofMetricsBand">
            <ProofMetricsBand {...intro} stats={stats} />
          </Variant>
        </Family>
        <Family id="faq" title="FAQ" count={4}>
          <Variant name="FaqList">
            <FaqList {...intro} items={faq} />
          </Variant>
          <Variant name="FaqColumns">
            <FaqColumns {...intro} items={faq} />
          </Variant>
          <Variant name="FaqSplit">
            <FaqSplit {...intro} items={faq} action={action} />
          </Variant>
          <Variant name="FaqGrouped">
            <FaqGrouped
              {...intro}
              groups={[
                { title: "Avant de commencer", items: faq.slice(0, 2) },
                { title: "Après la livraison", items: faq.slice(2) },
              ]}
            />
          </Variant>
        </Family>
        <Family id="contact" title="Contact" count={4}>
          <Variant name="ContactSplit">
            <ContactSplit
              {...intro}
              channels={channels}
              action={action}
              form={<ContactForm />}
            />
          </Variant>
          <Variant name="ContactPanel">
            <ContactPanel {...intro} channels={channels} action={action} />
          </Variant>
          <Variant name="ContactDirectory">
            <ContactDirectory {...intro} channels={channels} action={action} />
          </Variant>
          <Variant name="ContactMinimal">
            <ContactMinimal {...intro} channels={channels} action={action} />
          </Variant>
        </Family>
        <Family id="booking" title="Réservation" count={4}>
          <Variant name="BookingSplit">
            <BookingSplit
              {...intro}
              steps={steps}
              action={action}
              scheduler={<Scheduler />}
            />
          </Variant>
          <Variant name="BookingSteps">
            <BookingSteps {...intro} steps={steps} action={action} />
          </Variant>
          <Variant name="BookingPanel">
            <BookingPanel
              {...intro}
              steps={steps}
              action={action}
              scheduler={<Scheduler />}
            />
          </Variant>
          <Variant name="BookingCompact">
            <BookingCompact {...intro} steps={steps} action={action} />
          </Variant>
        </Family>
      </main>
    </ThemePreview>
  );
}
