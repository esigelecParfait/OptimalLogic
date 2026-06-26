import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
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
      <body>{children}</body>
    </html>
  );
}
