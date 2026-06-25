import Header from "@/components/model1/Header";
import Footer from "@/components/model1/Footer";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";

export default function Model1Layout({
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
