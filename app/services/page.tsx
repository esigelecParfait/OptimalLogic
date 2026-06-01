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
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-20">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-black/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 shadow-sm backdrop-blur">
            Services digitaux adaptés à chaque entreprise
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-7xl">
                Nous ne créons pas seulement une présence digitale.
                <span className="block text-black/55">Nous construisons un système pour être choisi.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-black/65">
                Chaque entreprise n’a pas le même besoin. Un commerce doit être trouvé rapidement, une TPE/PME doit générer et suivre ses prospects, une startup doit convaincre et prouver sa traction. Nos services sont pensés pour s’adapter à cette réalité.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
                >
                  Demander un diagnostic
                </a>
                <a
                  href="#offres"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                >
                  Voir les services
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
                Notre logique
              </p>
              <p className="mt-5 text-2xl font-semibold leading-snug text-black">
                Le digital doit servir un objectif simple : transformer l’attention en confiance, puis la confiance en action.
              </p>
              <div className="mt-8 grid gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 rounded-2xl bg-[#f7f4ef] px-4 py-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white">✓</span>
                    <span className="text-sm font-medium text-black/75">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="px-6 pb-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-black p-8 text-white sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">Positionnement</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Une offre différente selon le type de client
              </h2>
            </div>
            <p className="text-lg leading-8 text-white/70">
              Nous ne vendons pas le même digital à tout le monde. Nous adaptons nos outils au comportement réel des clients : recherche rapide pour un commerce, comparaison et demande de devis pour une TPE/PME, validation du marché pour une startup.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="offres" className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Nos services</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Trois types d’entreprises, trois systèmes digitaux adaptés
            </h2>
          </div>

          <div className="grid gap-6">
            {services.map((service, index) => (
              <article
                key={service.label}
                className="group rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 sm:p-8 lg:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <span className="rounded-full bg-[#f7f4ef] px-4 py-2 text-sm font-semibold text-black/70">
                        {service.label}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {service.title}
                    </h3>

                    <p className="mt-5 text-base leading-7 text-black/65">
                      {service.description}
                    </p>

                    <div className="mt-6 rounded-3xl bg-[#f7f4ef] p-5">
                      <p className="text-sm font-semibold text-black">Exemples de clients</p>
                      <p className="mt-2 text-sm leading-6 text-black/65">{service.examples}</p>
                    </div>

                    <div className="mt-5 rounded-3xl border border-black/10 p-5">
                      <p className="text-sm font-semibold text-black">Objectif</p>
                      <p className="mt-2 text-sm leading-6 text-black/65">{service.objective}</p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-black/40">
                      Ce que nous mettons en place
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="rounded-2xl bg-[#f7f4ef] p-4">
                          <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs text-white">
                            ✓
                          </div>
                          <p className="text-sm leading-6 text-black/75">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-3xl bg-black p-6 text-white">
                      <p className="text-sm font-semibold text-white/55">Résultat attendu</p>
                      <p className="mt-3 text-lg font-medium leading-7 text-white/90">{service.result}</p>
                      <a
                        href="/contact"
                        className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
                      >
                        {service.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Méthode</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Une méthode pensée pour créer du résultat, pas seulement du design
              </h2>
              <p className="mt-6 text-base leading-7 text-black/65">
                Un bon outil digital doit répondre à une question simple : qu’est-ce que le client doit faire après vous avoir trouvé ? Appeler, réserver, demander un devis, s’inscrire, demander une démo ou acheter.
              </p>
            </div>

            <div className="grid gap-4">
              {method.map((item) => (
                <div key={item.step} className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                  <div className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-black/65">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Résumé</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Le bon service dépend du vrai besoin de l’entreprise
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-black/10">
            <div className="grid bg-black text-sm font-semibold text-white md:grid-cols-3">
              <div className="p-5">Commerces</div>
              <div className="border-white/10 p-5 md:border-l">TPE / PME</div>
              <div className="border-white/10 p-5 md:border-l">Startups</div>
            </div>

            <div className="grid text-sm leading-7 text-black/70 md:grid-cols-3">
              <div className="p-5">
                <p className="font-semibold text-black">Être choisi rapidement</p>
                <p className="mt-2">Google Business, avis, photos, réservation, messagerie IA et relance avis.</p>
              </div>
              <div className="border-black/10 p-5 md:border-l">
                <p className="font-semibold text-black">Générer et suivre les prospects</p>
                <p className="mt-2">Site web, chatbot, prise de rendez-vous, tableau de suivi et automatisations.</p>
              </div>
              <div className="border-black/10 p-5 md:border-l">
                <p className="font-semibold text-black">Tester et prouver la traction</p>
                <p className="mt-2">Landing page, waitlist, démo, CRM, analytics, A/B testing et dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-black p-8 text-white sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">Diagnostic</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Vous ne savez pas encore quel système digital correspond à votre activité ?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                Nous analysons votre activité, vos clients et vos objectifs pour construire une solution adaptée : visibilité locale, génération de prospects ou lancement digital.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-6 text-black">
              <p className="text-xl font-semibold">Parlons de votre projet</p>
              <p className="mt-3 text-sm leading-6 text-black/60">
                En quelques questions, nous pouvons identifier ce qui bloque aujourd’hui et les outils les plus utiles à mettre en place.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex w-full justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
              >
                Demander un diagnostic gratuit
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
