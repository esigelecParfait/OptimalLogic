import type { Metadata } from "next";
import localFont from "next/font/local";
import { AssistantChatProvider } from "@/components/chat/AssistantChatProvider";
import { siteConfig } from "@/lib/site-config";
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
  metadataBase: siteConfig.url,
  applicationName: siteConfig.name,
  title: {
    default: "OptimalLogic — Image en ligne & demandes clients",
    template: "%s | OptimalLogic",
  },
  description: siteConfig.description,
  category: "technology",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: siteConfig.name,
    title: "OptimalLogic — Image en ligne & demandes clients",
    description: siteConfig.description,
    images: [
      {
        url: "/images/refonte-v2/hero-signal-house-v1.webp",
        width: 1586,
        height: 992,
        alt: "Signaux clients convergeant vers un point de décision OptimalLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OptimalLogic — Image en ligne & demandes clients",
    description: siteConfig.description,
    images: ["/images/refonte-v2/hero-signal-house-v1.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
