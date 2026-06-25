// AnimateIn retiré pour modèle 3 — styles inline gèrent l'apparence
const AnimateIn = ({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <div className={className}>{children}</div>
);

/* ── Valeurs CSS extraites du template Saazai ────────────────────────────────
  Body bg    : #FFFFFF
  Primary    : #41175E  (rgb 65 23 94)  — violet foncé
  Accent     : #814BEE  (rgb 129 75 238) — violet vif
  Gradient   : #814BEE → #E879A6 → #F07167  (violet→rose→saumon)
  Font       : Inter Display  w500 pour tous les titres
  H1         : 72px · 500 · ls -2.1px
  H2         : 48px · 500 · ls -2.5px
  H3         : 40px · 500 · ls -2px
  H5         : 24px · 500 · ls -0.5px
  Card bg    : #F4F1F5  (violet très léger)
  Btn primary: bg #41175E, rounded-[16px], pad 10px 16px 10px 20px
  Btn outline: border #41175E, rounded-[14px], pad 14px 24px
  Section bg : fond grille lignes verticales rgba(65,23,94,0.05)
─────────────────────────────────────────────────────────────────────────── */

const P = "#41175E";
const A = "#814BEE";
const CARD = "#F4F1F5";
const GRID_BG = { backgroundImage: "repeating-linear-gradient(90deg, rgba(65,23,94,0.05) 0 1px, transparent 1px 80px)" };

const GradText = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <span style={{
    background: "linear-gradient(90deg, #814BEE 0%, #E879A6 55%, #F07167 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text", display: "inline",
    ...style,
  }}>
    {children}
  </span>
);

const SLabel = ({ text }: { text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
    <GradText><span style={{ fontSize: 14 }}>✦</span></GradText>
    <span style={{ fontSize: 14, fontWeight: 500, color: A }}>{text}</span>
  </div>
);

const BtnPrimary = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} style={{
    display: "inline-flex", alignItems: "center", gap: 10,
    backgroundColor: P, color: "#fff", fontSize: 15, fontWeight: 500,
    padding: "12px 14px 12px 20px", borderRadius: 16, textDecoration: "none",
  }}>
    {children}
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 16 }}>→</span>
  </a>
);

const BtnOutline = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} style={{
    display: "inline-flex", alignItems: "center",
    border: `1.5px solid rgba(65,23,94,0.2)`, color: P,
    fontSize: 15, fontWeight: 500, padding: "12px 28px", borderRadius: 14, textDecoration: "none",
    backgroundColor: "#fff",
  }}>
    {children}
  </a>
);

const FeatureCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <div style={{ backgroundColor: CARD, borderRadius: 16, padding: 24 }}>
    <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40, fontSize: 20 }}>
      {icon}
    </div>
    <h5 style={{ fontSize: 20, fontWeight: 500, color: P, letterSpacing: "-0.5px", marginBottom: 10 }}>{title}</h5>
    <p style={{ fontSize: 14, color: `rgba(65,23,94,0.6)`, lineHeight: 1.6, margin: 0 }}>{desc}</p>
  </div>
);

const clients = [
  "Commerces locaux", "Restaurants", "Artisans", "Cabinets", "PME", "Startups", "Indépendants", "Formateurs",
  "Commerces locaux", "Restaurants", "Artisans", "Cabinets", "PME", "Startups", "Indépendants", "Formateurs",
];

