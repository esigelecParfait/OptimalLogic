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
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 text-sm text-ink outline-none transition-all placeholder:text-mut-2 focus:border-indigo focus:ring-2 focus:ring-[rgba(124,92,255,0.18)]";
const textareaClass =
  "min-h-[150px] w-full resize-none rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mut-2 focus:border-indigo focus:ring-2 focus:ring-[rgba(124,92,255,0.18)]";
const dropdownBtnClass =
  "flex h-12 w-full items-center justify-between rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 text-left text-sm font-medium outline-none transition-all focus:border-indigo";

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

  function TypeClientDropdown() {
    return (
      <div className="relative">
        <button type="button" onClick={() => setTypeClientMenuOpen((c) => !c)} className={`${dropdownBtnClass} ${form.type_client ? "text-ink" : "text-mut-2"}`}>
          <span>{selectedTypeClientLabel}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-4 text-mut"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        {TypeClientMenuOpen && (
          <div className="surface-card absolute z-30 mt-2 w-full overflow-hidden rounded-xl">
            {typeclientOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => { updateField("type_client", option.value); setTypeClientMenuOpen(false); }} className={`w-full px-4 py-3 text-left text-sm font-medium transition-all ${form.type_client === option.value ? "bg-[rgba(124,92,255,0.18)] text-ink" : "text-mut hover:bg-white/[0.05] hover:text-ink"}`}>
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
        <button type="button" onClick={() => setObjectiveMenuOpen((c) => !c)} className={`${dropdownBtnClass} ${form.objective ? "text-ink" : "text-mut-2"}`}>
          <span className="truncate">{selectedObjectiveLabel}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-4 shrink-0 text-mut"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        {objectiveMenuOpen && (
          <div className="surface-card absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl">
            {objectiveOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => { updateField("objective", option.value); setObjectiveMenuOpen(false); }} className={`w-full px-4 py-3 text-left text-sm font-medium transition-all ${form.objective === option.value ? "bg-[rgba(124,92,255,0.18)] text-ink" : "text-mut hover:bg-white/[0.05] hover:text-ink"}`}>
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
    <main className="relative">
      {/* HERO */}
      <section className="px-7 pb-16 pt-44 lg:pt-52">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink" style={{ background: "var(--grad-soft)" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Contact &amp; diagnostic
              </span>
              <h1 className="mt-6 max-w-4xl text-[clamp(38px,5vw,60px)] font-semibold">
                Parlons de votre projet digital.
                <span className="grad-text"> On vous aide à choisir le bon système.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-mut">
                Expliquez-nous votre besoin. Nous vous orientons vers la solution adaptée : visibilité locale, site professionnel, suivi client, prise de rendez-vous ou lancement d&apos;offre.
              </p>
            </div>
            <div className="surface-card rounded-[24px] p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">Pourquoi nous contacter ?</p>
              <div className="mt-6 grid gap-3">
                {reasons.map((reason) => (
                  <div key={reason} className="flex gap-3 rounded-2xl border border-white/[0.06] px-4 py-4" style={{ background: "rgba(16,20,42,0.45)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-0.5 shrink-0 text-emerald"><path d="M20 6L9 17l-5-5" /></svg>
                    <p className="text-sm font-medium text-mut">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="formulaire" className="px-7 py-16">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1fr_0.82fr]">
          <div className="surface-card rounded-[28px] p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Formulaire</span>
              <h2 className="mt-3 text-[clamp(26px,3.4vw,38px)] font-semibold">Expliquez-nous votre besoin.</h2>
              <p className="mt-4 text-base text-mut">Votre demande sera enregistrée dans notre système pour être traitée rapidement.</p>
            </div>

            {submitted ? (
              <div className="rounded-[24px] border border-white/[0.13] p-8 text-center" style={{ background: "var(--grad-soft)" }}>
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full text-white" style={{ background: "var(--grad)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h3 className="font-display text-2xl font-semibold">Votre demande a bien été envoyée.</h3>
                <p className="mt-3 text-sm leading-6 text-mut">Nous avons bien reçu votre demande. Nous reviendrons vers vous rapidement avec une première orientation.</p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost mt-6 rounded-full px-5 py-3 text-sm font-semibold">Envoyer une autre demande</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}><span className={labelTextClass}>Nom de famille *</span><input value={form.lastname} onChange={(e) => updateField("lastname", e.target.value)} placeholder="Votre nom" className={fieldClass} /></label>
                  <label className={labelClass}><span className={labelTextClass}>Prénom *</span><input value={form.firstname} onChange={(e) => updateField("firstname", e.target.value)} placeholder="Votre prénom" className={fieldClass} /></label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}><span className={labelTextClass}>E-mail *</span><input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="vous@email.com" className={fieldClass} /></label>
                  <label className={labelClass}>
                    <span className={labelTextClass}>Téléphone *</span>
                    <div className="flex h-12 items-center rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 transition-all focus-within:border-indigo">
                      <PhoneInput international defaultCountry="FR" value={form.phone} onChange={(value) => updateField("phone", value || "")} className="phone-input-custom" />
                    </div>
                  </label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}><span className={labelTextClass}>Type de client *</span><TypeClientDropdown /></label>
                  <label className={labelClass}><span className={labelTextClass}>Entreprise</span><input value={form.company} onChange={(e) => updateField("company", e.target.value)} placeholder="Nom de votre entreprise" className={fieldClass} /></label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}><span className={labelTextClass}>Ville du business</span><input value={form.businessCity} onChange={(e) => updateField("businessCity", e.target.value)} placeholder="Ex : Rouen, Paris, Lyon..." className={fieldClass} /></label>
                  <label className={labelClass}><span className={labelTextClass}>Objectif principal</span><ObjectiveDropdown /></label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}><span className={labelTextClass}>Site web actuel</span><input value={form.businessWebsiteUrl} onChange={(e) => updateField("businessWebsiteUrl", e.target.value)} placeholder="https://www.votre-site.com" className={fieldClass} /></label>
                  <label className={labelClass}><span className={labelTextClass}>Lien Google Business</span><input value={form.googleBusinessUrl} onChange={(e) => updateField("googleBusinessUrl", e.target.value)} placeholder="Lien vers votre fiche Google Business" className={fieldClass} /></label>
                </div>
                <label className={labelClass}><span className={labelTextClass}>Votre message</span><textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} rows={6} placeholder="Expliquez votre activité, votre besoin et ce que vous aimeriez améliorer." className={textareaClass} /></label>

                {formError && (
                  <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>{formError}</div>
                )}

                <label className="flex items-start gap-3 rounded-xl border border-white/[0.1] p-4 text-[13.5px] leading-5 text-mut" style={{ background: "rgba(16,20,42,0.45)" }}>
                  <input type="checkbox" checked={form.consentRgpd} onChange={(e) => updateField("consentRgpd", e.target.checked)} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#7c5cff]" />
                  <span>J&apos;accepte que mes informations soient utilisées par OptimalLogic pour traiter ma demande et me recontacter.</span>
                </label>

                <button type="submit" disabled={isSubmitting} className="btn-grad mt-2 inline-flex w-full justify-center rounded-full px-6 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </form>
            )}
          </div>

          <aside className="grid content-start gap-6">
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.13] p-6 sm:p-8" style={{ background: "var(--grad-soft)" }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink" style={{ background: "rgba(8,10,22,0.5)" }}>Rendez-vous</span>
              <h3 className="mt-4 font-display text-2xl font-semibold">Vous voulez aller plus vite ?</h3>
              <p className="mt-4 text-sm leading-7 text-mut">Réservez directement un diagnostic gratuit pour présenter votre activité, clarifier votre besoin et obtenir une première orientation.</p>
              <Link href="/prise-de-rdv" className="btn-grad mt-6 inline-flex w-full justify-center rounded-full px-6 py-3.5 text-sm font-semibold">Prendre rendez-vous</Link>
            </div>

            <div className="surface-card rounded-[24px] p-6 sm:p-8">
              <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Ce qu&apos;il faut préparer</span>
              <ul className="mt-5 grid gap-3 text-sm font-medium text-mut">
                {["Votre type d'activité", "Votre objectif principal", "Ce qui bloque aujourd'hui", "Vos outils actuels", "Vos moyens de contact actuels", "Le résultat que vous voulez obtenir"].map((item) => (
                  <li key={item} className="flex items-center gap-2 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                    <span className="grad-text font-bold">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card rounded-[24px] p-6 sm:p-8">
              <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Après l&apos;envoi</span>
              <div className="mt-5 grid gap-3">
                {["Analyse rapide de votre demande", "Orientation vers l'offre adaptée", "Échange si votre besoin doit être précisé"].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/[0.07] px-4 py-3" style={{ background: "rgba(16,20,42,0.45)" }}>
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white" style={{ background: "var(--grad)" }}>{i + 1}</span>
                    <span className="text-sm font-medium text-mut">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-[1240px] px-7 py-16">
        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.13] p-8 text-center sm:p-12 lg:p-16" style={{ background: "linear-gradient(135deg, rgba(124,92,255,0.2), rgba(31,213,240,0.1))" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink" style={{ background: "var(--grad-soft)" }}>Notre rôle</span>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(28px,4.4vw,48px)] font-semibold">Transformer votre présence digitale en demandes concrètes.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-mut">Appels, rendez-vous, devis, inscriptions ou prospects qualifiés : nous vous aidons à choisir le bon système.</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/services" className="btn-ghost inline-flex justify-center rounded-full px-6 py-3.5 text-sm font-semibold">Revoir nos services</Link>
            <Link href="/prise-de-rdv" className="btn-grad inline-flex justify-center rounded-full px-6 py-3.5 text-sm font-semibold">Prendre rendez-vous</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
