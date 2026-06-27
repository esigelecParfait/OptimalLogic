"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import NeuralBackground from "@/components/fx/NeuralBackground";
import { parsePhoneNumber } from "react-phone-number-input";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  CreditCard,
  FileText,
  RefreshCw,
  Target,
  X,
} from "lucide-react";
import {
  ObjectiveSelectField,
  PremiumPhoneField,
} from "@/components/forms/PremiumFormFields";

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

type DatabaseOffer = {
  code: string;
  nom_offre: string;
  client_type: string;
  prix: number | string | null;
  prix_abonnement: number | string | null;
  is_active: boolean;
  created_at?: string;
};

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
  { value: "plus_appels_reservations", label: "Plus d'appels ou de réservations" },
  { value: "plus_devis_qualifies", label: "Plus de devis ou demandes qualifiées" },
  { value: "mieux_suivre_prospects", label: "Mieux suivre les prospects" },
  { value: "ameliorer_image", label: "Améliorer mon image professionnelle" },
  { value: "lancer_offre", label: "Lancer ou tester une offre" },
  { value: "automatiser_reponses", label: "Automatiser les réponses aux clients" },
  { value: "incertain", label: "Je ne sais pas encore" },
];

const baseCommercePacks: PricingPack[] = [
  {
    code: "commerce_intelligent",
    name: "Commerce Intelligent",
    category: "Commerce local",
    subtitle: "Pour les commerces qui veulent être mieux trouvés, répondre plus vite et obtenir plus d'avis.",
    target: "Coiffeur, restaurant, serrurier, menuisier, vendeur, artisan, institut, garage...",
    setupPrice: "590 € HT",
    monthlyPrice: "129 € HT / mois",
    highlighted: true,
    setupIncludes: [
      "Audit de la présence digitale actuelle",
      "Optimisation ou création de la fiche Google Business",
      "Mise à jour des horaires, services, catégories et informations clés",
      "Ajout ou amélioration des photos",
      "Mise en place d'un lien d'appel, de réservation ou de contact",
      "Création d'une FAQ commerciale",
      "Mise en place d'une messagerie IA pour répondre aux questions clients",
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
      "Une fiche Google plus professionnelle, une meilleure réputation et une IA capable de guider les clients même quand l'équipe est occupée.",
    cta: "Demander cette formule",
  },
  {
    code: "commerce_premium",
    name: "Commerce Premium",
    category: "Commerce local",
    subtitle: "Pour les commerces qui veulent mieux organiser leurs demandes clients et réduire les opportunités perdues.",
    target: "Commerces avec beaucoup d'appels, réservations, demandes de devis, urgences ou secrétariat.",
    setupPrice: "990 € HT",
    monthlyPrice: "249 € HT / mois",
    highlighted: false,
    setupIncludes: [
      "Tout ce qui est inclus dans Commerce Intelligent",
      "Mise en place d'un tableau de suivi des demandes clients",
      "Classement des demandes par type : appel, rendez-vous, devis, urgence ou renseignement",
      "Création de modèles de réponses pour les demandes fréquentes",
      "Mise en place d'un processus clair pour transmettre les demandes importantes à l'équipe",
      "Aide à la coordination si le commerce dispose déjà d'une secrétaire ou d'un accueil",
      "Configuration d'un suivi plus détaillé des demandes, avis, appels et rendez-vous",
      "Préparation d'un rapport mensuel plus complet pour suivre ce qui génère réellement des contacts",
    ],
    monthlyIncludes: [
      "Suivi régulier des avis, messages et demandes entrantes",
      "Mise à jour des informations utiles si l'activité évolue",
      "Amélioration continue des scénarios IA selon les vraies questions des clients",
      "Suivi du tableau des demandes clients",
      "Analyse mensuelle des appels, réservations, devis, visites et avis",
      "Recommandations concrètes pour réduire les demandes perdues",
      "Accompagnement plus régulier pour ajuster l'organisation digitale",
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
    subtitle: "Pour une petite entreprise qui veut une image sérieuse et un site clair.",
    setupPrice: "890 € HT",
    monthlyPrice: "99 € HT / mois",
    highlighted: false,
    setupIncludes: [
      "Analyse du besoin et de l'activité",
      "Optimisation ou création de la fiche Google Business",
      "Création d'un site web professionnel simple",
      "Présentation claire de l'entreprise",
      "Pages services essentielles",
      "Formulaire de contact",
      "Bouton d'appel ou de contact rapide",
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
    result: "Une image plus professionnelle et un site capable de recevoir les premières demandes clients.",
  },
  {
    code: "tpe_pme_croissance",
    name: "Croissance",
    category: "TPE / PME",
    subtitle: "Pour une entreprise qui veut générer et suivre ses prospects plus sérieusement.",
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
      "Notification lorsqu'une nouvelle demande arrive",
    ],
    monthlyIncludes: [
      "Suivi des prospects entrants",
      "Amélioration des pages et appels à l'action",
      "Ajustement du chatbot",
      "Suivi du tableau clients/prospects",
      "Optimisations des formulaires ou prises de rendez-vous",
      "Rapport mensuel sur les demandes et rendez-vous",
    ],
    result: "Un site qui devient un véritable outil commercial pour attirer, qualifier et suivre les prospects.",
  },
  {
    code: "tpe_pme_performance",
    name: "Performance",
    category: "TPE / PME",
    subtitle: "Pour une PME qui veut mieux structurer son acquisition et son suivi commercial.",
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
    result: "Une acquisition plus structurée, un meilleur suivi commercial et des décisions plus claires.",
  },
];

const baseStartupPacks: PricingPack[] = [
  {
    code: "startup_validation",
    name: "Validation",
    category: "Startup",
    subtitle: "Pour tester rapidement une idée et mesurer l'intérêt du marché.",
    setupPrice: "790 € HT",
    monthlyPrice: "99 € HT / mois",
    highlighted: false,
    setupIncludes: [
      "Clarification de la proposition de valeur",
      "Landing page simple",
      "Présentation du problème, de la solution et des bénéfices",
      "Formulaire d'inscription",
      "Waitlist",
      "E-mail automatique de confirmation",
      "Analytics de base",
    ],
    monthlyIncludes: [
      "Suivi des inscriptions",
      "Ajustements du message",
      "Petites modifications de la landing page",
      "Rapport simple sur la traction",
      "Recommandations d'amélioration",
    ],
    result: "Une première présence pour tester si le marché montre de l'intérêt.",
  },
  {
    code: "startup_launch",
    name: "Launch",
    category: "Startup",
    subtitle: "Pour lancer une bêta, générer des demandes de démo et suivre les premiers leads.",
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
    result: "Un système de lancement pour générer des leads, mesurer l'intérêt et préparer la croissance.",
  },
  {
    code: "startup_growth",
    name: "Growth",
    category: "Startup",
    subtitle: "Pour une startup qui veut optimiser son acquisition et améliorer ses conversions.",
    setupPrice: "2 990 € HT",
    monthlyPrice: "399 € HT / mois",
    highlighted: false,
    setupIncludes: [
      "Tout ce qui est inclus dans Launch",
      "A/B testing",
      "Segmentation des prospects",
      "Séquences e-mail",
      "Pitch digital",
      "Pages cas d'usage",
      "Dashboard avancé",
      "Optimisation du tunnel de conversion",
    ],
    monthlyIncludes: [
      "Analyse des performances",
      "Optimisation des messages",
      "Suivi des conversions",
      "Amélioration du tunnel d'acquisition",
      "Recommandations growth",
      "Reporting mensuel avancé",
    ],
    result: "Une acquisition plus mesurable, des messages plus clairs et une meilleure conversion des prospects.",
  },
];

const paymentSteps = [
  { step: "01", title: "Diagnostic gratuit", description: "On échange pour comprendre votre activité, vos objectifs et vos outils actuels." },
  { step: "02", title: "Proposition claire", description: "Vous recevez une formule recommandée avec le détail de la mise en place et de l'abonnement." },
  { step: "03", title: "Devis & acompte", description: "Le projet démarre après validation du devis et paiement d'un acompte de lancement." },
  { step: "04", title: "Livraison & suivi mensuel", description: "Après la mise en place, l'abonnement permet de maintenir, suivre et améliorer le système." },
];

const faqs = [
  { question: "Pourquoi une mise en place et un abonnement mensuel ?", answer: "La mise en place sert à construire le système : fiche Google, site, landing page, outils, automatisations ou tableau de suivi. L'abonnement sert à maintenir, suivre, améliorer et faire évoluer ce système dans le temps." },
  { question: "Les tarifs sont-ils définitifs ?", answer: "Ce sont des tarifs de départ avec un périmètre clair. Une proposition sur mesure est réalisée uniquement si le projet demande des fonctionnalités spécifiques, des intégrations complexes ou un accompagnement particulier." },
  { question: "Quelle formule choisir si je ne sais pas encore ?", answer: "Le plus simple est de réserver un diagnostic. Nous analysons votre activité et nous vous orientons vers la formule la plus adaptée." },
  { question: "Puis-je commencer avec une formule simple et évoluer ensuite ?", answer: "Oui. L'objectif est de commencer avec une base utile, puis d'ajouter progressivement des fonctionnalités selon les résultats et les besoins." },
];

function formatSetupPrice(value: number | string | null) {
  const price = Number(value);
  if (!Number.isFinite(price)) return "Sur devis";
  return `${new Intl.NumberFormat("fr-FR").format(price)} € HT`;
}

function formatMonthlyPrice(value: number | string | null) {
  const price = Number(value);
  if (!Number.isFinite(price)) return "Sur devis";
  return `${new Intl.NumberFormat("fr-FR").format(price)} € HT / mois`;
}

function cleanOptionalText(value: string) {
  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : null;
}

function normalizeOptionalUrl(value: string) {
  const cleaned = value.trim();
  if (!cleaned) return null;
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;
  return `https://${cleaned}`;
}

function getTrackingPayload() {
  if (typeof window === "undefined") {
    return { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
  };
}

const modalFieldClass =
  "rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mut-2 focus:border-indigo focus:ring-2 focus:ring-[rgba(124,92,255,0.18)]";
const modalLabelClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";

function PremiumCheck({ item, tone = "emerald" }: { item: string; tone?: "emerald" | "cyan" }) {
  return (
    <li className="flex gap-2.5 text-[13px] leading-5">
      <span
        className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${
          tone === "emerald" ? "text-emerald" : "text-cyan"
        }`}
        style={{ background: tone === "emerald" ? "rgba(46,230,168,0.1)" : "rgba(31,213,240,0.1)" }}
      >
        <Check size={12} strokeWidth={3} />
      </span>
      <span className="text-mut">{item}</span>
    </li>
  );
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
    return () => { window.removeEventListener("pageshow", resetPageAfterBrowserBack); };
  }, []);

  useEffect(() => {
    async function loadOffers() {
      try {
        const response = await fetch("/api/offres", { method: "GET", cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Impossible de charger les offres.");
        setDatabaseOffers(result.offres ?? []);
      } catch (error) {
        console.error("Erreur chargement offres :", error);
        setOffersError(error instanceof Error ? error.message : "Impossible de charger les offres.");
      }
    }
    loadOffers();
  }, []);

  const applyDatabaseOffer = useCallback((pack: PricingPack): PricingPack => {
    const matchingOffer = databaseOffers.find((offer) => offer.code === pack.code);
    if (!matchingOffer) return pack;
    return {
      ...pack,
      name: matchingOffer.nom_offre,
      setupPrice: formatSetupPrice(matchingOffer.prix),
      monthlyPrice: formatMonthlyPrice(matchingOffer.prix_abonnement),
    };
  }, [databaseOffers]);

  const commercePacks = useMemo(() => baseCommercePacks.map(applyDatabaseOffer), [applyDatabaseOffer]);
  const tpePmePacks = useMemo(() => baseTpePmePacks.map(applyDatabaseOffer), [applyDatabaseOffer]);
  const startupPacks = useMemo(() => baseStartupPacks.map(applyDatabaseOffer), [applyDatabaseOffer]);

  function updateLeadField<K extends keyof OfferRequestForm>(field: K, value: OfferRequestForm[K]) {
    setLeadForm((current) => ({ ...current, [field]: value }));
  }

  function getDefaultOfferMessage(packName: string) {
    return `Bonjour, je suis intéressé(e) par la formule ${packName}.`;
  }

  function isDefaultOfferMessage(message: string) {
    return /^Bonjour, je suis intéressé\(e\) par la formule .+\.$/.test(message.trim());
  }

  function openOfferModal(pack: PricingPack) {
    setSelectedPack(pack);
    setFormSent(false);
    setIsSubmitting(false);
    setFormError(null);
    setLeadForm((current) => {
      const currentMessage = current.message.trim();
      const shouldReplaceMessage = currentMessage.length === 0 || isDefaultOfferMessage(currentMessage);
      return {
        ...current,
        message: shouldReplaceMessage ? getDefaultOfferMessage(pack.name) : current.message,
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
    if (!selectedPack) return;
    setIsSubmitting(true);
    setFormError(null);

    const parsedPhone = parsePhoneNumber(leadForm.phoneFullNumber);
    if (!parsedPhone || !parsedPhone.isValid()) {
      setFormError("Le numéro de téléphone est invalide.");
      setIsSubmitting(false);
      return;
    }
    if (!leadForm.objective) {
      setFormError("Veuillez sélectionner un objectif principal.");
      setIsSubmitting(false);
      return;
    }
    if (!leadForm.consentRgpd) {
      setFormError("Vous devez accepter l'utilisation de vos informations pour être recontacté.");
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
        business_website_url: normalizeOptionalUrl(leadForm.businessWebsiteUrl),
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur lors de l'envoi de la demande.");
      setFormSent(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Erreur lors de l'envoi de la demande.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function PricingCard({ pack }: { pack: PricingPack }) {
    const featured = pack.highlighted;
    const visibleSetupIncludes = pack.setupIncludes.slice(0, 4);
    const visibleMonthlyIncludes = pack.monthlyIncludes.slice(0, 3);

    return (
      <article
        className={`relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
          featured ? "border border-indigo/60" : "surface-card"
        }`}
        style={
          featured
            ? {
                background:
                  "linear-gradient(170deg, rgba(124,92,255,0.18), rgba(8,10,22,0.96))",
                boxShadow: "0 42px 95px -42px rgba(124,92,255,0.65)",
              }
            : undefined
        }
      >
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-[260px] w-[260px] rounded-full opacity-40 blur-[80px]"
          style={{ background: featured ? "var(--violet)" : "var(--indigo)" }}
        />

       

        <div className="relative z-[1] pr-24">
          <p className="eyebrow-grad text-xs font-semibold uppercase tracking-wider">
            {pack.category}
          </p>
          <h3 className="mt-2 font-display text-[26px] font-semibold leading-tight">
            {pack.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-mut">{pack.subtitle}</p>
        </div>

        {pack.target && (
          <div
            className="relative z-[1] mt-5 rounded-2xl border border-white/[0.08] p-4"
            style={{ background: "rgba(16,20,42,0.48)" }}
          >
            <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-mut-2">
              <Target size={13} strokeWidth={2} />
              Pour qui ?
            </div>
            <p className="text-xs leading-5 text-mut">{pack.target}</p>
          </div>
        )}

        <div className="relative z-[1] mt-6 grid gap-3 sm:grid-cols-2">
          <div
            className="rounded-2xl border border-white/[0.13] p-5"
            style={{ background: "var(--grad-soft)" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mut-2">
              Mise en place
            </p>
            <p className="mt-3 font-display text-[28px] font-semibold leading-none">
              {pack.setupPrice}
            </p>
            <p className="mt-2 text-[10px] text-mut-2">paiement projet</p>
          </div>
          <div
            className="rounded-2xl border border-white/[0.08] p-5"
            style={{ background: "rgba(16,20,42,0.62)" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mut-2">
              Suivi mensuel
            </p>
            <p className="mt-3 font-display text-[28px] font-semibold leading-none">
              {pack.monthlyPrice}
            </p>
            <p className="mt-2 text-[10px] text-mut-2">maintenance & amélioration</p>
          </div>
        </div>

        <div
          className="relative z-[1] mt-6 rounded-2xl border border-white/[0.08] p-5"
          style={{ background: "rgba(16,20,42,0.48)" }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mut-2">
              Mise en place
            </p>
            <span className="rounded-full border border-white/[0.1] px-2.5 py-1 text-[10px] text-mut-2">
              points clés
            </span>
          </div>
          <ul className="grid gap-2.5">
            {visibleSetupIncludes.map((item) => (
              <PremiumCheck key={item} item={item} tone="emerald" />
            ))}
          </ul>
        </div>

        <div
          className="relative z-[1] mt-4 rounded-2xl border border-white/[0.08] p-5"
          style={{ background: "rgba(16,20,42,0.42)" }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mut-2">
              Suivi mensuel
            </p>
            <span className="rounded-full border border-white/[0.1] px-2.5 py-1 text-[10px] text-mut-2">
              continuité
            </span>
          </div>
          <ul className="grid gap-2.5">
            {visibleMonthlyIncludes.map((item) => (
              <PremiumCheck key={item} item={item} tone="cyan" />
            ))}
          </ul>
        </div>

        <div
          className="relative z-[1] mt-4 rounded-2xl border border-white/[0.08] p-5"
          style={{ background: "rgba(8,10,22,0.62)" }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-mut-2">
            Résultat attendu
          </p>
          <p className="mt-3 text-sm leading-6 text-mut">{pack.result}</p>
        </div>

        <div className="relative z-[1] mt-auto pt-6">
          <button
            type="button"
            onClick={() => openOfferModal(pack)}
            className={`inline-flex w-full justify-center rounded-full px-5 py-3 text-sm font-semibold ${
              featured ? "btn-grad" : "btn-ghost"
            }`}
          >
            {pack.cta || "Demander cette formule"}
          </button>
          <p className="mt-3 text-center text-[11px] leading-5 text-mut-2">
            Aucun paiement maintenant. La demande sert à préparer un devis clair.
          </p>
        </div>
      </article>
    );
  }

  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden px-7 pb-16 pt-44 lg:pt-52">
        <NeuralBackground />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(124,92,255,0.18), transparent 35%), radial-gradient(circle at 86% 18%, rgba(31,213,240,0.12), transparent 30%)",
          }}
        />

        <AnimateIn className="relative z-[2] mx-auto max-w-[1240px]">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink"
            style={{ background: "var(--grad-soft)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Tarifs &amp; formules
          </span>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.03]">
                Des formules claires pour transformer votre présence digitale
                <span className="grad-text"> en demandes concrètes.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-mut">
                Chaque offre combine mise en place, outils adaptés et suivi mensuel pour aider votre activité à être trouvée, comprise, choisie et mieux suivie.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/prise-de-rdv"
                  className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Réserver un diagnostic
                </Link>
                <a
                  href="#commerce"
                  className="btn-ghost inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Comparer les formules
                </a>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-mut-2">
                  Accès rapide
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a href="#commerce" className="btn-ghost rounded-full px-4 py-2 text-xs font-semibold">
                    Commerce
                  </a>
                  <a href="#tpe-pme" className="btn-ghost rounded-full px-4 py-2 text-xs font-semibold">
                    TPE/PME
                  </a>
                  <a href="#startup" className="btn-ghost rounded-full px-4 py-2 text-xs font-semibold">
                    Startup
                  </a>
                </div>
              </div>

              {offersError && (
                <div
                  className="mt-6 rounded-xl border border-amber-300/30 px-5 py-3 text-xs font-medium text-amber-200"
                  style={{ background: "rgba(251,191,36,0.08)" }}
                >
                  Les prix affichés utilisent les valeurs par défaut, car les offres n&apos;ont pas pu être chargées.
                </div>
              )}
            </div>

            <div className="surface-card rounded-[28px] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.13] text-cyan"
                  style={{ background: "rgba(124,92,255,0.14)" }}
                >
                  <BadgeCheck size={23} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">
                    Comment lire les prix ?
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold">Un projet + un suivi</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div
                  className="rounded-2xl border border-white/[0.07] p-5"
                  style={{ background: "rgba(16,20,42,0.5)" }}
                >
                  <div className="mb-3 flex items-center gap-2 text-cyan">
                    <FileText size={18} strokeWidth={1.8} />
                    <p className="font-display text-lg font-semibold text-ink">Diagnostic</p>
                  </div>
                  <p className="text-sm leading-6 text-mut">
                    Avant de choisir, nous validons la formule réellement adaptée à votre activité.
                  </p>
                </div>
                <div
                  className="rounded-2xl border border-white/[0.07] p-5"
                  style={{ background: "rgba(16,20,42,0.5)" }}
                >
                  <div className="mb-3 flex items-center gap-2 text-emerald">
                    <CreditCard size={18} strokeWidth={1.8} />
                    <p className="font-display text-lg font-semibold text-ink">Mise en place</p>
                  </div>
                  <p className="text-sm leading-6 text-mut">
                    Création, configuration, intégration des outils et construction du parcours digital.
                  </p>
                </div>
                <div
                  className="rounded-2xl border border-white/[0.13] p-5"
                  style={{ background: "var(--grad-soft)" }}
                >
                  <div className="mb-3 flex items-center gap-2 text-cyan">
                    <RefreshCw size={18} strokeWidth={1.8} />
                    <p className="font-display text-lg font-semibold text-ink">Suivi mensuel</p>
                  </div>
                  <p className="text-sm leading-6 text-mut">
                    Maintenance, amélioration, reporting et accompagnement dans le temps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* Commerce */}
      <section id="commerce" className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Commerces locaux</span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold">Pour être trouvé, rassurer et être choisi rapidement</h2>
            <p className="mt-5 text-base leading-7 text-mut">Deux formules pensées pour les commerces qui dépendent des recherches locales, des avis, des appels, des réservations, des devis ou des visites physiques.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {commercePacks.map((pack) => <PricingCard key={pack.code} pack={pack} />)}
          </div>
        </div>
      </section>

      {/* TPE/PME */}
      <section id="tpe-pme" className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">TPE / PME</span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold">Pour générer des prospects et mieux suivre les demandes</h2>
            <p className="mt-5 text-base leading-7 text-mut">Ces formules transforment le site web en outil commercial : présentation claire, prise de contact, chatbot, suivi clients/prospects et automatisations simples.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {tpePmePacks.map((pack) => <PricingCard key={pack.code} pack={pack} />)}
          </div>
        </div>
      </section>

      {/* Startups */}
      <section id="startup" className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Startups</span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold">Pour lancer, tester et mesurer la traction</h2>
            <p className="mt-5 text-base leading-7 text-mut">Ces formules aident les startups à clarifier leur offre, attirer les premiers utilisateurs, générer des demandes de démo et suivre les signaux de traction.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {startupPacks.map((pack) => <PricingCard key={pack.code} pack={pack} />)}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="px-7 py-16">
        <div className="surface-card mx-auto max-w-[1240px] rounded-[28px] p-8 sm:p-10 lg:p-12">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Démarrage</span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold">Comment se passe le lancement ?</h2>
            <p className="mt-5 text-base leading-7 text-mut">Un parcours simple : comprendre votre besoin, choisir le bon périmètre, puis lancer un système clair et suivi.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {paymentSteps.map((item, i) => (
              <AnimateIn key={item.step} delay={i * 90}>
                <div className="rounded-2xl border border-white/[0.07] p-5" style={{ background: "rgba(16,20,42,0.5)" }}>
                  <span className="grid h-10 w-10 place-items-center rounded-full font-display text-xs font-bold text-white" style={{ background: "var(--grad)" }}>{item.step}</span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-mut">{item.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Sur mesure */}
      <section className="px-7 py-16">
        <div className="surface-card mx-auto max-w-[1240px] rounded-[28px] p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Sur mesure</span>
              <h2 className="mt-3 text-[clamp(28px,3.6vw,40px)] font-semibold">Votre besoin ne rentre pas dans une formule ?</h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-mut">Certaines entreprises ont besoin d&apos;un accompagnement spécifique : outils déjà en place, équipe interne, processus complexe, plusieurs points de contact, automatisations avancées ou besoin stratégique. Dans ce cas, nous construisons une proposition sur mesure.</p>
              <Link href="/contact" className="btn-grad mt-8 inline-flex rounded-full px-6 py-3.5 text-sm font-semibold">Demander une offre sur mesure</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Questions fréquentes</span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold">Comprendre nos formules</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <AnimateIn key={faq.question} delay={i * 80}>
                <div className="surface-card rounded-[24px] p-6 sm:p-8">
                  <h3 className="font-display text-xl font-semibold">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-7 text-mut">{faq.answer}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-7 py-20">
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] border border-white/[0.13] p-8 text-center sm:p-12 lg:p-16" style={{ background: "linear-gradient(135deg, rgba(124,92,255,0.2), rgba(31,213,240,0.1))" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink" style={{ background: "var(--grad-soft)" }}>Diagnostic</span>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(28px,4.4vw,48px)] font-semibold">Le bon tarif dépend du bon système.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-mut">Nous commençons par comprendre votre activité, vos objectifs et vos outils actuels. Ensuite, nous vous orientons vers la formule la plus adaptée.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/services" className="btn-ghost inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold">Revoir nos services</Link>
            <Link href="/prise-de-rdv" className="btn-grad inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold">Réserver un diagnostic</Link>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedPack && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6">
          <button type="button" aria-label="Fermer la fenêtre" onClick={closeOfferModal} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="surface-card relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow-grad text-xs font-semibold uppercase tracking-wider">Demande d&apos;offre</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{selectedPack.name}</h3>
                <p className="mt-1 text-sm font-medium text-mut">{selectedPack.category} · Mise en place {selectedPack.setupPrice} · Abonnement {selectedPack.monthlyPrice}</p>
              </div>
              <button type="button" onClick={closeOfferModal} aria-label="Fermer" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/[0.13] text-mut transition-colors hover:bg-white/[0.08] hover:text-ink">
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/[0.13] p-4" style={{ background: "var(--grad-soft)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">Offre préremplie</p>
              <p className="mt-1 font-display text-base font-semibold">{selectedPack.name}</p>
            </div>

            {formSent ? (
              <div className="mt-6 rounded-[24px] border border-white/[0.13] p-6 text-center" style={{ background: "var(--grad-soft)" }}>
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full text-white" style={{ background: "var(--grad)" }}>
                  <Check size={24} strokeWidth={3} />
                </div>
                <h4 className="font-display text-xl font-semibold">Demande envoyée</h4>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-mut">Votre demande a bien été enregistrée. Nous reviendrons vers vous rapidement avec une proposition adaptée.</p>
                <button type="button" onClick={closeOfferModal} className="btn-ghost mt-6 rounded-full px-5 py-2.5 text-xs font-semibold">Fermer</button>
              </div>
            ) : (
              <form onSubmit={handleOfferSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2"><span className={modalLabelClass}>Nom de famille *</span><input required value={leadForm.lastname} onChange={(e) => updateLeadField("lastname", e.target.value)} placeholder="Votre nom" className={modalFieldClass} /></label>
                  <label className="grid gap-2"><span className={modalLabelClass}>Prénom *</span><input required value={leadForm.firstname} onChange={(e) => updateLeadField("firstname", e.target.value)} placeholder="Votre prénom" className={modalFieldClass} /></label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2"><span className={modalLabelClass}>E-mail *</span><input required type="email" value={leadForm.email} onChange={(e) => updateLeadField("email", e.target.value)} placeholder="vous@email.com" className={modalFieldClass} /></label>
                  <PremiumPhoneField
                    required
                    value={leadForm.phoneFullNumber}
                    onChange={(value) => updateLeadField("phoneFullNumber", value)}
                    labelClassName="grid gap-2"
                    labelTextClassName={modalLabelClass}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2"><span className={modalLabelClass}>Entreprise</span><input value={leadForm.company} onChange={(e) => updateLeadField("company", e.target.value)} placeholder="Nom de l'entreprise" className={modalFieldClass} /></label>
                  <label className="grid gap-2"><span className={modalLabelClass}>Ville</span><input value={leadForm.businessCity} onChange={(e) => updateLeadField("businessCity", e.target.value)} placeholder="Ex : Rouen, Paris, Lyon..." className={modalFieldClass} /></label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2"><span className={modalLabelClass}>Type d&apos;activité</span><input value={leadForm.activity} onChange={(e) => updateLeadField("activity", e.target.value)} placeholder="Ex : restaurant, BTP, SaaS..." className={modalFieldClass} /></label>
                  <ObjectiveSelectField
                    required
                    value={leadForm.objective}
                    onChange={(value) => updateLeadField("objective", value)}
                    options={objectiveOptions}
                    labelClassName="grid gap-2"
                    labelTextClassName={modalLabelClass}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2"><span className={modalLabelClass}>Site web actuel</span><input type="text" value={leadForm.businessWebsiteUrl} onChange={(e) => updateLeadField("businessWebsiteUrl", e.target.value)} placeholder="https://www.votre-site.com" className={modalFieldClass} /></label>
                  <label className="grid gap-2"><span className={modalLabelClass}>Lien Google Business</span><input type="text" value={leadForm.googleBusinessUrl} onChange={(e) => updateLeadField("googleBusinessUrl", e.target.value)} placeholder="Lien vers votre fiche Google Business" className={modalFieldClass} /></label>
                </div>
                <label className="grid gap-2"><span className={modalLabelClass}>Message</span><textarea rows={4} value={leadForm.message} onChange={(e) => updateLeadField("message", e.target.value)} placeholder="Décrivez brièvement votre besoin." className={`resize-none ${modalFieldClass}`} /></label>

                {formError && (
                  <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-xs font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>{formError}</div>
                )}

                <div className="mt-2 grid gap-3">
                  <p className="text-xs font-medium text-mut">Aucun paiement maintenant. Cette demande sert à préparer un devis clair.</p>
                  <label className="flex items-start gap-3 rounded-xl border border-white/[0.1] p-4 text-xs leading-5 text-mut" style={{ background: "rgba(16,20,42,0.45)" }}>
                    <input type="checkbox" checked={leadForm.consentRgpd} onChange={(e) => updateLeadField("consentRgpd", e.target.checked)} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#7c5cff]" />
                    <span>J&apos;accepte que mes informations soient utilisées par OptimalLogic pour traiter ma demande et me recontacter.</span>
                  </label>
                  <div className="flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="btn-grad rounded-full px-5 py-2.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60">
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
