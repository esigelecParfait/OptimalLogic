import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import NeuralBackground from "@/components/fx/NeuralBackground";

const problems = [
  { n: "01", t: "Introuvable sur Google", d: "Une fiche incomplète et vos prospects atterrissent directement chez le concurrent d'à côté." },
  { n: "02", t: "Un site sans confiance", d: "Lent, daté, peu clair : en quelques secondes le visiteur repart sans jamais vous contacter." },
  { n: "03", t: "Des demandes ignorées", d: "Hors horaires, débordé : chaque message sans réponse est un client qui file ailleurs." },
  { n: "04", t: "Aucune prise de RDV", d: "Trop de friction pour réserver, et le client motivé abandonne avant même de confirmer." },
  { n: "05", t: "Des prospects perdus", d: "Pas de suivi, pas de relance : les contacts intéressés se diluent et ne reviennent jamais." },
  { n: "06", t: "Zéro visibilité", d: "Sans données, impossible de savoir ce qui marche. Vous avancez à l'aveugle." },
];

const features = [
  { n: "1", t: "Diagnostic avant solution", d: "On comprend votre métier et vos clients avant de proposer quoi que ce soit." },
  { n: "2", t: "Juste ce qu'il faut", d: "Des solutions proportionnées à votre besoin réel, sans complexité ni gadget inutile." },
  { n: "3", t: "Des résultats mesurables", d: "Un tableau de bord clair : demandes, RDV et valeur générée, en temps réel." },
];

const steps = [
  { n: "01", t: "Diagnostic", d: "On analyse votre présence en ligne, votre marché local et vos points de friction. Gratuit, sans engagement." },
  { n: "02", t: "Stratégie", d: "On définit ensemble les leviers prioritaires — ceux qui auront le plus d'impact sur vos clients." },
  { n: "03", t: "Activation", d: "On déploie site, IA, RDV et suivi. Rapide, propre, pensé pour convertir dès le premier jour." },
  { n: "04", t: "Croissance", d: "On mesure, on optimise, on relance. Vos résultats progressent mois après mois." },
];

const audiences = [
  "🛍️ Commerces de proximité", "🍽️ Restaurants & hôtellerie", "💇 Salons & bien-être", "🔧 Artisans & métiers",
  "⚖️ Professions libérales", "🩺 Cabinets médicaux", "🚀 PME & startups", "🎯 Coachs & formateurs", "💼 Indépendants",
];

const marquee = ["Sites web", "Assistant IA", "Google Business", "Prise de RDV", "Acquisition client", "Automatisation"];

