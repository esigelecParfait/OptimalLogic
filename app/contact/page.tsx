"use client";

import { useState } from "react";

type ClientType = "" | "commerce" | "tpe-pme" | "startup" | "autre";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  clientType: ClientType;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    clientType: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Ici, tu pourras plus tard connecter le formulaire à un service comme :
    // Formspree, Resend, EmailJS, Brevo, Make, n8n, Supabase, Firebase ou ton propre backend.
    console.log("Nouvelle demande de contact :", form);
    setSubmitted(true);
  }


  const contactOptions = [
    {
      title: "Réserver un diagnostic gratuit",
      description:
        "Idéal si vous êtes déjà intéressé et que vous voulez échanger directement sur votre commerce, votre TPE/PME ou votre startup.",
      action: "Prendre rendez-vous",
      href: "/prise-de-rdv"
    },
    {
      title: "Envoyer une demande écrite",
      description:
        "Parfait si vous voulez expliquer votre besoin calmement, poser une question ou demander une première orientation.",
      action: "Remplir le formulaire",
      href: "#formulaire"
    }
  ];

  const reasons = [
    "Vous avez un commerce et vous voulez améliorer votre présence Google",
    "Vous êtes une TPE/PME et vous voulez un site professionnel avec prise de rendez-vous et suivi client",
    "Vous lancez une startup et vous voulez créer une landing page, une waitlist ou une demande de démo",
    "Vous ne savez pas encore quelle solution correspond à votre activité"
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      {/* Hero */}
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
                <span className="block text-black/55">On vous aide à choisir le bon système.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-black/65">
                Vous avez un commerce, une TPE/PME ou une startup ? Expliquez-nous votre besoin. Nous vous orientons vers la solution la plus adaptée : visibilité locale, site professionnel, suivi client, landing page, prise de rendez-vous ou système de traction.
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
                  <div key={reason} className="flex gap-3 rounded-2xl bg-[#f7f4ef] px-4 py-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-xs text-white">
                      ✓
                    </span>
                    <p className="text-sm leading-6 text-black/70">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choice section */}
      <section className="px-6 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Deux façons de nous contacter</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Choisissez le chemin le plus simple pour vous
            </h2>
            <p className="mt-5 text-base leading-7 text-black/65">
              La prise de rendez-vous est idéale si vous voulez échanger rapidement. Le formulaire est plus adapté si vous préférez expliquer votre besoin par écrit.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {contactOptions.map((option) => (
              <article
                key={option.title}
                className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 sm:p-8"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-black">{option.title}</h3>
                <p className="mt-4 text-base leading-7 text-black/65">{option.description}</p>
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

      {/* Contact form + side info */}
      <section id="formulaire" className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Formulaire</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Expliquez-nous votre besoin
              </h2>
              <p className="mt-4 text-base leading-7 text-black/65">
                Plus votre demande est claire, plus nous pourrons vous orienter vers la bonne solution.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-[2rem] bg-[#f7f4ef] p-8 text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  ✓
                </div>
                <h3 className="text-2xl font-semibold text-black">Votre demande est prête à être envoyée.</h3>
                <p className="mt-3 text-sm leading-6 text-black/65">
                  Le formulaire est actuellement en mode interface. Il faudra ensuite le connecter à un outil d’envoi d’e-mail ou à votre CRM pour recevoir les messages automatiquement.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                >
                  Modifier ma demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">Nom complet</span>
                    <input
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      required
                      placeholder="Votre nom"
                      className="rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">E-mail</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      required
                      placeholder="vous@email.com"
                      className="rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">Téléphone</span>
                    <input
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      placeholder="Votre numéro"
                      className="rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">Entreprise</span>
                    <input
                      value={form.company}
                      onChange={(event) => updateField("company", event.target.value)}
                      placeholder="Nom de votre entreprise"
                      className="rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-black/70">Type de projet</span>
                  <select
                    value={form.clientType}
                    onChange={(event) => updateField("clientType", event.target.value)}
                    required
                    className="rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 text-sm outline-none transition focus:border-black/40 focus:bg-white"
                  >
                    <option value="">Sélectionnez une option</option>
                    <option value="commerce">Commerce local</option>
                    <option value="tpe-pme">TPE / PME</option>
                    <option value="startup">Startup</option>
                    <option value="autre">Autre / Je ne sais pas encore</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-black/70">Votre message</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    required
                    rows={6}
                    placeholder="Expliquez votre activité, votre besoin et ce que vous aimeriez améliorer."
                    className="resize-none rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
                >
                  Envoyer ma demande
                </button>
              </form>
            )}
          </div>

          <aside className="grid gap-6">
            <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">Rendez-vous</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Vous voulez aller plus vite ?</h3>
              <p className="mt-4 text-sm leading-7 text-white/65">
                Réservez directement un diagnostic gratuit. C’est le meilleur choix si vous voulez présenter votre activité, clarifier votre besoin et obtenir une première orientation.
              </p>
              <a
                href="/prise-de-rdv"
                className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
              >
                Prendre rendez-vous
              </a>
            </div>
            <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Ce qu’il faut préparer</p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-black/65">
                <li>• Votre type d’activité</li>
                <li>• Votre objectif principal</li>
                <li>• Ce qui bloque aujourd’hui</li>
                <li>• Les outils que vous utilisez déjà</li>
                <li>• Vos moyens de contact actuels : téléphone, e-mail, formulaire, prise de rendez-vous</li>
                <li>• Le résultat que vous aimeriez obtenir</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-black p-8 text-center text-white sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">Notre rôle</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Vous aider à transformer votre présence digitale en actions concrètes.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Appels, rendez-vous, demandes de devis, inscriptions, avis clients ou prospects qualifiés : le bon outil dépend de votre activité et de votre objectif.
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
