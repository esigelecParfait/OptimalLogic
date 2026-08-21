"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Brand from "@/components/Brand";

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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 64rem)");
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };

    desktopMedia.addEventListener("change", closeMenuOnDesktop);
    return () => desktopMedia.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const isActiveLink = (href: string) => pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Navigation principale"
        className={`site-header mx-auto flex max-w-[1280px] items-center justify-between px-3 py-2.5 sm:px-4 lg:px-5 ${
          scrolled ? "site-header--scrolled" : ""
        }`}
      >
        <Brand onClick={() => setIsMenuOpen(false)} />

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link ${active ? "nav-link--active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Link href="/espace-client" className="btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold">
            Espace client
          </Link>
          <Link href="/prise-de-rdv" className="btn-grad inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            Prendre RDV
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.1] bg-white/[0.04] text-ink outline-none transition-colors hover:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
        >
          {isMenuOpen ? (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
          ) : (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-3 top-[calc(100%+8px)] max-h-[calc(100dvh-100px)] overflow-y-auto rounded-[24px] border border-white/[0.13] bg-[#0d0d0f]/95 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:inset-x-5 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
                      active ? "bg-white/[0.09] text-ink" : "text-mut hover:bg-white/[0.06] hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link href="/aide" onClick={() => setIsMenuOpen(false)} className="rounded-2xl px-4 py-3.5 text-[15px] font-medium text-mut transition-colors hover:bg-white/[0.06] hover:text-ink">
                Aide
              </Link>
              <div className="mt-2 grid gap-2 border-t border-white/[0.09] pt-3">
                <Link href="/espace-client" onClick={() => setIsMenuOpen(false)} className="btn-ghost rounded-full px-5 py-3 text-center text-sm font-semibold">
                  Espace client
                </Link>
                <Link href="/prise-de-rdv" onClick={() => setIsMenuOpen(false)} className="btn-grad rounded-full px-5 py-3 text-center text-sm font-semibold">
                  Prendre RDV
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
