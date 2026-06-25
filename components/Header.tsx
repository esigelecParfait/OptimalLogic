"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Prise de RDV", href: "/prise-de-rdv" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="text-base font-black tracking-tight text-gray-900 transition-opacity hover:opacity-70"
        >
          ★ OptimalLogic
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "text-gray-900 underline underline-offset-4 decoration-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA desktop */}
        <div className="hidden lg:flex">
          <Link
            href="/espace-client"
            className="btn-hover rounded-full border border-gray-900 px-5 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
          >
            Espace client
          </Link>
        </div>

        {/* Bouton hamburger mobile */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((c) => !c)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 lg:hidden"
        >
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <span className={`block h-0.5 w-5 bg-gray-900 transition-transform duration-300 ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-900 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-900 transition-transform duration-300 ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/espace-client"
              onClick={() => setIsMenuOpen(false)}
              className="btn-hover mt-4 rounded-full bg-gray-900 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Espace client
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
