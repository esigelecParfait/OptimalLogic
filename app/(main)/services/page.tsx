import Image from "next/image";

import {
  CtaBand,
  FaqColumns,
  HeroCentered,
  HeroSplit,
  NarrativeMosaic,
  WorkflowPipeline,
} from "@/components/blocks";
import marketingStyles from "@/components/marketing/marketing.module.css";
import { MotionReveal } from "@/components/motion";

const contexts = [
  {
    label: "Commerce local",
    title: "Ne plus perdre une demande quand l’équipe est occupée",
    description:
      "Réception des appels et SMS, qualification initiale, réponse aux questions simples et transfert humain lorsque la demande l’exige.",
    featured: true,
  },
  {
    label: "TPE / PME",
    title: "Transformer les demandes dispersées en travail priorisé",
    description:
      "Formulaires, devis, messages et rendez-vous suivent des règles communes pour que la prochaine action soit claire.",
  },
  {
    label: "Startup",
    title: "Faire émerger les vrais signaux du marché",
    description:
      "Les demandes de démo, inscriptions et retours sont qualifiés pour distinguer curiosité, intention et opportunité à traiter.",
  },
];

const workflow = [
  {
    label: "01 · Recevoir",
    title: "Conserver les canaux familiers",
    description:
      "Le prospect continue d’appeler, d’écrire ou de réserver comme il en a l’habitude.",
  },
  {
    label: "02 · Comprendre",
    title: "Qualifier selon votre activité",
    description:
      "Motif, urgence, disponibilité et informations utiles sont extraits selon des règles validées.",
  },
  {
    label: "03 · Décider",
    title: "Filtrer ou transférer",
    description:
      "L’IA traite le cadre prévu ; l’humain reprend la main dès qu’une réponse ou décision l’engage.",
  },
  {
    label: "04 · Continuer",
    title: "Garder la prochaine action",
    description:
      "Notification, relance ou transmission évitent que la demande disparaisse après le premier contact.",
  },
];

const faq = [
  {
    question: "Faut-il changer notre numéro de téléphone ?",
    answer:
      "Non par principe. Le fonctionnement privilégié conserve le numéro actuel et transfère vers l’IA lorsque personne ne répond, sous réserve de compatibilité technique.",
  },
  {
    question: "L’IA répond-elle toujours seule ?",
    answer:
      "Non. Elle intervient d’abord sur le périmètre défini, puis transfère à un humain dès qu’une demande sort des règles, devient sensible ou nécessite une décision.",
  },
  {
    question: "Sommes-nous obligés de prendre un abonnement ?",
    answer:
      "L’installation est conçue pour rester utilisable après la livraison. Le suivi est facultatif et sert aux mises à jour, contrôles et optimisations continues.",
  },
  {
    question: "Installez-vous forcément un nouveau site ?",
    answer:
      "Non. Pour la gestion des demandes d’un commerce, le site n’est pas le point de départ. Nous partons des canaux déjà utilisés et n’ajoutons un outil que s’il résout un problème réel.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <MotionReveal
        className={marketingStyles.heroOffset}
        preset="rise"
        presetId="reveal-copy"
      >
        <HeroCentered
          id="services"
          eyebrow="Services OptimalLogic"
          title="Le problème n’est pas de recevoir plus de notifications. C’est de mieux traiter les demandes."
          description="Nous intervenons sur deux continuités : être clairement choisi en ligne, puis recevoir, qualifier et transmettre chaque demande sans ajouter de complexité inutile."
          primaryAction={{ label: "Voir le parcours", href: "#gestion-demandes" }}
          secondaryAction={{
            label: "Parler de mon activité",
            href: "/prise-de-rdv",
            variant: "secondary",
          }}
        />
      </MotionReveal>

      <MotionReveal preset="fade" presetId="reveal-copy">
        <HeroSplit
          id="gestion-demandes"
          headingAs="h2"
          eyebrow="Une base commune, trois contextes"
          title="Le système s’adapte au métier ; il ne force pas le métier à s’adapter au système."
          description="Commerce, entreprise et startup n’ont pas les mêmes signaux, les mêmes urgences ni les mêmes personnes à mobiliser. Les règles de traitement restent donc propres à chaque contexte."
          primaryAction={{ label: "Décrire mon besoin", href: "/contact" }}
          media={{
            ratio: "landscape",
            content: (
              <Image
                alt="Trois structures abstraites distinctes reliées à un même réseau de traitement."
                className={marketingStyles.mediaImage}
                height={1086}
                loading="lazy"
                sizes="(min-width: 80rem) 42rem, (min-width: 64rem) 44vw, 100vw"
                src="/images/refonte-v2/context-system-v1.webp"
                width={1448}
              />
            ),
          }}
          tone="surface"
        />
      </MotionReveal>

      <MotionReveal preset="rise" presetId="reveal-group">
        <NarrativeMosaic
          id="positionnement"
          eyebrow="Selon votre activité"
          title="Le point douloureux change. La méthode reste traçable."
          description="Chaque service relie un problème observable à un parcours, une règle de traitement et une sortie humaine."
          items={contexts}
        />
      </MotionReveal>

      <MotionReveal preset="rise" presetId="flow-progress">
        <WorkflowPipeline
          id="parcours"
          eyebrow="Chaîne de traitement"
          title="Recevoir n’est que la première étape."
          description="La valeur vient de la continuité entre le premier signal et l’action suivante."
          steps={workflow}
          outcome={{
            label: "Résultat attendu",
            title: "Une demande exploitable",
            description:
              "Le bon interlocuteur reçoit le contexte nécessaire, sans que le prospect doive tout recommencer.",
          }}
        />
      </MotionReveal>

      <MotionReveal preset="fade" presetId="reveal-copy">
        <FaqColumns
          id="questions"
          eyebrow="Questions fréquentes"
          title="Ce que le système change — et ce qu’il ne change pas."
          items={faq}
        />
      </MotionReveal>

      <MotionReveal preset="fade" presetId="reveal-copy">
        <CtaBand
          eyebrow="Diagnostic"
          title="Partons de trois demandes que vous avez réellement reçues."
          description="Elles suffisent souvent à révéler les pertes, les règles manquantes et le bon périmètre d’installation."
          primaryAction={{ label: "Prendre rendez-vous", href: "/prise-de-rdv" }}
          secondaryAction={{
            label: "Nous écrire",
            href: "/contact",
            variant: "secondary",
          }}
        />
      </MotionReveal>
    </main>
  );
}
