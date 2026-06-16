"use client";
//on importe les biblio
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import Link from "next/link";

import "react-phone-number-input/style.css";
// type des elements qui caracterise un pack
type PricingPack = {
  code: string;
  name: string;
  category: string;
  subtitle: string;
  target?: string;
  setupPrice: string;
  monthlyPrice: string;
  highlighted?: boolean;
  setupIncludes: string[];
  monthlyIncludes: string[];
  result: string;
  cta?: string;
};
// type des elements des colonnes de la table Offres 
type DatabaseOffer = {
  code: string;
  nom_offre: string;
  client_type: string;
  prix: number | string | null;
  prix_abonnement: number | string | null;
  is_active: boolean;
  created_at?: string;
};
// Type des ...
type OfferRequestForm = {
  lastname: string;
  firstname: string;
  email: string;
  phoneFullNumber: string;
  company: string;
  businessCity: string;
  activity: string;
  businessWebsiteUrl: string;
  googleBusinessUrl: string;
  objective: string;
  message: string;
  consentRgpd: boolean;
};

type ObjectiveOption = {
  value: string;
  label: string;
};

const objectiveOptions: ObjectiveOption[] = [
  {
    value: "plus_appels_reservations",
    label: "Plus d’appels ou de réservations",
  },
  {
    value: "plus_devis_qualifies",
    label: "Plus de devis ou demandes qualifiées",
  },
  {
    value: "mieux_suivre_prospects",
    label: "Mieux suivre les prospects",
  },
  {
    value: "ameliorer_image",
    label: "Améliorer mon image professionnelle",
  },
  {
    value: "lancer_offre",
    label: "Lancer ou tester une offre",
  },
  {
    value: "automatiser_reponses",
    label: "Automatiser les réponses aux clients",
  },
  {
    value: "incertain",
    label: "Je ne sais pas encore",
  },
];
// variables qui va stocker les services des commerces 
const baseCommercePacks: PricingPack[] = [
  {
    code: "commerce_intelligent",
    name: "Commerce Intelligent",
    category: "Commerce local",
    subtitle:
      "Pour les commerces qui veulent être mieux trouvés, répondre plus vite et obtenir plus d’avis.",
    target:
      "Coiffeur, restaurant, serrurier, menuisier, vendeur, artisan, institut, garage...",
    setupPrice: "590 € HT",
    monthlyPrice: "129 € HT / mois",
    highlighted: true,
    setupIncludes: [
      "Audit de la présence digitale actuelle",
      "Optimisation ou création de la fiche Google Business",
      "Mise à jour des horaires, services, catégories et informations clés",
      "Ajout ou amélioration des photos",
      "Mise en place d’un lien d’appel, de réservation ou de contact",
      "Création d’une FAQ commerciale",
      "Mise en place d’une messagerie IA pour répondre aux questions clients",
      "Scénarios de conversation pour orienter vers un appel, un rendez-vous ou un devis",
      "Préparation des messages de relance pour obtenir des avis Google",
      "Réponses types aux avis positifs et négatifs",
    ],
    monthlyIncludes: [
      "Suivi de la fiche Google Business",
      "Mise à jour des informations importantes",
      "Aide à la gestion des avis clients",
      "Réponse aux avis positifs et négatifs",
      "Relance avis client selon le fonctionnement validé",
      "Amélioration des réponses de la messagerie IA",
      "Suivi des appels, clics, itinéraires et interactions",
      "Rapport mensuel simple",
    ],
    result:
      "Une fiche Google plus professionnelle, une meilleure réputation et une IA capable de guider les clients même quand l’équipe est occupée.",
    cta: "Demander cette formule",
  },
  {
    code: "commerce_premium",
    name: "Commerce Premium",
    category: "Commerce local",
    subtitle:
      "Pour les commerces qui veulent mieux organiser leurs demandes clients et réduire les opportunités perdues.",
    target:
      "Commerces avec beaucoup d’appels, réservations, demandes de devis, urgences ou secrétariat.",
    setupPrice: "990 € HT",
    monthlyPrice: "249 € HT / mois",
    highlighted: false,
    setupIncludes: [
      "Tout ce qui est inclus dans Commerce Intelligent",
      "Mise en place d’un tableau de suivi des demandes clients",
      "Classement des demandes par type : appel, rendez-vous, devis, urgence ou renseignement",
      "Création de modèles de réponses pour les demandes fréquentes",
      "Mise en place d’un processus clair pour transmettre les demandes importantes à l’équipe",
      "Aide à la coordination si le commerce dispose déjà d’une secrétaire ou d’un accueil",
      "Configuration d’un suivi plus détaillé des demandes, avis, appels et rendez-vous",
      "Préparation d’un rapport mensuel plus complet pour suivre ce qui génère réellement des contacts",
    ],
    monthlyIncludes: [
      "Suivi régulier des avis, messages et demandes entrantes",
      "Mise à jour des informations utiles si l’activité évolue",
      "Amélioration continue des scénarios IA selon les vraies questions des clients",
      "Suivi du tableau des demandes clients",
      "Analyse mensuelle des appels, réservations, devis, visites et avis",
      "Recommandations concrètes pour réduire les demandes perdues",
      "Accompagnement plus régulier pour ajuster l’organisation digitale",
      "Point mensuel pour comprendre ce qui fonctionne et ce qui doit être amélioré",
    ],
    result:
      "Une gestion digitale plus organisée pour suivre les demandes, mieux répartir les informations et réduire les clients perdus.",
    cta: "Demander cette formule",
  },
];

