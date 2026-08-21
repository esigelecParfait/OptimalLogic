import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Présentez votre besoin à OptimalLogic et recevez une première orientation sur votre visibilité, votre site, vos rendez-vous ou votre suivi commercial.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
