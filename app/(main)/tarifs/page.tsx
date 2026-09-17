"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { parsePhoneNumber } from "react-phone-number-input";
import Link from "next/link";
import { BadgeCheck, Check, CreditCard, FileText, RefreshCw, X } from "lucide-react";
import { PremiumPhoneField } from "@/components/forms/PremiumFormFields";
import { MotionGroup, MotionItem, MotionReveal } from "@/components/motion";
import {
  formatDatabasePrice,
  isPublicOfferCode,
  type PublicDatabaseOffer,
} from "@/lib/offers/public-catalog";

type PricingPack = {
  code: string;
  name: string;
  category: string;
  subtitle: string;
  target?: string;
  setupPrice: string | null;
  monthlyPrice: string | null;
  monthlyRequired: boolean;
  isAvailable?: boolean;
  highlighted?: boolean;
  setupIncludes: string[];
  monthlyIncludes: string[];
  result: string;
  cta?: string;
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

const baseOffers: PricingPack[] = [
  {
    code: "commerce_intelligent",
    name: "",
    category: "Présence digitale",
    subtitle:
      "Pour les entreprises dont la présence en ligne manque de clarté, de cohérence ou de points de contact efficaces.",
    setupPrice: null,
    monthlyPrice: null,
    monthlyRequired: false,
    highlighted: true,
    setupIncludes: [
      "Audit de la présence digitale",
      "Clarification des services et des messages",
      "Création ou refonte d'un site d'environ cinq pages",
      "Adaptation mobile et SEO de base",
      "Configuration de la présence Google",
      "Parcours vers l'appel, le devis ou le rendez-vous",
    ],
    monthlyIncludes: [
      "Hébergement et supervision",
      "Maintenance et mises à jour",
      "Petites modifications convenues",
      "Assistance",
    ],
    result:
      "Une présence cohérente qui permet de comprendre rapidement l'entreprise et de la contacter facilement.",
    cta: "Demander cette formule",
  },
  {
    code: "tpe_pme_croissance",
    name: "",
    category: "Accueil par SMS",
    subtitle:
      "Pour les entreprises qui ne peuvent pas répondre immédiatement aux messages et reçoivent des demandes incomplètes.",
    setupPrice: null,
    monthlyPrice: null,
    monthlyRequired: true,
    highlighted: false,
    setupIncludes: [
      "Analyse du fonctionnement de l'entreprise",
      "Définition des réponses, limites et règles",
      "Configuration du canal SMS",
      "Scénarios de qualification",
      "Collecte des informations nécessaires",
      "Prise de rendez-vous si elle est autorisée",
      "Connexion à OptimalLogic Réception",
      "Tests et ajustements avant lancement",
    ],
    monthlyIncludes: [
      "Accès au système, hébergement et maintenance",
      "Suivi technique et centralisation des demandes",
      "Ajustements limités des règles et informations",
      "Volume de SMS défini dans la proposition",
    ],
    result:
      "Vos clients obtiennent une réponse et votre équipe reçoit une demande claire et qualifiée.",
  },
  {
    code: "tpe_pme_performance",
    name: "",
    category: "Accueil par appels + SMS",
    subtitle:
      "Pour les entreprises qui risquent de perdre un rendez-vous, un devis ou un client lorsqu'elles ne peuvent pas décrocher.",
    setupPrice: null,
    monthlyPrice: null,
    monthlyRequired: true,
    highlighted: true,
    setupIncludes: [
      "Analyse du fonctionnement de l'entreprise",
      "Configuration de l'accueil vocal intelligent",
      "Configuration des appels et des SMS",
      "Scénarios de qualification",
      "Gestion des horaires, indisponibilités et transferts",
      "Prise de rendez-vous et notifications",
      "Connexion à OptimalLogic Réception",
      "Tests des conversations avant lancement",
    ],
    monthlyIncludes: [
      "Accès au système, hébergement et maintenance",
      "Suivi technique et résumés des échanges",
      "Centralisation des demandes",
      "Ajustements limités des règles et informations",
      "Volumes de minutes et de SMS définis dans la proposition",
    ],
    result:
      "Restez joignable sans interrompre votre activité et recevez un résumé exploitable de chaque demande.",
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
      "Vous recevez une formule recommandée avec le détail de la mise en place et de l'accompagnement facultatif.",
  },
  {
    step: "03",
    title: "Devis & acompte",
    description:
      "Le projet démarre après validation du devis et paiement d'un acompte de lancement.",
  },
  {
    step: "04",
    title: "Livraison & accompagnement au choix",
    description:
      "La solution livrée reste utilisable seule. Un accompagnement mensuel peut être ajouté pour la maintenir et l'améliorer.",
  },
];

const faqs = [
  {
    question: "L'accompagnement mensuel est-il obligatoire ?",
    answer:
      "Il est facultatif pour l'offre Présence digitale. Les offres d'accueil automatisé comprennent un abonnement mensuel, auquel s'ajoute la consommation prévue dans la proposition.",
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
      "Oui. L'objectif est de commencer avec une base utile, puis d'ajouter progressivement des fonctionnalités selon les résultats et les besoins.",
  },
];

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
  "rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-white/[0.12]";
const modalLabelClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";

function PremiumCheck({
  item,
  tone = "emerald",
}: {
  item: string;
  tone?: "emerald" | "cyan";
}) {
  return (
    <li className="flex gap-2.5 text-[13px] leading-5">
      <span
        className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${
          tone === "emerald" ? "text-emerald" : "text-white"
        }`}
        style={{
          background:
            tone === "emerald" ? "rgba(46,230,168,0.1)" : "rgba(255,255,255,0.08)",
        }}
      >
        <Check size={12} strokeWidth={3} />
      </span>
      <span className="text-mut">{item}</span>
    </li>
  );
}

export default function TarifsPage() {
  const [databaseOffers, setDatabaseOffers] = useState<PublicDatabaseOffer[]>([]);
  const [offersError, setOffersError] = useState<string | null>(null);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);

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
        const response = await fetch("/api/offres", { method: "GET", cache: "no-store" });
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.error || "Impossible de charger les offres.");
        const publicOffers = (result.offres ?? []).filter(
          (offer: PublicDatabaseOffer) =>
            typeof offer?.code === "string" && isPublicOfferCode(offer.code),
        );
        setDatabaseOffers(publicOffers);
        setOffersError(null);
      } catch (error) {
        console.error("Erreur chargement offres :", error);
        setOffersError(
          error instanceof Error ? error.message : "Impossible de charger les offres.",
        );
      } finally {
        setIsLoadingOffers(false);
      }
    }
    loadOffers();
  }, []);

  const applyDatabaseOffer = useCallback(
    (pack: PricingPack): PricingPack => {
      if (isLoadingOffers) {
        return { ...pack, setupPrice: null, monthlyPrice: null, isAvailable: undefined };
      }

      const matchingOffer = databaseOffers.find((offer) => offer.code === pack.code);
      if (!matchingOffer) {
        return { ...pack, setupPrice: null, monthlyPrice: null, isAvailable: false };
      }
      return {
        ...pack,
        name: matchingOffer.nom_offre,
        setupPrice: formatDatabasePrice(matchingOffer.prix),
        monthlyPrice: formatDatabasePrice(matchingOffer.prix_abonnement, "month"),
        isAvailable: true,
      };
    },
    [databaseOffers, isLoadingOffers],
  );

  const offers = useMemo(() => baseOffers.map(applyDatabaseOffer), [applyDatabaseOffer]);

  function updateLeadField<K extends keyof OfferRequestForm>(
    field: K,
    value: OfferRequestForm[K],
  ) {
    setLeadForm((current) => ({ ...current, [field]: value }));
  }

  function getDefaultOfferMessage(packName: string) {
    return `Bonjour, je suis intéressé(e) par la formule ${packName}.`;
  }

  function isDefaultOfferMessage(message: string) {
    return /^Bonjour, je suis intéressé\(e\) par la formule .+\.$/.test(message.trim());
  }

  function openOfferModal(pack: PricingPack) {
    if (!pack.isAvailable) return;
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
      setFormError(
        "Vous devez accepter l'utilisation de vos informations pour être recontacté.",
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
      if (!response.ok)
        throw new Error(result.error || "Erreur lors de l'envoi de la demande.");
      setFormSent(true);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Erreur lors de l'envoi de la demande.",
      );
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
        aria-busy={isLoadingOffers}
        className={`relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
          featured ? "border border-white/40" : "surface-card"
        }`}
        style={
          featured
            ? {
                background:
                  "linear-gradient(170deg, rgba(255,255,255,0.12), rgba(5,5,5,0.96))",
                boxShadow: "0 42px 95px -42px rgba(255,255,255,0.34)",
              }
            : undefined
        }
      >
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-[260px] w-[260px] rounded-full opacity-40 blur-[80px]"
          style={{ background: featured ? "var(--ink)" : "var(--ink)" }}
        />

        <div className="relative z-[1] pr-24">
          <p className="eyebrow-grad text-xs font-semibold uppercase tracking-wider">
            {pack.category}
          </p>
          <h3 className="mt-2 font-display text-[26px] font-semibold leading-tight">
            {pack.name ||
              (isLoadingOffers ? "Chargement de l’offre…" : "Offre indisponible")}
          </h3>
          <p className="mt-3 text-sm leading-6 text-mut">{pack.subtitle}</p>
        </div>

        <div className="relative z-[1] mt-6 grid gap-3 sm:grid-cols-2">
          <div
            className="rounded-2xl border border-white/[0.13] p-5"
            style={{ background: "var(--grad-soft)" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mut-2">
              Mise en place
            </p>
            <p className="mt-3 font-display text-[28px] font-semibold leading-none">
              {pack.setupPrice ?? (isLoadingOffers ? "Chargement…" : "Prix indisponible")}
            </p>
            <p className="mt-2 text-[10px] text-mut-2">paiement projet</p>
          </div>
          <div
            className="rounded-2xl border border-white/[0.08] p-5"
            style={{ background: "rgba(26,26,29,0.62)" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mut-2">
              {pack.monthlyRequired ? "Abonnement mensuel" : "Accompagnement facultatif"}
            </p>
            <p className="mt-3 font-display text-[28px] font-semibold leading-none">
              {pack.monthlyPrice ?? (isLoadingOffers ? "Chargement…" : "Non renseigné")}
            </p>
            <p className="mt-2 text-[10px] text-mut-2">maintenance &amp; amélioration</p>
          </div>
        </div>

        <div
          className="relative z-[1] mt-6 rounded-2xl border border-white/[0.08] p-5"
          style={{ background: "rgba(26,26,29,0.48)" }}
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
          style={{ background: "rgba(26,26,29,0.42)" }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mut-2">
              {pack.monthlyRequired ? "Abonnement mensuel" : "Accompagnement facultatif"}
            </p>
            <span className="rounded-full border border-white/[0.1] px-2.5 py-1 text-[10px] text-mut-2">
              {pack.monthlyRequired ? "service" : "au choix"}
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
          style={{ background: "rgba(5,5,5,0.62)" }}
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
            disabled={!pack.isAvailable}
            className={`inline-flex w-full justify-center rounded-full px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${
              featured ? "btn-grad" : "btn-ghost"
            }`}
          >
            {pack.isAvailable
              ? pack.cta || "Demander cette formule"
              : isLoadingOffers
                ? "Chargement de l’offre…"
                : "Offre momentanément indisponible"}
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
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.12), transparent 35%), radial-gradient(circle at 86% 18%, rgba(255,255,255,0.08), transparent 30%)",
          }}
        />

        <MotionReveal
          className="relative z-[2] mx-auto max-w-[1240px]"
          preset="rise"
          presetId="reveal-copy"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink"
            style={{ background: "var(--grad-soft)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Tarifs &amp; formules
          </span>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.03]">
                Trois offres pour renforcer votre présence
                <span className="grad-text"> et ne plus perdre de demandes.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-mut">
                Présence digitale, accueil par SMS ou accueil par appels + SMS :
                choisissez le niveau de prise en charge adapté à votre entreprise.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/prise-de-rdv"
                  className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Réserver un diagnostic
                </Link>
                <a
                  href="#offres"
                  className="btn-ghost inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Comparer les formules
                </a>
              </div>

              <div className="mt-8">
                <p className="text-xs leading-5 text-mut-2">
                  Les noms et les prix affichés sont chargés depuis notre base de
                  données. Les consommations SMS et téléphoniques sont précisées dans
                  chaque proposition.
                </p>
              </div>

              {offersError && (
                <div
                  className="mt-6 rounded-xl border border-amber-300/30 px-5 py-3 text-xs font-medium text-amber-200"
                  style={{ background: "rgba(251,191,36,0.08)" }}
                >
                  Les prix ne peuvent pas être chargés depuis la base de données. Aucun
                  montant de remplacement n&apos;est affiché.
                </div>
              )}
            </div>

            <div className="surface-card rounded-[28px] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.13] text-white"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <BadgeCheck size={23} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">
                    Comment lire les prix ?
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold">
                    Un projet + un accompagnement au choix
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div
                  className="rounded-2xl border border-white/[0.07] p-5"
                  style={{ background: "rgba(26,26,29,0.5)" }}
                >
                  <div className="mb-3 flex items-center gap-2 text-white">
                    <FileText size={18} strokeWidth={1.8} />
                    <p className="font-display text-lg font-semibold text-ink">
                      Diagnostic
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-mut">
                    Avant de choisir, nous validons la formule réellement adaptée à votre
                    activité.
                  </p>
                </div>
                <div
                  className="rounded-2xl border border-white/[0.07] p-5"
                  style={{ background: "rgba(26,26,29,0.5)" }}
                >
                  <div className="mb-3 flex items-center gap-2 text-emerald">
                    <CreditCard size={18} strokeWidth={1.8} />
                    <p className="font-display text-lg font-semibold text-ink">
                      Mise en place
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-mut">
                    Création, configuration, intégration des outils et construction du
                    parcours digital.
                  </p>
                </div>
                <div
                  className="rounded-2xl border border-white/[0.13] p-5"
                  style={{ background: "var(--grad-soft)" }}
                >
                  <div className="mb-3 flex items-center gap-2 text-white">
                    <RefreshCw size={18} strokeWidth={1.8} />
                    <p className="font-display text-lg font-semibold text-ink">
                      Suivi selon l’offre
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-mut">
                    Facultatif pour la présence digitale. Inclus dans l’abonnement des
                    offres d’accueil automatisé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </section>

      {/* Offres */}
      <section id="offres" className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
              Trois réponses concrètes
            </span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold">
              Choisissez ce que votre entreprise doit mieux gérer
            </h2>
            <p className="mt-5 text-base leading-7 text-mut">
              Une présence digitale claire, une réponse automatique par SMS ou une
              réception complète par appels et SMS. Aucun pack n’est présenté comme
              illimité.
            </p>
          </div>
          <MotionGroup
            className="grid gap-6 lg:grid-cols-3"
            label="Les trois offres OptimalLogic"
            preset="rise"
            presetId="reveal-group"
          >
            {offers.map((pack, index) => (
              <MotionItem key={pack.code} order={index}>
                <PricingCard pack={pack} />
              </MotionItem>
            ))}
          </MotionGroup>
        </div>
      </section>

      {/* Processus */}
      <section className="px-7 py-16">
        <div className="surface-card mx-auto max-w-[1240px] rounded-[28px] p-8 sm:p-10 lg:p-12">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
              Démarrage
            </span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold">
              Comment se passe le lancement ?
            </h2>
            <p className="mt-5 text-base leading-7 text-mut">
              Un parcours simple : comprendre votre besoin, choisir le bon périmètre, puis
              lancer un système clair et suivi.
            </p>
          </div>
          <MotionGroup
            className="grid gap-4 md:grid-cols-4"
            label="Étapes du lancement"
            preset="rise"
            presetId="flow-progress"
          >
            {paymentSteps.map((item, i) => (
              <MotionItem key={item.step} order={i}>
                <div
                  className="rounded-2xl border border-white/[0.07] p-5"
                  style={{ background: "rgba(26,26,29,0.5)" }}
                >
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full font-display text-xs font-bold text-white"
                    style={{ background: "var(--grad)" }}
                  >
                    {item.step}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-mut">{item.description}</p>
                </div>
              </MotionItem>
            ))}
          </MotionGroup>
        </div>
      </section>

      {/* Sur mesure */}

      {/* FAQ */}
      <section className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
              Questions fréquentes
            </span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold">
              Comprendre nos formules
            </h2>
          </div>
          <MotionGroup
            className="grid gap-4 md:grid-cols-2"
            label="Questions fréquentes"
            preset="rise"
            presetId="reveal-group"
          >
            {faqs.map((faq, i) => (
              <MotionItem key={faq.question} order={i}>
                <div className="surface-card rounded-[24px] p-6 sm:p-8">
                  <h3 className="font-display text-xl font-semibold">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-7 text-mut">{faq.answer}</p>
                </div>
              </MotionItem>
            ))}
          </MotionGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="px-7 py-20">
        <div
          className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] border border-white/[0.13] p-8 text-center sm:p-12 lg:p-16"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08))",
          }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink"
            style={{ background: "var(--grad-soft)" }}
          >
            Diagnostic
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(28px,4.4vw,48px)] font-semibold">
            Le bon tarif dépend du bon système.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-mut">
            Nous commençons par comprendre votre activité, vos objectifs et vos outils
            actuels. Ensuite, nous vous orientons vers la formule la plus adaptée.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="btn-ghost inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold"
            >
              Revoir nos services
            </Link>
            <Link
              href="/prise-de-rdv"
              className="btn-grad inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold"
            >
              Réserver un diagnostic
            </Link>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedPack && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            aria-label="Fermer la fenêtre"
            onClick={closeOfferModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="surface-card relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow-grad text-xs font-semibold uppercase tracking-wider">
                  Demande d&apos;offre
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">
                  {selectedPack.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-mut">
                  {selectedPack.category} · Mise en place {selectedPack.setupPrice} ·
                  {selectedPack.monthlyRequired
                    ? "Abonnement mensuel"
                    : "Accompagnement facultatif"}{" "}
                  {selectedPack.monthlyPrice ?? "non renseigné"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeOfferModal}
                aria-label="Fermer"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/[0.13] text-mut transition-colors hover:bg-white/[0.08] hover:text-ink"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div
              className="mt-6 rounded-2xl border border-white/[0.13] p-4"
              style={{ background: "var(--grad-soft)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">
                Offre préremplie
              </p>
              <p className="mt-1 font-display text-base font-semibold">
                {selectedPack.name}
              </p>
            </div>

            {formSent ? (
              <div
                className="mt-6 rounded-[24px] border border-white/[0.13] p-6 text-center"
                style={{ background: "var(--grad-soft)" }}
              >
                <div
                  className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full text-white"
                  style={{ background: "var(--grad)" }}
                >
                  <Check size={24} strokeWidth={3} />
                </div>
                <h4 className="font-display text-xl font-semibold">Demande envoyée</h4>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-mut">
                  Votre demande a bien été enregistrée. Nous reviendrons vers vous
                  rapidement avec une proposition adaptée.
                </p>
                <button
                  type="button"
                  onClick={closeOfferModal}
                  className="btn-ghost mt-6 rounded-full px-5 py-2.5 text-xs font-semibold"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleOfferSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className={modalLabelClass}>Nom de famille *</span>
                    <input
                      required
                      value={leadForm.lastname}
                      onChange={(e) => updateLeadField("lastname", e.target.value)}
                      placeholder="Votre nom"
                      className={modalFieldClass}
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className={modalLabelClass}>Prénom *</span>
                    <input
                      required
                      value={leadForm.firstname}
                      onChange={(e) => updateLeadField("firstname", e.target.value)}
                      placeholder="Votre prénom"
                      className={modalFieldClass}
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className={modalLabelClass}>E-mail *</span>
                    <input
                      required
                      type="email"
                      value={leadForm.email}
                      onChange={(e) => updateLeadField("email", e.target.value)}
                      placeholder="vous@email.com"
                      className={modalFieldClass}
                    />
                  </label>
                  <PremiumPhoneField
                    required
                    value={leadForm.phoneFullNumber}
                    onChange={(value) => updateLeadField("phoneFullNumber", value)}
                    labelClassName="grid gap-2"
                    labelTextClassName={modalLabelClass}
                  />
                </div>
                {/*
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
                </div> */}

                <label className="grid gap-2">
                  <span className={modalLabelClass}>Message</span>
                  <textarea
                    rows={4}
                    value={leadForm.message}
                    onChange={(e) => updateLeadField("message", e.target.value)}
                    placeholder="Décrivez brièvement votre besoin."
                    className={`resize-none ${modalFieldClass}`}
                  />
                </label>

                {formError && (
                  <div
                    className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-xs font-medium text-[#ff9db1]"
                    style={{ background: "rgba(255,77,109,0.1)" }}
                  >
                    {formError}
                  </div>
                )}

                <div className="mt-2 grid gap-3">
                  <p className="text-xs font-medium text-mut">
                    Aucun paiement maintenant. Cette demande sert à préparer un devis
                    clair.
                  </p>
                  <label
                    className="flex items-start gap-3 rounded-xl border border-white/[0.1] p-4 text-xs leading-5 text-mut"
                    style={{ background: "rgba(26,26,29,0.45)" }}
                  >
                    <input
                      type="checkbox"
                      checked={leadForm.consentRgpd}
                      onChange={(e) => updateLeadField("consentRgpd", e.target.checked)}
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-white"
                    />
                    <span>
                      J&apos;accepte que mes informations soient utilisées par
                      OptimalLogic pour traiter ma demande et me recontacter.
                    </span>
                  </label>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-grad rounded-full px-5 py-2.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60"
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