const baseTpePmePacks: PricingPack[] = [
  {
    code: "tpe_pme_essentiel",
    name: "Présence Pro",
    category: "TPE / PME",
    subtitle:
      "Pour une petite entreprise qui veut une image sérieuse et un site clair.",
    setupPrice: "890 € HT",
    monthlyPrice: "99 € HT / mois",
    highlighted: false,
    setupIncludes: [
      "Analyse du besoin et de l’activité",
      "Optimisation ou création de la fiche Google Business",
      "Création d’un site web professionnel simple",
      "Présentation claire de l’entreprise",
      "Pages services essentielles",
      "Formulaire de contact",
      "Bouton d’appel ou de contact rapide",
      "Chatbot inclus",
      "Configuration de base",
    ],
    monthlyIncludes: [
      "Maintenance légère du site",
      "Petites modifications de contenu",
      "Suivi simple des demandes",
      "Ajustements mineurs du parcours de contact",
      "Rapport mensuel simple",
    ],
    result:
      "Une image plus professionnelle et un site capable de recevoir les premières demandes clients.",
  },
  {
    code: "tpe_pme_croissance",
    name: "Croissance",
    category: "TPE / PME",
    subtitle:
      "Pour une entreprise qui veut générer et suivre ses prospects plus sérieusement.",
    setupPrice: "1 490 € HT",
    monthlyPrice: "179 € HT / mois",
    highlighted: true,
    setupIncludes: [
      "Tout ce qui est inclus dans Présence Pro",
      "Pages services plus détaillées",
      "Demande de devis ou formulaire avancé",
      "Prise de rendez-vous en ligne si nécessaire",
      "Chatbot de qualification des prospects",
      "Tableau de suivi clients/prospects",
      "Automatisation de confirmation après une demande",
      "Notification lorsqu’une nouvelle demande arrive",
    ],
    monthlyIncludes: [
      "Suivi des prospects entrants",
      "Amélioration des pages et appels à l’action",
      "Ajustement du chatbot",
      "Suivi du tableau clients/prospects",
      "Optimisations des formulaires ou prises de rendez-vous",
      "Rapport mensuel sur les demandes et rendez-vous",
    ],
    result:
      "Un site qui devient un véritable outil commercial pour attirer, qualifier et suivre les prospects.",
  },
  {
    code: "tpe_pme_performance",
    name: "Performance",
    category: "TPE / PME",
    subtitle:
      "Pour une PME qui veut mieux structurer son acquisition et son suivi commercial.",
    setupPrice: "2 490 € HT",
    monthlyPrice: "349 € HT / mois",
    highlighted: false,
    setupIncludes: [
      "Tout ce qui est inclus dans Croissance",
      "Parcours client plus complet",
      "CRM ou tableau de suivi avancé",
      "Automatisations de relance",
      "Segmentation des prospects",
      "Reporting plus détaillé",
      "Optimisation des conversions",
      "Accompagnement stratégique initial",
    ],
    monthlyIncludes: [
      "Analyse des performances",
      "Optimisation continue du parcours client",
      "Suivi CRM ou tableau avancé",
      "Amélioration des contenus",
      "Recommandations commerciales",
      "Rapport mensuel détaillé",
      "Accompagnement mensuel",
    ],
    result:
      "Une acquisition plus structurée, un meilleur suivi commercial et des décisions plus claires.",
  },
];

