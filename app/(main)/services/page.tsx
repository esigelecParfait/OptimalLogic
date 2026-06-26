import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

const services = [
  {
    label: "Commerces locaux",
    number: "01",
    title: "Être trouvé, rassurer et être choisi rapidement",
    description: "Pour les commerces, le digital doit permettre au client de vous trouver vite, de vous faire confiance et de passer à l'action sans hésiter.",
    features: [
      "Optimisation complète de la fiche Google Business",
      "Ajout ou amélioration des photos, horaires et services",
      "Mise en place d'un lien de réservation ou de contact",
      "Messagerie IA pour répondre aux questions clients",
      "Orientation vers un appel, rendez-vous ou devis",
      "Relance avis clients après passage",
      "Réponse professionnelle aux avis",
      "Aide à l'organisation si secrétariat existant",
    ],
    result: "Une présence locale plus claire, plus rassurante et plus efficace pour capter les clients au moment où ils cherchent.",
    cta: "Optimiser ma visibilité locale",
    glow: "var(--cyan)",
  },
  {
    label: "TPE / PME",
    number: "02",
    title: "Générer des prospects et mieux suivre les demandes clients",
    description: "Pour une TPE ou PME, le digital doit renforcer la crédibilité, présenter clairement les services et aider à mieux gérer les prospects.",
    features: [
      "Création d'un site web professionnel adapté",
      "Présentation claire de l'entreprise et des services",
      "Formulaire de contact ou demande de devis",
      "Prise de rendez-vous en ligne si nécessaire",
      "Chatbot inclus pour les questions fréquentes",
      "Qualification des prospects avant transmission",
      "Tableau de suivi des clients et demandes",
      "Automatisations : confirmation, notification, relance",
    ],
    result: "Une entreprise plus professionnelle en ligne, avec un meilleur suivi des opportunités commerciales.",
    cta: "Structurer ma présence digitale",
    glow: "var(--indigo)",
  },
  {
    label: "Startups",
    number: "03",
    title: "Clarifier l'offre, lancer vite et prouver la traction",
    description: "Pour une startup, le digital doit permettre de présenter clairement la proposition de valeur, tester le marché et mesurer l'intérêt.",
    features: [
      "Landing page claire et orientée conversion",
      "Proposition de valeur travaillée rapidement",
      "Waitlist, inscription bêta ou demande de démo",
      "Prise de rendez-vous avec les prospects",
      "Chatbot IA de qualification",
      "CRM pour suivre les leads potentiels",
      "E-mails automatiques et séquences de relance",
      "Analytics, A/B testing et dashboard de traction",
    ],
    result: "Un système de lancement qui aide à comprendre le marché, convaincre les prospects et suivre la traction.",
    cta: "Lancer mon projet",
    glow: "var(--pink)",
  },
];

const method = [
  { step: "01", title: "Comprendre votre activité", description: "Nous analysons votre type de client, votre manière de vendre et les actions importantes : appel, rendez-vous, devis, réservation ou achat." },
  { step: "02", title: "Construire le bon parcours", description: "Nous construisons un parcours adapté à votre objectif : être choisi, générer des prospects ou prouver votre traction." },
  { step: "03", title: "Mettre en place les bons outils", description: "Google Business, site, chatbot, prise de rendez-vous, CRM, automatisations : chaque outil doit servir un objectif concret." },
  { step: "04", title: "Suivre et améliorer", description: "Nous suivons les demandes, avis, rendez-vous, conversions et points de blocage pour améliorer les résultats." },
];

const summary = [
  { t: "Commerces", h: "Être choisi rapidement", d: "Google Business, avis, photos, réservation, messagerie IA." },
  { t: "TPE / PME", h: "Générer et suivre les prospects", d: "Site web, chatbot, prise de RDV, tableau de suivi." },
  { t: "Startups", h: "Tester et prouver la traction", d: "Landing page, waitlist, démo, CRM, analytics, A/B testing." },
];

function Check() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-1 shrink-0 text-emerald"><path d="M20 6L9 17l-5-5" /></svg>;
}

