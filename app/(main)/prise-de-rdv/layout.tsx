import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description:
    "Réservez un diagnostic gratuit de 15 minutes avec OptimalLogic pour clarifier votre priorité digitale et la prochaine action utile.",
  alternates: { canonical: "/prise-de-rdv" },
};

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
