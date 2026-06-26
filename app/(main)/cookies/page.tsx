"use client";

export default function CookiesPage() {
  function openCookiePreferences() {
    window.dispatchEvent(new Event("open-cookie-preferences"));
  }

  const cookieTypes = [
    { title: "Cookies nécessaires", status: "Toujours actifs", description: "Ils permettent au site de fonctionner correctement : sécurité, affichage, mémorisation du choix de consentement, accès aux fonctionnalités essentielles." },
    { title: "Cookies de mesure d’audience", status: "Avec consentement", description: "Ils permettent de comprendre quelles pages sont consultées, comment les visiteurs naviguent et quels contenus doivent être améliorés." },
    { title: "Cookies liés au chatbot", status: "Avec consentement si non strictement nécessaire", description: "Ils peuvent être utilisés pour afficher le chatbot, mémoriser une conversation ou transmettre les messages au prestataire technique." },
    { title: "Cookies marketing", status: "Avec consentement", description: "Ils servent à mesurer des campagnes publicitaires, personnaliser certaines communications ou suivre des conversions." },
  ];

  return (
    <main className="relative">
      <section className="px-7 pb-12 pt-44 lg:pt-52">
        <div className="mx-auto max-w-[1240px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-2 text-sm font-medium text-ink" style={{ background: "var(--grad-soft)" }}>Cookies &amp; traceurs</div>
          <h1 className="mt-6 max-w-4xl text-[clamp(38px,5.4vw,68px)] font-semibold">Gestion des cookies.<span className="grad-text"> Choisissez ce que vous acceptez.</span></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-mut">Cette page explique les cookies et traceurs qui peuvent être utilisés sur le site. Vous pouvez modifier vos préférences à tout moment.</p>
          <button type="button" onClick={openCookiePreferences} className="btn-grad mt-10 inline-flex rounded-full px-6 py-3 text-sm font-semibold">Modifier mes préférences</button>
        </div>
      </section>

      <section className="px-7 py-10">
        <div className="mx-auto max-w-[1240px] rounded-[28px] border border-white/[0.13] p-8 sm:p-10 lg:p-12" style={{ background: "linear-gradient(135deg, rgba(124,92,255,0.18), rgba(31,213,240,0.08))" }}>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Principe</p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Certains cookies sont nécessaires, d’autres demandent votre accord.</h2>
            </div>
            <p className="text-sm leading-7 text-mut">Les cookies nécessaires permettent au site de fonctionner. Les cookies d’audience, marketing ou certains outils tiers peuvent être activés uniquement si vous les acceptez.</p>
          </div>
        </div>
      </section>

      <section className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Catégories</p>
            <h2 className="mt-4 text-[clamp(28px,3.6vw,44px)] font-semibold">Les types de cookies que nous pouvons utiliser</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {cookieTypes.map((type) => (
              <div key={type.title} className="surface-card rounded-[24px] p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="font-display text-xl font-semibold">{type.title}</h3>
                  <span className="shrink-0 rounded-full border border-white/[0.1] px-3 py-1.5 text-xs font-semibold text-mut" style={{ background: "rgba(16,20,42,0.6)" }}>{type.status}</span>
                </div>
                <p className="mt-5 text-sm leading-7 text-mut">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-7 py-16">
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-2">
          <div className="surface-card rounded-[24px] p-6 sm:p-8">
            <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Outils possibles</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Exemples d’outils concernés</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-mut">
              <li>• Chatbot (assistant IA)</li>
              <li>• Cal.com ou autre outil de prise de rendez-vous</li>
              <li>• Google Analytics, Plausible, Matomo ou autre outil d’audience</li>
              <li>• Meta Pixel, TikTok Pixel ou outil publicitaire si installé plus tard</li>
              <li>• Outil d’e-mailing, CRM ou automatisation si connecté au site</li>
            </ul>
          </div>
          <div className="surface-card rounded-[24px] p-6 sm:p-8">
            <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Vos choix</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Vous pouvez changer d’avis.</h2>
            <p className="mt-6 text-sm leading-7 text-mut">Vous pouvez accepter, refuser ou personnaliser vos choix. Vos préférences sont conservées localement dans votre navigateur afin d’éviter de vous redemander votre choix à chaque visite.</p>
            <button type="button" onClick={openCookiePreferences} className="btn-grad mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold">Modifier mes préférences</button>
          </div>
        </div>
      </section>
    </main>
  );
}
