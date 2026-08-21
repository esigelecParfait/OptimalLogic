import Link from "next/link";
import Brand from "@/components/Brand";

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] px-4 pb-5 pt-16 sm:px-7">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0d0d0f]/85">
        <div className="grid gap-10 px-6 py-9 sm:px-9 sm:py-11 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <div>
            <Brand />
            <p className="mt-5 max-w-[430px] text-sm leading-6 text-mut">
              Une présence digitale claire, des parcours simples et des outils utiles pour transformer l’intérêt en demandes concrètes.
            </p>
            <a href="mailto:contact@optimal-logic.com" className="mt-5 inline-flex text-sm font-semibold text-ink underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white">
              contact@optimal-logic.com
            </a>
          </div>

          <div className="md:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-mut-2">Informations</p>
            <nav aria-label="Informations légales" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-mut transition-colors hover:text-ink">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/[0.08] px-6 py-4 text-xs text-mut-2 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <p>© {new Date().getFullYear()} OptimalLogic</p>
          <p>Digital · IA · Acquisition client</p>
        </div>
      </div>
    </footer>
  );
}
