import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Comparez les formules OptimalLogic pour commerces locaux, TPE, PME et startups, avec mise en place et suivi mensuel clairement détaillés.",
  alternates: { canonical: "/tarifs" },
};

export default function TarifsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
