"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Accueil", href: "/preview/modele-2" },
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <div
        className="flex w-full max-w-2xl items-center justify-between gap-6 px-5 py-2.5 transition-all duration-300"
        style={{
          borderRadius: "9999px",
          border: "1px solid rgba(12,13,13,0.12)",
          backgroundColor: scrolled ? "rgba(255,252,254,0.92)" : "rgba(255,252,254,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 20px rgba(12,13,13,0.06)",
        }}
      >
        {/* Logo */}
        <Link href="/preview/modele-2" className="flex items-center gap-1.5 shrink-0">
          <span style={{ color: "#0C0D0D", fontSize: "14px", fontWeight: 600, letterSpacing: "-0.3px" }}>
            ★ OptimalLogic
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors"
              style={{ color: "rgba(12,13,13,0.6)", fontSize: "14px", padding: "4px 8px" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0C0D0D")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,13,13,0.6)")}
            >
              [ {link.label} ]
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center shrink-0 transition-all"
          style={{
            borderRadius: "8px",
            border: "1.5px solid #0C0D0D",
            color: "#0C0D0D",
            fontSize: "13px",
            fontWeight: 500,
            padding: "6px 20px",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#0C0D0D"; (e.currentTarget as HTMLElement).style.color = "#FFFCFE"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "#0C0D0D"; }}
        >
          Contact
        </Link>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(c => !c)}
          className="lg:hidden"
          style={{ color: "#0C0D0D", fontSize: "20px" }}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-16 left-4 right-4 p-4"
          style={{ borderRadius: "16px", border: "1px solid rgba(12,13,13,0.1)", backgroundColor: "#FFFCFE", boxShadow: "0 8px 32px rgba(12,13,13,0.1)" }}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm rounded-lg"
                style={{ color: "rgba(12,13,13,0.7)" }}>
                {link.label}
              </a>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)}
              className="mt-2 px-3 py-2.5 text-center text-sm font-medium rounded-lg"
              style={{ border: "1.5px solid #0C0D0D", color: "#0C0D0D" }}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
