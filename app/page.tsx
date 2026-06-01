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
    <main className="min-h-screen bg-[#f7f4ef] text-[#161616]">

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-neutral-700 shadow-sm">
            Google Business • Site web • RDV • Assistant IA
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-black md:text-7xl">
            Faites de votre présence en ligne un vrai moteur de clients.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-700 md:text-xl">
            Nous créons la solution digitale adaptée à votre activité pour être mieux trouvé,
            mieux compris et plus facilement choisi : Google Business, site web, prise de
            rendez-vous, assistant IA et suivi des demandes.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/prise-de-rdv"
              className="rounded-full bg-black px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Réserver un appel gratuit
            </a>
            <a
              href="/services"
              className="rounded-full border border-black/15 bg-white/70 px-7 py-4 text-center text-sm font-semibold text-black transition hover:bg-white"
            >
              Améliorer ma visibilité
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-black/5 blur-2xl" />
          <div className="relative rounded-[2.5rem] border border-black/10 bg-white p-6 shadow-2xl shadow-black/10">
            <div className="rounded-[2rem] bg-[#111111] p-6 text-white">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Aperçu présence digitale</p>
                  <h2 className="mt-1 text-2xl font-semibold">Votre activité</h2>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                  En ligne
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-white/60">Google Business</p>
                  <p className="mt-1 font-medium">Fiche claire, avis valorisés, appels facilités</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-white/60">Site web</p>
                  <p className="mt-1 font-medium">Image premium, services lisibles, parcours fluide</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white p-4 text-black">
                    <p className="text-sm text-neutral-500">RDV</p>
                    <p className="mt-1 text-xl font-semibold">24/7</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 text-black">
                    <p className="text-sm text-neutral-500">Assistant IA</p>
                    <p className="mt-1 text-xl font-semibold">Actif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-4 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Pour qui ?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Chaque activité a sa place.</h2>
          </div>
          <div className="md:col-span-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="font-semibold">Vous êtes un commerce local ?</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Votre fiche Google Business peut devenir votre première source de visibilité.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="font-semibold">Vous êtes indépendant ?</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Votre image en ligne doit inspirer confiance rapidement.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="font-semibold">Vous êtes une PME ou startup ?</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Votre site doit présenter clairement votre valeur et vos offres.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Le vrai problème</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Le problème n’est pas toujours l’absence de site. C’est l’absence de clarté.
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-700">
            Beaucoup d’activités perdent des clients parce que leur présence en ligne n’est pas assez claire :
            fiche Google incomplète, photos peu attractives, avis mal exploités, absence de réservation simple
            ou site qui ne donne pas envie de contacter.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 h-10 w-10 rounded-full bg-black text-center text-lg leading-10 text-white">×</div>
              <p className="font-medium">{problem}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111111] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Notre vision</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Nous ne partons pas d’un outil. Nous partons de votre activité.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Solutions</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Une présence digitale sur mesure, selon vos vrais besoins.
            </h2>
          </div>
          <a href="/services" className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold hover:bg-neutral-50">
            Voir les services
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <div key={solution.title} className="group rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
              <p className="mb-8 inline-flex rounded-full bg-[#f7f4ef] px-3 py-1 text-xs font-semibold text-neutral-700">
                {solution.tag}
              </p>
              <h3 className="text-2xl font-semibold tracking-tight">{solution.title}</h3>
              <p className="mt-4 leading-7 text-neutral-600">{solution.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/70 px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Notre différence</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Vous n’avez pas besoin de tout. Vous avez besoin de ce qui vous correspond.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-neutral-700">
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
                <div key={item} className="rounded-2xl bg-[#f7f4ef] p-5 font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Résultats</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Ce que votre présence digitale peut changer.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5">
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-4 text-sm leading-6 text-neutral-600">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="rounded-[2.5rem] bg-black p-8 text-white md:p-14">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Activités accompagnées</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Une présence digitale pensée pour chaque type d’activité.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Que vous soyez un commerce de quartier, un restaurant, un artisan, un cabinet, une PME ou une marque
              en développement, votre présence en ligne doit refléter votre valeur et faciliter le passage à l’action.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {audiences.map((audience) => (
              <span key={audience} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/85 ring-1 ring-white/10">
                {audience}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-8 text-center shadow-xl shadow-black/5 ring-1 ring-black/5 md:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Première étape</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Vous ne savez pas par où commencer ? C’est justement notre rôle.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
            Réservez un appel gratuit. Nous analyserons votre présence actuelle : Google Business, site web,
            parcours client, prise de contact et visibilité. Ensuite, nous vous proposerons la solution la plus adaptée.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/prise-de-rdv" className="rounded-full bg-black px-7 py-4 text-sm font-semibold text-white hover:bg-neutral-800">
              Réserver un appel gratuit
            </a>
            <a href="/contact" className="rounded-full border border-black/15 px-7 py-4 text-sm font-semibold hover:bg-neutral-50">
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
