import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  Check,
  ClipboardList,
  Globe2,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Présence digitale et acquisition client",
  description:
    "OptimalLogic réunit visibilité locale, site web, prise de rendez-vous, assistant IA et suivi des prospects dans un système digital clair.",
  alternates: { canonical: "/" },
};

const capabilities = [
  {
    icon: MapPin,
    number: "01",
    title: "Google Business",
    description: "Une fiche complète, cohérente et pensée pour déclencher appels, itinéraires et réservations.",
  },
  {
    icon: Globe2,
    number: "02",
    title: "Site web professionnel",
    description: "Un site rapide et lisible qui explique votre valeur et guide chaque visiteur vers l’action.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Prise de rendez-vous",
    description: "Un parcours de réservation simple, accessible à toute heure et relié à votre organisation.",
  },
  {
    icon: Bot,
    number: "04",
    title: "Assistant IA",
    description: "Des réponses immédiates aux questions fréquentes avec une orientation vers le bon contact.",
  },
  {
    icon: MessageCircle,
    number: "05",
    title: "Formulaires intelligents",
    description: "Les bonnes questions au bon moment pour recevoir des demandes plus faciles à traiter.",
  },
  {
    icon: ClipboardList,
    number: "06",
    title: "Suivi des prospects",
    description: "Une vue centralisée des demandes, priorités et relances pour ne plus perdre d’opportunités.",
  },
];

const method = [
  {
    number: "01",
    title: "Diagnostic",
    description: "Nous observons votre présence actuelle, votre activité et les actions qui comptent vraiment.",
  },
  {
    number: "02",
    title: "Parcours",
    description: "Nous simplifions le chemin entre une recherche, la confiance et la prise de contact.",
  },
  {
    number: "03",
    title: "Mise en place",
    description: "Nous configurons les outils utiles, avec vos contenus et votre manière de travailler.",
  },
  {
    number: "04",
    title: "Suivi",
    description: "Nous suivons les demandes et améliorons progressivement les points qui freinent l’action.",
  },
];

const audiences = [
  "Commerces locaux",
  "Restaurants",
  "Salons & instituts",
  "Artisans",
  "Cabinets professionnels",
  "Cabinets médicaux",
  "Indépendants",
  "TPE / PME",
  "Startups",
  "Formateurs & coachs",
];

const clarityPoints = [
  "Un périmètre et un tarif validés avant le lancement",
  "Des contenus et parcours adaptés à votre activité",
  "Un interlocuteur pour la mise en place et le suivi",
  "Des indicateurs reliés aux demandes réellement reçues",
];

