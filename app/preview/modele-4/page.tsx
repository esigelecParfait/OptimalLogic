import Starfield from "@/components/model4/Starfield";

/* ── Arrow template — dark space, lime green #95F547 ──────────────────────
  Body bg  : #000000
  Accent   : #95F547 (lime)
  Font     : Inter 400/500/600
  H1       : 72px · 700 · centered
  Cards    : bg-zinc-900/60 · border-white/8 · rounded-xl
  Btn      : bg #95F547 · rounded-[5px] · text-black
  Sections : black + radial green glow blobs + blade lines
─────────────────────────────────────────────────────────────────────────── */

const G = "#95F547";

function GreenBlob({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="pointer-events-none absolute rounded-full"
      style={{ width: 600, height: 600, background: "radial-gradient(ellipse, rgba(149,245,71,0.07) 0%, transparent 65%)", filter: "blur(1px)", ...style }} />
  );
}

function GreenBlade({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="pointer-events-none absolute"
      style={{ width: "1.5px", height: 500, background: "linear-gradient(to bottom, transparent 0%, rgba(149,245,71,0.4) 40%, rgba(149,245,71,0.25) 60%, transparent 100%)", ...style }} />
  );
}

function SBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111] px-4 py-1.5 text-sm text-white">
      <span>{icon}</span>{label}
    </span>
  );
}

const clients = [
  "Commerces locaux", "Restaurants", "Artisans", "Cabinets", "PME", "Startups", "Indépendants", "Formateurs",
  "Commerces locaux", "Restaurants", "Artisans", "Cabinets", "PME", "Startups", "Indépendants", "Formateurs",
];

const benefits = [
  { icon: "📍", title: "Visibilité locale", desc: "Apparaissez sur Google quand vos clients vous cherchent. Fiche optimisée, avis gérés, informations claires." },
  { icon: "📈", title: "Plus de demandes", desc: "Des parcours de conversion clairs : appel, réservation, devis — sans friction pour le visiteur." },
  { icon: "⚡", title: "Disponibilité 24h/24", desc: "Un assistant IA répond aux questions fréquentes même la nuit, le week-end ou pendant vos heures chargées." },
  { icon: "🤖", title: "Automatisation", desc: "Confirmations, relances, notifications — automatisez les tâches répétitives pour vous concentrer sur l'essentiel." },
  { icon: "✦", title: "Image professionnelle", desc: "Un site moderne et cohérent qui inspire confiance dès les premières secondes de visite." },
  { icon: "🔒", title: "Données sécurisées", desc: "Vos prospects et clients stockés dans un CRM sécurisé, conforme RGPD, accessible uniquement à vous." },
];

const services = [
  { n: "01", title: "Google Business", desc: "Optimisation complète de votre fiche, photos, avis, messagerie IA — pour être choisi au moment où vos clients cherchent.", tag: "Visibilité locale" },
  { n: "02", title: "Site web professionnel", desc: "Une présence moderne, rapide et orientée conversion qui inspire confiance et transforme les visiteurs en prospects.", tag: "Image & confiance" },
  { n: "03", title: "Prise de rendez-vous", desc: "Un parcours simple permettant à vos clients de réserver directement, sans friction, 24h/24.", tag: "Conversion" },
  { n: "04", title: "Assistant IA 24h/24", desc: "Un chatbot intelligent qui répond aux questions, qualifie les prospects et prend des rendez-vous à votre place.", tag: "Automatisation" },
  { n: "05", title: "Formulaire intelligent", desc: "Capturez et organisez les demandes clients avec un formulaire structuré qui alimente directement votre CRM.", tag: "Organisation" },
  { n: "06", title: "Suivi des prospects", desc: "Un tableau de bord pour suivre chaque contact, chaque demande et transformer les opportunités en clients.", tag: "Pilotage" },
];

const processSteps = [
  { n: "01", title: "Diagnostic", text: "Analyse de votre présence actuelle, de vos concurrents et de vos objectifs pour identifier les vrais leviers." },
  { n: "02", title: "Mise en place", text: "Configuration de chaque outil selon votre activité : Google Business, site, chatbot, CRM, automatisations." },
  { n: "03", title: "Suivi mensuel", text: "Rapport mensuel, optimisations continues, support réactif pour améliorer vos résultats dans le temps." },
  { n: "04", title: "Amélioration continue", text: "Les données de vos clients nous guident pour affiner chaque mois votre système et vos messages." },
];

