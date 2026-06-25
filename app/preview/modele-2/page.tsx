// AnimateIn désactivé pour le preview — tout le contenu reste visible
const AnimateIn = ({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <div className={className}>{children}</div>
);

/* ── Valeurs CSS extraites du template Neofolio ──────────────────────────────
  Body bg    : #FFFCFE   Text : #0C0D0D   Muted : rgba(12,13,13,0.6)
  Font       : Bricolage Grotesque
  H1         : 68px · w700 · ls -2.72px · lh 68px
  H3 heading : 40px · w500 · ls -1.6px  · lh 48px
  H2 stat    : 60px · w700 · ls -2.4px  · lh 66px
  H4         : 28px · w500 · ls -1.12px · lh 39.2px
  Pastels    : lavande #DAE6FF · vert #E6FEC9 · jaune #FFF3C6 · rose #FEE5F7
  Btn CTA    : white, border #0C0D0D, rounded 6px, pad 10px 32px
  Accent vert: #60AB03
─────────────────────────────────────────────────────────────────────────── */

const T = {
  h1: { fontSize: "68px", fontWeight: 700, letterSpacing: "-2.72px", lineHeight: "68px", color: "#0C0D0D" } as React.CSSProperties,
  h2stat: { fontSize: "60px", fontWeight: 700, letterSpacing: "-2.4px", lineHeight: "66px", color: "#0C0D0D" } as React.CSSProperties,
  h3: { fontSize: "40px", fontWeight: 500, letterSpacing: "-1.6px", lineHeight: "48px", color: "#0C0D0D" } as React.CSSProperties,
  h4: { fontSize: "28px", fontWeight: 500, letterSpacing: "-1.12px", lineHeight: "39.2px", color: "#0C0D0D" } as React.CSSProperties,
  body: { fontSize: "16px", color: "rgba(12,13,13,0.65)", lineHeight: "24px" } as React.CSSProperties,
  label: { fontSize: "13px", color: "rgba(12,13,13,0.5)" } as React.CSSProperties,
};

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-1.5" style={T.label}>
      <span style={{ color: "#60AB03" }}>●</span>
      {text}
    </div>
  );
}

function BtnOutline({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <a href={href} className="inline-flex items-center justify-center transition-all"
      style={{ borderRadius: "6px", border: `1.5px solid ${dark ? "transparent" : "#0C0D0D"}`, backgroundColor: dark ? "#0C0D0D" : "white", color: dark ? "#FFFCFE" : "#0C0D0D", fontSize: "14px", fontWeight: 500, padding: "10px 28px" }}>
      {children}
    </a>
  );
}

const processSteps = [
  { n: "01", label: "Diagnostic", color: "#DAE6FF", desc: "Analyse de votre présence actuelle, de vos concurrents et de vos objectifs pour identifier les vrais leviers d'amélioration." },
  { n: "02", label: "Planification", color: "#E6ECFF", desc: "Construction d'un parcours sur mesure adapté à votre objectif : être trouvé, générer des prospects ou prouver votre traction." },
  { n: "03", label: "Déploiement", color: "#FEE5F7", desc: "Mise en place de chaque outil : Google Business, site, chatbot, CRM, automatisations — sans modèle générique." },
  { n: "04", label: "Révision", color: "#FFF3C6", desc: "On colabore pour affiner chaque détail et s'assurer que chaque point de contact client fonctionne parfaitement." },
  { n: "05", label: "Suivi mensuel", color: "#E6FEC9", desc: "Rapport mensuel, optimisations continues et support réactif pour améliorer vos résultats dans le temps." },
];

const services = [
  { title: "Google Business", desc: "Optimisation complète : photos, horaires, avis, messagerie IA — pour être choisi au moment où vos clients cherchent." },
  { title: "Site web professionnel", desc: "Une présence moderne orientée conversion qui inspire confiance et transforme les visiteurs en prospects." },
  { title: "Prise de rendez-vous", desc: "Un système simple permettant à vos clients de réserver directement, sans friction, 24h/24." },
  { title: "Assistant IA 24h/24", desc: "Un chatbot intelligent qui répond aux questions, qualifie les prospects et prend des rendez-vous à votre place." },
  { title: "Suivi des prospects", desc: "Un tableau de bord pour suivre chaque contact et ne plus jamais perdre une opportunité commerciale." },
];