export default function ServicesPage() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="px-7 pb-20 pt-44 lg:pt-52">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn>
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Services digitaux</span>
          </AnimateIn>
          <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:items-end">
            <AnimateIn delay={80}>
              <h1 className="text-[clamp(38px,5vw,60px)] font-semibold">
                Nous ne créons pas seulement une présence digitale.
                <span className="grad-text"> Nous construisons un système pour être choisi.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-mut">
                Un commerce doit être trouvé, une PME doit gérer ses prospects, une startup doit prouver sa traction.
              </p>
            </AnimateIn>
            <AnimateIn delay={160}>
              <div className="surface-card rounded-[24px] p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">Notre logique</p>
                <p className="mt-4 font-display text-xl font-semibold leading-snug">
                  Le digital doit transformer l&apos;attention en confiance, puis la confiance en action.
                </p>
                <div className="mt-6 grid gap-3">
                  {["Plus de clarté dans votre offre", "Plus de confiance dès le premier contact", "Moins de demandes perdues", "Des outils adaptés à votre taille"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl border border-white/[0.07] px-4 py-3" style={{ background: "rgba(16,20,42,0.5)" }}>
                      <Check />
                      <span className="text-sm font-medium text-mut">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mb-12">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Nos services</span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,40px)] font-semibold">Trois types d&apos;entreprises, trois systèmes adaptés</h2>
          </AnimateIn>
          <div className="grid gap-6">
            {services.map((service, i) => (
              <AnimateIn key={service.label} delay={i * 80}>
                <article className="surface-card relative overflow-hidden rounded-[28px] p-8 sm:p-10">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-[90px]" style={{ background: service.glow }} />
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="font-display text-4xl font-semibold text-mut-2">{service.number}</span>
                      <span className="rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink" style={{ background: "var(--grad-soft)" }}>{service.label}</span>
                    </div>
                    <h3 className="text-[clamp(22px,2.6vw,30px)] font-semibold">{service.title}</h3>
                    <p className="mt-4 max-w-3xl text-base text-mut">{service.description}</p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-start gap-3 rounded-2xl border border-white/[0.06] px-4 py-3" style={{ background: "rgba(16,20,42,0.45)" }}>
                          <Check />
                          <span className="text-sm font-medium text-mut">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/[0.13] p-6 sm:flex-row sm:items-center" style={{ background: "var(--grad-soft)" }}>
                      <p className="text-sm leading-6 text-mut">{service.result}</p>
                      <Link href="/prise-de-rdv" className="btn-grad shrink-0 rounded-full px-6 py-3 text-sm font-semibold">{service.cta}</Link>
                    </div>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="px-7 py-16">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1fr_1.4fr]">
          <AnimateIn>
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Méthode</span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,40px)] font-semibold">Du résultat,<br /><span className="grad-text">pas seulement du design</span></h2>
            <p className="mt-4 text-base text-mut">Qu&apos;est-ce que le client doit faire après vous avoir trouvé ? Tout part de là.</p>
          </AnimateIn>
          <div className="grid gap-4">
            {method.map((item, i) => (
              <AnimateIn key={item.step} delay={i * 80}>
                <div className="flex gap-5 rounded-2xl border border-white/[0.07] p-6 transition-all hover:border-white/[0.13]" style={{ background: "rgba(11,14,29,0.6)" }}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white" style={{ background: "var(--grad)" }}>{item.step}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-mut">{item.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* RÉSUMÉ */}
      <section className="px-7 py-16">
        <AnimateIn className="mx-auto max-w-[1240px]">
          <div className="surface-card rounded-[28px] p-8 sm:p-10">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">Résumé</span>
            <h2 className="mt-3 text-[clamp(24px,3vw,34px)] font-semibold">Le bon service dépend du vrai besoin</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {summary.map((s) => (
                <div key={s.t} className="rounded-2xl border border-white/[0.07] p-6" style={{ background: "rgba(16,20,42,0.5)" }}>
                  <span className="grad-text font-display text-sm font-semibold uppercase tracking-wider">{s.t}</span>
                  <p className="mt-3 font-display text-lg font-semibold">{s.h}</p>
                  <p className="mt-2 text-sm text-mut">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* CTA */}
      <section className="px-7 pb-24 pt-8">
        <AnimateIn className="mx-auto max-w-[1240px]">
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.13] p-10 sm:p-14" style={{ background: "linear-gradient(135deg, rgba(124,92,255,0.2), rgba(31,213,240,0.1))" }}>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink" style={{ background: "var(--grad-soft)" }}><span className="h-2 w-2 rounded-full bg-emerald" /> Diagnostic gratuit</span>
                <h2 className="mt-5 text-[clamp(28px,4vw,42px)] font-semibold">Vous ne savez pas encore quel système correspond à votre activité ?</h2>
                <p className="mt-4 text-lg text-mut">On analyse votre activité et vos objectifs pour vous orienter vers la solution la plus utile.</p>
              </div>
              <div className="surface-card rounded-[22px] p-7">
                <p className="font-display text-xl font-semibold">Parlons de votre projet</p>
                <p className="mt-2 text-sm leading-6 text-mut">Quelques questions suffisent pour identifier ce qui bloque et les outils à mettre en place.</p>
                <Link href="/prise-de-rdv" className="btn-grad mt-6 inline-flex w-full justify-center rounded-full px-6 py-3.5 text-sm font-semibold">Demander un diagnostic gratuit</Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
