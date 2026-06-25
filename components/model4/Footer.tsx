import Link from "next/link";

const G = "#95F547";

const LogoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
    <path d="M3 18L8 4L13 18" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 18L14 4L19 18" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030303]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.8fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoIcon />
              <span className="text-base font-medium text-white">OptimalLogic</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Solutions digitales sur mesure pour commerces locaux, TPE/PME et startups.
            </p>
            <Link href="/prise-de-rdv"
              className="mt-5 inline-flex items-center gap-2 rounded-[5px] text-sm font-medium text-black transition-all hover:brightness-90"
              style={{ backgroundColor: G, padding: "10px 18px" }}>
              Réserver un appel →
            </Link>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Navigation</p>
            <ul className="grid gap-3 text-sm text-gray-500">
              {[["Services", "#services"], ["Tarifs", "#tarifs"], ["Contact", "/contact"]].map(([l, h]) => (
                <li key={l}><a href={h} className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Solutions</p>
            <ul className="grid gap-3 text-sm text-gray-500">
              {["Google Business", "Site web", "Prise de RDV", "Assistant IA"].map(s => (
                <li key={s}><a href="#services" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Légal</p>
            <ul className="grid gap-3 text-sm text-gray-500">
              {[["Mentions légales", "/mentions-legales"], ["Confidentialité", "/confidentialite"], ["Cookies", "/cookies"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-xs text-gray-600">© 2026 OptimalLogic. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
