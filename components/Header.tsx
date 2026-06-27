"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [

  { label: "Services", href: "/services" },
  { label: "Tarifs", href: "/tarifs" },

  { label: "Contact", href: "/contact" },
];

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
        scrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        className={`mx-4 mt-4 flex flex-wrap items-center justify-between rounded-[100px] border px-7 py-3 transition-all duration-300 ${
          scrolled
            ? "border-white/15 bg-[#06081299] shadow-[0_24px_70px_-28px_rgba(0,0,0,0.9)]"
            : "border-white/[0.07] bg-[#0a0f1e8c]"
        } backdrop-blur-[20px]`}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl font-display text-base font-bold text-white shadow-[0_10px_28px_-8px_rgba(124,92,255,0.85)]" style={{ background: "var(--grad)" }}>
            OL
          </span>
          <span className="font-display text-[19px] font-semibold text-ink">
            Optimal<span className="text-cyan">Logic</span>
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
          <div className="mt-3 w-full border-t border-white/[0.07] pt-3 lg:hidden">
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
