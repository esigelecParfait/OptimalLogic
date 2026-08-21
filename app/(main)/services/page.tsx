import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  Check,
  ClipboardList,
  Compass,
  Globe2,
  MapPin,
  MessageCircle,
  Route,
  Search,
  Settings2,
  ShieldCheck,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Google Business, site web, prise de rendez-vous, assistant IA, formulaires intelligents et suivi des prospects : découvrez les services OptimalLogic.",
  alternates: { canonical: "/services" },
};

type Service = {
  number: string;
  title: string;
  icon: LucideIcon;
  lead: string;
  forWhom: string;
  deliverables: string[];
  outcome: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Google Business",
    icon: MapPin,
    lead: "Être visible localement au moment où un client recherche précisément votre activité.",
    forWhom: "Commerces, restaurants, artisans, cabinets et établissements recevant du public.",
    deliverables: [
      "Création ou optimisation complète de la fiche",
      "Catégories, services, horaires et informations clés",
      "Photos, FAQ, avis et parcours de contact",
      "Suivi des appels, clics, itinéraires et interactions",
    ],
    outcome: "Une présence locale cohérente qui rassure et facilite l’appel, la visite ou la réservation.",
  },
  {
    number: "02",
    title: "Site web professionnel",
    icon: Globe2,
    lead: "Présenter votre offre avec clarté et conduire chaque visiteur vers la prochaine action utile.",
    forWhom: "Indépendants, TPE, PME, prestataires de services et entreprises en lancement.",
    deliverables: [
      "Architecture de contenu centrée sur le client",
      "Design responsive, rapide et accessible",
      "Pages services, preuves et appels à l’action",
      "Formulaire, mesure d’audience et maintenance",
    ],
    outcome: "Un site crédible et lisible qui devient un véritable point d’entrée commercial.",
  },
  {
    number: "03",
    title: "Prise de rendez-vous",
    icon: CalendarCheck,
    lead: "Permettre à un prospect motivé de réserver immédiatement, sans échange inutile.",
    forWhom: "Cabinets, salons, coachs, consultants, équipes commerciales et services sur rendez-vous.",
    deliverables: [
      "Créneaux, durées et règles de disponibilité",
      "Questions de qualification avant le rendez-vous",
      "Confirmations et rappels automatiques",
      "Intégration au site et à l’organisation existante",
    ],
    outcome: "Moins d’allers-retours et un agenda rempli par des demandes mieux préparées.",
  },
  {
    number: "04",
    title: "Assistant IA",
    icon: Bot,
    lead: "Répondre aux questions récurrentes et orienter le visiteur même lorsque vous êtes occupé.",
    forWhom: "Activités recevant des demandes répétitives, techniques ou réparties sur plusieurs offres.",
    deliverables: [
      "Base de connaissances issue de vos contenus validés",
      "Scénarios de questions et réponses fréquentes",
      "Orientation vers appel, devis ou rendez-vous",
      "Amélioration continue selon les conversations",
    ],
    outcome: "Une première réponse immédiate, cohérente avec votre activité et reliée à un vrai parcours de contact.",
  },
  {
    number: "05",
    title: "Formulaires intelligents",
    icon: MessageCircle,
    lead: "Collecter les informations utiles sans imposer un parcours long ou difficile à comprendre.",
    forWhom: "Entreprises qui traitent des devis, demandes complexes, urgences ou plusieurs types de clients.",
    deliverables: [
      "Questions adaptées au type de demande",
      "Qualification progressive et champs conditionnels",
      "Confirmations et notifications automatiques",
      "Transmission structurée des informations à l’équipe",
    ],
    outcome: "Des demandes plus complètes, plus faciles à prioriser et plus rapides à traiter.",
  },
  {
    number: "06",
    title: "Suivi des prospects",
    icon: ClipboardList,
    lead: "Centraliser les demandes reçues et rendre visibles les relances qui doivent être faites.",
    forWhom: "TPE, PME, startups et commerces qui gèrent plusieurs canaux ou plusieurs interlocuteurs.",
    deliverables: [
      "Tableau de suivi adapté au cycle commercial",
      "Statuts, priorités, responsables et prochaines actions",
      "Relances et notifications selon le besoin",
      "Reporting des demandes, rendez-vous et conversions",
    ],
    outcome: "Une organisation plus claire et moins d’opportunités perdues entre le premier contact et la décision.",
  },
];

