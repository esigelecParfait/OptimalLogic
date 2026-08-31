import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";
import Grain from "@/components/fx/Grain";
import "@/styles/marketing-v2.css";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-v2">
      <Grain />
      <Header />
      <div className="relative z-[2]">{children}</div>
      <CookieConsent />
      <Footer />
      <ChatWidget />
    </div>
  );
}
