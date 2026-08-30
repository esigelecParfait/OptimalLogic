import type { Metadata } from "next";

import {
  CtaBand,
  CtaCentered,
  CtaSplit,
  FaqColumns,
  FaqList,
  GalleryGrid,
  GallerySpotlight,
  HeroCentered,
  HeroEditorial,
  HeroSplit,
  MetricsDashboard,
  MetricsStrip,
  NarrativeManifesto,
  NarrativeMosaic,
  PricingCards,
  PricingFeatured,
  ProcessSteps,
  ProcessTimeline,
  ProofLogoCloud,
  ProofQuote,
  ProofStats,
  ServicesEditorial,
  ServicesFeatured,
  ServicesGrid,
  TeamGrid,
  TeamSpotlight,
  WorkflowPipeline,
  WorkflowRouting,
} from "../../components/blocks";
import { MotionReveal } from "../../components/motion";
import { Stack } from "../../components/primitives";

import {
  showroomFaq,
  showroomGallery,
  showroomMetrics,
  showroomNarrative,
  showroomPricing,
  showroomProcess,
  showroomServices,
  showroomTeam,
  showroomWorkflow,
} from "./showroom-data";
import styles from "./showroom.module.css";

// Le showroom est un outil interne et ne doit jamais apparaître dans Google.
export const metadata: Metadata = {
  title: "OptimalLogic — Showroom des blocs",
  robots: {
    index: false,
    follow: false,
  },
};

// Identifie visuellement la variante affichée sans appartenir au bloc lui-même.
function VariantLabel({ children }: { children: string }) {
  return <p className={styles.variantLabel}>{children}</p>;
}

const primaryAction = {
  label: "Action principale",
  href: "#showroom-top",
} as const;

const secondaryAction = {
  label: "Action secondaire",
  href: "#showroom-top",
} as const;