export default function Model3Page() {

  const foundations = [
    { icon: "💬", title: "Google Business", desc: "Votre fiche optimisée avec photos, horaires, avis et messagerie IA — apparaissez au bon moment." },
    { icon: "🧠", title: "Mémoire & suivi", desc: "Chaque prospect est tracé, chaque interaction enregistrée — ne perdez plus jamais un contact chaud." },
    { icon: "🤝", title: "Assistant IA collaboratif", desc: "Répond à vos clients, qualifie les prospects et prend les rendez-vous à votre place, 24h/24." },
  ];

  const features2 = [
    {
      title: "Réponse intelligente",
      desc: "Notre IA comprend le contexte de chaque conversation et adapte sa réponse à chaque client.",
      mockup: (
        <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16, border: "1px solid rgba(65,23,94,0.08)" }}>
          <div style={{ fontSize: 12, color: A, fontWeight: 600, marginBottom: 10 }}>✦ Assistant OptimalLogic</div>
          <div style={{ fontSize: 12, color: `rgba(65,23,94,0.5)`, marginBottom: 8 }}>● Quels sont vos horaires ?</div>
          <div style={{ backgroundColor: P, color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 12, marginBottom: 8 }}>
            Nous sommes ouverts du lundi au samedi de 9h à 19h. Souhaitez-vous réserver un créneau ?
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <input style={{ flex: 1, border: "1px solid rgba(65,23,94,0.15)", borderRadius: 8, padding: "6px 10px", fontSize: 12, outline: "none" }} placeholder="Écrire..." />
            <button style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 12, cursor: "pointer" }}>→</button>
          </div>
        </div>
      ),
    },
    {
      title: "Tableau de bord IA",
      desc: "Visualisez en temps réel toutes vos demandes, RDV et prospects dans un espace simple.",
      mockup: (
        <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16, border: "1px solid rgba(65,23,94,0.08)" }}>
          {[
            { l: "Demandes reçues", v: "48", c: "+32%", color: "#60AB03" },
            { l: "RDV générés", v: "19", c: "+11", color: "#60AB03" },
            { l: "Prospects chauds", v: "12", c: "à relancer", color: A },
          ].map(s => (
            <div key={s.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(65,23,94,0.06)", fontSize: 12 }}>
              <span style={{ color: `rgba(65,23,94,0.6)` }}>{s.l}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontWeight: 600, color: P }}>{s.v}</span>
                <span style={{ color: s.color }}>{s.c}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Gestion automatique",
      desc: "Définissez vos règles une fois, laissez l'IA gérer les tâches répétitives à votre place.",
      mockup: (
        <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16, border: "1px solid rgba(65,23,94,0.08)" }}>
          {[
            { label: "Relance prospects", active: true },
            { label: "Confirmation RDV", active: true },
            { label: "Réponse avis Google", active: false },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(65,23,94,0.06)", fontSize: 12 }}>
              <span style={{ color: P }}>{item.label}</span>
              <div style={{ width: 36, height: 20, borderRadius: 10, backgroundColor: item.active ? P : "#ddd", position: "relative" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#fff", position: "absolute", top: 2, left: item.active ? 18 : 2, transition: "left 0.2s" }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const capabilities = [
    { icon: "🔍", title: "Audit de visibilité", desc: "Analyse complète de votre présence actuelle sur Google, votre site et vos concurrents." },
    { icon: "⚡", title: "Traitement rapide", desc: "Votre système est opérationnel en quelques jours, pas en plusieurs mois." },
    { icon: "📋", title: "Documentation claire", desc: "Chaque outil livré avec un guide simple pour votre équipe ou vous-même." },
    { icon: "🎨", title: "Interface adaptative", desc: "Le design de votre site s'adapte à tous les écrans et appareils automatiquement." },
    { icon: "🔒", title: "Données sécurisées", desc: "Vos prospects et clients stockés de manière sécurisée, conforme RGPD." },
    { icon: "🔗", title: "Intégrations fluides", desc: "Connectez vos outils existants : agenda, CRM, messagerie — tout s'intègre." },
  ];

  const plans = [
    {
      icon: "📍",
      name: "Commerce Intelligent",
      desc: "Pour être mieux trouvé et répondre plus vite.",
      price: "129",
      setup: "590€ mise en place",
      features: ["Fiche Google Business", "Messagerie IA 24h/24", "Gestion des avis", "Rapport mensuel", "Support réactif"],
    },
    {
      icon: "🚀",
      name: "Croissance",
      desc: "Pour générer et suivre vos prospects sérieusement.",
      price: "179",
      setup: "1 490€ mise en place",
      features: ["Site web professionnel", "Chatbot de qualification", "Prise de RDV intégrée", "Tableau de suivi", "Automatisations", "Rapport détaillé"],
    },
  ];

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid rgba(65,23,94,0.15)", borderRadius: 999, padding: "6px 14px", marginBottom: 28 }}>
              <GradText><span style={{ fontSize: 12 }}>✦</span></GradText>
              <span style={{ fontSize: 13, fontWeight: 500, color: A }}>Présence digitale nouvelle génération</span>
            </div>

            <h1 style={{ fontSize: 72, fontWeight: 500, letterSpacing: "-2.1px", lineHeight: 1, color: P, margin: "0 0 8px" }}>
              Soyez 10X plus visible
            </h1>
            <h1 style={{ fontSize: 72, fontWeight: 500, letterSpacing: "-2.1px", lineHeight: 1, margin: "0 0 24px" }}>
              <GradText>sans effort supplémentaire</GradText>
            </h1>

            <p style={{ fontSize: 17, color: `rgba(65,23,94,0.6)`, lineHeight: 1.6, marginBottom: 32, maxWidth: 420 }}>
              Quand les outils classiques ne suffisent plus, c'est là qu'OptimalLogic fait la différence.
            </p>

            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              <BtnPrimary href="/prise-de-rdv">Essai gratuit 14 jours</BtnPrimary>
              <BtnOutline href="#features">Voir une démo</BtnOutline>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Améliorez votre visibilité Google", "Organisez vos prospects en un coup d'œil", "Gérez tout facilement depuis un tableau de bord"].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: `rgba(65,23,94,0.75)` }}>
                  <span style={{ color: A, fontSize: 12 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — mockup visuel */}
          <AnimateIn delay={100}>
            <div style={{ position: "relative" }}>
              {/* Dashboard principal */}
              <div style={{ backgroundColor: P, borderRadius: 20, padding: 24, boxShadow: "0 24px 80px rgba(65,23,94,0.25)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", marginBottom: 4 }}>TABLEAU DE BORD</p>
                    <p style={{ fontSize: 17, fontWeight: 600, color: "#fff" }}>Performance digitale</p>
                  </div>
                  <span style={{ backgroundColor: "#E6FEC9", color: "#60AB03", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 999 }}>● En progression</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { l: "Demandes reçues", v: "48", c: "+32% ce mois" },
                    { l: "RDV générés", v: "19", c: "+11 nouveaux" },
                    { l: "Prospects chauds", v: "12", c: "À relancer" },
                    { l: "Valeur estimée", v: "2 840€", c: "opportunités" },
                  ].map(s => (
                    <div key={s.l} style={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 14 }}>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{s.l}</p>
                      <p style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.8px" }}>{s.v}</p>
                      <p style={{ fontSize: 10, color: "#A8FF3E", marginTop: 4 }}>{s.c}</p>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 14, marginTop: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: P }}>Actions recommandées</span>
                    <span style={{ fontSize: 11, color: `rgba(65,23,94,0.4)` }}>Aujourd'hui</span>
                  </div>
                  {[["Relancer 4 prospects", "Priorité"], ["7 avis à demander", "Impact"], ["Optimiser offre IA", "Conversion"]].map(([t, tag]) => (
                    <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", borderRadius: 8, backgroundColor: CARD, marginBottom: 6, fontSize: 12 }}>
                      <span style={{ color: P }}>{t}</span>
                      <span style={{ backgroundColor: "#E6FEC9", color: "#60AB03", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999 }}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div style={{ position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff", border: "1px solid rgba(65,23,94,0.1)", borderRadius: 999, padding: "8px 16px", boxShadow: "0 4px 20px rgba(65,23,94,0.12)", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#60AB03", display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: P }}>Disponible pour de nouveaux projets</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section style={{ borderTop: "1px solid rgba(65,23,94,0.07)", borderBottom: "1px solid rgba(65,23,94,0.07)", padding: "20px 0", overflow: "hidden" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 500, color: `rgba(65,23,94,0.4)`, letterSpacing: "0.08em", marginBottom: 16 }}>
          Approuvé par des centaines d'entreprises
        </p>
        <div className="flex animate-marquee whitespace-nowrap">
          {clients.map((c, i) => (
            <span key={i} style={{ margin: "0 32px", fontSize: 14, fontWeight: 500, color: `rgba(65,23,94,0.35)` }}>{c}</span>
          ))}
        </div>
      </section>

      {/* ── FONDATIONS (3 cartes) ── */}
      <section style={{ ...GRID_BG, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 60, alignItems: "start", marginBottom: 48 }}>
            <AnimateIn>
              <h3 style={{ fontSize: 40, fontWeight: 500, letterSpacing: "-2px", color: P, lineHeight: 1.15, margin: "0 0 16px" }}>
                Bâti sur des fondations solides
              </h3>
              <p style={{ fontSize: 15, color: `rgba(65,23,94,0.6)`, lineHeight: 1.6, marginBottom: 20 }}>
                La combinaison idéale d'automatisation et d'intelligence pour votre activité.
              </p>
              <a href="#features" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                <GradText>Découvrir nos services</GradText>
                <GradText> ›</GradText>
              </a>
            </AnimateIn>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {foundations.map((f, i) => (
                <AnimateIn key={f.title} delay={i * 80}>
                  <FeatureCard {...f} />
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES MOCKUPS ── */}
      <section id="features" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <AnimateIn className="mb-14">
          <SLabel text="Fonctionnalités" />
          <h2 style={{ fontSize: 48, fontWeight: 500, letterSpacing: "-2.5px", color: P, lineHeight: 1.15, margin: 0, maxWidth: 600 }}>
            Fonctionnalités puissantes, expérience fluide.
          </h2>
        </AnimateIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features2.map((f, i) => (
            <AnimateIn key={f.title} delay={i * 80}>
              <div style={{ backgroundColor: CARD, borderRadius: 20, padding: 24 }}>
                {f.mockup}
                <h5 style={{ fontSize: 20, fontWeight: 500, color: P, letterSpacing: "-0.5px", margin: "20px 0 8px" }}>{f.title}</h5>
                <p style={{ fontSize: 14, color: `rgba(65,23,94,0.6)`, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── TÉMOIGNAGE ── */}
      <section style={{ ...GRID_BG, padding: "100px 24px", borderTop: "1px solid rgba(65,23,94,0.07)", borderBottom: "1px solid rgba(65,23,94,0.07)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <AnimateIn>
            <p style={{ fontSize: 40, fontWeight: 500, color: P, letterSpacing: "-1.5px", lineHeight: 1.25, marginBottom: 32 }}>
              "Je ne m'attendais pas à ce qu'un outil digital soit aussi adapté à mon activité. Il répond à mes clients la nuit, prend les rendez-vous et me génère un rapport chaque lundi."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: CARD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: P, margin: 0 }}>Marie L.</p>
                <p style={{ fontSize: 13, color: `rgba(65,23,94,0.5)`, margin: 0 }}>Gérante, Restaurant La Belle Époque</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── CAPACITÉS AVANCÉES ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <AnimateIn className="mb-14">
          <SLabel text="Fonctionnalités" />
          <h2 style={{ fontSize: 48, fontWeight: 500, letterSpacing: "-2.5px", color: P, lineHeight: 1.15, margin: 0 }}>
            Capacités avancées.<br />Expérience sans friction.
          </h2>
        </AnimateIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
          {capabilities.slice(0, 3).map((c, i) => (
            <AnimateIn key={c.title} delay={i * 60}>
              <div style={{ backgroundColor: CARD, borderRadius: 16, padding: 24 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 48, fontSize: 18 }}>
                  {c.icon}
                </div>
                <h5 style={{ fontSize: 18, fontWeight: 500, color: P, letterSpacing: "-0.4px", marginBottom: 8 }}>{c.title}</h5>
                <p style={{ fontSize: 13, color: `rgba(65,23,94,0.6)`, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {capabilities.slice(3).map((c, i) => (
            <AnimateIn key={c.title} delay={i * 60}>
              <div style={{ backgroundColor: CARD, borderRadius: 16, padding: 28 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40, fontSize: 18 }}>
                  {c.icon}
                </div>
                <h5 style={{ fontSize: 20, fontWeight: 500, color: P, letterSpacing: "-0.4px", marginBottom: 8 }}>{c.title}</h5>
                <p style={{ fontSize: 14, color: `rgba(65,23,94,0.6)`, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" style={{ ...GRID_BG, padding: "100px 24px", borderTop: "1px solid rgba(65,23,94,0.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimateIn className="mb-14">
            <SLabel text="Tarifs" />
            <h2 style={{ fontSize: 48, fontWeight: 500, letterSpacing: "-2.5px", color: P, lineHeight: 1.15, margin: 0 }}>
              Des formules adaptées<br />à chaque activité.
            </h2>
          </AnimateIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {plans.map((plan, i) => (
              <AnimateIn key={plan.name} delay={i * 80}>
                <div style={{ backgroundColor: CARD, borderRadius: 20, padding: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                      {plan.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 18, fontWeight: 600, color: P, margin: 0 }}>{plan.name}</p>
                      <p style={{ fontSize: 13, color: `rgba(65,23,94,0.5)`, margin: 0 }}>{plan.desc}</p>
                    </div>
                  </div>

                  <div style={{ backgroundColor: "#fff", borderRadius: 14, padding: 20, marginBottom: 20 }}>
                    <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-2px", background: "linear-gradient(90deg, #814BEE, #E879A6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {plan.price}€
                    </span>
                    <span style={{ fontSize: 14, color: `rgba(65,23,94,0.5)` }}>/mois</span>
                    <p style={{ fontSize: 12, color: `rgba(65,23,94,0.4)`, marginTop: 4, marginBottom: 0 }}>+ {plan.setup}</p>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1.5px solid rgba(65,23,94,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontSize: 9, color: A }}>✓</span>
                        </div>
                        <span style={{ color: `rgba(65,23,94,0.75)` }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 14, border: "1.5px solid rgba(65,23,94,0.2)", color: P, textDecoration: "none", fontSize: 14, fontWeight: 500, backgroundColor: "#fff" }}>
                    Commencer
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={200}>
            <div style={{ backgroundColor: CARD, borderRadius: 20, padding: 28, marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 20, fontWeight: 500, color: P, letterSpacing: "-0.5px", margin: "0 0 4px" }}>Besoin d'une solution sur mesure ?</p>
                <p style={{ fontSize: 14, color: `rgba(65,23,94,0.6)`, margin: 0 }}>Certains projets nécessitent un accompagnement spécifique. Parlons-en.</p>
              </div>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: P, color: "#fff", padding: "12px 20px", borderRadius: 14, textDecoration: "none", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
                Demander un devis →
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px", textAlign: "center", position: "relative" }}>
        <AnimateIn>
          <h2 style={{ fontSize: 56, fontWeight: 500, letterSpacing: "-2px", lineHeight: 1.1, color: P, margin: "0 auto 20px", maxWidth: 700 }}>
            Prêt à faire de votre présence digitale{" "}
            <GradText>un vrai moteur de clients ?</GradText>
          </h2>
          <p style={{ fontSize: 17, color: `rgba(65,23,94,0.6)`, marginBottom: 36 }}>
            Quand les outils classiques ne suffisent plus, c'est là qu'OptimalLogic brille.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
            <BtnPrimary href="/prise-de-rdv">Réserver un appel gratuit</BtnPrimary>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
            {["✓ Collaboration équipe", "✓ Aperçu en un clic"].map(t => (
              <span key={t} style={{ fontSize: 13, color: `rgba(65,23,94,0.5)` }}>{t}</span>
            ))}
          </div>
        </AnimateIn>

        {/* Déco cube isométrique */}
        <div style={{ marginTop: 60, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 160, height: 160, borderRadius: 24, background: "linear-gradient(135deg, #E8D8F8, #C9B0F0, #9B6FE0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, boxShadow: "0 32px 80px rgba(129,75,238,0.2)", transform: "rotate(-5deg)" }}>
            ⚡
          </div>
        </div>
      </section>

      {/* ── MARQUEE TEXTE ── */}
      <section style={{ ...GRID_BG, borderTop: "1px solid rgba(65,23,94,0.07)", overflow: "hidden", padding: "32px 0" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} style={{ fontSize: 52, fontWeight: 700, color: `rgba(65,23,94,0.08)`, letterSpacing: "-1.5px", paddingRight: 40 }}>OptimalLogic •</span>
          ))}
        </div>
      </section>

    </main>
  );
}
