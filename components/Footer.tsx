import Link from "next/link";

const legalLinks = [
  {
    label: "Mentions légales",
    href: "/mentions-legales",
  },
  {
    label: "Confidentialité",
    href: "/confidentialite",
  },
  {
    label: "Cookies",
    href: "/cookies",
  }
 
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Marque */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-xs font-bold text-white">
                OL
              </div>

              <div>
                <p className="text-sm font-bold tracking-tight text-slate-950">
                  OptimalLogic
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Digital, IA & acquisition client
                </p>
              </div>
            </Link>
          </div>

          {/* Liens juridiques */}
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-500 transition hover:text-slate-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="text-xs text-slate-500">
            © 2026 OptimalLogic. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}