import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0C0D0D", color: "#FFFCFE" }}>
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.4px" }}>★ OptimalLogic</p>
            <p className="mt-3 text-sm leading-6" style={{ color: "rgba(255,252,254,0.55)" }}>
              Solutions digitales sur mesure pour être mieux trouvé, mieux compris et plus facilement choisi.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,252,254,0.4)" }}>Navigation</p>
            <ul className="grid gap-2.5 text-sm" style={{ color: "rgba(255,252,254,0.6)" }}>
              {[["Accueil", "/"], ["Services", "/services"], ["Tarifs", "/tarifs"], ["Contact", "/contact"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,252,254,0.4)" }}>Solutions</p>
            <ul className="grid gap-2.5 text-sm" style={{ color: "rgba(255,252,254,0.6)" }}>
              {["Google Business", "Site web", "Prise de RDV", "Assistant IA"].map(s => (
                <li key={s}><Link href="#services" className="hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,252,254,0.4)" }}>Légal</p>
            <ul className="grid gap-2.5 text-sm" style={{ color: "rgba(255,252,254,0.6)" }}>
              {[["Mentions légales", "/mentions-legales"], ["Confidentialité", "/confidentialite"], ["Cookies", "/cookies"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6" style={{ borderColor: "rgba(255,252,254,0.08)" }}>
          <p className="text-sm" style={{ color: "rgba(255,252,254,0.3)" }}>© 2026 OptimalLogic. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