function DemoInterface() {
  return (
    <div className="product-window">
      <div className="flex items-center justify-between border-b border-white/[0.09] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-mut">
          Aperçu démonstratif
        </span>
      </div>

      <div className="grid gap-3 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
          <div className="premium-panel-soft p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mut-2">Visibilité locale</p>
                <p className="mt-2 font-display text-lg font-semibold">Fiche Google Business</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/10 px-2.5 py-1 text-[10px] font-semibold text-emerald">
                <Check size={11} strokeWidth={3} /> Optimisée
              </span>
            </div>
            <div className="mt-6 grid gap-4">
              {[
                ["Informations", "92%"],
                ["Parcours de contact", "84%"],
                ["Contenus", "76%"],
              ].map(([label, width]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-[11px] text-mut"><span>{label}</span><span>{width}</span></div>
                  <div className="metric-bar"><span style={{ width }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-panel-soft flex flex-col justify-between p-4 sm:p-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mut-2">Nouvelle demande</p>
              <p className="mt-3 font-display text-base font-semibold">Projet de site web</p>
              <p className="mt-2 text-xs leading-5 text-mut">Formulaire qualifié · à traiter</p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs">
              <span className="text-mut">Priorité</span>
              <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-black">Haute</span>
            </div>
          </div>
        </div>

        <div className="premium-panel-soft p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mut-2">Parcours actif</p>
              <p className="mt-1 font-display text-base font-semibold">De la découverte à la prise de contact</p>
            </div>
            <span className="text-[10px] text-mut-2">Exemple d’interface</span>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {[
              [Search, "Trouver", "Google & site"],
              [ShieldCheck, "Rassurer", "Offre & preuves"],
              [Target, "Agir", "RDV & demande"],
            ].map(([Icon, title, subtitle], index) => {
              const ItemIcon = Icon as typeof Search;
              return (
                <div key={title as string} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-white"><ItemIcon size={17} /></span>
                  <div><p className="text-xs font-semibold">{index + 1}. {title as string}</p><p className="mt-0.5 text-[10px] text-mut-2">{subtitle as string}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OptimalLogic",
    url: "https://optimal-logic.com",
    email: "contact@optimal-logic.com",
    description:
      "Solutions de visibilité locale, site web, prise de rendez-vous, assistant IA et suivi des prospects.",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="page-hero">
        <div className="section-shell grid gap-14 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <AnimateIn>
            <div className="section-label">Digital · IA · Acquisition</div>
            <h1 className="mt-7 max-w-[780px] text-[clamp(2.8rem,6.2vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              Une présence digitale qui mène à
              <span className="grad-text"> l’action.</span>
            </h1>
            <p className="mt-7 max-w-[650px] text-[clamp(1rem,1.5vw,1.18rem)] leading-8 text-mut">
              OptimalLogic réunit visibilité locale, site web, rendez-vous, assistant IA et suivi des prospects dans un système simple à comprendre et utile au quotidien.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/prise-de-rdv" className="btn-grad inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold">
                Réserver un diagnostic <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-ghost inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold">
                Découvrir les services
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.09] pt-5 text-xs font-medium text-mut">
              <span>Diagnostic gratuit</span>
              <span>Périmètre clair</span>
              <span>Suivi mensuel</span>
            </div>
          </AnimateIn>

          <AnimateIn delay={120}>
            <DemoInterface />
          </AnimateIn>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-white/[0.018]">
        <div className="section-shell grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Search, "Être trouvé", "au bon moment"],
            [ShieldCheck, "Inspirer confiance", "dès les premières secondes"],
            [Target, "Déclencher l’action", "sans friction"],
            [BarChart3, "Suivre les demandes", "sans opportunité perdue"],
          ].map(([Icon, title, description]) => {
            const ItemIcon = Icon as typeof Search;
            return (
              <div key={title as string} className="flex gap-4 border-white/[0.08] px-5 py-6 lg:border-r lg:last:border-r-0">
                <ItemIcon className="mt-0.5 shrink-0 text-white" size={20} strokeWidth={1.7} />
                <div><p className="text-sm font-semibold">{title as string}</p><p className="mt-1 text-xs text-mut">{description as string}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <AnimateIn className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
            <div>
              <div className="section-label">Le système</div>
              <h2 className="mt-5 text-[clamp(2.1rem,4.5vw,4rem)] font-semibold tracking-[-0.045em]">Les bons leviers, réunis.</h2>
            </div>
            <p className="max-w-[650px] text-base leading-7 text-mut lg:justify-self-end">
              Chaque brique répond à un point précis du parcours client. Elles peuvent fonctionner seules ou ensemble, selon votre activité et votre objectif.
            </p>
          </AnimateIn>

          <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <AnimateIn key={item.title} delay={index * 55}>
                <article className="premium-panel group h-full p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/[0.1] bg-white/[0.06] text-white">
                      <item.icon size={20} strokeWidth={1.7} />
                    </span>
                    <span className="font-display text-xs font-semibold text-mut-2">{item.number}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-mut">{item.description}</p>
                </article>
              </AnimateIn>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white">
              Voir le détail des services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-white/[0.08] bg-white/[0.018]">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <AnimateIn>
            <div className="section-label">Notre méthode</div>
            <h2 className="mt-5 max-w-[480px] text-[clamp(2.1rem,4vw,3.6rem)] font-semibold tracking-[-0.045em]">Moins d’outils. Plus de cohérence.</h2>
            <p className="mt-6 max-w-[500px] text-base leading-7 text-mut">
              Nous partons du parcours de votre client, puis nous choisissons la solution la plus directe pour le rendre visible, rassurant et mesurable.
            </p>
          </AnimateIn>

          <div className="grid gap-3">
            {method.map((step, index) => (
              <AnimateIn key={step.number} delay={index * 70}>
                <article className="grid gap-4 rounded-[22px] border border-white/[0.09] bg-black/20 p-5 sm:grid-cols-[3.25rem_0.55fr_1fr] sm:items-center sm:p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.12] bg-white/[0.05] font-display text-xs font-semibold text-mut">{step.number}</span>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-6 text-mut">{step.description}</p>
                </article>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-12 lg:grid-cols-2 lg:items-start">
          <AnimateIn>
            <div className="section-label">Pour qui ?</div>
            <h2 className="mt-5 max-w-[600px] text-[clamp(2rem,4vw,3.6rem)] font-semibold tracking-[-0.045em]">Une approche adaptée à votre manière de vendre.</h2>
            <p className="mt-6 max-w-[570px] text-base leading-7 text-mut">
              Un commerce local, un cabinet, une PME et une startup n’ont ni les mêmes clients ni le même cycle de décision. Le dispositif s’adapte à cette réalité.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {audiences.map((audience) => (
                <span key={audience} className="rounded-full border border-white/[0.1] bg-white/[0.035] px-4 py-2 text-xs font-medium text-mut">{audience}</span>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="premium-panel p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black"><Sparkles size={19} /></span>
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-mut-2">Cadre de travail</p><h3 className="mt-1 text-xl font-semibold">Clair du départ au suivi</h3></div>
              </div>
              <ul className="mt-8 grid gap-4">
                {clarityPoints.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-white/[0.08] pb-4 text-sm leading-6 text-mut last:border-0 last:pb-0">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald/10 text-emerald"><Check size={12} strokeWidth={3} /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-7 sm:py-16">
        <AnimateIn className="section-shell">
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.14] bg-white px-6 py-14 text-center text-black sm:px-10 sm:py-16">
            <div className="absolute inset-0 opacity-50" aria-hidden="true" style={{ background: "radial-gradient(circle at 50% 0%, #ffffff, #d6d6d6 75%)" }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/50">Premier échange sans engagement</p>
              <h2 className="mx-auto mt-5 max-w-[780px] text-[clamp(2rem,4.7vw,4rem)] font-semibold tracking-[-0.05em]">Voyons ce qui peut réellement simplifier votre acquisition.</h2>
              <p className="mx-auto mt-6 max-w-[650px] text-base leading-7 text-black/65">Un diagnostic pour clarifier votre priorité, le bon périmètre et la formule la plus adaptée.</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/prise-de-rdv" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white">Prendre rendez-vous <ArrowRight size={16} /></Link>
                <Link href="/tarifs" className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 px-6 text-sm font-semibold text-black transition-colors hover:bg-black/[0.05]">Voir les tarifs</Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
