import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import NeuralBackground from "@/components/fx/NeuralBackground";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck,
  Check,
  ClipboardList,
  Compass,
  MapPin,
  MessageCircle,
  Rocket,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  UsersRound,
  Wrench,
} from "lucide-react";

type Service = {
  label: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  glow: string;
  objective: string;
  levers: string[];
  result: string;
};

type MethodStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    label: "Commerces locaux",
    number: "01",
    title: "Être trouvé, rassurer et être choisi rapidement",
    description:
      "Pour un commerce, le digital doit aider le client à vous trouver au bon moment, comprendre ce que vous proposez et passer à l’action sans hésiter.",
    icon: Store,
    glow: "var(--cyan)",
    objective: "Transformer la recherche locale en appel, réservation ou visite.",
    levers: [
      "Google Business optimisé",
      "Photos, horaires et services clairs",
      "Avis clients mieux valorisés",
      "Contact ou réservation simplifiés",
      "Messagerie IA pour les questions fréquentes",
    ],
    result:
      "Une présence locale plus claire, plus rassurante et plus efficace au moment où vos clients cherchent.",
  },
  {
    label: "TPE / PME",
    number: "02",
    title: "Générer des prospects et mieux suivre les demandes",
    description:
      "Pour une TPE ou une PME, la présence digitale doit renforcer la crédibilité, présenter les services et éviter que les demandes intéressantes se perdent.",
    icon: Building2,
    glow: "var(--indigo)",
    objective: "Transformer votre site et vos formulaires en vrai système commercial.",
    levers: [
      "Site web professionnel",
      "Formulaire ou demande de devis",
      "Prise de rendez-vous si nécessaire",
      "Assistant IA pour qualifier les demandes",
      "Tableau de suivi prospects et relances",
    ],
    result:
      "Une entreprise plus crédible en ligne, avec un meilleur suivi des opportunités commerciales.",
  },
  {
    label: "Startups",
    number: "03",
    title: "Clarifier l’offre, lancer vite et prouver la traction",
    description:
      "Pour une startup, le digital doit permettre de tester une proposition de valeur, mesurer l’intérêt et créer des premiers signaux de traction.",
    icon: Rocket,
    glow: "var(--pink)",
    objective: "Valider l’intérêt du marché avec un parcours simple et mesurable.",
    levers: [
      "Landing page orientée conversion",
      "Waitlist, bêta ou demande de démo",
      "Qualification des leads",
      "Séquences de relance",
      "Analytics et dashboard de traction",
    ],
    result:
      "Un système de lancement qui aide à comprendre le marché, convaincre les prospects et suivre la traction.",
  },
];

const method: MethodStep[] = [
  {
    step: "01",
    title: "Comprendre votre activité",
    description:
      "On identifie votre type de client, votre manière de vendre et l’action qui compte vraiment : appel, rendez-vous, devis, réservation ou inscription.",
    icon: Compass,
  },
  {
    step: "02",
    title: "Construire le bon parcours",
    description:
      "On définit le chemin le plus simple pour passer d’un visiteur intéressé à une demande concrète et qualifiée.",
    icon: Route,
  },
  {
    step: "03",
    title: "Mettre en place les bons outils",
    description:
      "Google Business, site web, assistant IA, prise de rendez-vous, CRM ou automatisations : chaque outil sert un objectif précis.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Suivre et améliorer",
    description:
      "On suit les demandes, rendez-vous, avis, relances et points de blocage pour améliorer progressivement les résultats.",
    icon: BarChart3,
  },
];

const summary = [
  {
    t: "Visibilité locale",
    h: "Être trouvé et choisi",
    d: "Google Business, avis, photos, horaires, contact et réservation.",
    icon: MapPin,
  },
  {
    t: "Acquisition & suivi",
    h: "Ne plus perdre les demandes",
    d: "Site, formulaire, prise de rendez-vous, qualification et relances.",
    icon: ClipboardList,
  },
  {
    t: "Validation marché",
    h: "Prouver l’intérêt rapidement",
    d: "Landing page, waitlist, démo, CRM, analytics et traction.",
    icon: Target,
  },
];

const heroProofs = [
  {
    label: "Être trouvé",
    description: "Google Business, référencement local et clarté de l’offre.",
    icon: Search,
  },
  {
    label: "Inspirer confiance",
    description: "Site moderne, avis, preuves, messages simples et cohérents.",
    icon: ShieldCheck,
  },
  {
    label: "Déclencher l’action",
    description: "RDV, formulaire, appel, devis, inscription ou demande de démo.",
    icon: CalendarCheck,
  },
  {
    label: "Suivre les demandes",
    description: "Prospects centralisés, relances, notifications et visibilité.",
    icon: MessageCircle,
  },
];

