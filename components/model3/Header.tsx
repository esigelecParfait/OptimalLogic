"use client";

import Link from "next/link";
import { useState } from "react";

const P = "#41175E";
const ACCENT = "#814BEE";

const navLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(65,23,94,0.07)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/preview/modele-3" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", border: `1.5px solid ${P}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: P }} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: P, letterSpacing: "-0.3px" }}>OptimalLogic</span>
        </Link>

        {/* Nav desktop */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden lg:flex">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              style={{ fontSize: 15, fontWeight: 500, color: `rgba(65,23,94,0.6)`, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = P)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(65,23,94,0.6)")}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Link href="/prise-de-rdv"
          className="hidden lg:inline-flex items-center gap-2"
          style={{ backgroundColor: P, color: "#fff", fontSize: 14, fontWeight: 500, padding: "10px 16px 10px 20px", borderRadius: 16, textDecoration: "none", transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          Réserver un appel
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 8 }}>→</span>
        </Link>

        {/* Mobile */}
        <button onClick={() => setOpen(c => !c)} className="lg:hidden" style={{ background: "none", border: "none", color: P, fontSize: 22, cursor: "pointer" }}>
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div style={{ backgroundColor: "#fff", padding: "16px 24px", borderTop: "1px solid rgba(65,23,94,0.07)" }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "12px 0", fontSize: 15, color: P, textDecoration: "none", borderBottom: "1px solid rgba(65,23,94,0.06)" }}>
              {link.label}
            </a>
          ))}
          <Link href="/prise-de-rdv" onClick={() => setOpen(false)}
            style={{ display: "block", marginTop: 12, backgroundColor: P, color: "#fff", textAlign: "center", padding: "12px", borderRadius: 16, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Réserver un appel →
          </Link>
        </div>
      )}
    </header>
  );
}
