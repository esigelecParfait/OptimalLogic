"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Solutions", href: "/services" },
  { label: "Méthode", href: "/services#methode" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 400);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <>
      <style>{`
        .ol-header { position: fixed; top: 0; left: 0; right: 0; z-index: 150; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .ol-header.hide { transform: translateY(-130%); }
        .ol-nav { display: flex; align-items: center; justify-content: space-between; max-width: 1240px; margin: 18px auto; padding: 13px 16px 13px 22px; border: 1px solid rgba(255,255,255,0.07); border-radius: 100px; background: rgba(8,10,22,0.55); backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%); transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .ol-header.scrolled .ol-nav { background: rgba(6,8,18,0.86); border-color: rgba(255,255,255,0.13); box-shadow: 0 24px 70px -28px rgba(0,0,0,0.9); }
        .ol-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .ol-logo-mark { width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(110deg,#7c5cff,#b14dff 45%,#1fd5f0); display: grid; place-items: center; font-weight: 700; font-size: 16px; color: #fff; box-shadow: 0 10px 28px -8px rgba(124,92,255,0.85); position: relative; overflow: hidden; flex-shrink: 0; }
        .ol-logo-mark::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%); transform: translateX(-120%); animation: ol-shine 4s ease-in-out infinite; }
        @keyframes ol-shine { 0%,60%{ transform: translateX(-120%);} 80%,100%{ transform: translateX(120%);} }
        .ol-logo-text { font-weight: 600; font-size: 19px; color: #f5f6fc; letter-spacing: -0.02em; }
        .ol-logo-text span { color: #1fd5f0; }
        .ol-links { display: flex; align-items: center; gap: 4px; }
        .ol-links a { font-size: 14px; font-weight: 500; color: #99a1c2; padding: 9px 15px; border-radius: 100px; transition: all 0.2s; text-decoration: none; }
        .ol-links a:hover, .ol-links a.active { color: #f5f6fc; background: rgba(255,255,255,0.06); }
        .ol-cta { display: flex; align-items: center; gap: 10px; }
        .ol-btn { font-weight: 600; font-size: 14px; padding: 12px 22px; border-radius: 100px; cursor: pointer; border: 1px solid transparent; transition: all 0.3s; display: inline-flex; align-items: center; gap: 9px; white-space: nowrap; text-decoration: none; }
        .ol-btn-ghost { color: #f5f6fc; border-color: rgba(255,255,255,0.13); background: rgba(255,255,255,0.03); }
        .ol-btn-ghost:hover { background: rgba(255,255,255,0.09); }
        .ol-btn-primary { color: #fff; background: linear-gradient(110deg,#7c5cff,#b14dff 45%,#1fd5f0); box-shadow: 0 12px 34px -12px rgba(124,92,255,0.85); }
        .ol-btn-primary:hover { box-shadow: 0 18px 46px -12px rgba(124,92,255,1); }
        .ol-toggle { display: none; background: none; border: none; color: #f5f6fc; cursor: pointer; padding: 6px; }
        .ol-mobile-menu { display: none; flex-direction: column; gap: 4px; padding: 16px 22px 18px; border-top: 1px solid rgba(255,255,255,0.07); }
        .ol-nav.open { border-radius: 24px; }
        .ol-nav.open .ol-links { display: none; }
        .ol-nav.open + .ol-mobile-menu { display: flex; }
        .ol-mobile-menu a { font-size: 15px; color: #99a1c2; padding: 13px 14px; border-radius: 12px; text-decoration: none; transition: all 0.2s; }
        .ol-mobile-menu a:hover { color: #f5f6fc; background: rgba(255,255,255,0.06); }
        @media (max-width: 1040px) { .ol-links { display: none !important; } .ol-cta .desktop-only { display: none; } .ol-toggle { display: grid; } }
        @media (min-width: 1041px) { .ol-toggle { display: none; } }
      `}</style>

      <header className={`ol-header${hidden ? " hide" : ""}${scrolled ? " scrolled" : ""}`} id="ol-header">
        <nav className={`ol-nav${open ? " open" : ""}`} id="ol-nav">
          <Link href="/" className="ol-logo">
            <span className="ol-logo-mark">OL</span>
            <span className="ol-logo-text">Optimal<span>Logic</span></span>
          </Link>

          <div className="ol-links">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`${pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("#")[0])) ? "active" : ""}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="ol-cta">
            <Link href="/espace-client" className="ol-btn ol-btn-ghost desktop-only">Connexion</Link>
            <Link href="/prise-de-rdv" className="ol-btn ol-btn-primary desktop-only">
              Prendre RDV
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <button className="ol-toggle" aria-label="Menu" onClick={() => setOpen(c => !c)}>
              {open
                ? <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
                : <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
              }
            </button>
          </div>
        </nav>

        {open && (
          <div className="ol-mobile-menu">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              <Link href="/espace-client" onClick={() => setOpen(false)} className="ol-btn ol-btn-ghost" style={{ justifyContent: "center" }}>Connexion</Link>
              <Link href="/prise-de-rdv" onClick={() => setOpen(false)} className="ol-btn ol-btn-primary" style={{ justifyContent: "center" }}>Prendre RDV</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
