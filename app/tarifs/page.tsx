type PricingPack = {
  name: string;
  category: string;
  subtitle: string;
  target?: string;
  setupPrice: string;
  monthlyPrice: string;
  highlighted?: boolean;
  setupIncludes: string[];
  monthlyIncludes: string[];
  result: string;
  cta?: string;
};

export default function TarifsPage() {
  const commercePacks: PricingPack[] = [
    {
      name: "Commerce Intelligent",
      category: "Commerce local",
      subtitle: "Pour les commerces qui veulent être mieux trouvés, répondre plus vite et obtenir plus d’avis.",
      target: "Coiffeur, restaurant, serrurier, menuisier, vendeur, artisan, institut, garage...",
      setupPrice: "590 € HT",
      monthlyPrice: "129 € HT / mois",
      highlighted: true,
      setupIncludes: [
        "Audit de la présence digitale actuelle",
        "Optimisation ou création de la fiche Google Business",
        "Mise à jour des horaires, services, catégories et informations clés",
        "Ajout ou amélioration des photos",
        "Mise en place d’un lien d’appel, de réservation ou de contact",
        "Création d’une FAQ commerciale",
        "Mise en place d’une messagerie IA pour répondre aux questions clients",
        "Scénarios de conversation pour orienter vers un appel, un rendez-vous ou un devis",
        "Préparation des messages de relance pour obtenir des avis Google",
        "Réponses types aux avis positifs et négatifs"
      ],
      monthlyIncludes: [
        "Suivi de la fiche Google Business",
        "Mise à jour des informations importantes",
        "Aide à la gestion des avis clients",
        "Réponse aux avis positifs et négatifs",
        "Relance avis client selon le fonctionnement validé",
        "Amélioration des réponses de la messagerie IA",
        "Suivi des appels, clics, itinéraires et interactions",
        "Rapport mensuel simple"
      ],
      result: "Une fiche Google plus professionnelle, une meilleure réputation et une IA capable de guider les clients même quand l’équipe est occupée.",
      cta: "Demander cette formule"
    },
    {
      name: "Commerce Premium",
      category: "Commerce local",
      subtitle: "Pour les commerces qui veulent mieux organiser leurs demandes clients et réduire les opportunités perdues.",
      target: "Commerces avec beaucoup d’appels, réservations, demandes de devis, urgences ou secrétariat.",
      setupPrice: "990 € HT",
      monthlyPrice: "249 € HT / mois",
      highlighted: false,
      setupIncludes: [
        "Tout ce qui est inclus dans Commerce Intelligent",
        "Mise en place d’un tableau de suivi des demandes clients",
        "Classement des demandes par type : appel, rendez-vous, devis, urgence ou renseignement",
        "Création de modèles de réponses pour les demandes fréquentes",
        "Mise en place d’un processus clair pour transmettre les demandes importantes à l’équipe",
        "Aide à la coordination si le commerce dispose déjà d’une secrétaire ou d’un accueil",
        "Configuration d’un suivi plus détaillé des demandes, avis, appels et rendez-vous",
        "Préparation d’un rapport mensuel plus complet pour suivre ce qui génère réellement des contacts"
      ],
      monthlyIncludes: [
        "Suivi régulier des avis, messages et demandes entrantes",
        "Mise à jour des informations utiles si l’activité évolue",
        "Amélioration continue des scénarios IA selon les vraies questions des clients",
        "Suivi du tableau des demandes clients",
        "Analyse mensuelle des appels, réservations, devis, visites et avis",
        "Recommandations concrètes pour réduire les demandes perdues",
        "Accompagnement plus régulier pour ajuster l’organisation digitale",
        "Point mensuel pour comprendre ce qui fonctionne et ce qui doit être amélioré"
      ],
      result: "Une gestion digitale plus organisée pour suivre les demandes, mieux répartir les informations et réduire les clients perdus.",
      cta: "Choisir le Premium"
    }
  ];

  const tpePmePacks: PricingPack[] = [
    {
      name: "Présence Pro",
      category: "TPE / PME",
      subtitle: "Pour une petite entreprise qui veut une image sérieuse et un site clair.",
      setupPrice: "890 € HT",
      monthlyPrice: "99 € HT / mois",
      highlighted: false,
      setupIncludes: [
        "Analyse du besoin et de l’activité",
        "Création d’un site web professionnel simple",
        "Présentation claire de l’entreprise",
        "Pages services essentielles",
        "Formulaire de contact",
        "Bouton d’appel ou de contact rapide",
        "Chatbot inclus",
        "Configuration de base"
      ],
      monthlyIncludes: [
        "Maintenance légère du site",
        "Petites modifications de contenu",
        "Suivi simple des demandes",
        "Ajustements mineurs du parcours de contact",
        "Rapport mensuel simple"
      ],
      result: "Une image plus professionnelle et un site capable de recevoir les premières demandes clients."
    },
    {
      name: "Croissance",
      category: "TPE / PME",
      subtitle: "Pour une entreprise qui veut générer et suivre ses prospects plus sérieusement.",
      setupPrice: "1 490 € HT",
      monthlyPrice: "179 € HT / mois",
      highlighted: true,
      setupIncludes: [
        "Tout ce qui est inclus dans Présence Pro",
        "Pages services plus détaillées",
        "Demande de devis ou formulaire avancé",
        "Prise de rendez-vous en ligne si nécessaire",
        "Chatbot de qualification des prospects",
        "Tableau de suivi clients/prospects",
        "Automatisation de confirmation après une demande",
        "Notification lorsqu’une nouvelle demande arrive"
      ],
      monthlyIncludes: [
        "Suivi des prospects entrants",
        "Amélioration des pages et appels à l’action",
        "Ajustement du chatbot",
        "Suivi du tableau clients/prospects",
        "Optimisations des formulaires ou prises de rendez-vous",
        "Rapport mensuel sur les demandes et rendez-vous"
      ],
      result: "Un site qui devient un véritable outil commercial pour attirer, qualifier et suivre les prospects."
    },
    {
      name: "Performance",
      category: "TPE / PME",
      subtitle: "Pour une PME qui veut mieux structurer son acquisition et son suivi commercial.",
      setupPrice: "2 490 € HT",
      monthlyPrice: "349 € HT / mois",
      highlighted: false,
      setupIncludes: [
        "Tout ce qui est inclus dans Croissance",
        "Parcours client plus complet",
        "CRM ou tableau de suivi avancé",
        "Automatisations de relance",
        "Segmentation des prospects",
        "Reporting plus détaillé",
        "Optimisation des conversions",
        "Accompagnement stratégique initial"
      ],
      monthlyIncludes: [
        "Analyse des performances",
        "Optimisation continue du parcours client",
        "Suivi CRM ou tableau avancé",
        "Amélioration des contenus",
        "Recommandations commerciales",
        "Rapport mensuel détaillé",
        "Accompagnement mensuel"
      ],
      result: "Une acquisition plus structurée, un meilleur suivi commercial et des décisions plus claires."
    }
  ];

  const startupPacks: PricingPack[] = [
    {
      name: "Validation",
      category: "Startup",
      subtitle: "Pour tester rapidement une idée et mesurer l’intérêt du marché.",
      setupPrice: "790 € HT",
      monthlyPrice: "99 € HT / mois",
      highlighted: false,
      setupIncludes: [
        "Clarification de la proposition de valeur",
        "Landing page simple",
        "Présentation du problème, de la solution et des bénéfices",
        "Formulaire d’inscription",
        "Waitlist",
        "E-mail automatique de confirmation",
        "Analytics de base"
      ],
      monthlyIncludes: [
        "Suivi des inscriptions",
        "Ajustements du message",
        "Petites modifications de la landing page",
        "Rapport simple sur la traction",
        "Recommandations d’amélioration"
      ],
      result: "Une première présence pour tester si le marché montre de l’intérêt."
    },
    {
      name: "Launch",
      category: "Startup",
      subtitle: "Pour lancer une bêta, générer des demandes de démo et suivre les premiers leads.",
      setupPrice: "1 490 € HT",
      monthlyPrice: "199 € HT / mois",
      highlighted: true,
      setupIncludes: [
        "Tout ce qui est inclus dans Validation",
        "Landing page plus complète",
        "Inscription bêta ou waitlist avancée",
        "Demande de démo",
        "Prise de rendez-vous",
        "Chatbot IA de qualification",
        "CRM simple",
        "E-mails automatiques",
        "Dashboard de traction"
      ],
      monthlyIncludes: [
        "Suivi des leads et inscriptions",
        "Optimisation de la landing page",
        "Suivi des demandes de démo",
        "Ajustement du chatbot",
        "Analyse des conversions",
        "Reporting traction mensuel"
      ],
      result: "Un système de lancement pour générer des leads, mesurer l’intérêt et préparer la croissance."
    },
    {
      name: "Growth",
      category: "Startup",
      subtitle: "Pour une startup qui veut optimiser son acquisition et améliorer ses conversions.",
      setupPrice: "2 990 € HT",
      monthlyPrice: "399 € HT / mois",
      highlighted: false,
      setupIncludes: [
        "Tout ce qui est inclus dans Launch",
        "A/B testing",
        "Segmentation des prospects",
        "Séquences e-mail",
        "Pitch digital",
        "Pages cas d’usage",
        "Dashboard avancé",
        "Optimisation du tunnel de conversion"
      ],
      monthlyIncludes: [
        "Analyse des performances",
        "Optimisation des messages",
        "Suivi des conversions",
        "Amélioration du tunnel d’acquisition",
        "Recommandations growth",
        "Reporting mensuel avancé"
      ],
      result: "Une acquisition plus mesurable, des messages plus clairs et une meilleure conversion des prospects."
    }
  ];

  const paymentSteps = [
    {
      step: "01",
      title: "Diagnostic gratuit",
      description: "On échange pour comprendre votre activité, vos objectifs et vos outils actuels."
    },
    {
      step: "02",
      title: "Proposition claire",
      description: "Vous recevez une formule recommandée avec le détail de la mise en place et de l’abonnement."
    },
    {
      step: "03",
      title: "Devis & acompte",
      description: "Le projet démarre après validation du devis et paiement d’un acompte de lancement."
    },
    {
      step: "04",
      title: "Livraison & suivi mensuel",
      description: "Après la mise en place, l’abonnement permet de maintenir, suivre et améliorer le système."
    }
  ];

  const faqs = [
    {
      question: "Pourquoi une mise en place et un abonnement mensuel ?",
      answer:
        "La mise en place sert à construire le système : fiche Google, site, landing page, outils, automatisations ou tableau de suivi. L’abonnement sert à maintenir, suivre, améliorer et faire évoluer ce système dans le temps."
    },
    {
      question: "Les tarifs sont-ils définitifs ?",
      answer:
        "Ce sont des tarifs de départ. Le prix final dépend du nombre de pages, du niveau d’automatisation, des outils à connecter et du niveau d’accompagnement souhaité."
    },
    {
      question: "Quelle formule choisir si je ne sais pas encore ?",
      answer:
        "Le plus simple est de réserver un diagnostic. Nous analysons votre activité et nous vous orientons vers la formule la plus adaptée."
    },
    {
      question: "Puis-je commencer avec une formule simple et évoluer ensuite ?",
      answer:
        "Oui. L’objectif est de commencer avec une base utile, puis d’ajouter progressivement des fonctionnalités selon les résultats et les besoins."
    }
  ];

  function PricingCard({ pack }: { pack: PricingPack }) {
    return (
      <article
        className={`relative flex h-full flex-col rounded-[2rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 sm:p-7 ${
          pack.highlighted ? "border-black bg-black text-white" : "border-black/10 bg-white text-black"
        }`}
      >
        {pack.highlighted && (
          <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black">
            Recommandé
          </div>
        )}

        <div className="pr-24">
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${pack.highlighted ? "text-white/45" : "text-black/40"}`}>
            {pack.category}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{pack.name}</h3>
          <p className={`mt-4 text-sm leading-6 ${pack.highlighted ? "text-white/65" : "text-black/60"}`}>
            {pack.subtitle}
          </p>
        </div>

        {pack.target && (
          <div className={`mt-6 rounded-2xl p-4 ${pack.highlighted ? "bg-white/10" : "bg-[#f7f4ef]"}`}>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${pack.highlighted ? "text-white/40" : "text-black/40"}`}>
              Pour qui ?
            </p>
            <p className={`mt-2 text-xs leading-5 ${pack.highlighted ? "text-white/70" : "text-black/65"}`}>
              {pack.target}
            </p>
          </div>
        )}

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className={`rounded-2xl p-5 ${pack.highlighted ? "bg-white text-black" : "bg-black text-white"}`}>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${pack.highlighted ? "text-black/45" : "text-white/45"}`}>
              Mise en place
            </p>
            <p className="mt-3 text-2xl font-semibold">{pack.setupPrice}</p>
            <p className={`mt-1 text-[11px] ${pack.highlighted ? "text-black/45" : "text-white/45"}`}>paiement projet</p>
          </div>
          <div className={`rounded-2xl p-5 ${pack.highlighted ? "bg-white/10" : "bg-[#f7f4ef]"}`}>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${pack.highlighted ? "text-white/45" : "text-black/45"}`}>
              Abonnement
            </p>
            <p className="mt-3 text-2xl font-semibold">{pack.monthlyPrice}</p>
            <p className={`mt-1 text-[11px] ${pack.highlighted ? "text-white/45" : "text-black/45"}`}>suivi mensuel</p>
          </div>
        </div>

        <div className={`mt-7 rounded-[1.5rem] border p-5 ${pack.highlighted ? "border-white/10 bg-white/5" : "border-black/10 bg-[#fbfaf7]"}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${pack.highlighted ? "text-white/50" : "text-black/45"}`}>
            Services de mise en place
          </p>
          <ul className="mt-4 grid gap-2.5">
            {pack.setupIncludes.map((item) => (
              <li key={item} className="flex gap-2.5 text-xs leading-5">
                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${pack.highlighted ? "bg-white text-black" : "bg-black text-white"}`}>
                  ✓
                </span>
                <span className={pack.highlighted ? "text-white/70" : "text-black/65"}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`mt-4 rounded-[1.5rem] border p-5 ${pack.highlighted ? "border-white/10 bg-white/5" : "border-black/10 bg-[#f7f4ef]"}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${pack.highlighted ? "text-white/50" : "text-black/45"}`}>
            Services mensuels
          </p>
          <ul className="mt-4 grid gap-2.5">
            {pack.monthlyIncludes.map((item) => (
              <li key={item} className="flex gap-2.5 text-xs leading-5">
                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${pack.highlighted ? "bg-white text-black" : "bg-black text-white"}`}>
                  ✓
                </span>
                <span className={pack.highlighted ? "text-white/70" : "text-black/65"}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`mt-4 rounded-[1.5rem] p-5 ${pack.highlighted ? "bg-white/10" : "bg-black text-white"}`}>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${pack.highlighted ? "text-white/40" : "text-white/45"}`}>
            Résultat attendu
          </p>
          <p className="mt-3 text-xs leading-5 text-white/75">{pack.result}</p>
        </div>

        <a
          href="/contact"
          className={`mt-7 inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
            pack.highlighted ? "bg-white text-black hover:bg-white/85" : "bg-black text-white hover:bg-black/85"
          }`}
        >
          {pack.cta || "Demander un diagnostic"}
        </a>
      </article>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-20">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-black/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 shadow-sm backdrop-blur">
            Tarifs & formules
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-7xl">
                Des offres claires pour construire votre système digital.
                <span className="block text-black/55">Mise en place + abonnement mensuel.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-black/65">
                Chaque formule sépare ce qui est créé au départ et ce qui est suivi chaque mois. Vous savez ce que vous payez, pourquoi vous le payez, et ce qui est réellement pris en charge.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
                >
                  Demander un diagnostic
                </a>
                <a
                  href="#formules"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                >
                  Voir les formules
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
                Comment lire les prix ?
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl bg-[#f7f4ef] p-5">
                  <p className="text-lg font-semibold text-black">Mise en place</p>
                  <p className="mt-2 text-sm leading-6 text-black/65">
                    Création, configuration, intégration des outils et construction du parcours digital.
                  </p>
                </div>
                <div className="rounded-2xl bg-black p-5 text-white">
                  <p className="text-lg font-semibold">Abonnement mensuel</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Suivi, maintenance, amélioration, reporting et accompagnement dans le temps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-black p-8 text-white sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">Offre de lancement</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Des tarifs accessibles pour nos premiers clients
              </h2>
            </div>
            <p className="text-lg leading-8 text-white/70">
              Les prix affichés sont des tarifs de départ en HT. Le devis final peut varier selon le nombre de pages, les outils à connecter, le niveau d’automatisation et l’accompagnement souhaité.
            </p>
          </div>
        </div>
      </section>

      <section id="formules" className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Commerces locaux</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Pour être trouvé, rassurer et être choisi rapidement
            </h2>
            <p className="mt-5 text-base leading-7 text-black/65">
              Deux formules pensées pour les commerces qui dépendent des recherches locales, des avis, des appels, des réservations, des devis ou des visites physiques.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {commercePacks.map((pack) => (
              <PricingCard key={pack.name} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">TPE / PME</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Pour générer des prospects et mieux suivre les demandes
            </h2>
            <p className="mt-5 text-base leading-7 text-black/65">
              Ces formules transforment le site web en outil commercial : présentation claire, prise de contact, chatbot, suivi clients/prospects et automatisations simples.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {tpePmePacks.map((pack) => (
              <PricingCard key={pack.name} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Startups</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Pour lancer, tester et mesurer la traction
            </h2>
            <p className="mt-5 text-base leading-7 text-black/65">
              Ces formules aident les startups à clarifier leur offre, attirer les premiers utilisateurs, générer des demandes de démo et suivre les signaux de traction.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {startupPacks.map((pack) => (
              <PricingCard key={pack.name} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Paiement</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Un processus clair avant de commencer
            </h2>
            <p className="mt-5 text-base leading-7 text-black/65">
              Pour éviter les malentendus, chaque projet commence par un échange, puis une proposition claire. Vous ne payez pas dans le vide : les étapes sont cadrées.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {paymentSteps.map((item) => (
              <div key={item.step} className="rounded-[1.5rem] bg-[#f7f4ef] p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  {item.step}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-black">{item.title}</h3>
                <p className="mt-3 text-xs leading-5 text-black/65">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Sur mesure</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Votre besoin ne rentre pas dans une formule ?
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-black/65">
                Certaines entreprises ont besoin d’un accompagnement spécifique : outils déjà en place, équipe interne, processus complexe, plusieurs points de contact, automatisations avancées ou besoin stratégique. Dans ce cas, nous construisons une proposition sur mesure.
              </p>
              <a
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
              >
                Demander une offre sur mesure
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">Questions fréquentes</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Comprendre nos formules
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-xl font-semibold tracking-tight text-black">{faq.question}</h3>
                <p className="mt-4 text-sm leading-7 text-black/65">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-black p-8 text-center text-white sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">Diagnostic</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Le bon tarif dépend du bon système.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Nous commençons par comprendre votre activité, vos objectifs et vos outils actuels. Ensuite, nous vous orientons vers la formule la plus adaptée.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
            >
              Demander un diagnostic
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
