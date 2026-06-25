import Link from "next/link";

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="text-base font-black tracking-tight text-gray-900 transition-opacity hover:opacity-70"
          >
            ★ OptimalLogic
          </Link>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 transition-colors hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400">
            © 2026 OptimalLogic. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
