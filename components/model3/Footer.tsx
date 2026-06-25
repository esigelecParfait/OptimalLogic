import Link from "next/link";

const P = "#41175E";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#fff", borderTop: "1px solid rgba(65,23,94,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 40 }}>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: P, marginBottom: 16 }}>Pages principales</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Accueil", "/preview/modele-3"], ["Services", "#features"], ["Tarifs", "#tarifs"]].map(([l, h]) => (
                <li key={l}><a href={h} style={{ fontSize: 14, color: `rgba(65,23,94,0.6)`, textDecoration: "none" }}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: P, marginBottom: 16 }}>Solutions</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Google Business", "Site web", "Prise de RDV", "Assistant IA"].map(s => (
                <li key={s}><a href="#features" style={{ fontSize: 14, color: `rgba(65,23,94,0.6)`, textDecoration: "none" }}>{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: P, marginBottom: 16 }}>Légal</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Mentions légales", "/mentions-legales"], ["Confidentialité", "/confidentialite"], ["Cookies", "/cookies"]].map(([l, h]) => (
                <li key={l}><Link href={h} style={{ fontSize: 14, color: `rgba(65,23,94,0.6)`, textDecoration: "none" }}>{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: P, marginBottom: 16 }}>Newsletter</p>
            <p style={{ fontSize: 13, color: `rgba(65,23,94,0.5)`, marginBottom: 12 }}>Recevez nos dernières actualités.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="Votre e-mail" style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(65,23,94,0.15)", fontSize: 13, outline: "none", color: P }} />
              <button style={{ padding: "10px 14px", backgroundColor: P, color: "#fff", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 14 }}>→</button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(65,23,94,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: `rgba(65,23,94,0.4)` }}>© 2026 OptimalLogic. Tous droits réservés.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Mentions légales", "/mentions-legales"], ["Confidentialité", "/confidentialite"]].map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: 13, color: `rgba(65,23,94,0.4)`, textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
