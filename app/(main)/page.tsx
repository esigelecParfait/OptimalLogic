import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import NeuralBackground from "@/components/fx/NeuralBackground";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CalendarCheck,
  ClipboardList,
  Clock3,
  Globe2,
  Handshake,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Rocket,
  Scissors,
  Search,
  ShieldCheck,
  Store,
  Target,
  Utensils,
  Wrench,
  Scale,
  Stethoscope,
  UsersRound,
} from "lucide-react";
const audienceCards = [
  {
    n: "01",
    t: "Vous êtes un commerce local ?",
    d: "Votre fiche Google Business peut devenir votre première source de visibilité, d’appels et de réservations.",
    icon: Store,
  },
  {
    n: "02",
    t: "Vous êtes indépendant ?",
    d: "Votre image en ligne doit inspirer confiance rapidement et donner envie de vous contacter.",
    icon: BriefcaseBusiness,
  },
  {
    n: "03",
    t: "Vous êtes une PME ou startup ?",
    d: "Votre site doit présenter clairement votre valeur, vos offres et guider vos visiteurs vers l’action.",
    icon: Rocket,
  },
];

const problems = [
  {
    n: "01",
    t: "Fiche Google peu optimisée",
    d: "Une fiche incomplète, peu d’avis ou des photos faibles peuvent envoyer vos prospects chez un concurrent.",
    icon: Search,
  },
  {
    n: "02",
    t: "Site peu convaincant",
    d: "Un site lent, daté ou peu clair ne rassure pas assez vite et fait perdre des demandes.",
    icon: MonitorSmartphone,
  },
  {
    n: "03",
    t: "Demandes mal traitées",
    d: "Quand les messages, appels ou formulaires ne sont pas suivis, les prospects chauds disparaissent.",
    icon: MessageCircle,
  },
  {
    n: "04",
    t: "Parcours de contact flou",
    d: "Sans bouton clair, prise de rendez-vous ou formulaire simple, le client intéressé hésite puis abandonne.",
    icon: CalendarCheck,
  },
];

const solutionCards = [
  {
    t: "Site web professionnel",
    d: "Un site clair, moderne et pensé pour convertir.",
    c: "var(--indigo)",
    span: "md:col-span-2",
    icon: MonitorSmartphone,
  },
  {
    t: "Prise de RDV",
    d: "Des réservations simples, sans friction.",
    c: "var(--cyan)",
    span: "md:col-span-1",
    icon: CalendarCheck,
  },
  {
    t: "Google Business",
    d: "Une fiche optimisée pour être choisi localement.",
    c: "var(--pink)",
    span: "md:col-span-1",
    icon: MapPin,
  },
  {
    t: "Suivi prospects",
    d: "Des demandes centralisées et mieux relancées.",
    c: "var(--violet)",
    span: "md:col-span-2",
    icon: ClipboardList,
  },
];

const difference = [
  {
    n: "1",
    t: "On part de votre activité",
    d: "Un restaurant, un artisan, un cabinet, une PME ou une startup n’ont pas les mêmes besoins digitaux.",
    icon: UsersRound,
  },
  {
    n: "2",
    t: "On active les bons leviers",
    d: "Fiche Google, site web, RDV, assistant IA ou suivi prospects : uniquement ce qui sert vraiment votre objectif.",
    icon: Target,
  },
  {
    n: "3",
    t: "On évite la complexité inutile",
    d: "Vous n’avez pas besoin de tout. Vous avez besoin de ce qui vous correspond et pousse vos clients à agir.",
    icon: ShieldCheck,
  },
  {
    n: "4",
    t: "On mesure ce qui compte",
    d: "Demandes reçues, rendez-vous générés, prospects à relancer et actions prioritaires deviennent visibles.",
    icon: BarChart3,
  },
];