const faqs = [
  { q: "Combien de temps avant les premiers résultats ?", a: "Entre 2 et 6 semaines selon les outils. La fiche Google peut montrer des effets en quelques jours." },
  { q: "Est-ce que ça fonctionne pour mon secteur ?", a: "Oui. Nous accompagnons des commerces, artisans, cabinets, PME et startups dans de nombreux secteurs." },
  { q: "Puis-je commencer simplement et évoluer ?", a: "Absolument. On commence avec ce qui est utile maintenant, et on ajoute progressivement selon les résultats." },
  { q: "Quelle formule me correspond ?", a: "Réservez un diagnostic gratuit. En 30 minutes, on identifie exactement ce qu'il vous faut." },
];

export default function Model4Page() {
  return (
    <main className="overflow-hidden bg-black">

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
        <Starfield count={180} />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 55%, rgba(149,245,71,0.04) 0%, transparent 70%)" }} />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center animate-glow-pulse"
            style={{ borderRadius: 16, backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 0 30px rgba(149,245,71,0.2), 0 0 60px rgba(149,245,71,0.08)" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 18L8 4L13 18" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 18L14 4L19 18" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="animate-fade-in-up text-white" style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-1.44px", lineHeight: "86.4px" }}>
            Faites de votre présence en ligne un vrai moteur de clients.
          </h1>

          <p className="animate-fade-in-up mx-auto mt-6 max-w-xl text-lg leading-7 text-gray-400"
            style={{ animationDelay: "100ms" }}>
            Solutions digitales sur mesure — Google Business, site web, prise de rendez-vous, assistant IA et suivi des prospects.
          </p>

          <div className="animate-fade-in-up mt-10 flex flex-wrap justify-center gap-3" style={{ animationDelay: "200ms" }}>
            <a href="/prise-de-rdv"
              className="inline-flex items-center gap-2 text-sm font-medium text-black transition-all hover:brightness-95"
              style={{ backgroundColor: G, borderRadius: 5, padding: "12px 20px" }}>
              Réserver un appel gratuit →
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
              style={{ borderRadius: 5, border: "1px solid rgba(255,255,255,0.12)", padding: "12px 20px", backgroundColor: "rgba(255,255,255,0.04)" }}>
              Voir les services
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 border-t border-white/8 pt-10">
            {[{ n: "48+", l: "Demandes / mois" }, { n: "19", l: "RDV générés" }, { n: "2 840€", l: "Valeur prospects" }].map(s => (
              <div key={s.l}>
                <p className="text-2xl font-bold" style={{ color: G }}>{s.n}</p>
                <p className="mt-1 text-xs text-gray-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="border-y border-white/5 bg-black py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {clients.map((c, i) => <span key={i} className="mx-8 text-sm font-medium text-gray-600">{c}</span>)}
        </div>
      </section>

      {/* ── BÉNÉFICES ── */}
      <section id="benefices" className="relative overflow-hidden bg-black py-28">
        <GreenBlob style={{ left: "-10%", top: "20%" }} />
        <GreenBlade style={{ left: "12%", top: "5%", transform: "rotate(-15deg)", transformOrigin: "top center" }} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14">
            <SBadge icon="✦" label="Bénéfices" />
            <h2 className="mt-5 text-white" style={{ fontSize: 44, fontWeight: 500, lineHeight: "52.8px" }}>
              L'avantage dont vous avez besoin
            </h2>
            <p className="mt-4 max-w-xl text-lg text-gray-400">
              Découvrez comment notre approche vous fait gagner du temps, des clients et de la crédibilité.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 transition-all hover:border-white/15"
                style={{ borderRadius: 15, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#0a0a0a" }}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center text-lg"
                  style={{ borderRadius: 10, backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {b.icon}
                  <div className="absolute -bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full blur-xl" style={{ backgroundColor: "rgba(149,245,71,0.3)" }} />
                </div>
                <h5 className="mb-2 font-medium text-white" style={{ fontSize: 16 }}>{b.title}</h5>
                <p className="text-sm leading-6 text-gray-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="relative overflow-hidden bg-black py-28">
        <GreenBlob style={{ right: "-10%", top: "15%" }} />
        <GreenBlade style={{ right: "14%", top: "0%", transform: "rotate(18deg)", transformOrigin: "top center" }} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14">
            <SBadge icon="⚙" label="Services" />
            <h2 className="mt-5 text-white" style={{ fontSize: 44, fontWeight: 500, lineHeight: "52.8px" }}>
              Une solution adaptée à chaque besoin.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-gray-400">
              Commerce local, TPE/PME ou startup — chaque système est conçu pour votre réalité.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.n} className="relative overflow-hidden p-6 transition-all hover:border-white/20"
                style={{ borderRadius: 15, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#0a0a0a" }}>
                <span className="text-4xl font-black text-white/8 select-none">{s.n}</span>
                <div className="mt-3">
                  <span className="inline-block rounded-md border px-2.5 py-0.5 text-xs font-semibold"
                    style={{ borderColor: `${G}40`, backgroundColor: `${G}15`, color: G }}>
                    {s.tag}
                  </span>
                  <h5 className="mt-3 font-bold text-white" style={{ fontSize: 18 }}>{s.title}</h5>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section id="processus" className="relative overflow-hidden bg-black py-28">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle, rgba(149,245,71,0.04) 0%, transparent 60%)" }} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SBadge icon="↻" label="Processus" />
            <h2 className="mt-5 text-white" style={{ fontSize: 44, fontWeight: 500, lineHeight: "52.8px" }}>
              Comment on travaille.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div key={step.n} className="relative p-6 hover:border-white/20 transition-all"
                style={{ borderRadius: 15, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#0a0a0a" }}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black"
                  style={{ border: `1px solid ${G}40`, backgroundColor: `${G}15`, color: G }}>
                  {step.n}
                </div>
                <h5 className="font-bold text-white" style={{ fontSize: 16 }}>{step.title}</h5>
                <p className="mt-2 text-sm leading-6 text-gray-400">{step.text}</p>
                {i < processSteps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-lg lg:block" style={{ color: `${G}40` }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" className="relative overflow-hidden bg-black py-28">
        <GreenBlob style={{ right: "-5%", bottom: "10%" }} />
        <GreenBlade style={{ right: "15%", top: "5%", transform: "rotate(20deg)", transformOrigin: "top center" }} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14">
            <SBadge icon="◈" label="Tarifs" />
            <h2 className="mt-5 text-white" style={{ fontSize: 44, fontWeight: 500, lineHeight: "52.8px" }}>
              Des formules qui s'adaptent à vous
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { name: "Commerce Intelligent", price: "129", setup: "590€ mise en place", features: ["Fiche Google Business", "Messagerie IA 24h/24", "Gestion des avis", "Rapport mensuel"], popular: false },
              { name: "Croissance", price: "179", setup: "1 490€ mise en place", features: ["Site web professionnel", "Chatbot de qualification", "Prise de RDV intégrée", "Tableau de suivi", "Automatisations"], popular: true },
              { name: "Growth", price: "399", setup: "2 990€ mise en place", features: ["Landing page + A/B testing", "CRM + séquences email", "Dashboard traction", "Accompagnement stratégique"], popular: false },
            ].map((plan) => (
              <div key={plan.name} className="relative flex flex-col p-6"
                style={{ borderRadius: 15, border: plan.popular ? `1px solid ${G}40` : "1px solid rgba(255,255,255,0.08)", backgroundColor: plan.popular ? "#0d1108" : "#0a0a0a" }}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-medium text-black"
                    style={{ backgroundColor: G }}>Populaire</span>
                )}
                <p className="text-sm text-gray-400">{plan.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-medium text-white">{plan.price}€</span>
                  <span className="mb-1 text-sm text-gray-500">/mois</span>
                </div>
                <p className="mt-1 text-xs text-gray-600">+ {plan.setup}</p>

                <ul className="my-6 flex-1 grid gap-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-black"
                        style={{ backgroundColor: G }}>✓</span>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="#tarifs" className="mt-auto block w-full rounded-[5px] py-3 text-center text-sm font-medium transition-all"
                  style={plan.popular
                    ? { backgroundColor: G, color: "#000" }
                    : { backgroundColor: "rgba(255,255,255,0.04)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Choisir cette formule
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-black py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SBadge icon="?" label="FAQ" />
            <h2 className="mt-5 text-white" style={{ fontSize: 44, fontWeight: 500, lineHeight: "52.8px" }}>
              Questions fréquentes.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 transition-all hover:border-white/20"
                style={{ borderRadius: 15, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#0a0a0a" }}>
                <h5 className="font-medium text-white" style={{ fontSize: 16 }}>{faq.q}</h5>
                <p className="mt-3 text-sm leading-6 text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative overflow-hidden bg-black pb-28">
        <Starfield count={60} />
        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center lg:px-8">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center text-2xl"
            style={{ borderRadius: 18, border: `1px solid ${G}40`, backgroundColor: `${G}15` }}>⚡</div>
          <h2 className="text-white" style={{ fontSize: 44, fontWeight: 500, lineHeight: "52.8px" }}>
            Prêt à booster votre présence digitale ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-400">
            Réservez un appel gratuit. Nous analysons votre situation et vous proposons la solution la plus adaptée.
          </p>
          <a href="/prise-de-rdv"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-black transition-all hover:brightness-95"
            style={{ backgroundColor: G, borderRadius: 5, padding: "14px 24px" }}>
            Commencer maintenant →
          </a>
        </div>
      </section>
    </main>
  );
}
