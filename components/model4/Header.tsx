"use client";

import Link from "next/link";
import { useState } from "react";

const G = "#95F547";

const LogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3 18L8 4L13 18" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 18L14 4L19 18" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const navLinks = [
  { label: "Bénéfices", href: "#benefices" },
  { label: "Services", href: "#services" },
  { label: "Processus", href: "#processus" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/preview/modele-4" className="flex items-center gap-2.5">
          <LogoIcon />
          <span className="text-base font-medium tracking-tight text-white">OptimalLogic</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <Link href="/contact"
          className="hidden lg:inline-flex items-center gap-2 rounded-[5px] text-sm font-medium text-black transition-all hover:brightness-90"
          style={{ backgroundColor: G, padding: "10px 20px" }}>
          Nous contacter →
        </Link>

        <button onClick={() => setOpen(c => !c)} className="text-white lg:hidden" style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-black px-5 py-6 lg:hidden">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="block py-3 text-sm text-gray-400 hover:text-white"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {link.label}
            </a>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="mt-4 block rounded-[5px] py-3 text-center text-sm font-medium text-black"
            style={{ backgroundColor: G }}>
            Nous contacter →
          </Link>
        </div>
      )}
    </header>
  );
}