const results = [
  {
    n: "01",
    t: "Être mieux trouvé",
    d: "Une présence Google claire pour apparaître au bon moment, devant les bonnes personnes.",
    icon: Search,
  },
  {
    n: "02",
    t: "Inspirer confiance",
    d: "Des informations, visuels et messages qui rassurent dès les premières secondes.",
    icon: ShieldCheck,
  },
  {
    n: "03",
    t: "Recevoir plus de demandes",
    d: "Des boutons d’action visibles pour appeler, réserver ou demander un devis facilement.",
    icon: MessageCircle,
  },
  {
    n: "04",
    t: "Gagner du temps",
    d: "Un assistant IA peut répondre aux questions répétitives, même quand vous êtes occupé.",
    icon: Clock3,
  },
];

const audiences = [
  { label: "Commerces locaux", icon: Store },
  { label: "Restaurants", icon: Utensils },
  { label: "Salons & instituts", icon: Scissors },
  { label: "Artisans", icon: Wrench },
  { label: "Cabinets professionnels", icon: Scale },
  { label: "Cabinets médicaux", icon: Stethoscope },
  { label: "Indépendants", icon: BriefcaseBusiness },
  { label: "PME", icon: Globe2 },
  { label: "Startups", icon: Rocket },
  { label: "Formateurs & coachs", icon: Target },
  { label: "Prestataires de services", icon: Handshake },
];

const marquee = [
  "Google Business",
  "Site web professionnel",
  "Prise de RDV",
  "Assistant IA",
  "Formulaire intelligent",
  "Suivi prospects",
];

const dashboardActions = [
  { n: "01", t: "Relancer 4 prospects chauds", d: "Priorité commerciale" },
  { n: "02", t: "Demander 7 avis clients", d: "Impact local" },
  { n: "03", t: "Optimiser l’offre la plus consultée", d: "Conversion" },
];
function IconFrame({
  icon: Icon,
  tone = "default",
}: {
  icon: LucideIcon;
  tone?: "default" | "danger" | "success";
}) {
  const styles = {
    default: {
      color: "var(--cyan)",
      background: "rgba(124,92,255,0.14)",
      borderColor: "rgba(255,255,255,0.13)",
    },
    danger: {
      color: "#ff7a90",
      background: "rgba(255,77,157,0.12)",
      borderColor: "rgba(255,77,157,0.24)",
    },
    success: {
      color: "var(--emerald)",
      background: "rgba(46,230,168,0.12)",
      borderColor: "rgba(46,230,168,0.22)",
    },
  };

  return (
    <div
      className="mb-5 grid h-[54px] w-[54px] place-items-center rounded-[16px] border transition-transform duration-300 group-hover:scale-105"
      style={styles[tone]}
    >
      <Icon size={23} strokeWidth={1.8} />
    </div>
  );
}
function Check() {
  return <BadgeCheck size={17} strokeWidth={2.3} className="text-emerald" />;
}

function Arrow() {
  return <ArrowRight size={16} strokeWidth={2.5} />;
}