const method = [
  { icon: Compass, step: "01", title: "Comprendre", description: "Votre activité, vos clients, vos outils et vos points de friction." },
  { icon: Route, step: "02", title: "Concevoir", description: "Le parcours le plus direct entre la découverte et la demande." },
  { icon: Settings2, step: "03", title: "Déployer", description: "Les briques utiles, configurées avec vos contenus et contraintes." },
  { icon: BarChart3, step: "04", title: "Améliorer", description: "Les points de blocage et les actions à prioriser dans le temps." },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <AnimateIn delay={index * 55}>
      <article className="premium-panel h-full overflow-hidden">
        <div className="grid gap-7 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.11] bg-white/[0.06] text-white">
              <Icon size={22} strokeWidth={1.7} />
            </span>
            <span className="font-display text-xs font-semibold text-mut-2">{service.number}</span>
          </div>

          <div>
            <h3 className="text-[clamp(1.55rem,2.5vw,2rem)] font-semibold tracking-[-0.035em]">{service.title}</h3>
            <p className="mt-4 text-sm leading-7 text-mut">{service.lead}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mut-2">Particulièrement adapté à</p>
            <p className="mt-2 text-xs leading-5 text-mut">{service.forWhom}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mut-2">Ce qui peut être mis en place</p>
            <ul className="mt-4 grid gap-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-mut">
                  <span className="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-emerald/10 text-emerald"><Check size={11} strokeWidth={3} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.09] bg-white/[0.025] px-6 py-5 sm:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mut-2">Résultat recherché</p>
          <p className="mt-2 text-sm leading-6 text-ink/85">{service.outcome}</p>
        </div>
      </article>
    </AnimateIn>
  );
}

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="section-shell grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <AnimateIn>
            <div className="section-label">Services</div>
            <h1 className="mt-7 max-w-[850px] text-[clamp(2.8rem,6vw,5.1rem)] font-semibold leading-[0.97] tracking-[-0.055em]">
              Chaque service répond à un
              <span className="grad-text"> moment du parcours client.</span>
            </h1>
            <p className="mt-7 max-w-[690px] text-[clamp(1rem,1.5vw,1.17rem)] leading-8 text-mut">
              Être trouvé, être compris, inspirer confiance, faciliter l’action puis suivre la demande : nous construisons uniquement les briques utiles à votre activité.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/prise-de-rdv" className="btn-grad inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold">Parler de mon besoin <ArrowRight size={16} /></Link>
              <a href="#catalogue" className="btn-ghost inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold">Explorer les services</a>
            </div>
          </AnimateIn>

          <AnimateIn delay={110}>
            <div className="product-window p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between px-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-mut-2">Architecture d’acquisition</p>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald"><span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Modulaire</span>
              </div>
              <div className="grid gap-3">
                {[
                  { icon: Search, label: "Visibilité", detail: "Google Business · Site web", number: "01" },
                  { icon: ShieldCheck, label: "Confiance", detail: "Contenus · Réponses IA", number: "02" },
                  { icon: Target, label: "Conversion", detail: "RDV · Formulaire · Suivi", number: "03" },
                ].map((item) => (
                  <div key={item.label} className="premium-panel-soft flex items-center gap-4 p-4 sm:p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.07] text-white"><item.icon size={20} strokeWidth={1.7} /></span>
                    <div className="min-w-0 flex-1"><p className="font-display text-base font-semibold">{item.label}</p><p className="mt-1 text-xs text-mut">{item.detail}</p></div>
                    <span className="font-display text-xs text-mut-2">{item.number}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-2xl border border-emerald/20 bg-emerald/[0.06] p-4 text-xs leading-5 text-mut">
                Le dispositif final dépend du diagnostic : aucune brique n’est ajoutée sans objectif précis.
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section id="catalogue" className="section-space border-t border-white/[0.08]">
        <div className="section-shell">
          <AnimateIn className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="section-label">Catalogue</div>
              <h2 className="mt-5 text-[clamp(2.1rem,4.2vw,3.8rem)] font-semibold tracking-[-0.045em]">Six briques, un seul parcours.</h2>
            </div>
            <p className="max-w-[660px] text-base leading-7 text-mut lg:justify-self-end">
              Le détail ci-dessous présente ce que chaque service peut couvrir. Le périmètre exact est défini selon vos outils existants, votre équipe et vos priorités.
            </p>
          </AnimateIn>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-white/[0.08] bg-white/[0.018]">
        <div className="section-shell">
          <AnimateIn className="max-w-[760px]">
            <div className="section-label">Méthode</div>
            <h2 className="mt-5 text-[clamp(2.1rem,4.2vw,3.8rem)] font-semibold tracking-[-0.045em]">Du besoin réel au système utile.</h2>
            <p className="mt-6 text-base leading-7 text-mut">Les outils viennent après le diagnostic. Cette séquence évite d’empiler des solutions qui ne correspondent ni à votre activité ni à votre équipe.</p>
          </AnimateIn>

          <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {method.map((item, index) => (
              <AnimateIn key={item.step} delay={index * 70}>
                <article className="premium-panel h-full p-6">
                  <div className="flex items-center justify-between"><item.icon size={21} strokeWidth={1.7} /><span className="font-display text-xs text-mut-2">{item.step}</span></div>
                  <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-mut">{item.description}</p>
                </article>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <AnimateIn>
            <div className="section-label">Choisir le bon périmètre</div>
            <h2 className="mt-5 max-w-[760px] text-[clamp(2.1rem,4.4vw,4rem)] font-semibold tracking-[-0.05em]">Vous n’avez probablement pas besoin de tout.</h2>
            <p className="mt-6 max-w-[690px] text-base leading-7 text-mut">Le diagnostic sert à identifier le point de friction principal et à choisir la combinaison la plus simple. Vous pouvez commencer avec une base utile, puis l’enrichir lorsque le besoin est confirmé.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/prise-de-rdv" className="btn-grad inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold">Réserver un diagnostic <ArrowRight size={16} /></Link>
              <Link href="/tarifs" className="btn-ghost inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold">Consulter les tarifs</Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="premium-panel p-6 sm:p-8">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black"><Target size={19} /></span><h3 className="text-xl font-semibold">Le diagnostic clarifie</h3></div>
              <ul className="mt-7 grid gap-4">
                {["Votre priorité d’acquisition", "Le parcours de contact à simplifier", "Les outils déjà exploitables", "Le périmètre, le délai et le tarif"].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-mut"><span className="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-emerald/10 text-emerald"><Check size={11} strokeWidth={3} /></span>{item}</li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
