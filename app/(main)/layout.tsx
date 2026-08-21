import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">Aller au contenu</a>
      <div className="site-backdrop" aria-hidden="true" />
      <Header />
      <div id="main-content" className="relative z-[2]">{children}</div>
      <CookieConsent />
      <Footer />
      <ChatWidget />
    </>
  );
}
