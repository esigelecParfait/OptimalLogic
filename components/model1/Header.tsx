"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Accueil", href: "/preview/modele-1" },
  { label: "Services", href: "/preview/modele-1/services" },
  { label: "Tarifs", href: "/preview/modele-1/tarifs" },
  { label: "Prise de RDV", href: "/preview/modele-1/prise-de-rdv" },
  { label: "Contact", href: "/preview/modele-1/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/preview/modele-1"
          className="flex items-center gap-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-sm">
            OL
          </div>

          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-slate-950">
              OptimalLogic
            </p>
            <p className="hidden text-xs font-medium text-slate-500 sm:block">
              Digital, IA & acquisition client
            </p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/espace-client"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
          >
            Espace client
          </Link>
        </div>

        {/* Bouton mobile */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition hover:bg-slate-100 lg:hidden"
        >
          <span className="relative flex h-5 w-5 flex-col justify-center gap-1.5">
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-slate-950 text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/aide"
              onClick={() => setIsMenuOpen(false)}
              className="flex min-h-11 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M9.6 9a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 1.8-2.4 3.1" />
                <path d="M12 17h.01" />
              </svg>
              Aide
            </Link>

            <Link
              href="/espace-client"
              onClick={() => setIsMenuOpen(false)}
              className="mt-3 rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Espace client
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
