import Link from "next/link";

const columns = [
  {
    title: "Solutions",
    links: [
      { label: "Google Business", href: "/services" },
      { label: "Site web", href: "/services" },
      { label: "Prise de RDV", href: "/prise-de-rdv" },
      { label: "Assistant IA", href: "/services" },
      { label: "Suivi prospects", href: "/services" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Tarifs", href: "/tarifs" },
      { label: "Espace client", href: "/espace-client" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-32 border-t border-white/[0.07] pb-10 pt-20">
      <div className="mx-auto max-w-[1240px] px-7">
        <div
          aria-hidden
          className="mb-16 select-none text-center font-display text-[clamp(60px,13vw,200px)] font-semibold leading-[0.9] tracking-[-0.03em]"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          OptimalLogic
        </div>

        <div className="mb-12 grid grid-cols-2 gap-11 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl font-display text-base font-bold text-white" style={{ background: "var(--grad)" }}>OL</span>
              <span className="font-display text-[19px] font-semibold text-ink">Optimal<span className="text-cyan">Logic</span></span>
            </Link>
            <p className="mt-[18px] max-w-[300px] text-[14.5px] text-mut">
              Digital, IA &amp; acquisition client. On transforme votre présence en ligne en moteur d&apos;acquisition — sans complexité inutile.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-mut-2">{col.title}</h5>
              {col.links.map((link) => (
                <Link key={link.label} href={link.href} className="block py-[7px] text-[14.5px] text-mut transition-colors hover:text-ink">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-7 text-[13.5px] text-mut-2">
          <span>© 2026 OptimalLogic. Tous droits réservés.</span>
          <span>contact@optimal-logic.com · France · à distance</span>
        </div>
      </div>
    </footer>
  );
}
