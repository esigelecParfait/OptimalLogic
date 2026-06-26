"use client";

export default function CookiesPage() {
  function openCookiePreferences() {
    window.dispatchEvent(new Event("open-cookie-preferences"));
  }

  const cookieTypes = [
    {
      title: "Cookies nécessaires",
      status: "Toujours actifs",
      description:
        "Ils permettent au site de fonctionner correctement : sécurité, affichage, mémorisation du choix de consentement, accès aux fonctionnalités essentielles."
    },
    {
      title: "Cookies de mesure d’audience",
      status: "Avec consentement",
      description:
        "Ils permettent de comprendre quelles pages sont consultées, comment les visiteurs naviguent et quels contenus doivent être améliorés."
    },
    {
      title: "Cookies liés au chatbot",
      status: "Avec consentement si non strictement nécessaire",
      description:
        "Ils peuvent être utilisés pour afficher le chatbot, mémoriser une conversation ou transmettre les messages au prestataire technique."
    },
    {
      title: "Cookies marketing",
      status: "Avec consentement",
      description:
        "Ils servent à mesurer des campagnes publicitaires, personnaliser certaines communications ou suivre des conversions."
    }
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      <section className="px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 shadow-sm">
            Cookies & traceurs
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-7xl">
            Gestion des cookies.
            <span className="block text-black/55">Choisissez ce que vous acceptez.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-black/65">
            Cette page explique les cookies et traceurs qui peuvent être utilisés sur le site. Vous pouvez
            modifier vos préférences à tout moment.
          </p>

          <button
            type="button"
            onClick={openCookiePreferences}
            className="mt-10 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
          >
            Modifier mes préférences
          </button>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-black p-8 text-white sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
                Principe
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Certains cookies sont nécessaires, d’autres demandent votre accord.
              </h2>
            </div>
            <p className="text-sm leading-7 text-white/70">
              Les cookies nécessaires permettent au site de fonctionner. Les cookies d’audience,
              marketing ou certains outils tiers peuvent être activés uniquement si vous les acceptez.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Catégories
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Les types de cookies que nous pouvons utiliser
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {cookieTypes.map((type) => (
              <div key={type.title} className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">{type.title}</h3>
                  <span className="rounded-full bg-[#f7f4ef] px-3 py-1.5 text-xs font-semibold text-black/60">
                    {type.status}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-black/65">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Outils possibles
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Exemples d’outils concernés
            </h2>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-black/65">
              <li>• Chatbase ou autre chatbot</li>
              <li>• Cal.com ou autre outil de prise de rendez-vous</li>
              <li>• Google Analytics, Plausible, Matomo ou autre outil d’audience</li>
              <li>• Meta Pixel, TikTok Pixel ou outil publicitaire si installé plus tard</li>
              <li>• Outil d’e-mailing, CRM ou automatisation si connecté au site</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Vos choix
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Vous pouvez changer d’avis.
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65">
              Vous pouvez accepter, refuser ou personnaliser vos choix. Vos préférences sont conservées
              localement dans votre navigateur afin d’éviter de vous redemander votre choix à chaque visite.
            </p>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
            >
              Modifier mes préférences
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/10 bg-white p-6 text-sm leading-7 text-black/65 shadow-sm sm:p-8">
          <p>
            Cette page doit être adaptée aux outils réellement utilisés sur le site. Dernière mise à jour : [date].
          </p>
        </div>
      </section>
    </main>
  );
}
