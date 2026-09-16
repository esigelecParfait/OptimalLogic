import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tarifs & offres",
  description:
    "Comparez les cinq offres OptimalLogic pour commerces, TPE/PME et startups. Les noms et tarifs affichés sont actualisés depuis notre base de données.",
  path: "/tarifs",
});

export default function TarifsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
