"use client";

import { useState, type FormEvent } from "react";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import Link from "next/link";
import "react-phone-number-input/style.css";

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

const labelClass = "grid gap-2";
const labelTextClass = "text-xs font-black uppercase tracking-wider";
const fieldClass =
  "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";
const textareaClass =
  "min-h-[150px] w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";

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
  const [objectiveMenuOpen, setObjectiveMenuOpen] = useState(false);
  const [TypeClientMenuOpen, setTypeClientMenuOpen] = useState(false);

  const selectedObjectiveLabel =
    objectiveOptions.find((option) => option.value === form.objective)?.label || "Choisissez un objectif";
  const selectedTypeClientLabel =
    typeclientOptions.find((option) => option.value === form.type_client)?.label || "Choisissez un type";

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

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
      console.log("Payload Contact envoyé à /api/demandes :", payload);
      const response = await fetch("/api/demandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("Réponse API contact :", result);
      if (!response.ok) throw new Error(result.error || "Erreur lors de l'envoi de votre demande.");
      setSubmitted(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Erreur lors de l'envoi de votre demande.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function TypeClientDropdown() {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setTypeClientMenuOpen((c) => !c)}
          className={`flex h-12 w-full items-center justify-between border-2 border-black bg-white px-4 text-left text-sm font-medium outline-none transition-all focus:shadow-[2px_2px_0_#000] ${
            form.type_client ? "text-black" : "text-black/40"
          }`}
        >
          <span>{selectedTypeClientLabel}</span>
          <span className="ml-4 text-xs font-black">⌄</span>
        </button>
        {TypeClientMenuOpen && (
          <div className="absolute z-30 mt-1 w-full border-2 border-black bg-white shadow-[4px_4px_0_#000]">
            {typeclientOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => { updateField("type_client", option.value); setTypeClientMenuOpen(false); }}
                className={`w-full px-4 py-3 text-left text-sm font-bold transition-all ${
                  form.type_client === option.value
                    ? "bg-yellow-400 font-black"
                    : "hover:bg-[#fffbf0]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  function ObjectiveDropdown() {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setObjectiveMenuOpen((c) => !c)}
          className={`flex h-12 w-full items-center justify-between border-2 border-black bg-white px-4 text-left text-sm font-medium outline-none transition-all focus:shadow-[2px_2px_0_#000] ${
            form.objective ? "text-black" : "text-black/40"
          }`}
        >
          <span>{selectedObjectiveLabel}</span>
          <span className="ml-4 text-xs font-black">⌄</span>
        </button>
        {objectiveMenuOpen && (
          <div className="absolute z-30 mt-1 max-h-72 w-full overflow-y-auto border-2 border-black bg-white shadow-[4px_4px_0_#000]">
            {objectiveOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => { updateField("objective", option.value); setObjectiveMenuOpen(false); }}
                className={`w-full px-4 py-3 text-left text-sm font-bold transition-all ${
                  form.objective === option.value
                    ? "bg-yellow-400 font-black"
                    : "hover:bg-[#fffbf0]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const reasons = [
    "Améliorer votre visibilité Google",
    "Créer un site plus professionnel",
    "Mieux suivre vos demandes clients",
    "Lancer une offre, une landing page ou une demande de démo",
  ];

  return (
    <main className="min-h-screen bg-white">
      <style jsx global>{`
        .phone-input-wrapper {
          height: 3rem;
          display: flex;
          align-items: center;
        }
        .phone-input-custom {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .phone-input-custom .PhoneInputCountry {
          height: 100%;
          display: flex;
          align-items: center;
          margin-right: 0.75rem;
          padding-right: 0.75rem;
          border-right: 2px solid #000;
        }
        .phone-input-custom .PhoneInputCountrySelect { cursor: pointer; }
        .phone-input-custom .PhoneInputCountrySelectArrow { opacity: 0.55; }
        .phone-input-custom .PhoneInputInput {
          width: 100%;
          min-width: 0;
          height: 100%;
          border: none;
          background: transparent;
          color: #000;
          font-size: 0.875rem;
          font-weight: 500;
          outline: none;
        }
        .phone-input-custom .PhoneInputInput::placeholder { color: rgb(0 0 0 / 0.4); }
        .phone-input-custom .PhoneInputCountryIcon {
          border-radius: 0;
          overflow: hidden;
          box-shadow: none;
        }
      `}</style>

      {/* HERO */}
      <section className="border-b border-gray-100 px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Contact & diagnostic
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Parlons de votre projet digital.
                <span className="block font-light italic text-gray-400">On vous aide à choisir le bon système.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
                Expliquez-nous votre besoin. Nous vous orientons vers la solution adaptée : visibilité locale,
                site professionnel, suivi client, prise de rendez-vous ou lancement d'offre.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Pourquoi nous contacter ?</p>
              <div className="mt-6 grid gap-3">
                {reasons.map((reason) => (
                  <div key={reason} className="flex gap-3 rounded-2xl bg-gray-50 px-4 py-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                      ✓
                    </span>
                    <p className="text-sm font-medium text-gray-700">{reason}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gray-50 p-4">
                <p className="text-sm font-black text-gray-900">Objectif de l'échange</p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Comprendre votre situation, identifier le bon levier et vous proposer une orientation claire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section id="formulaire" className="border-b border-gray-100 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:px-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8 lg:p-10">
            <div className="mb-8">
              <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-600">
                Formulaire
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Expliquez-nous votre besoin.
              </h2>
              <p className="mt-4 text-base text-gray-500">
                Votre demande sera enregistrée dans notre système pour être traitée rapidement.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-3xl bg-gray-900 p-8 text-center text-white">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-black text-white">
                  ✓
                </div>
                <h3 className="text-2xl font-black">Votre demande a bien été envoyée.</h3>
                <p className="mt-3 text-sm leading-6 text-gray-300">
                  Nous avons bien reçu votre demande. Nous reviendrons vers vous rapidement avec une première orientation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-hover mt-6 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    <span className={labelTextClass}>Nom de famille *</span>
                    <input
                      value={form.lastname}
                      onChange={(e) => updateField("lastname", e.target.value)}
                      placeholder="Votre nom"
                      className={fieldClass}
                    />
                  </label>
                  <label className={labelClass}>
                    <span className={labelTextClass}>Prénom *</span>
                    <input
                      value={form.firstname}
                      onChange={(e) => updateField("firstname", e.target.value)}
                      placeholder="Votre prénom"
                      className={fieldClass}
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    <span className={labelTextClass}>E-mail *</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="vous@email.com"
                      className={fieldClass}
                    />
                  </label>
                  <label className={labelClass}>
                    <span className={labelTextClass}>Téléphone *</span>
                    <div className="phone-input-wrapper border-2 border-black bg-white px-4 transition-all focus-within:shadow-[2px_2px_0_#000]">
                      <PhoneInput
                        international
                        defaultCountry="FR"
                        value={form.phone}
                        onChange={(value) => updateField("phone", value || "")}
                        className="phone-input-custom"
                      />
                    </div>
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    <span className={labelTextClass}>Type de Client *</span>
                    <TypeClientDropdown />
                  </label>
                  <label className={labelClass}>
                    <span className={labelTextClass}>Entreprise</span>
                    <input
                      value={form.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      placeholder="Nom de votre entreprise"
                      className={fieldClass}
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    <span className={labelTextClass}>Ville du business</span>
                    <input
                      value={form.businessCity}
                      onChange={(e) => updateField("businessCity", e.target.value)}
                      placeholder="Ex : Rouen, Paris, Lyon..."
                      className={fieldClass}
                    />
                  </label>
                  <label className={labelClass}>
                    <span className={labelTextClass}>Objectif principal</span>
                    <ObjectiveDropdown />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    <span className={labelTextClass}>Site web actuel</span>
                    <input
                      value={form.businessWebsiteUrl}
                      onChange={(e) => updateField("businessWebsiteUrl", e.target.value)}
                      placeholder="https://www.votre-site.com"
                      className={fieldClass}
                    />
                  </label>
                  <label className={labelClass}>
                    <span className={labelTextClass}>Lien Google Business</span>
                    <input
                      value={form.googleBusinessUrl}
                      onChange={(e) => updateField("googleBusinessUrl", e.target.value)}
                      placeholder="Lien vers votre fiche Google Business"
                      className={fieldClass}
                    />
                  </label>
                </div>

                <label className={labelClass}>
                  <span className={labelTextClass}>Votre message</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    rows={6}
                    placeholder="Expliquez votre activité, votre besoin et ce que vous aimeriez améliorer."
                    className={textareaClass}
                  />
                </label>

                {formError && (
                  <div className="border-2 border-black bg-yellow-400 px-4 py-3 text-sm font-black shadow-[2px_2px_0_#000]">
                    {formError}
                  </div>
                )}

                <label className="flex items-start gap-3 border-2 border-black bg-[#fffbf0] p-4 text-xs font-medium leading-5 text-black/70">
                  <input
                    type="checkbox"
                    checked={form.consentRgpd}
                    onChange={(e) => updateField("consentRgpd", e.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <span>
                    J'accepte que mes informations soient utilisées par OptimalLogic pour traiter ma demande et me recontacter.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-hover mt-2 inline-flex w-full justify-center rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </form>
            )}
          </div>

          <aside className="grid gap-6">
            <div className="rounded-3xl bg-gray-900 p-6 text-white sm:p-8">
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/70">
                Rendez-vous
              </span>
              <h3 className="mt-4 text-2xl font-black">Vous voulez aller plus vite ?</h3>
              <p className="mt-4 text-sm leading-7 text-gray-300">
                Réservez directement un diagnostic gratuit pour présenter votre activité, clarifier votre besoin
                et obtenir une première orientation.
              </p>
              <Link
                href="/prise-de-rdv"
                className="btn-hover mt-6 inline-flex w-full justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-gray-900"
              >
                Prendre rendez-vous
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
              <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-600">
                Ce qu'il faut préparer
              </span>
              <ul className="mt-5 grid gap-3 text-sm font-semibold text-black/80">
                {[
                  "Votre type d'activité",
                  "Votre objectif principal",
                  "Ce qui bloque aujourd'hui",
                  "Vos outils actuels",
                  "Vos moyens de contact actuels",
                  "Le résultat que vous voulez obtenir",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 border-b border-black/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-yellow-600 font-black">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
              <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-600">
                Après l'envoi
              </span>
              <div className="mt-5 grid gap-3">
                {[
                  "Analyse rapide de votre demande",
                  "Orientation vers l'offre adaptée",
                  "Échange si votre besoin doit être précisé",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-2 border-black bg-[#fffbf0] px-4 py-3 shadow-[2px_2px_0_#000]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-black bg-yellow-400 text-xs font-black">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="border-4 border-black bg-black p-8 text-center text-white shadow-[8px_8px_0_#facc15] sm:p-12 lg:p-16">
          <span className="inline-block border-2 border-yellow-400 bg-yellow-400 px-3 py-1 text-xs font-black uppercase text-black">
            Notre rôle
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
            Transformer votre présence digitale en demandes concrètes.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/70">
            Appels, rendez-vous, devis, inscriptions ou prospects qualifiés : nous vous aidons à choisir le bon système.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex justify-center border-2 border-yellow-400 px-6 py-3 text-sm font-black text-yellow-400 shadow-[3px_3px_0_#facc15] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Revoir nos services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