const baseStartupPacks: PricingPack[] = [
  {
    code: "startup_validation",
    name: "Validation",
    category: "Startup",
    subtitle:
      "Pour tester rapidement une idée et mesurer l’intérêt du marché.",
    setupPrice: "790 € HT",
    monthlyPrice: "99 € HT / mois",
    highlighted: false,
    setupIncludes: [
      "Clarification de la proposition de valeur",
      "Landing page simple",
      "Présentation du problème, de la solution et des bénéfices",
      "Formulaire d’inscription",
      "Waitlist",
      "E-mail automatique de confirmation",
      "Analytics de base",
    ],
    monthlyIncludes: [
      "Suivi des inscriptions",
      "Ajustements du message",
      "Petites modifications de la landing page",
      "Rapport simple sur la traction",
      "Recommandations d’amélioration",
    ],
    result:
      "Une première présence pour tester si le marché montre de l’intérêt.",
  },
  {
    code: "startup_launch",
    name: "Launch",
    category: "Startup",
    subtitle:
      "Pour lancer une bêta, générer des demandes de démo et suivre les premiers leads.",
    setupPrice: "1 490 € HT",
    monthlyPrice: "199 € HT / mois",
    highlighted: true,
    setupIncludes: [
      "Tout ce qui est inclus dans Validation",
      "Landing page plus complète",
      "Inscription bêta ou waitlist avancée",
      "Demande de démo",
      "Prise de rendez-vous",
      "Chatbot IA de qualification",
      "CRM simple",
      "E-mails automatiques",
      "Dashboard de traction",
    ],
    monthlyIncludes: [
      "Suivi des leads et inscriptions",
      "Optimisation de la landing page",
      "Suivi des demandes de démo",
      "Ajustement du chatbot",
      "Analyse des conversions",
      "Reporting traction mensuel",
    ],
    result:
      "Un système de lancement pour générer des leads, mesurer l’intérêt et préparer la croissance.",
  },
  {
    code: "startup_growth",
    name: "Growth",
    category: "Startup",
    subtitle:
      "Pour une startup qui veut optimiser son acquisition et améliorer ses conversions.",
    setupPrice: "2 990 € HT",
    monthlyPrice: "399 € HT / mois",
    highlighted: false,
    setupIncludes: [
      "Tout ce qui est inclus dans Launch",
      "A/B testing",
      "Segmentation des prospects",
      "Séquences e-mail",
      "Pitch digital",
      "Pages cas d’usage",
      "Dashboard avancé",
      "Optimisation du tunnel de conversion",
    ],
    monthlyIncludes: [
      "Analyse des performances",
      "Optimisation des messages",
      "Suivi des conversions",
      "Amélioration du tunnel d’acquisition",
      "Recommandations growth",
      "Reporting mensuel avancé",
    ],
    result:
      "Une acquisition plus mesurable, des messages plus clairs et une meilleure conversion des prospects.",
  },
];

const paymentSteps = [
  {
    step: "01",
    title: "Diagnostic gratuit",
    description:
      "On échange pour comprendre votre activité, vos objectifs et vos outils actuels.",
  },
  {
    step: "02",
    title: "Proposition claire",
    description:
      "Vous recevez une formule recommandée avec le détail de la mise en place et de l’abonnement.",
  },
  {
    step: "03",
    title: "Devis & acompte",
    description:
      "Le projet démarre après validation du devis et paiement d’un acompte de lancement.",
  },
  {
    step: "04",
    title: "Livraison & suivi mensuel",
    description:
      "Après la mise en place, l’abonnement permet de maintenir, suivre et améliorer le système.",
  },
];

