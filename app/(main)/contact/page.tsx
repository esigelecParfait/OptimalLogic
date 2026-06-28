"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { parsePhoneNumber } from "react-phone-number-input";
import NeuralBackground from "@/components/fx/NeuralBackground";
import {
  ObjectiveSelectField,
  PremiumPhoneField,
  PremiumSelectControl,
} from "@/components/forms/PremiumFormFields";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Globe2,
  Mail,
  MessageCircle,
  MousePointerClick,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";

type FormState = {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  company: string;
  businessCity: string;
  type_client: string;
  businessWebsiteUrl: string;
  googleBusinessUrl: string;
  objective: string;
  message: string;
  consentRgpd: boolean;
};

type ObjectiveOption = { value: string; label: string };
type TypeClientOption = { value: string; label: string };

type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 text-sm text-ink outline-none transition-all placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-white/[0.12]";
const textareaClass =
  "min-h-[150px] w-full resize-none rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mut-2 focus:border-white/35 focus:ring-2 focus:ring-white/[0.12]";
const typeclientOptions: TypeClientOption[] = [
  { value: "commerce", label: "Commerce" },
  { value: "tpe_pme", label: "TPE/PME" },
  { value: "startup", label: "Startup" },
];

const objectiveOptions: ObjectiveOption[] = [
  { value: "plus_appels_reservations", label: "Plus d'appels ou de réservations" },
  { value: "plus_devis_qualifies", label: "Plus de devis ou demandes qualifiées" },
  { value: "mieux_suivre_prospects", label: "Mieux suivre les prospects" },
  { value: "ameliorer_image", label: "Améliorer mon image professionnelle" },
  { value: "lancer_offre", label: "Lancer ou tester une offre" },
  { value: "automatiser_reponses", label: "Automatiser les réponses aux clients" },
  { value: "incertain", label: "Je ne sais pas encore" },
];

const contactReasons: Reason[] = [
  {
    icon: Globe2,
    title: "Visibilité locale",
    description: "Comprendre comment être mieux trouvé sur Google et convertir plus de recherches en contacts.",
  },
  {
    icon: MousePointerClick,
    title: "Parcours de contact",
    description: "Clarifier les appels, formulaires et rendez-vous pour réduire les abandons.",
  },
  {
    icon: MessageCircle,
    title: "Réponses & suivi",
    description: "Structurer les demandes entrantes pour relancer les bons prospects au bon moment.",
  },
  {
    icon: Target,
    title: "Offre adaptée",
    description: "Identifier ce qui est vraiment utile avant de parler site, IA ou automatisation.",
  },
];

const preparationItems = [
  "Votre type d'activité",
  "Votre objectif principal",
  "Ce qui bloque aujourd'hui",
  "Vos outils actuels",
  "Vos moyens de contact actuels",
  "Le résultat que vous voulez obtenir",
];

const afterSubmitSteps = [
  "Analyse rapide de votre demande",
  "Orientation vers l'offre adaptée",
  "Échange si votre besoin doit être précisé",
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

function IconFrame({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/[0.12] text-white"
      style={{ background: "rgba(255,255,255,0.1)" }}
    >
      <Icon size={20} strokeWidth={1.8} />
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-7">
      <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-[clamp(25px,3vw,36px)] font-semibold">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-base leading-7 text-mut">{description}</p>}
    </div>
  );
}