export default function HomePage() {
  return (
    <main className="relative">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-7 pb-24 pt-44 lg:pt-52">
        <NeuralBackground className="opacity-90" />

        <div className="relative z-[2] mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div
              className="mb-7 inline-flex items-center gap-[10px] rounded-full border border-white/[0.13] px-4 py-2 text-[13px] font-semibold text-ink"
              style={{ background: "var(--grad-soft)" }}
            >
              <span
                className="h-2 w-2 rounded-full bg-emerald"
                style={{
                  boxShadow: "0 0 12px var(--emerald)",
                  animation: "blink 1.6s infinite",
                }}
              />
              Google Business • Site web • RDV • Assistant IA
            </div>

            <h1 className="text-[clamp(42px,5.8vw,76px)] font-semibold">
              Faites de votre présence en ligne un vrai{" "}
              <span className="grad-text-kinetic">moteur de clients</span>.
            </h1>

            <p className="mt-7 max-w-[560px] text-[clamp(17px,1.4vw,20px)] text-mut">
              Google Business, site web, prise de rendez-vous, assistant IA et
              suivi des demandes — adaptés à votre activité.
            </p>

            <div className="mt-10 flex flex-wrap gap-[14px]">
              <Link
                href="/prise-de-rdv"
                className="btn-grad inline-flex items-center gap-2 rounded-full px-[30px] py-4 text-[15px] font-semibold"
              >
                Réserver un appel gratuit <Arrow />
              </Link>
              <Link
                href="/services"
                className="btn-ghost inline-flex items-center rounded-full px-[30px] py-4 text-[15px] font-semibold"
              >
                Améliorer ma visibilité
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-[26px]">
              {[
                "Diagnostic gratuit",
                "Sans engagement",
                "Solutions adaptées",
              ].map((text) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-[9px] text-sm text-mut"
                >
                  <Check /> {text}
                </span>
              ))}
            </div>
          </div>

          {/* Dashboard mockup */}
          <AnimateIn delay={150}>
            <div
              className="relative rounded-[26px] border border-white/[0.13] p-[22px] shadow-[0_50px_110px_-40px_rgba(0,0,0,0.95)]"
              style={{
                background:
                  "linear-gradient(165deg, rgba(16,20,42,0.95), rgba(8,10,22,0.95))",
              }}
            >
              <div className="mb-[18px] flex items-center justify-between">
                <div className="flex items-center gap-[10px] text-sm font-semibold">
                  <span
                    className="grid h-[30px] w-[30px] place-items-center rounded-[9px] font-display text-xs font-bold text-white"
                    style={{ background: "var(--grad)" }}
                  >
                    OL
                  </span>
                  Performance digitale
                </div>
                <span className="inline-flex items-center gap-[6px] text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald">
                  <span
                    className="h-[6px] w-[6px] rounded-full bg-emerald"
                    style={{ animation: "blink 1.4s infinite" }}
                  />{" "}
                  En progression
                </span>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3">
                {[
                  { l: "Demandes reçues", v: "48", d: "+32% ce mois" },
                  { l: "RDV générés", v: "19", d: "+11 nouveaux" },
                  { l: "Prospects chauds", v: "12", d: "À relancer" },
                  { l: "Valeur estimée", v: "2 840€", d: "opportunités" },
                ].map((stat) => (
                  <div
                    key={stat.l}
                    className="rounded-[15px] border border-white/[0.07] p-4"
                    style={{ background: "rgba(16,20,42,0.8)" }}
                  >
                    <p className="text-xs text-mut-2">{stat.l}</p>
                    <p className="mt-2 font-display text-[27px] font-semibold">
                      {stat.v}
                    </p>
                    <p className="mt-1 text-[11.5px] font-semibold text-emerald">
                      {stat.d}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="rounded-[15px] border border-white/[0.07] p-4"
                style={{ background: "rgba(16,20,42,0.8)" }}
              >
                <div className="mb-[14px] flex items-center justify-between text-[12.5px] text-mut">
                  <span>Actions recommandées</span>
                  <span className="grad-text font-bold">Aujourd’hui</span>
                </div>

                <div className="flex flex-col gap-3">
                  {dashboardActions.map((action) => (
                    <div
                      key={action.n}
                      className="flex items-center gap-3 rounded-[13px] border border-white/[0.07] p-3"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <span className="grad-text w-8 shrink-0 font-display text-[18px] font-semibold leading-none">
                        {action.n}
                      </span>
                      <div>
                        <p className="text-[13.5px] font-semibold text-ink">
                          {action.t}
                        </p>
                        <p className="text-[12px] text-mut-2">{action.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div
        className="relative z-[2] overflow-hidden border-y border-white/[0.07] py-[26px]"
        style={{ background: "rgba(8,10,22,0.5)" }}
      >
        <div className="flex w-max animate-marquee gap-14">
          {[...marquee, ...marquee].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-[14px] whitespace-nowrap font-display text-[22px] font-medium text-mut"
            >
              <span className="text-indigo">✦</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ===== POUR QUI ===== */}
      <section className="relative z-[2] px-7 py-[95px]">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mx-auto mb-[56px] max-w-[720px] text-center">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">
              Pour qui ?
            </span>
            <h2 className="text-[clamp(34px,4.6vw,52px)]">
              Chaque activité a sa place.
            </h2>
            <p className="mt-4 text-lg text-mut">
              Votre présence digitale doit refléter votre réalité : commerce
              local, indépendant, PME ou startup.
            </p>
          </AnimateIn>

          <div className="grid gap-[22px] md:grid-cols-3">
            {audienceCards.map((card, index) => (
              <AnimateIn key={card.n} delay={index * 80}>
                <div className="surface-card group relative h-full overflow-hidden rounded-[22px] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.13]">
                  <span className="absolute right-[30px] top-[26px] font-display text-sm text-mut-2">
                    {card.n}
                  </span>
                  <IconFrame icon={card.icon} />
                  <h3 className="mb-[10px] text-xl font-semibold">{card.t}</h3>
                  <p className="text-[15px] text-mut">{card.d}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROBLÈME ===== */}
      <section className="relative z-[2] px-7 py-[105px]">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mx-auto mb-[70px] max-w-[820px] text-center">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">
              Le vrai problème
            </span>
            <h2 className="text-[clamp(34px,4.6vw,52px)]">
              Le problème n’est pas toujours l’absence de site. C’est l’absence
              de clarté.
            </h2>
            <p className="mt-4 text-lg text-mut">
              Fiche Google incomplète, photos peu attractives, avis mal
              exploités, pas de réservation simple — voilà ce qui fait perdre
              des clients.
            </p>
          </AnimateIn>

          <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, i) => (
              <AnimateIn key={p.n} delay={(i % 2) * 80}>
                <div className="surface-card group relative h-full overflow-hidden rounded-[22px] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.13]">
                  <span className="absolute right-[30px] top-[26px] font-display text-sm text-mut-2">
                    {p.n}
                  </span>

                  <IconFrame icon={p.icon} tone="danger" />

                  <h3 className="mb-[10px] text-xl font-semibold">{p.t}</h3>
                  <p className="text-[15px] text-mut">{p.d}</p>
                </div>
              </AnimateIn>
))}
          </div>
        </div>
      </section>

      {/* ===== VISION ===== */}
      <section className="relative z-[2] px-7 py-[110px]">
        <AnimateIn className="mx-auto max-w-[1000px] text-center">
          <span className="eyebrow-grad mb-[18px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">
            Notre vision
          </span>
          <p className="font-display text-[clamp(30px,4.4vw,56px)] font-medium leading-[1.18]">
            Nous ne partons pas d’un outil. Nous partons de{" "}
            <span className="grad-text">votre activité</span>.
          </p>
          <p className="mx-auto mt-8 max-w-[680px] text-lg text-mut">
            Un restaurant, un artisan, un cabinet, une PME ou une marque
            digitale n’ont pas les mêmes besoins. Parfois, une fiche Google
            optimisée suffit. Parfois, un site complet devient nécessaire.
          </p>
          <p className="mx-auto mt-6 max-w-[700px] text-[20px] text-ink">
            “Le bon digital n’est pas forcément le plus compliqué. C’est celui
            qui aide vos clients à vous choisir.”
          </p>
        </AnimateIn>
      </section>

      {/* ===== SOLUTIONS ===== */}
      <section className="relative z-[2] px-9 py-[125px]">
        <div className="mx-auto max-w-[1260px]">
          <AnimateIn className="mx-auto mb-[70px] max-w-[760px] text-center">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">
              Solutions
            </span>
            <h2 className="text-[clamp(34px,4.6vw,52px)]">
              Une présence digitale sur mesure, selon vos vrais besoins.
            </h2>
            <p className="mt-4 text-lg text-mut">
              Google Business, site web, réservation, assistant IA, formulaire
              et suivi prospects : on active uniquement les leviers utiles.
            </p>
            <Link
              href="/services"
              className="btn-ghost mt-8 inline-flex items-center rounded-full px-[30px] py-4 text-[15px] font-semibold"
            >
              Voir les services
            </Link>
          </AnimateIn>

          <div className="grid gap-5 md:grid-cols-4 md:[grid-auto-rows:215px]">
            <AnimateIn className="md:col-span-2 md:row-span-2">
              <div className="surface-card relative flex h-full flex-col justify-end overflow-hidden rounded-[24px] p-[30px] transition-all hover:-translate-y-1 hover:border-white/[0.13]">
                <span
                  className="absolute right-[26px] top-[26px] z-[2] rounded-full px-3 py-[5px] text-[11px] font-bold text-[#d8a9ff]"
                  style={{ background: "rgba(177,77,255,0.16)" }}
                >
                  Gain de temps · 24/7
                </span>
                <div
                  className="absolute right-7 top-7 h-[86px] w-[86px] animate-orb rounded-full blur-[2px]"
                  style={{
                    background: "var(--grad)",
                    boxShadow: "0 0 60px rgba(124,92,255,0.7)",
                  }}
                />
                <div className="relative z-[1] mb-auto">
                  <IconFrame icon={Bot} />
                </div>
                <h3 className="relative z-[1] mb-2 mt-auto text-[30px] font-semibold">
                  Assistant IA
                </h3>
                <p className="relative z-[1] text-[14.5px] text-mut">
                  Un conseiller disponible 24h/24 pour répondre aux questions
                  fréquentes et guider les visiteurs vers l’action.
                </p>
                <div className="relative z-[1] mt-5 flex max-w-[330px] flex-col gap-2">
                  <span
                    className="w-fit self-end rounded-[14px] rounded-br-[4px] border border-white/[0.13] px-4 py-2 text-[13px]"
                    style={{ background: "rgba(124,92,255,0.18)" }}
                  >
                    Vous êtes ouverts aujourd’hui ?
                  </span>
                  <span
                    className="w-fit rounded-[14px] rounded-bl-[4px] border border-white/[0.07] px-4 py-2 text-[13px] text-mut"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    Oui. Je peux aussi vous proposer un créneau.
                  </span>
                </div>
              </div>
            </AnimateIn>

            {solutionCards.map((solution, index) => (
              <AnimateIn
                key={solution.t}
                className={solution.span}
                delay={(index % 2) * 80}
              >
                <div className="surface-card group relative flex h-full flex-col justify-end overflow-hidden rounded-[24px] p-[30px] transition-all hover:-translate-y-1 hover:border-white/[0.13]">
                  <div
                    className="absolute -right-16 -top-16 h-[220px] w-[220px] rounded-full opacity-50 blur-[70px]"
                    style={{ background: solution.c }}
                  />

                  <div className="relative z-[1] mb-auto">
                    <IconFrame icon={solution.icon} />
                  </div>
                  <h3 className="relative z-[1] mb-2 mt-2 text-[21px] font-semibold">
                    {solution.t}
                  </h3>
                  <p className="relative z-[1] text-[14.5px] text-mut">
                    {solution.d}
                  </p>
                </div>
              </AnimateIn>
            ))}          </div>
        </div>
      </section>

      {/* ===== DIFFÉRENCE ===== */}
      <section className="relative z-[2] px-7 py-[105px]">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mx-auto mb-[56px] max-w-[820px] text-center">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">
              Notre différence
            </span>
            <h2 className="text-[clamp(30px,4vw,48px)]">
              Vous n’avez pas besoin de tout. Vous avez besoin de ce qui vous
              correspond.
            </h2>
            <p className="mt-4 text-lg text-mut">
              Fiche Google, site web, réservation ou assistant IA — notre rôle
              est de vous orienter vers ce qui est vraiment utile, sans vous
              vendre ce qui ne sert pas.
            </p>
          </AnimateIn>

          <div className="grid gap-[22px] md:grid-cols-2 lg:grid-cols-4">
            {difference.map((item, index) => (
              <AnimateIn key={item.n} delay={index * 70}>
                <div className="surface-card h-full rounded-[22px] p-8 transition-all hover:-translate-y-1 hover:border-white/[0.13]">
                  <div className="relative mb-5">
                    <IconFrame icon={item.icon} />
                    <span
                      className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full font-display text-[11px] font-bold text-white"
                      style={{ background: "var(--grad)" }}
                    >
                      {item.n}
                    </span>
                  </div>
                  <h3 className="mb-[10px] text-xl font-semibold">{item.t}</h3>
                  <p className="text-[15px] text-mut">{item.d}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RÉSULTATS ===== */}
      <section className="relative z-[2] px-7 py-[105px]">
        <div className="mx-auto grid max-w-[1240px] items-start gap-[60px] lg:grid-cols-[0.8fr_1.2fr]">
          <AnimateIn className="lg:sticky lg:top-[130px]">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">
              Résultats
            </span>
            <h2 className="text-[clamp(32px,4.4vw,48px)]">
              Ce que votre présence digitale peut changer.
            </h2>
            <p className="mt-4 text-[17px] text-mut">
              L’objectif n’est pas d’avoir plus d’outils. L’objectif est d’être
              trouvé, compris, choisi et contacté plus facilement.
            </p>
          </AnimateIn>

          <div className="flex flex-col gap-[18px]">
            {results.map((result, index) => (
              <AnimateIn key={result.n} delay={index * 80}>
                <div
                  className="group flex gap-[22px] rounded-[22px] border border-white/[0.07] p-7 transition-all hover:-translate-y-1 hover:border-white/[0.13]"
                  style={{ background: "rgba(11,14,29,0.6)" }}
                >
                  <div className="shrink-0">
                    <IconFrame icon={result.icon} tone="success" />
                  </div>
                  <div>
                    <span className="grad-text mb-2 block font-display text-[18px] font-semibold leading-none">
                      {result.n}
                    </span>
                    <h4 className="mb-2 text-xl font-semibold">{result.t}</h4>
                    <p className="text-[15px] text-mut">{result.d}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACTIVITÉS ===== */}
      <section className="relative z-[2] px-7 py-[85px]">
        <div className="mx-auto max-w-[1240px]">
          <AnimateIn className="mx-auto mb-12 max-w-[760px] text-center">
            <span className="eyebrow-grad mb-[14px] inline-block text-[13px] font-semibold uppercase tracking-[0.16em]">
              Activités accompagnées
            </span>
            <h2 className="text-[clamp(32px,4.4vw,48px)]">
              Une présence digitale pensée pour chaque type d’activité.
            </h2>
            <p className="mt-4 text-lg text-mut">
              Que vous soyez un commerce de quartier, un restaurant, un artisan,
              un cabinet, une PME ou une marque en développement, votre présence
              en ligne doit refléter votre valeur et faciliter le passage à
              l’action.
            </p>
          </AnimateIn>

          <div className="flex flex-wrap justify-center gap-[14px]">
            {audiences.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="surface-card inline-flex items-center gap-3 rounded-full px-[24px] py-[14px] text-[15px] font-medium text-mut transition-colors hover:border-indigo hover:text-ink"
              >
                <Icon size={18} strokeWidth={1.8} className="text-cyan" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden rounded-[30px] border border-white/[0.13] px-8 py-14 text-center md:px-10 md:py-16">
        <AnimateIn className="mx-auto max-w-[1240px]">
          <div
            className="relative overflow-hidden rounded-[36px] border border-white/[0.13] px-[50px] py-[82px] text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,92,255,0.22), rgba(31,213,240,0.12))",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(177,77,255,0.4), transparent 60%)",
              }}
            />
            <div className="relative">
              <div
                className="mb-6 inline-flex items-center gap-[10px] rounded-full border border-white/[0.13] px-4 py-2 text-[13px] font-semibold text-ink"
                style={{ background: "var(--grad-soft)" }}
              >
                <span className="h-2 w-2 rounded-full bg-emerald" /> Première
                étape · diagnostic gratuit
              </div>
             <h2 className="text-[clamp(32px,4.6vw,54px)]">
              Vous ne savez pas par où commencer ?
              <br />
              C’est justement notre rôle.
            </h2>
              <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-7 text-mut">
                Réservez un appel gratuit. Nous analysons votre présence actuelle et vous proposons la solution la plus adaptée.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-[14px]">
                <Link
                  href="/prise-de-rdv"
                  className="btn-grad inline-flex items-center gap-2 rounded-full px-[30px] py-4 text-[15px] font-semibold"
                >
                  Réserver un appel gratuit <Arrow />
                </Link>
                <Link
                  href="/tarifs"
                  className="btn-ghost inline-flex items-center rounded-full px-[30px] py-4 text-[15px] font-semibold"
                >
                  Nos formules
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