const clients = [
  "Commerces locaux","Restaurants","Artisans","Cabinets","PME","Startups","Indépendants","Formateurs",
  "Commerces locaux","Restaurants","Artisans","Cabinets","PME","Startups","Indépendants","Formateurs",
];

export default function Model2Page() {
  return (
    <main style={{ backgroundColor: "#FFFCFE" }}>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{ backgroundColor: "#E6FEC9", border: "1px solid rgba(12,13,13,0.08)" }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#60AB03" }} />
              <span style={{ fontSize: "13px", color: "#0C0D0D", fontWeight: 500 }}>Agence digitale & IA</span>
            </div>

            <h1 className="animate-fade-in-up" style={T.h1}>
              Présence digitale{" "}
              <em style={{ fontStyle: "italic" }}>sur mesure</em>
              <br />pour chaque activité.
            </h1>

            <p className="mt-6 max-w-sm" style={{ ...T.body, fontSize: "17px", lineHeight: "27px" }}>
              Google Business, site web, prise de rendez-vous, assistant IA et suivi des demandes — adaptés à votre réalité, pas à un modèle générique.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <BtnOutline href="/prise-de-rdv">Réserver un appel →</BtnOutline>
              <a href="#services" style={{ fontSize: "14px", color: "rgba(12,13,13,0.6)", textDecoration: "underline", textUnderlineOffset: "3px", display: "inline-flex", alignItems: "center" }}>
                Voir les services
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 pt-8" style={{ borderTop: "1px solid rgba(12,13,13,0.08)" }}>
              <div className="flex -space-x-2">
                {["#FEE5F7","#E6FEC9","#DAE6FF","#FFF3C6"].map((c,i) => (
                  <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: c, border: "2px solid #FFFCFE", fontSize: "11px", fontWeight: 700, color: "#0C0D0D" }}>
                    {["C","R","P","A"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">{[1,2,3,4,5].map(s=><span key={s} style={{ color:"#60AB03",fontSize:"13px" }}>★</span>)}</div>
                <p style={{ fontSize:"12px", color:"rgba(12,13,13,0.5)" }}>4,9/5 · 100+ entreprises accompagnées</p>
              </div>
            </div>
          </div>

          {/* Dashboard */}
          <AnimateIn delay={120}>
            <div className="relative">
              <div className="p-6" style={{ backgroundColor: "#0C0D0D", borderRadius: "24px" }}>
                <div className="flex items-center justify-between pb-4" style={{ borderBottom: "1px solid rgba(255,252,254,0.08)" }}>
                  <div>
                    <p style={{ fontSize: "10px", color: "rgba(255,252,254,0.4)", letterSpacing: "0.12em" }}>TABLEAU DE BORD</p>
                    <p style={{ fontSize: "17px", fontWeight: 600, color: "#FFFCFE", letterSpacing: "-0.4px" }}>Performance digitale</p>
                  </div>
                  <span className="px-3 py-1" style={{ borderRadius: "999px", backgroundColor: "#E6FEC9", fontSize: "11px", fontWeight: 600, color: "#60AB03" }}>● En progression</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { l: "Demandes reçues", v: "48", c: "+32% ce mois", pos: true },
                    { l: "RDV générés", v: "19", c: "+11 nouveaux", pos: true },
                    { l: "Prospects chauds", v: "12", c: "À relancer", pos: false },
                    { l: "Valeur estimée", v: "2 840€", c: "opportunités", pos: true },
                  ].map(s => (
                    <div key={s.l} className="p-4" style={{ borderRadius: "14px", backgroundColor: "rgba(255,252,254,0.06)" }}>
                      <p style={{ fontSize: "11px", color: "rgba(255,252,254,0.45)" }}>{s.l}</p>
                      <p style={{ fontSize: "28px", fontWeight: 700, color: "#FFFCFE", letterSpacing: "-1px", marginTop: "8px" }}>{s.v}</p>
                      <p style={{ fontSize: "11px", color: s.pos ? "#60AB03" : "rgba(255,252,254,0.4)", marginTop: "4px" }}>{s.c}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4" style={{ borderRadius: "14px", backgroundColor: "#FFFCFE" }}>
                  <div className="mb-3 flex items-center justify-between">
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#0C0D0D" }}>Actions recommandées</p>
                    <p style={{ fontSize: "11px", color: "rgba(12,13,13,0.4)" }}>Aujourd'hui</p>
                  </div>
                  {[["Relancer 4 prospects chauds","Priorité"],["Demander 7 avis clients","Impact local"],["Optimiser l'offre consultée","Conversion"]].map(([t,tag]) => (
                    <div key={t} className="mt-2 flex items-center justify-between px-3 py-2"
                      style={{ borderRadius: "8px", backgroundColor: "rgba(12,13,13,0.05)", fontSize: "12px" }}>
                      <span style={{ color: "#0C0D0D" }}>{t}</span>
                      <span className="px-2 py-0.5" style={{ borderRadius: "999px", backgroundColor: "#E6FEC9", color: "#60AB03", fontSize: "10px", fontWeight: 600 }}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5"
                style={{ borderRadius: "999px", backgroundColor: "rgba(255,252,254,0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(12,13,13,0.08)", boxShadow: "0 2px 12px rgba(12,13,13,0.1)", fontSize: "11px", fontWeight: 500, color: "#0C0D0D" }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#60AB03" }} />
                Disponible pour de nouveaux projets
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── LOGOS MARQUEE ── */}
      <section style={{ borderTop: "1px solid rgba(12,13,13,0.06)", borderBottom: "1px solid rgba(12,13,13,0.06)", padding: "18px 0", overflow: "hidden" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {clients.map((c,i) => <span key={i} className="mx-8" style={{ fontSize: "14px", fontWeight: 500, color: "rgba(12,13,13,0.35)", letterSpacing: "0.02em" }}>{c}</span>)}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <AnimateIn>
            <div className="relative flex items-center justify-center overflow-hidden"
              style={{ borderRadius: "20px", height: "400px", backgroundColor: "#F1E9FE" }}>
              <div className="text-center">
                <p style={{ fontSize: "72px", marginBottom: "12px" }}>⚡</p>
                <p style={{ fontSize: "17px", fontWeight: 600, color: "#0C0D0D", letterSpacing: "-0.4px" }}>Votre succès digital</p>
                <p style={{ fontSize: "14px", color: "rgba(12,13,13,0.5)", marginTop: "4px" }}>commence ici</p>
              </div>
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full opacity-60" style={{ backgroundColor: "#DAE6FF" }} />
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full opacity-60" style={{ backgroundColor: "#E6FEC9" }} />
            </div>
          </AnimateIn>
          <AnimateIn delay={100}>
            <SectionLabel text="À propos" />
            <h3 style={T.h3}>La stratégie derrière chaque solution</h3>
            <p className="mt-5" style={{ ...T.body, fontSize: "17px" }}>
              Nous aidons les entreprises à grandir grâce à une approche réfléchie qui combine clarté, efficacité et résultats concrets.
            </p>
            <ul className="mt-6 grid gap-3">
              {["Approche centrée sur le comportement client","Google Business pensé comme un levier","Design sobre, moderne et professionnel"].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#E6FEC9" }}>
                    <span style={{ fontSize: "9px", color: "#60AB03" }}>✓</span>
                  </span>
                  <span style={{ ...T.body, fontSize: "15px" }}>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8"><BtnOutline href="#services">Découvrir nos services →</BtnOutline></div>
          </AnimateIn>
        </div>
      </section>

      {/* ── STATS PILLS ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { n: "48+", label: "Demandes / mois", bg: "#DAE6FF" },
            { n: "19", label: "RDV générés", bg: "#E6FEC9" },
            { n: "2 840€", label: "Valeur prospects", bg: "#FFF3C6" },
          ].map((stat,i) => (
            <AnimateIn key={stat.n} delay={i*80}>
              <div className="flex flex-col items-center justify-center py-10 px-8 text-center"
                style={{ borderRadius: "999px", backgroundColor: stat.bg, minHeight: "180px" }}>
                <p style={T.h2stat}>{stat.n}</p>
                <p className="mt-2" style={{ ...T.body, fontSize: "14px" }}>{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── BIG TEXT ── */}
      <section className="border-y px-6 py-20 lg:px-8" style={{ borderColor: "rgba(12,13,13,0.06)" }}>
        <div className="mx-auto max-w-5xl space-y-3">
          {[
            { t: "Agence digitale", s: "pour chaque activité", fade: false },
            { t: "Avec une approche", s: "sur mesure", fade: false },
            { t: "et le goût du résultat concret.", s: "", fade: true },
          ].map((line,i) => (
            <AnimateIn key={i} delay={i*80}>
              <p style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-1.5px", color: line.fade ? "rgba(12,13,13,0.25)" : "#0C0D0D", lineHeight: "1.15" }}>
                {line.t}{" "}{line.s && <em style={{ fontStyle: "italic", color: "rgba(12,13,13,0.4)" }}>{line.s}</em>}
              </p>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── SERVICES ACCORDION ── */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <AnimateIn className="mb-12 text-center">
          <SectionLabel text="Services" />
          <h3 style={T.h3}>Ce que nous proposons</h3>
        </AnimateIn>
        <div className="grid gap-4">
          {services.map((s,i) => (
            <AnimateIn key={s.title} delay={i*60}>
              <div className="flex items-start justify-between gap-6 p-7"
                style={{ borderRadius: "16px", border: "1.5px solid rgba(12,13,13,0.1)", backgroundColor: "#FFFCFE" }}>
                <div className="flex-1">
                  <h4 style={T.h4}>{s.title}</h4>
                  <p className="mt-3" style={T.body}>{s.desc}</p>
                </div>
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ border: "1.5px solid rgba(12,13,13,0.15)", color: "#0C0D0D", fontSize: "20px" }}>
                  +
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── PROCESSUS — cartes colorées empilées ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <AnimateIn className="mb-16 text-center">
          <SectionLabel text="Workflow" />
          <h3 style={T.h3}>Notre méthode étape par étape</h3>
        </AnimateIn>
        <div className="relative" style={{ paddingBottom: "40px" }}>
          {processSteps.map((step, i) => (
            <AnimateIn key={step.n} delay={i * 80}>
              <div
                className="flex min-h-[200px] gap-4 p-7"
                style={{
                  borderRadius: "18px",
                  backgroundColor: step.color,
                  border: "1px solid rgba(12,13,13,0.08)",
                  marginLeft: `${i * 44}px`,
                  marginBottom: i < processSteps.length - 1 ? "-64px" : "0",
                  position: "relative",
                  zIndex: i + 1,
                }}
              >
                <div className="shrink-0 pt-0.5">
                  <div className="flex h-9 w-11 items-center justify-center"
                    style={{ borderRadius: "8px", border: "1px solid rgba(12,13,13,0.12)", backgroundColor: "rgba(255,252,254,0.7)", fontSize: "14px", fontWeight: 700, color: "#0C0D0D" }}>
                    {step.n}
                  </div>
                </div>
                <div className="hidden w-6 items-center justify-center lg:flex">
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(12,13,13,0.45)", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.05em" }}>
                    {step.label}
                  </span>
                </div>
                <div className="flex flex-1 items-center pl-4">
                  <p style={{ fontSize: "19px", fontWeight: 500, color: "#0C0D0D", letterSpacing: "-0.4px", lineHeight: "1.45", maxWidth: "600px" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <AnimateIn className="mb-12 text-center">
          <SectionLabel text="Tarifs" />
          <h3 style={T.h3}>Des formules claires pour chaque activité</h3>
          <p className="mt-4" style={{ ...T.body, fontSize: "17px" }}>Mise en place + suivi mensuel. Commerce, TPE/PME ou startup.</p>
        </AnimateIn>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { name: "Commerce Intelligent", price: "129€/mois", setup: "+ 590€ HT mise en place", features: ["Fiche Google Business","Messagerie IA","Suivi des avis","Rapport mensuel"], bg: "#DAE6FF", dark: false },
            { name: "Croissance", price: "179€/mois", setup: "+ 1 490€ HT mise en place", features: ["Site web professionnel","Chatbot de qualification","Prise de RDV","Tableau de suivi","Automatisations"], bg: "#0C0D0D", dark: true },
            { name: "Growth", price: "399€/mois", setup: "+ 2 990€ HT mise en place", features: ["Landing page","A/B testing","CRM avancé","Dashboard traction"], bg: "#E6FEC9", dark: false },
          ].map((plan,i) => (
            <AnimateIn key={plan.name} delay={i*80}>
              <div className="flex flex-col p-7" style={{ borderRadius: "20px", backgroundColor: plan.bg, minHeight: "420px", border: plan.dark ? "none" : "1px solid rgba(12,13,13,0.08)" }}>
                {plan.dark && <span className="mb-4 self-start px-3 py-1 text-xs font-semibold" style={{ borderRadius: "999px", backgroundColor: "#E6FEC9", color: "#60AB03" }}>Populaire</span>}
                <p style={{ fontSize: "16px", fontWeight: 600, color: plan.dark ? "rgba(255,252,254,0.55)" : "rgba(12,13,13,0.6)" }}>{plan.name}</p>
                <p className="mt-3" style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-1.2px", color: plan.dark ? "#FFFCFE" : "#0C0D0D" }}>{plan.price}</p>
                <p className="mt-1" style={{ fontSize: "12px", color: plan.dark ? "rgba(255,252,254,0.4)" : "rgba(12,13,13,0.4)" }}>{plan.setup}</p>
                <ul className="mt-6 flex-1 grid gap-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: plan.dark ? "rgba(255,252,254,0.1)" : "rgba(12,13,13,0.08)" }}>
                        <span style={{ fontSize: "9px", color: plan.dark ? "#FFFCFE" : "#0C0D0D" }}>✓</span>
                      </span>
                      <span style={{ fontSize: "14px", color: plan.dark ? "rgba(255,252,254,0.75)" : "rgba(12,13,13,0.75)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#tarifs" className="mt-6 block w-full py-3 text-center font-medium transition-all"
                  style={{ borderRadius: "8px", border: `1.5px solid ${plan.dark ? "rgba(255,252,254,0.15)" : "rgba(12,13,13,0.18)"}`, color: plan.dark ? "#FFFCFE" : "#0C0D0D", fontSize: "14px" }}>
                  Choisir cette formule
                </a>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="mx-auto max-w-3xl px-6 pb-24 lg:px-8">
        <AnimateIn className="mb-12 text-center">
          <SectionLabel text="FAQ" />
          <h3 style={T.h3}>Questions fréquentes</h3>
        </AnimateIn>
        <div className="grid gap-4">
          {[
            { q: "Combien de temps avant les premiers résultats ?", a: "Entre 2 et 6 semaines selon les outils. La fiche Google peut générer des effets en quelques jours." },
            { q: "Quelle formule me convient le mieux ?", a: "Réservez un diagnostic gratuit — 30 minutes pour identifier ce qu'il vous faut vraiment." },
            { q: "Puis-je commencer simplement et évoluer ?", a: "Absolument. On commence avec ce qui est utile maintenant, on ajoute ensuite selon les résultats." },
            { q: "Est-ce adapté à mon secteur d'activité ?", a: "Nous accompagnons des commerces, artisans, cabinets, PME et startups dans de nombreux secteurs." },
          ].map((faq,i) => (
            <AnimateIn key={faq.q} delay={i*60}>
              <div className="flex items-start justify-between gap-6 p-6"
                style={{ borderRadius: "14px", border: "1.5px solid rgba(12,13,13,0.1)", backgroundColor: "#FFFCFE" }}>
                <div>
                  <h4 style={{ fontSize: "17px", fontWeight: 500, color: "#0C0D0D", letterSpacing: "-0.3px" }}>{faq.q}</h4>
                  <p className="mt-2" style={T.body}>{faq.a}</p>
                </div>
                <span style={{ fontSize: "16px", color: "rgba(12,13,13,0.3)", flexShrink: 0, marginTop: "2px" }}>+</span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <AnimateIn>
          <div className="flex flex-col items-center justify-between gap-8 rounded-[24px] p-10 text-center lg:flex-row lg:text-left"
            style={{ backgroundColor: "#0C0D0D" }}>
            <div>
              <h3 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-1.2px", color: "#FFFCFE" }}>
                Prêt à transformer votre présence digitale ?
              </h3>
              <p className="mt-3" style={{ ...T.body, color: "rgba(255,252,254,0.5)", fontSize: "17px" }}>
                Réservez un appel gratuit — nous analysons et proposons la solution adaptée.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <BtnOutline href="/prise-de-rdv" dark>Réserver un appel →</BtnOutline>
              <BtnOutline href="#services">Voir les services</BtnOutline>
            </div>
          </div>
        </AnimateIn>
      </section>

    </main>
  );
}
