import type { Metadata } from "next";
import Image from "next/image";
import { MessagesSquare, ScanSearch, Sparkles } from "lucide-react";

import {
  CtaSplit,
  HeroSplit,
  NarrativeManifesto,
  ProcessTimeline,
  ServicesFeatured,
} from "@/components/blocks";
import { DemandFlow } from "@/components/marketing/DemandFlow";
import marketingStyles from "@/components/marketing/marketing.module.css";
import { MotionReveal } from "@/components/motion";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Image en ligne & demandes clients",
  description:
    "OptimalLogic renforce votre image en ligne et installe un système IA simple pour recevoir, qualifier et transmettre vos demandes clients.",
  path: "/",
});

const services = [
  {
    title: "Réception et qualification des demandes",
    description:
      "Appels, SMS, devis, formulaires et rendez-vous sont reçus, compris et orientés avec l’IA, puis transmis à l’humain quand il le faut.",
    href: "/services#gestion-demandes",
    icon: (
      <span className={marketingStyles.iconBadge}>
        <MessagesSquare aria-hidden size={20} strokeWidth={1.7} />
      </span>
    ),
  },
  {
    title: "Image et positionnement en ligne",
    description:
      "Votre présence en ligne devient plus claire, cohérente et rassurante au moment où un prospect compare ses options.",
    href: "/services#positionnement",
    icon: (
      <span className={marketingStyles.iconBadge}>
        <ScanSearch aria-hidden size={20} strokeWidth={1.7} />
      </span>
    ),
  },
  {
    title: "Suivi et optimisation, si vous le choisissez",
    description:
      "L’installation reste utilisable sans abonnement. Le suivi facultatif sert ensuite à ajuster les règles, contenus et parcours.",
    href: "/tarifs",
    icon: (
      <span className={marketingStyles.iconBadge}>
        <Sparkles aria-hidden size={20} strokeWidth={1.7} />
      </span>
    ),
  },
];

const steps = [
  {
    title: "Observer les demandes réelles",
    description:
      "Nous partons des appels, messages, devis et rendez-vous que vous recevez déjà, pas d’une démonstration générique.",
  },
  {
    title: "Définir les règles de traitement",
    description:
      "Nous cadrons ce que l’IA peut comprendre, ce qui doit être filtré et le moment exact où un humain reprend la main.",
  },
  {
    title: "Installer le système chez vous",
    description:
      "Les canaux, réponses, notifications et transmissions sont configurés pour rester simples à utiliser après la livraison.",
  },
  {
    title: "Tester les cas qui coûtent cher",
    description:
      "Urgence, indisponibilité, demande incomplète et échec d’envoi sont vérifiés avant de considérer le parcours terminé.",
  },
];

export default function HomePage() {
  return (
    <main>
      <MotionReveal
        className={marketingStyles.heroOffset}
        preset="rise"
        presetId="reveal-copy"
      >
        <HeroSplit
          id="accueil"
          eyebrow="OptimalLogic · réception et traitement des demandes"
          title="Vos demandes arrivent de partout. Elles doivent mener quelque part."
          description="OptimalLogic renforce votre image en ligne et installe un système simple pour recevoir, qualifier, filtrer et transmettre les demandes de vos prospects et clients."
          primaryAction={{ label: "Découvrir le système", href: "#demandes" }}
          secondaryAction={{
            label: "Prendre rendez-vous",
            href: "/prise-de-rdv",
            variant: "secondary",
          }}
          media={{
            ratio: "wide",
            content: (
              <Image
                alt="Architecture abstraite sombre traversée par plusieurs signaux qui convergent vers un point de décision."
                className={`${marketingStyles.mediaImage} ${marketingStyles.heroImage}`}
                height={992}
                preload
                sizes="(min-width: 80rem) 44rem, (min-width: 64rem) 45vw, 100vw"
                src="/images/refonte-v2/hero-signal-house-v1.webp"
                width={1586}
              />
            ),
          }}
        />
      </MotionReveal>

      <DemandFlow />

      <MotionReveal preset="rise" presetId="reveal-group">
        <ServicesFeatured
          id="solutions"
          eyebrow="Deux services, une continuité"
          title="Être choisi en ligne ne suffit pas si la demande se perd ensuite."
          description="La visibilité crée l’occasion. Le système de réception et de qualification transforme cette occasion en prochaine action claire."
          services={services}
        />
      </MotionReveal>

      <MotionReveal preset="fade" presetId="reveal-copy">
        <NarrativeManifesto
          id="methode"
          eyebrow="Notre principe"
          statement="Moins d’outils à piloter. Plus de demandes réellement traitées."
          body="Nous construisons le parcours autour du fonctionnement du commerce ou de l’entreprise. L’IA intervient d’abord sur les tâches définies ; l’humain garde les décisions et les échanges qui l’exigent."
          principles={[
            "Un système livré et utilisable sans dépendance quotidienne à OptimalLogic.",
            "Aucune réponse engageante envoyée sans règle et sans possibilité d’escalade.",
            "Aucun faux chiffre, faux client ou faux écran utilisé comme preuve.",
          ]}
        />
      </MotionReveal>

      <MotionReveal preset="rise" presetId="reveal-group">
        <ProcessTimeline
          id="installation"
          eyebrow="Installation"
          title="Du problème observé au système utilisable."
          description="Chaque étape produit une décision vérifiable et prépare la suivante."
          steps={steps}
        />
      </MotionReveal>

      <MotionReveal preset="fade" presetId="reveal-copy">
        <CtaSplit
          id="diagnostic"
          eyebrow="Prochaine étape"
          title="Montrez-nous comment vos demandes arrivent aujourd’hui."
          description="En un premier échange, nous identifions les pertes, les priorités et le périmètre d’installation utile."
          primaryAction={{ label: "Prendre rendez-vous", href: "/prise-de-rdv" }}
          secondaryAction={{
            label: "Nous écrire",
            href: "/contact",
            variant: "secondary",
          }}
          note="Le système s’intègre à votre fonctionnement sans imposer un nouvel outil à vos équipes."
        />
      </MotionReveal>
    </main>
  );
}