function ArrowIcon() {
  return <ArrowRight size={16} strokeWidth={2.2} />;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    company: "",
    businessCity: "",
    type_client: "",
    businessWebsiteUrl: "",
    googleBusinessUrl: "",
    objective: "",
    message: "",
    consentRgpd: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    if (!form.lastname.trim() || !form.firstname.trim() || !form.email.trim()) {
      setFormError("Veuillez renseigner votre nom, prénom et e-mail.");
      setIsSubmitting(false);
      return;
    }

    const parsedPhone = parsePhoneNumber(form.phone);
    if (!parsedPhone || !parsedPhone.isValid()) {
      setFormError("Le numéro de téléphone est invalide.");
      setIsSubmitting(false);
      return;
    }

    if (!form.type_client) {
      setFormError("Veuillez sélectionner un type de client.");
      setIsSubmitting(false);
      return;
    }

    if (!form.consentRgpd) {
      setFormError("Vous devez accepter l'utilisation de vos informations pour être recontacté.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      client: {
        contact_first_name: form.firstname.trim(),
        contact_last_name: form.lastname.trim(),
        contact_email: form.email.trim().toLowerCase(),
        phone_country_code: `+${parsedPhone.countryCallingCode}`,
        phone_number: parsedPhone.nationalNumber,
        type_client: cleanOptionalText(form.type_client),
        business_name: cleanOptionalText(form.company),
        business_city: cleanOptionalText(form.businessCity),
        business_sector: null,
        business_website_url: normalizeOptionalUrl(form.businessWebsiteUrl),
        google_business_url: normalizeOptionalUrl(form.googleBusinessUrl),
      },
      demande: {
        request_source: "contact",
        offer_code: null,
        objective_type: cleanOptionalText(form.objective),
        need_description: cleanOptionalText(form.message),
        consent_rgpd: form.consentRgpd,
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
      if (!response.ok) throw new Error(result.error || "Erreur lors de l'envoi de votre demande.");
      setSubmitted(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Erreur lors de l'envoi de votre demande.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden px-7 pb-16 pt-44 lg:pt-52">
        <NeuralBackground />
        <div className="relative z-[2] mx-auto max-w-[1240px]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink"
                style={{ background: "var(--grad-soft)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Contact &amp; diagnostic
              </span>

              <h1 className="mt-6 max-w-4xl text-[clamp(38px,5vw,62px)] font-semibold leading-[1.04]">
                Parlons de votre activité,
                <span className="grad-text"> pas seulement de votre site.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-mut">
                Visibilité Google, site web, prise de rendez-vous, assistant IA ou suivi des demandes :
                nous vous aidons à identifier le système digital vraiment utile pour votre activité.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#formulaire"
                  className="btn-grad inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Envoyer ma demande <ArrowIcon />
                </a>
                <Link
                  href="/prise-de-rdv"
                  className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Réserver un diagnostic
                </Link>
              </div>
            </div>

            <div className="surface-card relative overflow-hidden rounded-[28px] p-6 sm:p-7">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-60 blur-[70px]"
                style={{ background: "var(--ink)" }}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">Pourquoi nous contacter ?</p>
                    <h2 className="mt-2 text-2xl font-semibold">Un diagnostic avant la solution.</h2>
                  </div>
                  <IconFrame icon={Sparkles} />
                </div>

                <div className="mt-7 grid gap-3">
                  {contactReasons.map(({ icon: Icon, title, description }) => (
                    <div
                      key={title}
                      className="flex gap-4 rounded-2xl border border-white/[0.07] p-4"
                      style={{ background: "rgba(26,26,29,0.48)" }}
                    >
                      <IconFrame icon={Icon} />
                      <div>
                        <p className="text-sm font-semibold text-ink">{title}</p>
                        <p className="mt-1 text-[13.5px] leading-6 text-mut">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="formulaire" className="relative z-[2] px-7 py-16">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1fr_0.82fr]">
          <div className="surface-card rounded-[30px] p-6 sm:p-8 lg:p-10">
            <SectionTitle
              eyebrow="Formulaire"
              title="Expliquez-nous votre besoin."
              description="Votre demande sera enregistrée dans notre système pour être traitée rapidement et orientée vers la solution la plus adaptée."
            />

            {submitted ? (
              <div
                className="rounded-[26px] border border-white/[0.13] p-8 text-center"
                style={{ background: "var(--grad-soft)" }}
              >
                <div
                  className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full text-white"
                  style={{ background: "var(--grad)" }}
                >
                  <CheckCircle2 size={30} strokeWidth={2.3} />
                </div>
                <h3 className="font-display text-2xl font-semibold">Votre demande a bien été envoyée.</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-mut">
                  Nous avons bien reçu votre demande. Nous reviendrons vers vous rapidement avec une première orientation.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-ghost mt-6 rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-8">
                <div className="rounded-[24px] border border-white/[0.08] p-5 sm:p-6" style={{ background: "rgba(26,26,29,0.34)" }}>
                  <div className="mb-5 flex items-center gap-3">
                    <IconFrame icon={UserRound} />
                    <div>
                      <h3 className="font-display text-xl font-semibold">Vos coordonnées</h3>
                      <p className="mt-1 text-sm text-mut">Pour pouvoir vous recontacter correctement.</p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      <span className={labelTextClass}>Nom de famille *</span>
                      <input
                        value={form.lastname}
                        onChange={(event) => updateField("lastname", event.target.value)}
                        placeholder="Votre nom"
                        className={fieldClass}
                        autoComplete="family-name"
                      />
                    </label>
                    <label className={labelClass}>
                      <span className={labelTextClass}>Prénom *</span>
                      <input
                        value={form.firstname}
                        onChange={(event) => updateField("firstname", event.target.value)}
                        placeholder="Votre prénom"
                        className={fieldClass}
                        autoComplete="given-name"
                      />
                    </label>
                    <label className={labelClass}>
                      <span className={labelTextClass}>E-mail *</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="vous@email.com"
                        className={fieldClass}
                        autoComplete="email"
                      />
                    </label>
                    <PremiumPhoneField
                      required
                      value={form.phone}
                      onChange={(value) => updateField("phone", value)}
                      labelClassName={labelClass}
                      labelTextClassName={labelTextClass}
                    />
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/[0.08] p-5 sm:p-6" style={{ background: "rgba(26,26,29,0.34)" }}>
                  <div className="mb-5 flex items-center gap-3">
                    <IconFrame icon={ClipboardList} />
                    <div>
                      <h3 className="font-display text-xl font-semibold">Votre activité</h3>
                      <p className="mt-1 text-sm text-mut">Pour comprendre votre contexte et votre type de besoin.</p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      <span className={labelTextClass}>Type de client *</span>
                      <PremiumSelectControl
                        required
                        value={form.type_client}
                        onChange={(value) => updateField("type_client", value)}
                        placeholder="Choisissez un type"
                        options={typeclientOptions}
                      />
                    </label>
                    <label className={labelClass}>
                      <span className={labelTextClass}>Entreprise</span>
                      <input
                        value={form.company}
                        onChange={(event) => updateField("company", event.target.value)}
                        placeholder="Nom de votre entreprise"
                        className={fieldClass}
                        autoComplete="organization"
                      />
                    </label>
                    <label className={labelClass}>
                      <span className={labelTextClass}>Ville du business</span>
                      <input
                        value={form.businessCity}
                        onChange={(event) => updateField("businessCity", event.target.value)}
                        placeholder="Ex : Rouen, Paris, Lyon..."
                        className={fieldClass}
                      />
                    </label>
                    <ObjectiveSelectField
                      value={form.objective}
                      onChange={(value) => updateField("objective", value)}
                      options={objectiveOptions}
                      labelClassName={labelClass}
                      labelTextClassName={labelTextClass}
                    />
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/[0.08] p-5 sm:p-6" style={{ background: "rgba(26,26,29,0.34)" }}>
                  <div className="mb-5 flex items-center gap-3">
                    <IconFrame icon={Globe2} />
                    <div>
                      <h3 className="font-display text-xl font-semibold">Présence digitale actuelle</h3>
                      <p className="mt-1 text-sm text-mut">Ces liens nous aident à analyser votre visibilité et votre image actuelle.</p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      <span className={labelTextClass}>Site web actuel</span>
                      <input
                        value={form.businessWebsiteUrl}
                        onChange={(event) => updateField("businessWebsiteUrl", event.target.value)}
                        placeholder="https://www.votre-site.com"
                        className={fieldClass}
                        inputMode="url"
                      />
                    </label>
                    <label className={labelClass}>
                      <span className={labelTextClass}>Lien Google Business</span>
                      <input
                        value={form.googleBusinessUrl}
                        onChange={(event) => updateField("googleBusinessUrl", event.target.value)}
                        placeholder="Lien vers votre fiche Google Business"
                        className={fieldClass}
                        inputMode="url"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/[0.08] p-5 sm:p-6" style={{ background: "rgba(26,26,29,0.34)" }}>
                  <div className="mb-5 flex items-center gap-3">
                    <IconFrame icon={Mail} />
                    <div>
                      <h3 className="font-display text-xl font-semibold">Votre message</h3>
                      <p className="mt-1 text-sm text-mut">Décrivez simplement ce que vous voulez améliorer.</p>
                    </div>
                  </div>

                  <label className={labelClass}>
                    <span className={labelTextClass}>Message</span>
                    <textarea
                      value={form.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      rows={6}
                      placeholder="Expliquez votre activité, votre besoin et ce que vous aimeriez améliorer."
                      className={textareaClass}
                    />
                  </label>
                </div>

                {formError && (
                  <div
                    className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]"
                    style={{ background: "rgba(255,77,109,0.1)" }}
                  >
                    {formError}
                  </div>
                )}

                <label
                  className="flex items-start gap-3 rounded-xl border border-white/[0.1] p-4 text-[13.5px] leading-5 text-mut"
                  style={{ background: "rgba(26,26,29,0.45)" }}
                >
                  <input
                    type="checkbox"
                    checked={form.consentRgpd}
                    onChange={(event) => updateField("consentRgpd", event.target.checked)}
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-white"
                  />
                  <span>
                    J&apos;accepte que mes informations soient utilisées par OptimalLogic pour traiter ma demande
                    et me recontacter.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-grad inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                  {!isSubmitting && <Send size={16} strokeWidth={2.2} />}
                </button>
              </form>
            )}
          </div>

          <aside className="grid content-start gap-6">
            <div
              className="relative overflow-hidden rounded-[26px] border border-white/[0.13] p-6 sm:p-8"
              style={{ background: "var(--grad-soft)" }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-50 blur-[75px]"
                style={{ background: "var(--ink)" }}
              />
              <div className="relative">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink"
                  style={{ background: "rgba(5,5,5,0.5)" }}
                >
                  <CalendarCheck size={14} /> Diagnostic gratuit
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold">Vous voulez aller plus vite ?</h3>
                <p className="mt-4 text-sm leading-7 text-mut">
                  Réservez directement un créneau pour présenter votre activité, clarifier votre besoin et obtenir une première orientation.
                </p>
                <Link
                  href="/prise-de-rdv"
                  className="btn-grad mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Prendre rendez-vous <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="surface-card rounded-[26px] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <IconFrame icon={ShieldCheck} />
                <div>
                  <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
                    Ce qu&apos;il faut préparer
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold">Quelques éléments utiles.</h3>
                </div>
              </div>

              <ul className="mt-6 grid gap-3 text-sm font-medium text-mut">
                {preparationItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                    <Check size={16} strokeWidth={2.3} className="shrink-0 text-emerald" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card rounded-[26px] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <IconFrame icon={Clock3} />
                <div>
                  <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
                    Après l&apos;envoi
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold">Un traitement simple.</h3>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {afterSubmitSteps.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] px-4 py-3"
                    style={{ background: "rgba(26,26,29,0.45)" }}
                  >
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white"
                      style={{ background: "var(--grad)" }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-mut">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative z-[2] mx-auto max-w-[1240px] px-7 py-16">
        <div
          className="relative overflow-hidden rounded-[32px] border border-white/[0.13] p-8 text-center sm:p-12 lg:p-16"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08))" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.18), transparent 60%)" }}
          />
          <div className="relative">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink"
              style={{ background: "var(--grad-soft)" }}
            >
              <Sparkles size={14} /> Notre rôle
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(28px,4.4vw,48px)] font-semibold">
              Transformer votre présence digitale en demandes concrètes.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-mut">
              Appels, rendez-vous, devis, inscriptions ou prospects qualifiés : nous vous aidons à choisir le bon système.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/services"
                className="btn-ghost inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Revoir nos services
              </Link>
              <Link
                href="/prise-de-rdv"
                className="btn-grad inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Demander un diagnostic <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
