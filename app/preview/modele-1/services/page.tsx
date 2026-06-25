import { AnimateIn } from "@/components/AnimateIn";

export default function ServicesPage() {
  const services = [
    {
      label: "Commerces locaux",
      title: "Être trouvé, rassurer et être choisi rapidement",
      description:
        "Pour les commerces, le digital doit permettre au client de vous trouver vite, de vous faire confiance et de passer à l’action sans hésiter.",
      examples: "Menuisier, coiffeur, serrurier, restaurant, vendeur, garagiste, artisan, institut de beauté...",
      objective: "Transformer une recherche Google en appel, réservation, devis ou visite.",
      features: [
        "Optimisation complète de la fiche Google Business",
        "Ajout ou amélioration des photos, horaires, services et informations clés",
        "Mise en place d’un lien de réservation ou de contact",
        "Messagerie permanente avec IA pour répondre aux questions clients",
        "Orientation du client vers un appel, un rendez-vous ou une demande de devis",
        "Relance des clients après passage pour demander un avis Google",
        "Réponse professionnelle aux avis positifs et négatifs",
        "Aide à l’organisation si le commerce dispose déjà de secrétaires ou d’un accueil"
      ],
      result:
        "Une présence locale plus claire, plus rassurante et plus efficace pour capter les clients au moment où ils cherchent.",
      cta: "Optimiser ma visibilité locale"
    },
    {
      label: "TPE / PME",
      title: "Générer des prospects et mieux suivre les demandes clients",
      description:
        "Pour une TPE ou une PME, le digital doit renforcer la crédibilité, présenter clairement les services et aider à mieux gérer les prospects.",
      examples:
        "Entreprise de services, BTP, cabinet, organisme de formation, agence, société industrielle, entreprise locale...",
      objective:
        "Ne plus avoir un simple site vitrine, mais un outil capable d’attirer, répondre, qualifier et suivre les clients.",
      features: [
        "Création d’un site web professionnel adapté à l’activité",
        "Présentation claire de l’entreprise, des services et des réalisations",
        "Formulaire de contact ou demande de devis",
        "Prise de rendez-vous en ligne si nécessaire",
        "Chatbot toujours inclus pour répondre aux questions fréquentes",
        "Qualification des prospects avant transmission à l’entreprise",
        "Tableau de suivi des clients, prospects et demandes reçues",
        "Automatisations simples : confirmation, notification, relance et suivi"
      ],
      result:
        "Une entreprise plus professionnelle en ligne, avec un meilleur suivi des opportunités commerciales.",
      cta: "Structurer ma présence digitale"
    },
    {
      label: "Startups",
      title: "Clarifier l’offre, lancer vite et prouver la traction",
      description:
        "Pour une startup, le digital doit permettre de présenter clairement la proposition de valeur, tester le marché et mesurer l’intérêt des premiers utilisateurs.",
      examples:
        "SaaS, application mobile, marketplace, fintech, edtech, startup IA, projet en lancement, bêta privée...",
      objective:
        "Passer d’une idée ou d’un produit à une présence digitale capable de convaincre, tester et générer de la traction.",
      features: [
        "Landing page claire et orientée conversion",
        "Proposition de valeur travaillée et compréhensible rapidement",
        "Waitlist, inscription bêta ou demande de démo",
        "Prise de rendez-vous avec les prospects intéressés",
        "Chatbot IA de qualification",
        "CRM pour suivre les leads et utilisateurs potentiels",
        "E-mails automatiques et séquences de relance",
        "Analytics, A/B testing, pitch digital et dashboard de traction"
      ],
      result:
        "Un système de lancement qui aide à comprendre le marché, convaincre les prospects et suivre les signaux de traction.",
      cta: "Lancer mon projet"
    }
  ];

  const method = [
    {
      step: "01",
      title: "Comprendre votre activité",
      description:
        "Nous analysons votre type de client, votre manière de vendre et les actions importantes pour votre entreprise : appel, rendez-vous, devis, réservation, inscription ou achat."
    },
    {
      step: "02",
      title: "Construire le bon parcours",
      description:
        "Nous ne proposons pas la même solution à tout le monde. Nous construisons un parcours adapté à votre objectif : être choisi, générer des prospects ou prouver votre traction."
    },
    {
      step: "03",
      title: "Mettre en place les bons outils",
      description:
        "Google Business, site web, chatbot, prise de rendez-vous, CRM, automatisations, dashboard : chaque outil doit servir un objectif concret."
    },
    {
      step: "04",
      title: "Suivre et améliorer",
      description:
        "Une présence digitale doit évoluer. Nous suivons les demandes, les avis, les rendez-vous, les conversions et les points de blocage pour améliorer les résultats."
    }
  ];

  const benefits = [
    "Plus de clarté dans votre offre",
    "Plus de confiance dès le premier contact",
    "Moins de demandes perdues",
    "Une meilleure organisation commerciale",
    "Des outils adaptés à votre taille",
    "Une présence digitale pensée pour convertir"
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,#e2e8f0,transparent_35%),linear-gradient(to_bottom,#ffffff,#f8fafc)] px-6 py-24 sm:px-10 lg:px-20">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-slate-200/70 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex animate-fade-in rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
            Services digitaux adaptés à chaque entreprise
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="animate-fade-in-up max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Nous ne créons pas seulement une présence digitale.
                <span className="block text-slate-500">Nous construisons un système pour être choisi.</span>
              </h1>

              <p className="animate-fade-in-up mt-8 max-w-2xl text-lg leading-8 text-slate-600" style={{ animationDelay: "120ms" }}>
                Un commerce doit être trouvé, une PME doit gérer ses prospects, une startup doit prouver sa traction. Nous adaptons chaque solution à cette réalité.
              </p>

            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/80 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Notre logique
              </p>
              <p className="mt-5 text-2xl font-semibold leading-snug text-slate-950">
                Le digital doit servir un objectif simple : transformer l’attention en confiance, puis la confiance en action.
              </p>
              <div className="mt-8 grid gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-xs text-white">✓</span>
                    <span className="text-sm font-medium text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Services */}
      <section id="offres" className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <AnimateIn className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Nos services</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Trois types d’entreprises, trois systèmes adaptés
            </h2>
          </AnimateIn>

          <div className="grid gap-6">
            {services.map((service, index) => (
              <AnimateIn key={service.label} delay={index * 120}>
                <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2.5 rounded-full bg-slate-950 px-4 py-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-950">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-white">{service.label}</span>
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">{service.title}</h3>

                  <p className="mb-6 text-base leading-7 text-slate-600">{service.description}</p>

                  <div className="mb-6 grid gap-3 sm:grid-cols-2">
                    {service.features.slice(0, 4).map((feature) => (
                      <div key={feature} className="flex gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs text-white">✓</span>
                        <p className="text-sm leading-6 text-slate-700">{feature}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Résultat attendu</p>
                    <p className="mt-3 text-sm leading-6 text-white/80">{service.result}</p>
                    <a
                      href="/preview/modele-1/contact"
                      className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
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

      {/* Method */}
      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Méthode</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Du résultat, pas seulement du design
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-600">
                Qu’est-ce que le client doit faire après vous avoir trouvé ? Appeler, réserver, demander un devis, s’inscrire ou acheter. Tout part de là.
              </p>
            </AnimateIn>

            <div className="grid gap-4">
              {method.map((item, i) => (
                <AnimateIn key={item.step} delay={i * 90}>
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                    <div className="flex gap-5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Résumé</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Le bon service dépend du vrai besoin de l’entreprise
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid bg-slate-950 text-sm font-semibold text-white md:grid-cols-3">
              <div className="p-5">Commerces</div>
              <div className="border-white/10 p-5 md:border-l">TPE / PME</div>
              <div className="border-white/10 p-5 md:border-l">Startups</div>
            </div>

            <div className="grid text-sm leading-7 text-slate-600 md:grid-cols-3">
              <div className="p-5">
                <p className="font-semibold text-slate-950">Être choisi rapidement</p>
                <p className="mt-2">Google Business, avis, photos, réservation, messagerie IA et relance avis.</p>
              </div>
              <div className="border-slate-200 p-5 md:border-l">
                <p className="font-semibold text-slate-950">Générer et suivre les prospects</p>
                <p className="mt-2">Site web, chatbot, prise de rendez-vous, tableau de suivi et automatisations.</p>
              </div>
              <div className="border-slate-200 p-5 md:border-l">
                <p className="font-semibold text-slate-950">Tester et prouver la traction</p>
                <p className="mt-2">Landing page, waitlist, démo, CRM, analytics, A/B testing et dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <AnimateIn>
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Diagnostic</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                  Vous ne savez pas encore quel système correspond à votre activité ?
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  On analyse votre activité et vos objectifs pour vous orienter vers la solution la plus utile.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-white p-6 text-slate-950">
                <p className="text-xl font-semibold">Parlons de votre projet</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Quelques questions suffisent pour identifier ce qui bloque et les outils à mettre en place.
                </p>
                <a
                  href="/preview/modele-1/contact"
                  className="mt-6 inline-flex w-full justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
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