const faqs = [
  {
    question: "Pourquoi une mise en place et un abonnement mensuel ?",
    answer:
      "La mise en place sert à construire le système : fiche Google, site, landing page, outils, automatisations ou tableau de suivi. L’abonnement sert à maintenir, suivre, améliorer et faire évoluer ce système dans le temps.",
  },
  {
    question: "Les tarifs sont-ils définitifs ?",
    answer:
      "Ce sont des tarifs de départ avec un périmètre clair. Une proposition sur mesure est réalisée uniquement si le projet demande des fonctionnalités spécifiques, des intégrations complexes ou un accompagnement particulier.",
  },
  {
    question: "Quelle formule choisir si je ne sais pas encore ?",
    answer:
      "Le plus simple est de réserver un diagnostic. Nous analysons votre activité et nous vous orientons vers la formule la plus adaptée.",
  },
  {
    question: "Puis-je commencer avec une formule simple et évoluer ensuite ?",
    answer:
      "Oui. L’objectif est de commencer avec une base utile, puis d’ajouter progressivement des fonctionnalités selon les résultats et les besoins.",
  },
];

function formatSetupPrice(value: number | string | null) {
  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "Sur devis";
  }

  return `${new Intl.NumberFormat("fr-FR").format(price)} € HT`;
}

function formatMonthlyPrice(value: number | string | null) {
  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "Sur devis";
  }

  return `${new Intl.NumberFormat("fr-FR").format(price)} € HT / mois`;
}

function cleanOptionalText(value: string) {
  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : null;
}

function normalizeOptionalUrl(value: string) {
  const cleaned = value.trim();

  if (!cleaned) {
    return null;
  }

  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
    return cleaned;
  }

  return `https://${cleaned}`;
}

function getTrackingPayload() {
  if (typeof window === "undefined") {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
  };
}

