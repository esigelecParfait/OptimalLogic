import { AnimateIn } from "@/components/AnimateIn";

export default function ServicesPage() {
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
      bg: "bg-emerald-50",
      tagBg: "bg-emerald-100 text-emerald-700",
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
      bg: "bg-sky-50",
      tagBg: "bg-sky-100 text-sky-700",
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
      bg: "bg-violet-50",
      tagBg: "bg-violet-100 text-violet-700",
    },
  ];

  const method = [
    { step: "01", title: "Comprendre votre activité", description: "Nous analysons votre type de client, votre manière de vendre et les actions importantes : appel, rendez-vous, devis, réservation ou achat." },
    { step: "02", title: "Construire le bon parcours", description: "Nous construisons un parcours adapté à votre objectif : être choisi, générer des prospects ou prouver votre traction." },
    { step: "03", title: "Mettre en place les bons outils", description: "Google Business, site, chatbot, prise de rendez-vous, CRM, automatisations : chaque outil doit servir un objectif concret." },
    { step: "04", title: "Suivre et améliorer", description: "Nous suivons les demandes, avis, rendez-vous, conversions et points de blocage pour améliorer les résultats." },
  ];

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="border-b border-gray-100 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <AnimateIn>
            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-600">
              Services digitaux
            </span>
          </AnimateIn>

          <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:items-end">
            <AnimateIn delay={80}>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Nous ne créons pas seulement une présence digitale.
                <span className="block font-light italic text-gray-400">Nous construisons un système pour être choisi.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-500">
                Un commerce doit être trouvé, une PME doit gérer ses prospects, une startup doit prouver sa traction.
              </p>
            </AnimateIn>

            <AnimateIn delay={160}>
              <div className="rounded-3xl bg-gray-50 p-8 ring-1 ring-gray-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Notre logique</p>
                <p className="mt-4 text-xl font-black leading-snug text-gray-900">
                  Le digital doit transformer l'attention en confiance, puis la confiance en action.
                </p>
                <div className="mt-6 grid gap-3">
                  {[
                    "Plus de clarté dans votre offre",
                    "Plus de confiance dès le premier contact",
                    "Moins de demandes perdues",
                    "Des outils adaptés à votre taille",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">✓</span>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <AnimateIn className="mb-12">
            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-600">
              Nos services
            </span>
            <h2 className="mt-4 text-3xl font-black text-gray-900 md:text-4xl">
              Trois types d'entreprises, trois systèmes adaptés
            </h2>
          </AnimateIn>

          <div className="grid gap-6">
            {services.map((service, i) => (
              <AnimateIn key={service.label} delay={i * 100}>
                <article className={`rounded-3xl p-8 sm:p-10 ${service.bg}`}>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-4xl font-black text-gray-200">{service.number}</span>
                    <span className={`rounded-full px-4 py-1.5 text-xs font-semibold ${service.tagBg}`}>
                      {service.label}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 sm:text-3xl">{service.title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">{service.description}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.features.slice(0, 4).map((f) => (
                      <div key={f} className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">✓</span>
                        <span className="text-sm font-medium text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-start justify-between gap-6 rounded-2xl bg-gray-900 p-6 text-white sm:items-center">
                    <p className="text-sm leading-6 text-gray-300">{service.result}</p>
                    <a
                      href="/contact"
                      className="btn-hover shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900"
                    >
                      {service.cta}
                    </a>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="bg-gray-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <AnimateIn>
              <span className="rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-600">Méthode</span>
              <h2 className="mt-4 text-3xl font-black text-gray-900 md:text-4xl">
                Du résultat,{" "}
                <span className="font-light italic text-gray-400">pas seulement du design</span>
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-500">
                Qu'est-ce que le client doit faire après vous avoir trouvé ? Tout part de là.
              </p>
            </AnimateIn>

            <div className="grid gap-4">
              {method.map((item, i) => (
                <AnimateIn key={item.step} delay={i * 80}>
                  <div className="btn-hover flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-black text-white">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-black text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-500">{item.description}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TABLEAU COMPARATIF */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <AnimateIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 sm:p-10">
              <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-600">Résumé</span>
              <h2 className="mt-4 text-2xl font-black text-gray-900 sm:text-3xl">
                Le bon service dépend du vrai besoin
              </h2>
              <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-gray-200">
                <div className="grid bg-gray-900 text-sm font-black text-white md:grid-cols-3">
                  <div className="p-5">Commerces</div>
                  <div className="p-5 md:border-l md:border-white/10">TPE / PME</div>
                  <div className="p-5 md:border-l md:border-white/10">Startups</div>
                </div>
                <div className="grid divide-y divide-gray-100 text-sm md:grid-cols-3 md:divide-x md:divide-y-0">
                  <div className="p-5">
                    <p className="font-black text-gray-900">Être choisi rapidement</p>
                    <p className="mt-2 text-gray-500">Google Business, avis, photos, réservation, messagerie IA.</p>
                  </div>
                  <div className="p-5">
                    <p className="font-black text-gray-900">Générer et suivre les prospects</p>
                    <p className="mt-2 text-gray-500">Site web, chatbot, prise de RDV, tableau de suivi.</p>
                  </div>
                  <div className="p-5">
                    <p className="font-black text-gray-900">Tester et prouver la traction</p>
                    <p className="mt-2 text-gray-500">Landing page, waitlist, démo, CRM, analytics, A/B testing.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 lg:px-8">
        <AnimateIn>
          <div className="mx-auto max-w-6xl rounded-3xl bg-gray-900 p-10 text-white sm:p-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/70">Diagnostic</span>
                <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                  Vous ne savez pas encore quel système correspond à votre activité ?
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  On analyse votre activité et vos objectifs pour vous orienter vers la solution la plus utile.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-7">
                <p className="text-xl font-black text-gray-900">Parlons de votre projet</p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Quelques questions suffisent pour identifier ce qui bloque et les outils à mettre en place.
                </p>
                <a
                  href="/contact"
                  className="btn-hover mt-6 inline-flex w-full justify-center rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white"
                >
                  Demander un diagnostic gratuit
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
