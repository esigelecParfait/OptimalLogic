"use client";

import { useState, type FormEvent } from "react";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";

import "react-phone-number-input/style.css";

type FormState = {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;

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

const labelClass = "grid gap-2";

const labelTextClass = "text-sm font-semibold text-black/70";

const fieldClass =
  "h-12 w-full rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white";

const textareaClass =
  "min-h-[150px] w-full resize-none rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white";

const objectiveOptions: ObjectiveOption[] = [
  {
    value: "plus_appels_reservations",
    label: "Obtenir plus d’appels ou de réservations",
  },
  {
    value: "plus_devis_qualifies",
    label: "Recevoir plus de devis qualifiés",
  },
  {
    value: "mieux_suivre_prospects",
    label: "Mieux suivre mes prospects et mes demandes clients",
  },
  {
    value: "ameliorer_image",
    label: "Améliorer mon image professionnelle en ligne",
  },
  {
    value: "lancer_offre",
    label: "Lancer ou tester une nouvelle offre",
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

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    lastname: "",
    firstname: "",
    email: "",
    phone: "",

    company: "",
    businessCity: "",
    activity: "",
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

  const selectedObjectiveLabel =
    objectiveOptions.find((option) => option.value === form.objective)?.label ||
    "Choisissez un objectif";

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
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

    if (!form.consentRgpd) {
      setFormError(
        "Vous devez accepter l’utilisation de vos informations pour être recontacté."
      );
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

        business_name: cleanOptionalText(form.company),
        business_city: cleanOptionalText(form.businessCity),
        business_sector: cleanOptionalText(form.activity),
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log("Réponse API contact :", result);

      if (!response.ok) {
        throw new Error(
          result.error || "Erreur lors de l’envoi de votre demande."
        );
      }

      setSubmitted(true);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Erreur lors de l’envoi de votre demande."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function ObjectiveDropdown() {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setObjectiveMenuOpen((current) => !current)}
          className={`flex h-12 w-full items-center justify-between rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 text-left text-sm outline-none transition focus:border-black/40 focus:bg-white ${
            form.objective ? "text-black" : "text-black/35"
          }`}
        >
          <span>{selectedObjectiveLabel}</span>
          <span className="ml-4 text-xs text-black/40">⌄</span>
        </button>

        {objectiveMenuOpen && (
          <div className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-black/10 bg-white p-2 shadow-xl shadow-black/10">
            {objectiveOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  updateField("objective", option.value);
                  setObjectiveMenuOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                  form.objective === option.value
                    ? "bg-black text-white"
                    : "text-black/70 hover:bg-[#f7f4ef] hover:text-black"
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

  const contactOptions = [
    {
      title: "Réserver un diagnostic gratuit",
      description:
        "Idéal si vous voulez échanger rapidement sur votre commerce, votre TPE/PME ou votre startup.",
      action: "Prendre rendez-vous",
      href: "/prise-de-rdv",
    },
    {
      title: "Envoyer une demande écrite",
      description:
        "Parfait si vous préférez expliquer votre besoin par écrit avant un échange.",
      action: "Remplir le formulaire",
      href: "#formulaire",
    },
  ];

  const reasons = [
    "Améliorer votre visibilité Google",
    "Créer un site plus professionnel",
    "Mieux suivre vos demandes clients",
    "Lancer une offre, une landing page ou une demande de démo",
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
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
          color: rgb(0 0 0 / 0.35);
        }

        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.75rem;
        }

        .phone-input-custom .PhoneInputCountrySelectArrow {
          opacity: 0.45;
        }
      `}</style>

      <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-20">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-black/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-black/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 shadow-sm backdrop-blur">
            Contact & diagnostic
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-7xl">
                Parlons de votre projet digital.
                <span className="block text-black/55">
                  On vous aide à choisir le bon système.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-black/65">
                Expliquez-nous votre besoin. Nous vous orientons vers la
                solution adaptée : visibilité locale, site professionnel, suivi
                client, prise de rendez-vous ou lancement d’offre.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/prise-de-rdv"
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
                >
                  Réserver un diagnostic gratuit
                </a>
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                >
                  Envoyer une demande
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
                Pourquoi nous contacter ?
              </p>

              <div className="mt-6 grid gap-3">
                {reasons.map((reason) => (
                  <div
                    key={reason}
                    className="flex gap-3 rounded-2xl bg-[#f7f4ef] px-4 py-4"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-xs text-white">
                      ✓
                    </span>
                    <p className="text-sm leading-6 text-black/70">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Deux options
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Choisissez le chemin le plus simple
            </h2>
            <p className="mt-5 text-base leading-7 text-black/65">
              Prenez rendez-vous si vous voulez échanger directement. Utilisez
              le formulaire si vous préférez poser votre besoin par écrit.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {contactOptions.map((option) => (
              <article
                key={option.title}
                className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 sm:p-8"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-black">
                  {option.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-black/65">
                  {option.description}
                </p>
                <a
                  href={option.href}
                  className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
                >
                  {option.action}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="formulaire" className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
                Formulaire
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Expliquez-nous votre besoin
              </h2>
              <p className="mt-4 text-base leading-7 text-black/65">
                Votre demande sera enregistrée dans notre système pour être
                traitée rapidement.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-[2rem] bg-[#f7f4ef] p-8 text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  ✓
                </div>
                <h3 className="text-2xl font-semibold text-black">
                  Votre demande a bien été envoyée.
                </h3>
                <p className="mt-3 text-sm leading-6 text-black/65">
                  Nous avons bien reçu votre demande. Nous reviendrons vers vous
                  rapidement avec une première orientation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
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
                      onChange={(event) =>
                        updateField("lastname", event.target.value)
                      }
                      required
                      placeholder="Votre nom"
                      className={fieldClass}
                    />
                  </label>

                  <label className={labelClass}>
                    <span className={labelTextClass}>Prénom *</span>
                    <input
                      value={form.firstname}
                      onChange={(event) =>
                        updateField("firstname", event.target.value)
                      }
                      required
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
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      required
                      placeholder="vous@email.com"
                      className={fieldClass}
                    />
                  </label>

                  <label className={labelClass}>
                    <span className={labelTextClass}>
                      Numéro de téléphone *
                    </span>

                    <div className="phone-input-wrapper rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 transition focus-within:border-black/40 focus-within:bg-white">
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
                    <span className={labelTextClass}>Entreprise</span>
                    <input
                      value={form.company}
                      onChange={(event) =>
                        updateField("company", event.target.value)
                      }
                      placeholder="Nom de votre entreprise"
                      className={fieldClass}
                    />
                  </label>

                  <label className={labelClass}>
                    <span className={labelTextClass}>Ville du business</span>
                    <input
                      value={form.businessCity}
                      onChange={(event) =>
                        updateField("businessCity", event.target.value)
                      }
                      placeholder="Ex : Rouen, Paris, Lyon..."
                      className={fieldClass}
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    <span className={labelTextClass}>Type d’activité</span>
                    <input
                      value={form.activity}
                      onChange={(event) =>
                        updateField("activity", event.target.value)
                      }
                      placeholder="Ex : restaurant, BTP, SaaS..."
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
                      onChange={(event) =>
                        updateField("businessWebsiteUrl", event.target.value)
                      }
                      placeholder="https://www.votre-site.com"
                      className={fieldClass}
                    />
                  </label>

                  <label className={labelClass}>
                    <span className={labelTextClass}>Lien Google Business</span>
                    <input
                      value={form.googleBusinessUrl}
                      onChange={(event) =>
                        updateField("googleBusinessUrl", event.target.value)
                      }
                      placeholder="Lien vers votre fiche Google Business"
                      className={fieldClass}
                    />
                  </label>
                </div>

                <label className={labelClass}>
                  <span className={labelTextClass}>Votre message</span>
                  <textarea
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    required
                    rows={6}
                    placeholder="Expliquez votre activité, votre besoin et ce que vous aimeriez améliorer."
                    className={textareaClass}
                  />
                </label>

                {formError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {formError}
                  </div>
                )}

                <label className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/60 p-4 text-xs leading-5 text-black/60">
                  <input
                    type="checkbox"
                    required
                    checked={form.consentRgpd}
                    onChange={(event) =>
                      updateField("consentRgpd", event.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-black/20"
                  />

                  <span>
                    J’accepte que mes informations soient utilisées par
                    OptimalLogic pour traiter ma demande et me recontacter.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </form>
            )}
          </div>

          <aside className="grid gap-6">
            <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
                Rendez-vous
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Vous voulez aller plus vite ?
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/65">
                Réservez directement un diagnostic gratuit pour présenter votre
                activité, clarifier votre besoin et obtenir une première
                orientation.
              </p>
              <a
                href="/prise-de-rdv"
                className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
              >
                Prendre rendez-vous
              </a>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
                Ce qu’il faut préparer
              </p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-black/65">
                <li>• Votre type d’activité</li>
                <li>• Votre objectif principal</li>
                <li>• Ce qui bloque aujourd’hui</li>
                <li>• Vos outils actuels</li>
                <li>• Vos moyens de contact actuels</li>
                <li>• Le résultat que vous voulez obtenir</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-black p-8 text-center text-white sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
            Notre rôle
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Transformer votre présence digitale en demandes concrètes.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Appels, rendez-vous, devis, inscriptions ou prospects qualifiés :
            nous vous aidons à choisir le bon système.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/prise-de-rdv"
              className="inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
            >
              Réserver un diagnostic gratuit
            </a>
            <a
              href="/services"
              className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Revoir nos services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}