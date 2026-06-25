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
      <Header />
      {children}
      <CookieConsent />
      <Footer />
      <ChatWidget />
    </>
  );
}
