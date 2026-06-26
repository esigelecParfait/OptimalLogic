import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";
import CustomCursor from "@/components/CustomCursor";
import Aurora from "@/components/fx/Aurora";
import Grain from "@/components/fx/Grain";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Aurora />
      <Grain />
      <CustomCursor />
      <Header />
      <div className="relative z-[2]">{children}</div>
      <CookieConsent />
      <Footer />
      <ChatWidget />
    </>
  );
}
