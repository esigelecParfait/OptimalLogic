import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        .ol-footer { border-top: 1px solid rgba(255,255,255,0.07); padding: 80px 0 40px; margin-top: 130px; position: relative; background: #04050b; }
        .ol-foot-big { font-family: 'Clash Display', 'Space Grotesk', sans-serif; font-weight: 600; font-size: clamp(60px,13vw,200px); text-align: center; line-height: 0.9; letter-spacing: -0.03em; background: linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 70px; user-select: none; }
        .ol-foot-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 44px; margin-bottom: 50px; max-width: 1240px; margin-left: auto; margin-right: auto; padding: 0 28px; }
        .ol-foot-grid h5 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: #5e6788; margin-bottom: 20px; font-weight: 600; }
        .ol-foot-grid a { display: block; font-size: 14.5px; color: #99a1c2; padding: 7px 0; transition: color 0.2s; text-decoration: none; }
        .ol-foot-grid a:hover { color: #f5f6fc; }
        .ol-foot-about p { font-size: 14.5px; color: #99a1c2; margin: 18px 0 20px; max-width: 300px; }
        .ol-socials { display: flex; gap: 11px; }
        .ol-socials a { width: 40px; height: 40px; border-radius: 11px; border: 1px solid rgba(255,255,255,0.07); display: grid; place-items: center; color: #99a1c2; transition: all 0.25s; }
        .ol-socials a:hover { color: #f5f6fc; border-color: #7c5cff; background: rgba(124,92,255,0.1); }
        .ol-foot-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; margin-bottom: 4px; }
        .ol-foot-mark { width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(110deg,#7c5cff,#b14dff 45%,#1fd5f0); display: grid; place-items: center; font-weight: 700; font-size: 16px; color: #fff; flex-shrink: 0; }
        .ol-foot-logo-text { font-weight: 600; font-size: 19px; color: #f5f6fc; letter-spacing: -0.02em; }
        .ol-foot-logo-text span { color: #1fd5f0; }
        .ol-foot-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.07); font-size: 13.5px; color: #5e6788; flex-wrap: wrap; gap: 14px; max-width: 1240px; margin: 0 auto; padding-left: 28px; padding-right: 28px; }
        @media (max-width: 1040px) { .ol-foot-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 680px) { .ol-foot-grid { grid-template-columns: 1fr; } }
      `}</style>

      <footer className="ol-footer">
        <div className="ol-foot-big">OptimalLogic</div>
        <div className="ol-foot-grid">
          <div className="ol-foot-about">
            <Link href="/" className="ol-foot-logo">
              <span className="ol-foot-mark">OL</span>
              <span className="ol-foot-logo-text">Optimal<span>Logic</span></span>
            </Link>
            <p>Digital, IA & acquisition client. On transforme votre présence en ligne en moteur d'acquisition — sans complexité inutile.</p>
            <div className="ol-socials">
              <a href="#" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v1.5a6 6 0 0 1 2-1.5zM6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              </a>
              <a href="mailto:contact@optimal-logic.com" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h5>Solutions</h5>
            <Link href="/services">Google Business</Link>
            <Link href="/services">Site web</Link>
            <Link href="/prise-de-rdv">Prise de RDV</Link>
            <Link href="/services">Assistant IA</Link>
            <Link href="/services">Suivi prospects</Link>
          </div>

          <div>
            <h5>Entreprise</h5>
            <Link href="/">Accueil</Link>
            <Link href="/services">Services</Link>
            <Link href="/tarifs">Tarifs</Link>
            <Link href="/prise-de-rdv">Prise de RDV</Link>
            <Link href="/espace-client">Espace client</Link>
          </div>

          <div>
            <h5>Contact</h5>
            <a href="mailto:contact@optimal-logic.com">contact@optimal-logic.com</a>
            <a href="#">France · à distance</a>
            <Link href="/prise-de-rdv">Diagnostic gratuit</Link>
            <Link href="/contact">Formulaire de contact</Link>
          </div>
        </div>

        <div className="ol-foot-bottom">
          <span>© 2026 OptimalLogic. Tous droits réservés.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/mentions-legales" style={{ color: "#5e6788", textDecoration: "none" }}>Mentions légales</Link>
            <Link href="/confidentialite" style={{ color: "#5e6788", textDecoration: "none" }}>Confidentialité</Link>
            <Link href="/cookies" style={{ color: "#5e6788", textDecoration: "none" }}>Cookies</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
