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
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700,500&f[]=general-sans@400,500,600&display=swap"
        rel="stylesheet"
      />
      <Header />
      {children}
      <CookieConsent />
      <Footer />
      <ChatWidget />
    </>
  );
}
