import type { Metadata } from "next";
import localFont from "next/font/local";
import { AssistantChatProvider } from "@/components/chat/AssistantChatProvider";
import "./globals.css";

// Polices auto-hébergées (aucune requête réseau au build/runtime) :
// fonctionne sur tout réseau, y compris hors-ligne ou derrière un proxy.
const inter = localFont({
  src: "./fonts/Inter-variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const display = localFont({
  src: "./fonts/SpaceGrotesk-variable.woff2",
  variable: "--font-space-grotesk",
  display: "swap",
  weight: "300 700",
});

export const metadata: Metadata = {
  title: "OptimalLogic — Digital, IA & acquisition client",
  description:
    "OptimalLogic transforme votre présence en ligne en moteur d'acquisition client : Google Business, site web, prise de rendez-vous, assistant IA et suivi des demandes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${display.variable}`}>
      <body>
        <AssistantChatProvider>{children}</AssistantChatProvider>
      </body>
    </html>
  );
}
