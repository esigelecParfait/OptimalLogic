export default function HomePage() {
  const problems = [
    "Fiche Google Business peu optimisée",
    "Informations, horaires ou services peu clairs",
    "Site absent, dépassé ou peu convaincant",
    "Peu de demandes malgré des visiteurs intéressés",
    "Questions répétitives qui font perdre du temps",
    "Image digitale moins forte que les concurrents",
  ];

  const solutions = [
    {
      title: "Google Business",
      text: "Optimisation de votre fiche, services, photos, horaires, avis et boutons d’action pour améliorer votre visibilité locale.",
      tag: "Visibilité locale",
    },
    {
      title: "Site web professionnel",
      text: "Une présence moderne, claire et rapide qui présente votre activité avec sérieux et donne envie de vous contacter.",
      tag: "Image & confiance",
    },
    {
      title: "Prise de rendez-vous",
      text: "Un parcours simple pour permettre à vos clients de réserver un créneau sans friction, à tout moment.",
      tag: "Conversion",
    },
    {
      title: "Assistant IA",
      text: "Un conseiller disponible 24h/24 pour répondre aux questions fréquentes et guider les visiteurs vers l’action.",
      tag: "Gain de temps",
    },
    {
      title: "Formulaire intelligent",
      text: "Une collecte propre des demandes clients pour mieux comprendre, prioriser et suivre vos prospects.",
      tag: "Organisation",
    },
    {
      title: "Suivi des prospects",
      text: "Une base simple pour ne plus perdre les contacts importants et transformer les demandes en opportunités.",
      tag: "Pilotage",
    },
  ];

  const audiences = [
    "Commerces locaux",
    "Restaurants",
    "Salons & instituts",
    "Artisans",
    "Cabinets professionnels",
    "Indépendants",
    "PME",
    "Startups",
    "Formateurs & coachs",
    "Prestataires de services",
  ];

  const benefits = [
    {
      title: "Être mieux trouvé",
      text: "Une présence Google claire pour apparaître au bon moment, devant les bonnes personnes.",
    },
    {
      title: "Inspirer confiance",
      text: "Des informations, visuels et messages qui rassurent dès les premières secondes.",
    },
    {
      title: "Recevoir plus de demandes",
      text: "Des boutons d’action visibles pour appeler, réserver ou demander un devis facilement.",
    },
    {
      title: "Gagner du temps",
      text: "Un assistant IA qui répond aux questions répétitives, même quand vous êtes occupé.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">

      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,#e2e8f0,transparent_35%),linear-gradient(to_bottom,#ffffff,#f8fafc)]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
            Google Business • Site web • RDV • Assistant IA
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-slate-950 md:text-7xl">
            Faites de votre présence en ligne un vrai moteur de clients.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">
            Nous créons la solution digitale adaptée à votre activité pour être mieux trouvé,
            mieux compris et plus facilement choisi : Google Business, site web, prise de
            rendez-vous, assistant IA et suivi des demandes.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/prise-de-rdv"
              className="rounded-full bg-slate-950 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Réserver un appel gratuit
            </a>
            <a
              href="/services"
              className="rounded-full border border-slate-300 bg-white px-7 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Améliorer ma visibilité
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-slate-200 blur-2xl" />
          <div className="relative rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/80">
            <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-300">Tableau de bord</p>
                  <h2 className="mt-1 text-2xl font-semibold">Performance digitale</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-300/20">
                  En progression
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-slate-300">Demandes reçues</p>
                  <p className="mt-3 text-3xl font-semibold">48</p>
                  <p className="mt-2 text-xs font-medium text-emerald-300">+32% ce mois</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-slate-300">RDV générés</p>
                  <p className="mt-3 text-3xl font-semibold">19</p>
                  <p className="mt-2 text-xs font-medium text-emerald-300">+11 nouveaux</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-slate-300">Prospects chauds</p>
                  <p className="mt-3 text-3xl font-semibold">12</p>
                  <p className="mt-2 text-xs font-medium text-slate-400">À relancer</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-slate-300">Valeur estimée</p>
                  <p className="mt-3 text-3xl font-semibold">2 840€</p>
                  <p className="mt-2 text-xs font-medium text-emerald-300">opportunités</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white p-4 text-slate-950">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Actions recommandées</p>
                  <p className="text-xs text-slate-500">Aujourd’hui</p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 text-sm">
                    <span>Relancer 4 prospects chauds</span>
                    <span className="font-semibold">Priorité</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 text-sm">
                    <span>Demander 7 avis clients</span>
                    <span className="font-semibold">Impact local</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 text-sm">
                    <span>Optimiser l’offre la plus consultée</span>
                    <span className="font-semibold">Conversion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-4 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Pour qui ?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Chaque activité a sa place.</h2>
          </div>
          <div className="md:col-span-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-semibold">Vous êtes un commerce local ?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Votre fiche Google Business peut devenir votre première source de visibilité.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-semibold">Vous êtes indépendant ?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Votre image en ligne doit inspirer confiance rapidement.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-semibold">Vous êtes une PME ou startup ?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Votre site doit présenter clairement votre valeur et vos offres.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Le vrai problème</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Le problème n’est pas toujours l’absence de site. C’est l’absence de clarté.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Beaucoup d’activités perdent des clients parce que leur présence en ligne n’est pas assez claire :
            fiche Google incomplète, photos peu attractives, avis mal exploités, absence de réservation simple
            ou site qui ne donne pas envie de contacter.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-5 h-10 w-10 rounded-full bg-slate-950 text-center text-lg leading-10 text-white">×</div>
              <p className="font-medium">{problem}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Notre vision</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Nous ne partons pas d’un outil. Nous partons de votre activité.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Un restaurant, un artisan, un cabinet, une PME ou une marque digitale n’ont pas les mêmes besoins.
              Parfois, une fiche Google optimisée suffit. Parfois, un site complet devient nécessaire.
            </p>
          </div>

          <blockquote className="mt-14 max-w-4xl text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-5xl">
            “Le bon digital n’est pas forcément le plus compliqué. C’est celui qui aide vos clients à vous choisir.”
          </blockquote>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Solutions</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Une présence digitale sur mesure, selon vos vrais besoins.
            </h2>
          </div>
          <a href="/services" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold hover:bg-slate-50">
            Voir les services
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <div key={solution.title} className="group rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
              <p className="mb-8 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {solution.tag}
              </p>
              <h3 className="text-2xl font-semibold tracking-tight">{solution.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{solution.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Notre différence</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Vous n’avez pas besoin de tout. Vous avez besoin de ce qui vous correspond.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-slate-700">
              Certains professionnels ont surtout besoin d’une fiche Google Business plus propre et plus visible.
              D’autres ont besoin d’un site, d’un système de réservation ou d’un assistant IA. Notre rôle est de
              vous guider vers la solution la plus utile, sans vous vendre ce qui ne sert pas votre activité.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Approche centrée sur le comportement client",
                "Google Business pensé comme un vrai levier commercial",
                "Site web seulement quand il apporte une vraie valeur",
                "Design sobre, moderne et professionnel",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-100 p-5 font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Résultats</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Ce que votre présence digitale peut changer.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white md:p-14">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Activités accompagnées</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Une présence digitale pensée pour chaque type d’activité.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Que vous soyez un commerce de quartier, un restaurant, un artisan, un cabinet, une PME ou une marque
              en développement, votre présence en ligne doit refléter votre valeur et faciliter le passage à l’action.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {audiences.map((audience) => (
              <span key={audience} className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">
                {audience}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-8 text-center shadow-xl shadow-slate-200/80 ring-1 ring-slate-200 md:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Première étape</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Vous ne savez pas par où commencer ? C’est justement notre rôle.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Réservez un appel gratuit. Nous analyserons votre présence actuelle : Google Business, site web,
            parcours client, prise de contact et visibilité. Ensuite, nous vous proposerons la solution la plus adaptée.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/prise-de-rdv" className="rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white hover:bg-slate-800">
              Réserver un appel gratuit
            </a>
            <a href="/contact" className="rounded-full border border-slate-300 px-7 py-4 text-sm font-semibold hover:bg-slate-50">
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
