"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [

  { label: "Services", href: "/services" },
  { label: "Tarifs", href: "/tarifs" },

  { label: "Contact", href: "/contact" },
];
//jrhrhrhrhhrhrhhr
export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-transform duration-300 ${
        scrolled && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        className="relative mx-4 mt-4 flex items-center justify-between px-4 py-3 transition-all duration-300 sm:px-7"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl font-display text-base font-bold text-black shadow-[0_10px_28px_-12px_rgba(255,255,255,0.45)]" style={{ background: "var(--grad)" }}>
            OL
          </span>
          <span className="font-display text-[19px] font-semibold text-ink">
            Optimal<span className="text-white">Logic</span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-[15px] py-[9px] text-sm font-medium transition-all ${
                  active ? "bg-white/[0.06] text-ink" : "text-mut hover:bg-white/[0.05] hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA desktop */}
        <div className="hidden items-center gap-[10px] lg:flex">
          <Link
            href="/espace-client"
            className="btn-ghost rounded-full px-[22px] py-3 text-sm font-semibold"
          >
            Espace client
          </Link>
          <Link
            href="/prise-de-rdv"
            className="btn-grad inline-flex items-center gap-2 rounded-full px-[22px] py-3 text-sm font-semibold"
          >
            Prendre RDV
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Bouton hamburger mobile */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((c) => !c)}
          className="grid h-10 w-10 place-items-center text-ink lg:hidden"
        >
          {isMenuOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] max-h-[calc(100vh-104px)] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#121214]/95 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link) => {
                const active = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-xl px-[14px] py-[13px] text-[15px] font-medium transition-colors ${
                      active ? "bg-white/[0.06] text-ink" : "text-mut hover:bg-white/[0.05] hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-[10px] flex flex-col gap-[10px]">
                <Link href="/espace-client" onClick={() => setIsMenuOpen(false)} className="btn-ghost rounded-full px-5 py-[14px] text-center text-sm font-semibold">
                  Espace client
                </Link>
                <Link href="/prise-de-rdv" onClick={() => setIsMenuOpen(false)} className="btn-grad rounded-full px-5 py-[14px] text-center text-sm font-semibold">
                  Prendre RDV
                </Link>
              </div>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}