function Check() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="relative">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-7 pb-28 pt-44 lg:pt-52">
        <NeuralBackground className="opacity-90" />
        <div className="relative z-[2] mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-[10px] rounded-full border border-white/[0.13] px-4 py-2 text-[13px] font-semibold text-ink" style={{ background: "var(--grad-soft)" }}>
              <span className="h-2 w-2 rounded-full bg-emerald" style={{ boxShadow: "0 0 12px var(--emerald)", animation: "blink 1.6s infinite" }} />
              Propulsé par l&apos;intelligence artificielle
            </div>
            <h1 className="text-[clamp(44px,6vw,76px)] font-semibold">
              Votre présence en ligne,<br />
              devenue <span className="grad-text-kinetic">moteur d&apos;acquisition</span>.
            </h1>
            <p className="mt-7 max-w-[540px] text-[clamp(17px,1.4vw,20px)] text-mut">
              La bonne approche digitale n&apos;est pas la plus complexe — c&apos;est celle qui pousse vos clients à vous choisir. On diagnostique, on active les bons leviers, vous récoltez les résultats.
            </p>
            <div className="mt-10 flex flex-wrap gap-[14px]">
              <Link href="/prise-de-rdv" className="btn-grad inline-flex items-center gap-2 rounded-full px-[30px] py-4 text-[15px] font-semibold">
                Diagnostic gratuit <Arrow />
              </Link>
              <Link href="/services" className="btn-ghost inline-flex items-center rounded-full px-[30px] py-4 text-[15px] font-semibold">
                Voir les solutions
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-[26px]">
              {["Sans engagement", "Diagnostic gratuit", "Solutions sur-mesure"].map((t) => (
                <span key={t} className="inline-flex items-center gap-[9px] text-sm text-mut"><Check /> {t}</span>
              ))}
            </div>
          </div>

          {/* Dashboard mockup */}
          <AnimateIn delay={150}>
            <div className="relative rounded-[26px] border border-white/[0.13] p-[22px] shadow-[0_50px_110px_-40px_rgba(0,0,0,0.95)]" style={{ background: "linear-gradient(165deg, rgba(16,20,42,0.95), rgba(8,10,22,0.95))" }}>
              <div className="mb-[18px] flex items-center justify-between">
                <div className="flex items-center gap-[10px] text-sm font-semibold">
                  <span className="grid h-[30px] w-[30px] place-items-center rounded-[9px] font-display text-xs font-bold text-white" style={{ background: "var(--grad)" }}>OL</span>
                  Tableau de bord
                </div>
                <span className="inline-flex items-center gap-[6px] text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald">
                  <span className="h-[6px] w-[6px] rounded-full bg-emerald" style={{ animation: "blink 1.4s infinite" }} /> En direct
                </span>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-3">
                {[
                  { l: "Demandes", v: "48", d: "+32% ce mois" },
                  { l: "RDV pris", v: "19", d: "+11 nouveaux" },
                  { l: "Prospects", v: "37", d: "à relancer" },
                  { l: "Valeur est.", v: "12 4k€", d: "opportunités" },
                ].map((s) => (
                  <div key={s.l} className="rounded-[15px] border border-white/[0.07] p-4" style={{ background: "rgba(16,20,42,0.8)" }}>
                    <p className="text-xs text-mut-2">{s.l}</p>
                    <p className="mt-2 font-display text-[27px] font-semibold">{s.v}</p>
                    <p className="mt-1 text-[11.5px] font-semibold text-emerald">{s.d}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[15px] border border-white/[0.07] p-4" style={{ background: "rgba(16,20,42,0.8)" }}>
                <div className="mb-[14px] flex items-center justify-between text-[12.5px] text-mut">
                  <span>Acquisition · 7 jours</span>
                  <span className="grad-text font-bold">+27%</span>
                </div>
                <div className="flex h-[76px] items-end gap-[9px]">
                  {[38, 55, 42, 70, 60, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-[5px] opacity-90" style={{ height: `${h}%`, background: "var(--grad)" }} />
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="relative z-[2] overflow-hidden border-y border-white/[0.07] py-[26px]" style={{ background: "rgba(8,10,22,0.5)" }}>
        <div className="flex w-max animate-marquee gap-14">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-[14px] whitespace-nowrap font-display text-[22px] font-medium text-mut">
              <span className="text-indigo">✦</span> {m}
            </span>
          ))}
        </div>
      </div>

      {/* ===== PROBLÈME ===== */}
      <section className="relative z-[2] px-7 py-[120px]">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mx-auto mb-[70px] max-w-[720px] text-center">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">Le vrai problème</span>
            <h2 className="text-[clamp(34px,4.6vw,52px)]">Pourquoi vos clients<br />ne vous trouvent pas</h2>
            <p className="mt-4 text-lg text-mut">Ce ne sont pas vos compétences. Ce sont ces failles digitales invisibles qui vous coûtent des clients, chaque jour.</p>
          </AnimateIn>
          <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, i) => (
              <AnimateIn key={p.n} delay={(i % 3) * 80}>
                <div className="surface-card group relative h-full overflow-hidden rounded-[22px] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.13]">
                  <span className="absolute right-[30px] top-[26px] font-display text-sm text-mut-2">{p.n}</span>
                  <div className="mb-5 grid h-[54px] w-[54px] place-items-center rounded-[15px] border border-[rgba(255,107,107,0.24)] text-[#ff6b6b]" style={{ background: "rgba(255,107,107,0.12)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
                  </div>
                  <h3 className="mb-[10px] text-xl font-semibold">{p.t}</h3>
                  <p className="text-[15px] text-mut">{p.d}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MANIFESTE ===== */}
      <section className="relative z-[2] px-7 py-[120px]">
        <AnimateIn className="mx-auto max-w-[1000px] text-center">
          <p className="font-display text-[clamp(30px,4.4vw,56px)] font-medium leading-[1.18]">
            La bonne approche digitale n&apos;est pas la plus complexe. C&apos;est celle qui aide vos clients à <span className="grad-text">vous choisir</span>.
          </p>
          <p className="mx-auto mt-8 max-w-[600px] text-lg text-mut">
            On part toujours de votre activité, jamais de la technologie. On diagnostique le besoin réel, puis on active uniquement les leviers qui génèrent des clients.
          </p>
        </AnimateIn>
      </section>

      {/* ===== SOLUTIONS (bento) ===== */}
      <section className="relative z-[2] px-7 py-[120px]">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mx-auto mb-[70px] max-w-[720px] text-center">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">Nos solutions</span>
            <h2 className="text-[clamp(34px,4.6vw,52px)]">Tout ce qu&apos;il faut<br />pour être choisi</h2>
            <p className="mt-4 text-lg text-mut">Six leviers complémentaires, activés selon votre besoin réel — pour capter, convaincre et convertir.</p>
          </AnimateIn>
          <div className="grid gap-5 md:grid-cols-4 md:[grid-auto-rows:215px]">
            <AnimateIn className="md:col-span-2 md:row-span-2">
              <div className="surface-card relative flex h-full flex-col justify-end overflow-hidden rounded-[24px] p-[30px] transition-all hover:-translate-y-1 hover:border-white/[0.13]">
                <span className="absolute right-[26px] top-[26px] z-[2] rounded-full px-3 py-[5px] text-[11px] font-bold text-[#d8a9ff]" style={{ background: "rgba(177,77,255,0.16)" }}>IA · 24/7</span>
                <div className="absolute right-7 top-7 h-[86px] w-[86px] animate-orb rounded-full blur-[2px]" style={{ background: "var(--grad)", boxShadow: "0 0 60px rgba(124,92,255,0.7)" }} />
                <h3 className="relative z-[1] mb-2 mt-auto text-[30px] font-semibold">Assistant IA</h3>
                <p className="relative z-[1] text-[14.5px] text-mut">Il répond automatiquement à vos clients, jour et nuit, et ne laisse jamais filer un prospect.</p>
              </div>
            </AnimateIn>
            {[
              { t: "Site web professionnel", d: "Moderne, rapide et clair — un site qui inspire confiance et pousse à vous contacter.", c: "var(--indigo)", span: "md:col-span-2" },
              { t: "Prise de RDV", d: "Réservation sans friction, 24h/24.", c: "var(--cyan)", span: "md:col-span-1" },
              { t: "Google Business", d: "Trouvé et choisi localement.", c: "var(--pink)", span: "md:col-span-1" },
              { t: "Formulaires & suivi des prospects", d: "Capture qualifiée et base centralisée pour relancer et convertir chaque contact en client.", c: "var(--violet)", span: "md:col-span-2" },
            ].map((b, i) => (
              <AnimateIn key={b.t} className={b.span} delay={(i % 2) * 80}>
                <div className="surface-card relative flex h-full flex-col justify-end overflow-hidden rounded-[24px] p-[30px] transition-all hover:-translate-y-1 hover:border-white/[0.13]">
                  <div className="absolute -right-16 -top-16 h-[220px] w-[220px] rounded-full opacity-50 blur-[70px]" style={{ background: b.c }} />
                  <div className="relative z-[1] mb-auto grid h-[50px] w-[50px] place-items-center rounded-[14px] border border-white/[0.13] text-cyan" style={{ background: "rgba(124,92,255,0.14)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
                  </div>
                  <h3 className="relative z-[1] mb-2 mt-[22px] text-[21px] font-semibold">{b.t}</h3>
                  <p className="relative z-[1] text-[14.5px] text-mut">{b.d}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIFFÉRENCE ===== */}
      <section className="relative z-[2] px-7 py-[120px]">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mx-auto mb-[56px] max-w-[720px] text-center">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">Notre différence</span>
            <h2 className="text-[clamp(30px,4vw,48px)]">Une approche qui part de votre<br />activité, pas de la technologie</h2>
            <p className="mt-4 text-lg text-mut">On part toujours de votre métier et de vos clients. La technologie n&apos;est qu&apos;un moyen — jamais une fin.</p>
          </AnimateIn>
          <div className="grid gap-[22px] md:grid-cols-3">
            {features.map((f, i) => (
              <AnimateIn key={f.n} delay={i * 80}>
                <div className="surface-card h-full rounded-[22px] p-8">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-[14px] font-display text-[17px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(124,92,255,0.7)]" style={{ background: "var(--grad)" }}>{f.n}</div>
                  <h3 className="mb-[10px] text-xl font-semibold">{f.t}</h3>
                  <p className="text-[15px] text-mut">{f.d}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn className="mt-[46px] text-center">
            <Link href="/prise-de-rdv" className="btn-grad inline-flex items-center gap-2 rounded-full px-[30px] py-4 text-[15px] font-semibold">
              Parlons de votre activité <Arrow />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ===== MÉTHODE ===== */}
      <section className="relative z-[2] px-7 py-[120px]">
        <div className="mx-auto grid max-w-[1240px] items-start gap-[60px] lg:grid-cols-[0.8fr_1.2fr]">
          <AnimateIn className="lg:sticky lg:top-[130px]">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">La méthode</span>
            <h2 className="text-[clamp(32px,4.4vw,48px)]">De l&apos;audit aux<br />résultats, en 4 temps</h2>
            <p className="mt-4 text-[17px] text-mut">Un cadre simple et transparent. Vous savez toujours où vous en êtes — et ce que ça rapporte.</p>
          </AnimateIn>
          <div className="flex flex-col gap-[18px]">
            {steps.map((s, i) => (
              <AnimateIn key={s.n} delay={i * 80}>
                <div className="flex gap-[22px] rounded-[22px] border border-white/[0.07] p-7 transition-all hover:border-white/[0.13]" style={{ background: "rgba(11,14,29,0.6)" }}>
                  <span className="grad-text w-16 shrink-0 font-display text-[40px] font-semibold leading-none">{s.n}</span>
                  <div>
                    <h4 className="mb-2 text-xl font-semibold">{s.t}</h4>
                    <p className="text-[15px] text-mut">{s.d}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACTIVITÉS ===== */}
      <section className="relative z-[2] px-7 py-[90px]">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mx-auto mb-12 max-w-[720px] text-center">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">Activités accompagnées</span>
            <h2 className="text-[clamp(32px,4.4vw,48px)]">Pensé pour ceux qui<br />font tourner le quotidien</h2>
          </AnimateIn>
          <div className="flex flex-wrap justify-center gap-[14px]">
            {audiences.map((a) => (
              <span key={a} className="surface-card rounded-full px-[26px] py-[15px] text-[15.5px] font-medium text-mut transition-colors hover:border-indigo hover:text-ink">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative z-[2] px-7 py-[120px]">
        <AnimateIn className="mx-auto max-w-[1240px]">
          <div className="relative overflow-hidden rounded-[36px] border border-white/[0.13] px-[50px] py-[90px] text-center" style={{ background: "linear-gradient(135deg, rgba(124,92,255,0.22), rgba(31,213,240,0.12))" }}>
            <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 0%, rgba(177,77,255,0.4), transparent 60%)" }} />
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-[10px] rounded-full border border-white/[0.13] px-4 py-2 text-[13px] font-semibold text-ink" style={{ background: "var(--grad-soft)" }}>
                <span className="h-2 w-2 rounded-full bg-emerald" /> Premier pas · 100% gratuit
              </div>
              <h2 className="text-[clamp(36px,5.4vw,64px)]">Parlons de votre activité,<br />pas de technologie.</h2>
              <p className="mx-auto mt-5 max-w-[560px] text-[19px] text-mut">30 minutes pour identifier vos vrais leviers de croissance. Sans engagement, sans jargon.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-[14px]">
                <Link href="/prise-de-rdv" className="btn-grad inline-flex items-center gap-2 rounded-full px-[30px] py-4 text-[15px] font-semibold">
                  Réserver mon diagnostic <Arrow />
                </Link>
                <Link href="/contact" className="btn-ghost inline-flex items-center rounded-full px-[30px] py-4 text-[15px] font-semibold">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