function IconFrame({
  icon: Icon,
  tone = "default",
}: {
  icon: LucideIcon;
  tone?: "default" | "soft";
}) {
  const styles = {
    default: {
      color: "var(--cyan)",
      background: "rgba(124,92,255,0.14)",
      borderColor: "rgba(255,255,255,0.13)",
    },
    soft: {
      color: "var(--ink)",
      background: "var(--grad-soft)",
      borderColor: "rgba(255,255,255,0.14)",
    },
  };

  return (
    <div
      className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-[18px] border transition-transform duration-300 group-hover:scale-105"
      style={styles[tone]}
    >
      <Icon size={25} strokeWidth={1.7} />
    </div>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm font-medium leading-6 text-mut">
      <span
        className="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-[10px] text-white"
        style={{ background: "rgba(46,230,168,0.16)", color: "var(--emerald)" }}
      >
        <Check size={13} strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

function Arrow() {
  return <ArrowRight size={17} strokeWidth={2} />;
}

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative isolate overflow-hidden px-7 pb-20 pt-44 lg:pt-52">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
          <NeuralBackground />
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-28 z-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: "var(--grad)" }}
        />

        <div className="relative z-[2] mx-auto max-w-[1240px]">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <AnimateIn>
              <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
                Services digitaux · IA · acquisition client
              </span>

              <h1 className="mt-6 text-[clamp(38px,5vw,64px)] font-semibold leading-[0.98] tracking-[-0.04em]">
                Le bon service n’est pas forcément le plus complet.
                <span className="grad-text"> C’est celui qui aide vos clients à vous choisir.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-mut">
                OptimalLogic construit des systèmes digitaux adaptés à votre activité : visibilité Google, site web, prise de rendez-vous, assistant IA, suivi des prospects et automatisations utiles.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/prise-de-rdv"
                  className="btn-grad inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                >
                  Demander un diagnostic gratuit <Arrow />
                </Link>
                <Link
                  href="#services"
                  className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                >
                  Voir les services
                </Link>
              </div>
            </AnimateIn>

            <AnimateIn delay={140}>
              <div className="surface-card relative overflow-hidden rounded-[28px] p-7 sm:p-8">
                <div
                  className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-[90px]"
                  style={{ background: "var(--cyan)" }}
                />

                <div className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <IconFrame icon={Sparkles} tone="soft" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">
                        Notre logique
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold leading-snug">
                        Activité d’abord. Outil ensuite.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {heroProofs.map(({ label, description, icon: Icon }) => (
                      <div
                        key={label}
                        className="group flex items-start gap-4 rounded-2xl border border-white/[0.07] p-4 transition-all hover:border-white/[0.13]"
                        style={{ background: "rgba(16,20,42,0.52)" }}
                      >
                        <div
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.1]"
                          style={{ background: "rgba(124,92,255,0.12)", color: "var(--cyan)" }}
                        >
                          <Icon size={20} strokeWidth={1.8} />
                        </div>
                        <div>
                          <p className="font-display text-sm font-semibold text-ink">{label}</p>
                          <p className="mt-1 text-sm leading-6 text-mut">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-[2] px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mb-12 max-w-3xl">
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
              Nos services
            </span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.03em]">
              Trois contextes différents, trois systèmes adaptés
            </h2>
            <p className="mt-4 text-base leading-7 text-mut">
              Nous ne vous imposons pas une pile d’outils. Nous partons du blocage réel : visibilité, conversion, suivi commercial ou validation marché.
            </p>
          </AnimateIn>

          <div className="grid gap-6">
            {services.map((service, i) => (
              <AnimateIn key={service.label} delay={i * 80}>
                <article className="surface-card group relative overflow-hidden rounded-[30px] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.13] sm:p-9 lg:p-10">
                  <div
                    className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-35 blur-[95px]"
                    style={{ background: service.glow }}
                  />

                  <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    <div>
                      <div className="mb-7 flex items-center gap-5">
                        <span className="font-display text-4xl font-semibold text-mut-2">
                          {service.number}
                        </span>
                        <span
                          className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink"
                          style={{ background: "var(--grad-soft)" }}
                        >
                          <service.icon size={15} strokeWidth={1.8} />
                          {service.label}
                        </span>
                      </div>

                      <IconFrame icon={service.icon} />

                      <h3 className="mt-6 text-[clamp(24px,2.8vw,34px)] font-semibold leading-tight tracking-[-0.03em]">
                        {service.title}
                      </h3>

                      <p className="mt-4 max-w-2xl text-base leading-7 text-mut">
                        {service.description}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div
                        className="rounded-3xl border border-white/[0.08] p-6"
                        style={{ background: "rgba(16,20,42,0.52)" }}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">
                          Objectif
                        </p>
                        <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
                          {service.objective}
                        </p>
                      </div>

                      <div
                        className="rounded-3xl border border-white/[0.08] p-6"
                        style={{ background: "rgba(16,20,42,0.42)" }}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">
                          Leviers principaux
                        </p>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                          {service.levers.map((lever) => (
                            <CheckItem key={lever}>{lever}</CheckItem>
                          ))}
                        </ul>
                      </div>

                      <div
                        className="rounded-3xl border border-white/[0.13] p-6"
                        style={{ background: "var(--grad-soft)" }}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-mut-2">
                          Résultat attendu
                        </p>
                        <p className="mt-3 text-sm leading-6 text-mut">{service.result}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="relative z-[2] px-7 py-16">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <AnimateIn>
            <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
              Méthode
            </span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.03em]">
              Du résultat,
              <br />
              <span className="grad-text">pas seulement du design</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-mut">
              La bonne question n’est pas “quel outil faut-il ajouter ?”, mais “quelle action le client doit-il faire après vous avoir trouvé ?”.
            </p>
          </AnimateIn>

          <div className="grid gap-4">
            {method.map((item, i) => (
              <AnimateIn key={item.step} delay={i * 80}>
                <div
                  className="group flex gap-5 rounded-3xl border border-white/[0.07] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.13]"
                  style={{ background: "rgba(11,14,29,0.62)" }}
                >
                  <div className="flex shrink-0 flex-col items-center gap-3">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl font-display text-sm font-bold text-white"
                      style={{ background: "var(--grad)" }}
                    >
                      {item.step}
                    </span>
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.1]">
                      <item.icon size={19} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-mut">{item.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* RÉSUMÉ */}
      <section className="relative z-[2] px-7 py-16">
        <AnimateIn className="mx-auto max-w-[1240px]">
          <div className="surface-card rounded-[30px] p-7 sm:p-10">
            <div className="max-w-2xl">
              <span className="eyebrow-grad text-[13px] font-semibold uppercase tracking-[0.16em]">
                Résumé
              </span>
              <h2 className="mt-3 text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.03em]">
                Le bon service dépend du vrai besoin
              </h2>
              <p className="mt-4 text-base leading-7 text-mut">
                Un commerce, une PME et une startup n’ont pas le même enjeu. Notre rôle est de choisir le système qui sert votre objectif réel.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {summary.map(({ t, h, d, icon: Icon }) => (
                <div
                  key={t}
                  className="group rounded-3xl border border-white/[0.07] p-6 transition-all hover:-translate-y-1 hover:border-white/[0.13]"
                  style={{ background: "rgba(16,20,42,0.5)" }}
                >
                  <IconFrame icon={Icon} />
                  <span className="mt-5 block grad-text font-display text-sm font-semibold uppercase tracking-wider">
                    {t}
                  </span>
                  <p className="mt-3 font-display text-lg font-semibold">{h}</p>
                  <p className="mt-2 text-sm leading-6 text-mut">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* CTA */}
      <section className="relative z-[2] px-7 pb-24 pt-8">
        <AnimateIn className="mx-auto max-w-[1240px]">
          <div
            className="relative overflow-hidden rounded-[32px] border border-white/[0.13] p-8 sm:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,92,255,0.2), rgba(31,213,240,0.1))",
            }}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-35 blur-[100px]"
              style={{ background: "var(--cyan)" }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-1.5 text-xs font-semibold text-ink"
                  style={{ background: "var(--grad-soft)" }}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald" /> Diagnostic gratuit
                </span>

                <h2 className="mt-5 text-[clamp(28px,4vw,46px)] font-semibold leading-tight tracking-[-0.03em]">
                  Vous ne savez pas encore quel système correspond à votre activité ?
                </h2>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-mut">
                  On analyse votre présence actuelle, vos objectifs et vos points de blocage pour vous orienter vers la solution la plus utile.
                </p>
              </div>

              <div className="surface-card rounded-[24px] p-7">
                <div className="mb-5 flex items-center gap-4">
                  <IconFrame icon={UsersRound} tone="soft" />
                  <div>
                    <p className="font-display text-xl font-semibold">Parlons de votre projet</p>
                    <p className="mt-1 text-sm text-mut">Un échange simple pour identifier les priorités.</p>
                  </div>
                </div>

                <Link
                  href="/prise-de-rdv"
                  className="btn-grad inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Demander un diagnostic gratuit <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
