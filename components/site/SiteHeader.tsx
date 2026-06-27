"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header id="header">
      <nav className={`wrap ${isOpen ? "open" : ""}`} id="nav">
        <Link href="/" className="logo" data-cursor>
          <span className="logo-mark">OL</span>
          <span className="logo-text">
            Optimal<span>Logic</span>
          </span>
        </Link>

        <div className="nav-links">
          <Link href="/services" data-cursor onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link href="/tarifs" data-cursor onClick={() => setIsOpen(false)}>
            Tarifs
          </Link>
          <Link href="/contact" data-cursor onClick={() => setIsOpen(false)}>
            Contact
          </Link>

          <div className="nav-links-cta">
            <Link href="/espace-client" className="btn btn-ghost">
              Connexion
            </Link>
            <Link href="/prise-de-rdv" className="btn btn-primary">
              Prendre RDV
            </Link>
          </div>
        </div>

        <div className="nav-cta">
          <Link href="/espace-client" className="btn btn-ghost desktop-only" data-cursor>
            Connexion
          </Link>

          <Link
            href="/prise-de-rdv"
            className="btn btn-primary desktop-only magnetic"
            data-cursor
          >
            Prendre RDV
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          <button
            className="menu-toggle"
            aria-label="Menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            <svg
              className="ic-open"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>

            <svg
              className="ic-close"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}