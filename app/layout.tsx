import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "OptimalLogic",
  description:
    "Nous aidons les professionnels à être mieux trouvés, mieux compris et plus facilement choisis grâce à Google Business, site web, prise de rendez-vous et assistant IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />

        {children}
        <CookieConsent />
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}