// Cette page renvoie les 28 variantes avec des contenus explicitement fictifs.
export default function ShowroomPage() {
  return (
    <main className={styles.showroom} id="showroom-top">
      <header className={styles.header}>
        <Stack className={styles.headerInner} gap="medium">
          <p className={styles.notice}>Interne — ne pas publier</p>
          <h1 className={styles.title}>Showroom des blocs OptimalLogic</h1>
          <p className={styles.description}>
            Cette route vérifie les compositions du dépôt modèle. Toutes les données
            visibles sont des placeholders et doivent être remplacées par un site-spec
            validé avant livraison.
          </p>
          <nav aria-label="Familles de blocs">
            <ul className={styles.nav}>
              <li>
                <a href="#heroes">Heroes</a>
              </li>
              <li>
                <a href="#narrative">Narration</a>
              </li>
              <li>
                <a href="#proof">Preuves</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#process">Processus</a>
              </li>
              <li>
                <a href="#workflow">Parcours</a>
              </li>
              <li>
                <a href="#metrics">Indicateurs</a>
              </li>
              <li>
                <a href="#gallery">Galeries</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#team">Équipe</a>
              </li>
              <li>
                <a href="#pricing">Tarifs</a>
              </li>
              <li>
                <a href="#cta">CTA</a>
              </li>
            </ul>
          </nav>
        </Stack>
      </header>

      <VariantLabel>HeroSplit</VariantLabel>
      <HeroSplit
        id="heroes"
        headingAs="h2"
        eyebrow="Variante de démonstration"
        title="Proposition de valeur issue du site-spec"
        description="Le titre, le bénéfice et le niveau de preuve seront remplacés pour chaque client."
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        media={{ label: "Média principal autorisé", ratio: "portrait" }}
      />

      <VariantLabel>HeroCentered</VariantLabel>
      <HeroCentered
        headingAs="h2"
        eyebrow="Variante centrée"
        title="Une entrée de page principalement éditoriale"
        description="Cette composition convient lorsque la force du message précède celle du média."
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        media={{ label: "Média panoramique autorisé", ratio: "landscape" }}
        tone="surface"
      />

      <VariantLabel>HeroEditorial</VariantLabel>
      <HeroEditorial
        headingAs="h2"
        eyebrow="Variante éditoriale"
        title="Une hiérarchie plus asymétrique pour une marque distinctive"
        description="La composition reste générique ; la direction artistique client modifiera les tokens et les médias."
        aside={{ label: "Note", text: "Information secondaire validée à insérer." }}
        primaryAction={primaryAction}
        media={{ label: "Visuel éditorial autorisé", ratio: "landscape" }}
        tone="muted"
      />

      <VariantLabel>NarrativeMosaic</VariantLabel>
      <MotionReveal preset="rise">
        <NarrativeMosaic
          id="narrative"
          eyebrow="Narration"
          title="Une hiérarchie éditoriale qui guide la lecture"
          description="Les constats et décisions restent rattachés au contenu validé du projet."
          items={showroomNarrative}
        />
      </MotionReveal>

      <VariantLabel>NarrativeManifesto</VariantLabel>
      <NarrativeManifesto
        eyebrow="Conviction"
        statement="Une idée centrale, formulée sans promesse invérifiable."
        body="Cette composition installe un point de vue puis le rattache à des principes concrets."
        principles={[
          "Principe validé à remplacer",
          "Engagement réel à confirmer",
          "Critère d'acceptation à documenter",
        ]}
      />

      <VariantLabel>ProofLogoCloud</VariantLabel>
      <ProofLogoCloud
        id="proof"
        eyebrow="Preuves"
        title="Logos dont l’utilisation a été autorisée"
        description="Le bloc ne doit être utilisé qu’avec des partenaires ou clients vérifiés."
        logos={[
          { name: "Logo autorisé 01" },
          { name: "Logo autorisé 02" },
          { name: "Logo autorisé 03" },
          { name: "Logo autorisé 04" },
        ]}
      />

      <VariantLabel>ProofStats</VariantLabel>
      <ProofStats
        eyebrow="Indicateurs"
        title="Résultats uniquement après validation des sources"
        stats={[
          { value: "À fournir", label: "Indicateur vérifié 01" },
          { value: "À fournir", label: "Indicateur vérifié 02" },
          { value: "À fournir", label: "Indicateur vérifié 03" },
          { value: "À fournir", label: "Indicateur vérifié 04" },
        ]}
      />

      <VariantLabel>ProofQuote</VariantLabel>
      <ProofQuote
        eyebrow="Citation"
        quote="Citation client validée à insérer ici."
        authorName="Identité à confirmer"
        authorRole="Fonction à confirmer"
        media={{ label: "Portrait autorisé à fournir", ratio: "portrait" }}
      />

      <VariantLabel>ServicesGrid</VariantLabel>
      <ServicesGrid
        id="services"
        eyebrow="Services"
        title="Présentation régulière des prestations"
        description="Chaque carte reçoit ses données depuis le contenu du site client."
        services={showroomServices}
      />

      <VariantLabel>ServicesEditorial</VariantLabel>
      <ServicesEditorial
        eyebrow="Services"
        title="Présentation éditoriale des prestations"
        services={showroomServices}
      />

      <VariantLabel>ServicesFeatured</VariantLabel>
      <ServicesFeatured
        eyebrow="Services"
        title="Une prestation principale, puis les compléments"
        services={showroomServices}
      />

      <VariantLabel>ProcessSteps</VariantLabel>
      <ProcessSteps
        id="process"
        eyebrow="Méthode"
        title="Processus présenté sous forme de cartes"
        steps={showroomProcess}
      />

      <VariantLabel>ProcessTimeline</VariantLabel>
      <ProcessTimeline
        eyebrow="Méthode"
        title="Processus présenté comme une chronologie"
        steps={showroomProcess}
      />

      <VariantLabel>WorkflowPipeline</VariantLabel>
      <WorkflowPipeline
        id="workflow"
        eyebrow="Parcours"
        title="Une transformation expliquée étape par étape"
        description="Le composant représente un flux réel sans préjuger de l'outil utilisé."
        steps={showroomWorkflow}
        outcome={{
          label: "Résultat",
          title: "Une issue explicite",
          description:
            "Le résultat attendu et sa méthode de mesure doivent être confirmés.",
        }}
      />

      <VariantLabel>WorkflowRouting</VariantLabel>
      <WorkflowRouting
        eyebrow="Orchestration"
        title="Plusieurs entrées, une logique de traitement visible"
        description="La composition permet de présenter collecte, décision et suivi sans jargon imposé."
        sources={showroomWorkflow.slice(0, 2)}
        decision={{
          label: "Règle",
          title: "Qualifier selon le contexte",
          description: "Les règles métier restent configurées depuis le projet client.",
        }}
        outcomes={showroomWorkflow.slice(1)}
      />

      <VariantLabel>MetricsDashboard</VariantLabel>
      <MetricsDashboard
        id="metrics"
        eyebrow="Pilotage"
        title="Une lecture synthétique des indicateurs autorisés"
        description="Chaque valeur exige une source, une période et un responsable identifiés."
        metrics={showroomMetrics}
        note="Données fictives — ne pas publier"
      />

      <VariantLabel>MetricsStrip</VariantLabel>
      <MetricsStrip
        eyebrow="Indicateurs"
        title="Une variante compacte pour rythmer une page"
        metrics={showroomMetrics}
      />

      <VariantLabel>GalleryGrid</VariantLabel>
      <GalleryGrid
        id="gallery"
        eyebrow="Galerie"
        title="Mosaïque de médias autorisés"
        items={showroomGallery}
      />

      <VariantLabel>GallerySpotlight</VariantLabel>
      <GallerySpotlight
        eyebrow="Galerie"
        title="Un média principal et ses compléments"
        items={showroomGallery.slice(0, 3)}
      />

      <VariantLabel>FaqList</VariantLabel>
      <FaqList
        id="faq"
        eyebrow="FAQ"
        title="Questions longues dans une colonne"
        items={showroomFaq}
      />

      <VariantLabel>FaqColumns</VariantLabel>
      <FaqColumns
        eyebrow="FAQ"
        title="Questions courtes dans deux colonnes"
        items={showroomFaq}
      />

      <VariantLabel>TeamGrid</VariantLabel>
      <TeamGrid
        id="team"
        eyebrow="Équipe"
        title="Présentation régulière des membres"
        members={showroomTeam}
      />

      <VariantLabel>TeamSpotlight</VariantLabel>
      <TeamSpotlight
        eyebrow="Équipe"
        title="Un profil principal et une équipe secondaire"
        members={showroomTeam}
      />

      <VariantLabel>PricingCards</VariantLabel>
      <PricingCards
        id="pricing"
        eyebrow="Tarifs"
        title="Formules comparables au même niveau"
        description="Les montants et prestations du showroom ne constituent aucune offre."
        plans={showroomPricing}
      />

      <VariantLabel>PricingFeatured</VariantLabel>
      <PricingFeatured
        eyebrow="Tarifs"
        title="Une formule recommandée mise en avant"
        plans={showroomPricing}
      />

      <VariantLabel>CtaCentered</VariantLabel>
      <CtaCentered
        id="cta"
        eyebrow="Action"
        title="Invitation centrée à poursuivre le parcours"
        description="Le texte et la destination seront définis par l’objectif de conversion."
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />

      <VariantLabel>CtaSplit</VariantLabel>
      <CtaSplit
        eyebrow="Action"
        title="Message et actions séparés"
        description="Cette composition convient à une décision qui demande davantage de contexte."
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        note="Condition ou précision validée à afficher près des actions."
      />

      <VariantLabel>CtaBand</VariantLabel>
      <CtaBand
        eyebrow="Action finale"
        title="Dernière étape du parcours"
        description="Aucune mise en production sans destination et contenu validés."
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />
    </main>
  );
}