export default function TarifsPage() {
  const [databaseOffers, setDatabaseOffers] = useState<DatabaseOffer[]>([]);
  const [offersError, setOffersError] = useState<string | null>(null);

  const [selectedPack, setSelectedPack] = useState<PricingPack | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [leadForm, setLeadForm] = useState<OfferRequestForm>({
    lastname: "",
    firstname: "",
    email: "",
    phoneFullNumber: "",
    company: "",
    businessCity: "",
    activity: "",
    businessWebsiteUrl: "",
    googleBusinessUrl: "",
    objective: "",
    message: "",
    consentRgpd: false,
  });
  useEffect(() => {
  function resetPageAfterBrowserBack(event: PageTransitionEvent) {
    if (event.persisted) {
      setSelectedPack(null);
      setFormSent(false);
      setIsSubmitting(false);
      setFormError(null);
    }
  }

  window.addEventListener("pageshow", resetPageAfterBrowserBack);

  return () => {
    window.removeEventListener("pageshow", resetPageAfterBrowserBack);
  };
}, []);
  useEffect(() => {
    async function loadOffers() {
      try {
        const response = await fetch("/api/offres", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Impossible de charger les offres.");
        }

        setDatabaseOffers(result.offres ?? []);
      } catch (error) {
        console.error("Erreur chargement offres :", error);

        setOffersError(
          error instanceof Error
            ? error.message
            : "Impossible de charger les offres."
        );
      }
    }

    loadOffers();
  }, []);
  
  function applyDatabaseOffer(pack: PricingPack): PricingPack {
    const matchingOffer = databaseOffers.find(
      (offer) => offer.code === pack.code
    );

    if (!matchingOffer) {
      return pack;
    }

    return {
      ...pack,
      name: matchingOffer.nom_offre,
      setupPrice: formatSetupPrice(matchingOffer.prix),
      monthlyPrice: formatMonthlyPrice(matchingOffer.prix_abonnement),
    };
  }

  const commercePacks = useMemo(
    () => baseCommercePacks.map(applyDatabaseOffer),
    [databaseOffers]
  );

  const tpePmePacks = useMemo(
    () => baseTpePmePacks.map(applyDatabaseOffer),
    [databaseOffers]
  );

  const startupPacks = useMemo(
    () => baseStartupPacks.map(applyDatabaseOffer),
    [databaseOffers]
  );

  function updateLeadField<K extends keyof OfferRequestForm>(
    field: K,
    value: OfferRequestForm[K]
  ) {
    setLeadForm((current) => ({ ...current, [field]: value }));
  }

  function getDefaultOfferMessage(packName: string) {
  return `Bonjour, je suis intéressé(e) par la formule ${packName}.`;
}

function isDefaultOfferMessage(message: string) {
  return /^Bonjour, je suis intéressé\(e\) par la formule .+\.$/.test(
    message.trim()
  );
}

function openOfferModal(pack: PricingPack) {
  console.log("Clic formule :", pack.name);
  setSelectedPack(pack);
  setFormSent(false);
  setIsSubmitting(false);
  setFormError(null);

  setLeadForm((current) => {
    const currentMessage = current.message.trim();
    const shouldReplaceMessage =
      currentMessage.length === 0 || isDefaultOfferMessage(currentMessage);

    return {
      ...current,
      message: shouldReplaceMessage
        ? getDefaultOfferMessage(pack.name)
        : current.message,
      consentRgpd: false,
    };
  });
}

  function closeOfferModal() {
  setSelectedPack(null);
  setFormSent(false);
  setIsSubmitting(false);
  setFormError(null);
}
  async function handleOfferSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPack) {
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const parsedPhone = parsePhoneNumber(leadForm.phoneFullNumber);

    if (!parsedPhone || !parsedPhone.isValid()) {
      setFormError("Le numéro de téléphone est invalide.");
      setIsSubmitting(false);
      return;
    }

    /*if (!leadForm.objective) {
      setFormError("Veuillez sélectionner un objectif principal.");
      setIsSubmitting(false);
      return;
    }*/

    if (!leadForm.consentRgpd) {
      setFormError(
        "Vous devez accepter l’utilisation de vos informations pour être recontacté."
      );
      setIsSubmitting(false);
      return;
    }

    const payload = {
      client: {
        contact_first_name: leadForm.firstname.trim(),
        contact_last_name: leadForm.lastname.trim(),
        contact_email: leadForm.email.trim().toLowerCase(),
        phone_country_code: `+${parsedPhone.countryCallingCode}`,
        phone_number: parsedPhone.nationalNumber,

        business_name: cleanOptionalText(leadForm.company),
        business_city: cleanOptionalText(leadForm.businessCity),
        business_sector: cleanOptionalText(leadForm.activity),
        business_website_url: normalizeOptionalUrl(
          leadForm.businessWebsiteUrl
        ),
        google_business_url: normalizeOptionalUrl(leadForm.googleBusinessUrl),
      },

      demande: {
        request_source: "tarifs",
        offer_code: selectedPack.code,
        objective_type: leadForm.objective,
        need_description: cleanOptionalText(leadForm.message),
        consent_rgpd: leadForm.consentRgpd,
      },

      tracking: getTrackingPayload(),
    };

    try {
      const response = await fetch("/api/demandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();


      if (!response.ok) {
        throw new Error(
          result.error || "Erreur lors de l’envoi de la demande."
        );
      }

      setFormSent(true);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Erreur lors de l’envoi de la demande."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function PricingCard({ pack }: { pack: PricingPack }) {
    return (
      <article
        className={`relative flex h-full flex-col rounded-[2rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200 sm:p-7 ${
          pack.highlighted
            ? "border-slate-950 bg-slate-950 text-white"
            : "border-slate-200 bg-white text-slate-950"
        }`}
      >
        <div className="pr-24">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.22em] ${
              pack.highlighted ? "text-white/45" : "text-slate-400"
            }`}
          >
            {pack.category}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            {pack.name}
          </h3>
          <p
            className={`mt-4 text-sm leading-6 ${
              pack.highlighted ? "text-white/65" : "text-slate-600"
            }`}
          >
            {pack.subtitle}
          </p>
        </div>

        {pack.target && (
          <div
            className={`mt-6 rounded-2xl p-4 ${
              pack.highlighted ? "bg-white/10" : "bg-slate-50"
            }`}
          >
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                pack.highlighted ? "text-white/40" : "text-slate-400"
              }`}
            >
              Pour qui ?
            </p>
            <p
              className={`mt-2 text-xs leading-5 ${
                pack.highlighted ? "text-white/70" : "text-slate-600"
              }`}
            >
              {pack.target}
            </p>
          </div>
        )}

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div
            className={`rounded-2xl p-5 ${
              pack.highlighted ? "bg-white text-slate-950" : "bg-slate-950 text-white"
            }`}
          >
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                pack.highlighted ? "text-slate-500" : "text-white/45"
              }`}
            >
              Mise en place
            </p>
            <p className="mt-3 text-2xl font-semibold">{pack.setupPrice}</p>
            <p
              className={`mt-1 text-[11px] ${
                pack.highlighted ? "text-slate-500" : "text-white/45"
              }`}
            >
              paiement projet
            </p>
          </div>

          <div
            className={`rounded-2xl p-5 ${
              pack.highlighted ? "bg-white/10" : "bg-slate-50"
            }`}
          >
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                pack.highlighted ? "text-white/45" : "text-slate-500"
              }`}
            >
              Abonnement
            </p>
            <p className="mt-3 text-2xl font-semibold">
              {pack.monthlyPrice}
            </p>
            <p
              className={`mt-1 text-[11px] ${
                pack.highlighted ? "text-white/45" : "text-slate-500"
              }`}
            >
              suivi mensuel
            </p>
          </div>
        </div>

        <div
          className={`mt-7 rounded-[1.5rem] border p-5 ${
            pack.highlighted
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-white"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              pack.highlighted ? "text-white/50" : "text-slate-500"
            }`}
          >
            Services de mise en place
          </p>
          <ul className="mt-4 grid gap-2.5">
            {pack.setupIncludes.map((item) => (
              <li key={item} className="flex gap-2.5 text-xs leading-5">
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                    pack.highlighted
                      ? "bg-white text-slate-950"
                      : "bg-slate-950 text-white"
                  }`}
                >
                  ✓
                </span>
                <span
                  className={pack.highlighted ? "text-white/70" : "text-slate-600"}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`mt-4 rounded-[1.5rem] border p-5 ${
            pack.highlighted
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              pack.highlighted ? "text-white/50" : "text-slate-500"
            }`}
          >
            Services mensuels
          </p>
          <ul className="mt-4 grid gap-2.5">
            {pack.monthlyIncludes.map((item) => (
              <li key={item} className="flex gap-2.5 text-xs leading-5">
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                    pack.highlighted
                      ? "bg-white text-slate-950"
                      : "bg-slate-950 text-white"
                  }`}
                >
                  ✓
                </span>
                <span
                  className={pack.highlighted ? "text-white/70" : "text-slate-600"}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`mt-4 rounded-[1.5rem] p-5 ${
            pack.highlighted ? "bg-white/10" : "bg-slate-950 text-white"
          }`}
        >
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
              pack.highlighted ? "text-white/40" : "text-white/45"
            }`}
          >
            Résultat attendu
          </p>
          <p className="mt-3 text-xs leading-5 text-white/75">
            {pack.result}
          </p>
        </div>

        <div className="mt-7 grid gap-3">
          <button
            type="button"
            onClick={() => openOfferModal(pack)}
            className={`inline-flex justify-center rounded-full px-5 py-2.5 text-xs font-semibold transition ${
              pack.highlighted
                ? "bg-white text-slate-950 hover:bg-white/85"
                : "bg-slate-950 text-white hover:bg-slate-800"
            }`}
          >
            {pack.cta || "Demander cette formule"}
          </button>

          <Link
            href="/prise-de-rdv"
            className={`inline-flex justify-center rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
              pack.highlighted
                ? "border-white/20 text-white hover:bg-white hover:text-slate-950"
                : "border-slate-300 text-slate-950 hover:bg-slate-950 hover:text-white"
            }`}
          >
            Prendre rendez-vous
          </Link>
        </div>
      </article>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <style jsx global>{`
        .phone-input-custom {
          width: 100%;
        }

        .phone-input-custom .PhoneInputInput {
          width: 100%;
          border: none;
          background: transparent;
          font-size: 0.875rem;
          outline: none;
        }

        .phone-input-custom .PhoneInputInput::placeholder {
          color: rgb(148 163 184 / 1);
        }

        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.75rem;
        }

        .phone-input-custom .PhoneInputCountrySelectArrow {
          opacity: 0.45;
        }
      `}</style>

      <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-20">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-slate-200 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex animate-fade-in rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
            Tarifs & formules
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="animate-fade-in-up max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Choisissez le système digital adapté à votre activité.
                <span className="block text-slate-500">
                  Mise en place + suivi mensuel.
                </span>
              </h1>

              <p className="animate-fade-in-up mt-8 max-w-2xl text-lg leading-8 text-slate-600" style={{ animationDelay: "120ms" }}>
                Comparez les offres et envoyez une demande directement depuis la fiche qui vous correspond.
              </p>


              <div className="mt-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Accès rapide
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="#commerce"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    Commerce
                  </a>
                  <a
                    href="#tpe-pme"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-slate-950 hover:text-white"
                  >
                    TPE/PME
                  </a>
                  <a
                    href="#startup"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-slate-950 hover:text-white"
                  >
                    Startup
                  </a>
                </div>
              </div>

              {offersError && (
                <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-3 text-xs text-orange-700">
                  Les prix affichés utilisent les valeurs par défaut, car les
                  offres n’ont pas pu être chargées depuis la base de données.
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Comment lire les prix ?
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-lg font-semibold text-slate-950">
                    Mise en place
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Création, configuration, intégration des outils et
                    construction du parcours digital.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-950 p-5 text-white">
                  <p className="text-lg font-semibold">Abonnement mensuel</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Suivi, maintenance, amélioration, reporting et
                    accompagnement dans le temps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="commerce" className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Commerces locaux
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Pour être trouvé, rassurer et être choisi rapidement
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Deux formules pensées pour les commerces qui dépendent des
              recherches locales, des avis, des appels, des réservations, des
              devis ou des visites physiques.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {commercePacks.map((pack) => (
              <PricingCard key={pack.code} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      <section id="tpe-pme" className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              TPE / PME
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Pour générer des prospects et mieux suivre les demandes
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Ces formules transforment le site web en outil commercial :
              présentation claire, prise de contact, chatbot, suivi
              clients/prospects et automatisations simples.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {tpePmePacks.map((pack) => (
              <PricingCard key={pack.code} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      <section id="startup" className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Startups
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Pour lancer, tester et mesurer la traction
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Ces formules aident les startups à clarifier leur offre, attirer
              les premiers utilisateurs, générer des demandes de démo et suivre
              les signaux de traction.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {startupPacks.map((pack) => (
              <PricingCard key={pack.code} pack={pack} />
            ))}
          </div>
        </div>
      </section>


      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Paiement
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Un processus clair avant de commencer
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Un échange, une proposition claire, puis une mise en place cadrée.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {paymentSteps.map((item, i) => (
              <AnimateIn key={item.step} delay={i * 90}>
                <div className="rounded-[1.5rem] bg-slate-50 p-5 transition hover:bg-slate-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Sur mesure
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Votre besoin ne rentre pas dans une formule ?
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-slate-600">
                Certaines entreprises ont besoin d’un accompagnement spécifique
                : outils déjà en place, équipe interne, processus complexe,
                plusieurs points de contact, automatisations avancées ou besoin
                stratégique. Dans ce cas, nous construisons une proposition sur
                mesure.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Demander une offre sur mesure
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Questions fréquentes
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Comprendre nos formules
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <AnimateIn key={faq.question} delay={i * 80}>
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-slate-950 p-8 text-center text-white sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
            Diagnostic
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Le bon tarif dépend du bon système.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Nous commençons par comprendre votre activité, vos objectifs et vos
            outils actuels. Ensuite, nous vous orientons vers la formule la plus
            adaptée.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
            >
              Revoir nos services
            </Link>
          </div>
        </div>
      </section>

      {selectedPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          <button
            type="button"
            aria-label="Fermer la fenêtre"
            onClick={closeOfferModal}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Demande d’offre
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {selectedPack.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedPack.category} · Mise en place{" "}
                  {selectedPack.setupPrice} · Abonnement{" "}
                  {selectedPack.monthlyPrice}
                </p>
              </div>

              <button
                type="button"
                onClick={closeOfferModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xl leading-none text-slate-950 transition hover:bg-slate-950 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Offre préremplie
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-950">
                {selectedPack.name}
              </p>
            </div>

            {formSent ? (
              <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-6 text-center text-white">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-950">
                  ✓
                </div>
                <h4 className="text-xl font-semibold">Demande envoyée</h4>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/65">
                  Votre demande a bien été enregistrée. Nous reviendrons vers
                  vous rapidement avec une proposition adaptée.
                </p>
                <button
                  type="button"
                  onClick={closeOfferModal}
                  className="mt-6 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-white/85"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleOfferSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Nom de famille *
                    </span>
                    <input
                      
                      value={leadForm.lastname}
                      onChange={(event) =>
                        updateLeadField("lastname", event.target.value)
                      }
                      placeholder="Votre nom"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Prénom *
                    </span>
                    <input
                      
                      value={leadForm.firstname}
                      onChange={(event) =>
                        updateLeadField("firstname", event.target.value)
                      }
                      placeholder="Votre prénom"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      E-mail *
                    </span>
                    <input
                      
                      type="email"
                      value={leadForm.email}
                      onChange={(event) =>
                        updateLeadField("email", event.target.value)
                      }
                      placeholder="vous@email.com"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Numéro de téléphone *
                    </span>

                    <div className="phone-input-wrapper rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-slate-400 focus-within:bg-white">
                      <PhoneInput
                        international
                        defaultCountry="FR"
                        value={leadForm.phoneFullNumber}
                        onChange={(value) =>
                          updateLeadField("phoneFullNumber", value || "")
                        }
                        className="phone-input-custom"
                      />
                    </div>
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Entreprise
                    </span>
                    <input
                      value={leadForm.company}
                      onChange={(event) =>
                        updateLeadField("company", event.target.value)
                      }
                      placeholder="Nom de l’entreprise"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Ville du business
                    </span>
                    <input
                      value={leadForm.businessCity}
                      onChange={(event) =>
                        updateLeadField("businessCity", event.target.value)
                      }
                      placeholder="Ex : Rouen, Paris, Lyon..."
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Type d’activité
                    </span>
                    <input
                      value={leadForm.activity}
                      onChange={(event) =>
                        updateLeadField("activity", event.target.value)
                      }
                      placeholder="Ex : restaurant, BTP, SaaS..."
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Objectif principal 
                    </span>
                    <div className="relative">
                      <select
                        value={leadForm.objective}
                        onChange={(e) => updateLeadField("objective", e.target.value)}
                        className={`w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white ${!leadForm.objective ? "text-slate-400" : "text-slate-950"}`}
                      >
                        <option value="" disabled>Choisissez un objectif</option>
                        {objectiveOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">⌄</span>
                    </div>
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Site web actuel
                    </span>
                    <input
                      type="text"
                      value={leadForm.businessWebsiteUrl}
                      onChange={(event) =>
                        updateLeadField(
                          "businessWebsiteUrl",
                          event.target.value
                        )
                      }
                      placeholder="https://www.votre-site.com"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Lien Google Business
                    </span>
                    <input
                      type="text"
                      value={leadForm.googleBusinessUrl}
                      onChange={(event) =>
                        updateLeadField(
                          "googleBusinessUrl",
                          event.target.value
                        )
                      }
                      placeholder="Lien vers votre fiche Google Business"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-xs font-semibold text-slate-600">
                    Message
                  </span>
                  <textarea
                    rows={4}
                    value={leadForm.message}
                    onChange={(event) =>
                      updateLeadField("message", event.target.value)
                    }
                    placeholder="Décrivez brièvement votre besoin."
                    className="resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                  />
                </label>

                {formError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                    {formError}
                  </div>
                )}

                <div className="mt-2 grid gap-3">
                  <p className="text-xs leading-5 text-slate-500">
                    Aucun paiement maintenant. Cette demande sert à préparer un
                    devis clair.
                  </p>

                  <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/60 p-4 text-xs leading-5 text-slate-600">
                    <input
                      type="checkbox"
                      
                      checked={leadForm.consentRgpd}
                      onChange={(event) =>
                        updateLeadField("consentRgpd", event.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-950/20"
                    />

                    <span>
                      J’accepte que mes informations soient utilisées par
                      OptimalLogic pour traiter ma demande et me recontacter.
                    </span>
                  </label>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center rounded-full bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}