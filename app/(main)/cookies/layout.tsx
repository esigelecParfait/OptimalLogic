import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Consultez et gérez vos préférences concernant les cookies utilisés sur le site OptimalLogic.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
