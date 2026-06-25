import { AnimateIn } from "@/components/AnimateIn";

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
      text: "Optimisation de votre fiche, photos, horaires et avis pour améliorer votre visibilité locale.",
      tag: "Visibilité locale",
      bg: "bg-emerald-50",
      tagBg: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Site web professionnel",
      text: "Une présence moderne et rapide qui présente votre activité et donne envie de vous contacter.",
      tag: "Image & confiance",
      bg: "bg-sky-50",
      tagBg: "bg-sky-100 text-sky-700",
    },
    {
      title: "Prise de rendez-vous",
      text: "Un parcours simple pour permettre à vos clients de réserver un créneau à tout moment.",
      tag: "Conversion",
      bg: "bg-violet-50",
      tagBg: "bg-violet-100 text-violet-700",
    },
    {
      title: "Assistant IA",
      text: "Un conseiller disponible 24h/24 pour répondre aux questions et guider vers l'action.",
      tag: "Gain de temps",
      bg: "bg-amber-50",
      tagBg: "bg-amber-100 text-amber-700",
    },
    {
      title: "Formulaire intelligent",
      text: "Une collecte propre des demandes pour mieux comprendre, prioriser et suivre vos prospects.",
      tag: "Organisation",
      bg: "bg-rose-50",
      tagBg: "bg-rose-100 text-rose-700",
    },
    {
      title: "Suivi des prospects",
      text: "Une base simple pour ne plus perdre les contacts et transformer les demandes en opportunités.",
      tag: "Pilotage",
      bg: "bg-slate-50",
      tagBg: "bg-slate-200 text-slate-700",
    },
  ];

  const audiences = [
    "Commerces locaux", "Restaurants", "Salons & instituts", "Artisans",
    "Cabinets professionnels", "Indépendants", "PME", "Startups",
    "Formateurs & coachs", "Prestataires de services",
    "Commerces locaux", "Restaurants", "Salons & instituts", "Artisans",
    "Cabinets professionnels", "Indépendants", "PME", "Startups",
    "Formateurs & coachs", "Prestataires de services",
  ];

  const benefits = [
    { title: "Être mieux trouvé", text: "Une présence Google claire pour apparaître au bon moment, devant les bonnes personnes.", icon: "🎯" },
    { title: "Inspirer confiance", text: "Des informations et visuels qui rassurent dès les premières secondes.", icon: "✨" },
    { title: "Plus de demandes", text: "Des boutons d'action visibles pour appeler, réserver ou demander un devis.", icon: "📈" },
    { title: "Gagner du temps", text: "Un assistant IA qui répond aux questions répétitives, même quand vous êtes occupé.", icon: "⚡" },
  ];

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-white px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Texte */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Agence digitale & IA
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              <span className="font-light text-gray-400">Faites de votre</span>
              <br />
              présence en ligne
              <br />
              <span className="italic font-light text-gray-400">un vrai</span>{" "}
              moteur de clients.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-500">
              Google Business, site web, prise de rendez-vous, assistant IA et suivi des demandes —
              adaptés à votre activité, pas à un modèle générique.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/prise-de-rdv"
                className="btn-hover inline-flex rounded-full bg-gray-900 px-8 py-4 text-sm font-semibold text-white"
              >
                Réserver un appel gratuit
              </a>
              <a
                href="/services"
                className="btn-hover inline-flex rounded-full border border-gray-200 px-8 py-4 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-900"
              >
                Voir les services
              </a>
            </div>

          </div>

          {/* Dashboard card */}
          <AnimateIn delay={150}>
            <div className="relative rounded-3xl bg-gray-900 p-6 shadow-2xl shadow-gray-900/20">
              <div className="flex items-center justify-between pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tableau de bord</p>
                  <h2 className="mt-1 text-xl font-black text-white">Performance digitale</h2>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  En progression
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Demandes reçues", value: "48", change: "+32% ce mois", up: true },
                  { label: "RDV générés", value: "19", change: "+11 nouveaux", up: true },
                  { label: "Prospects chauds", value: "12", change: "À relancer", up: false },
                  { label: "Valeur estimée", value: "2 840€", change: "opportunités", up: true },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                    <p className="text-xs font-medium text-gray-400">{stat.label}</p>
                    <p className="mt-3 text-3xl font-black text-white">{stat.value}</p>
                    <p className={`mt-1.5 text-xs font-semibold ${stat.up ? "text-emerald-400" : "text-gray-400"}`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-black text-gray-900">Actions recommandées</p>
                  <p className="text-xs text-gray-400">Aujourd'hui</p>
                </div>
                {[
                  { text: "Relancer 4 prospects chauds", tag: "Priorité" },
                  { text: "Demander 7 avis clients", tag: "Impact local" },
                  { text: "Optimiser l'offre la plus consultée", tag: "Conversion" },
                ].map((action) => (
                  <div key={action.text} className="mt-2 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5 text-sm">
                    <span className="font-medium text-gray-700">{action.text}</span>
                    <span className="ml-2 shrink-0 rounded-full bg-gray-900 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {action.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Deco */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-gray-50 blur-3xl" />
      </section>

      {/* POUR QUI */}
      <section className="bg-gray-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimateIn>
            <span className="rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-600">
              Pour qui ?
            </span>
            <h2 className="mt-5 text-3xl font-black text-gray-900 md:text-4xl">
              Chaque activité a sa place.
            </h2>
          </AnimateIn>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { q: "Vous êtes un commerce local ?", a: "Votre fiche Google Business peut devenir votre première source de visibilité.", bg: "bg-white" },
              { q: "Vous êtes indépendant ?", a: "Votre image en ligne doit inspirer confiance rapidement.", bg: "bg-white" },
              { q: "Vous êtes une PME ou startup ?", a: "Votre site doit présenter clairement votre valeur et vos offres.", bg: "bg-white" },
            ].map((card, i) => (
              <AnimateIn key={card.q} delay={i * 80}>
                <div className="btn-hover rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
                  <h3 className="text-lg font-black text-gray-900">{card.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-500">{card.a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* LE VRAI PROBLÈME */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimateIn className="max-w-3xl">
            <span className="rounded-full bg-red-100 px-4 py-1.5 text-xs font-semibold text-red-600">
              Le vrai problème
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight text-gray-900 md:text-5xl">
              Le problème n'est pas toujours l'absence de site.{" "}
              <span className="text-gray-400 font-light">C'est l'absence de clarté.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-500">
              Fiche Google incomplète, photos peu attractives, avis mal exploités — voilà ce qui fait perdre des clients.
            </p>
          </AnimateIn>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem, i) => (
              <AnimateIn key={problem} delay={i * 60}>
                <div className="btn-hover group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-sm font-black text-red-500">
                    ✕
                  </div>
                  <p className="font-semibold text-gray-900">{problem}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* NOTRE VISION — dark */}
      <section className="bg-gray-900 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimateIn className="max-w-3xl">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/70">
              Notre vision
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
              Nous ne partons pas d'un outil.{" "}
              <span className="text-gray-400 font-light italic">Nous partons de votre activité.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Un restaurant, un artisan, un cabinet, une PME n'ont pas les mêmes besoins.
              Parfois, une fiche Google suffit. Parfois, un site complet est nécessaire.
            </p>
          </AnimateIn>

          <AnimateIn delay={150}>
            <blockquote className="mt-14 max-w-4xl border-l-4 border-white/20 pl-8 text-2xl font-light leading-relaxed text-gray-300 md:text-3xl">
              "Le bon digital n'est pas forcément le plus compliqué. C'est celui qui aide vos clients à vous choisir."
            </blockquote>
          </AnimateIn>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <AnimateIn className="max-w-2xl">
              <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-600">
                Solutions
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight text-gray-900 md:text-5xl">
                Une présence digitale{" "}
                <span className="font-light italic text-gray-400">sur mesure.</span>
              </h2>
            </AnimateIn>
            <a
              href="/services"
              className="btn-hover shrink-0 rounded-full border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
            >
              Voir tous les services →
            </a>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <AnimateIn key={s.title} delay={i * 60}>
                <div className={`btn-hover rounded-3xl p-8 ${s.bg}`}>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${s.tagBg}`}>
                    {s.tag}
                  </span>
                  <h3 className="mt-5 text-xl font-black text-gray-900">{s.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{s.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* NOTRE DIFFÉRENCE */}
      <section className="bg-gray-50 px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <AnimateIn>
            <span className="rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-600">
              Notre différence
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight text-gray-900 md:text-5xl">
              Vous n'avez pas besoin de tout.{" "}
              <span className="font-light italic text-gray-400">Juste de ce qui vous correspond.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-500">
              Notre rôle est de vous orienter vers ce qui est vraiment utile, sans vous vendre ce qui ne sert pas.
            </p>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Approche centrée client", icon: "👤" },
                { label: "Google Business comme levier", icon: "📍" },
                { label: "Site web quand c'est utile", icon: "🌐" },
                { label: "Design sobre et professionnel", icon: "✦" },
              ].map((item, i) => (
                <AnimateIn key={item.label} delay={i * 50}>
                  <div className="btn-hover rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                    <span className="text-xl">{item.icon}</span>
                    <p className="mt-3 text-sm font-semibold text-gray-900">{item.label}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimateIn className="max-w-2xl">
            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-600">
              Résultats
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight text-gray-900 md:text-5xl">
              Ce que votre présence digitale{" "}
              <span className="font-light italic text-gray-400">peut changer.</span>
            </h2>
          </AnimateIn>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <AnimateIn key={b.title} delay={i * 80}>
                <div className="btn-hover rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
                  <span className="text-2xl">{b.icon}</span>
                  <h3 className="mt-4 text-lg font-black text-gray-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">{b.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCES — défilé */}
      <section className="overflow-hidden border-y border-gray-100 bg-white py-10">
        <div className="flex animate-marquee whitespace-nowrap">
          {audiences.map((a, i) => (
            <span
              key={i}
              className="mx-3 inline-flex items-center rounded-full bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700"
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 py-24 lg:px-8">
        <AnimateIn>
          <div className="mx-auto max-w-4xl rounded-3xl bg-gray-900 px-8 py-16 text-center text-white md:px-16">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/70">
              Première étape
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black leading-tight md:text-5xl">
              Vous ne savez pas par où commencer ?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-gray-300">
              Réservez un appel gratuit. Nous analysons votre présence et vous proposons la solution la plus adaptée.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/prise-de-rdv"
                className="btn-hover inline-flex justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-gray-900"
              >
                Réserver un appel gratuit
              </a>
              <a
                href="/tarifs"
                className="btn-hover inline-flex justify-center rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Voir les formules
              </a>
            </div>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
