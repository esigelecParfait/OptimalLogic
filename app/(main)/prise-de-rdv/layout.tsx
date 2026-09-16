import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Réserver un diagnostic",
  description:
    "Réservez un diagnostic OptimalLogic de 15 minutes pour clarifier votre besoin et identifier la prochaine action digitale utile.",
  path: "/prise-de-rdv",
});

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
