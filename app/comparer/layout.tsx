import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Comparateur interne OptimalLogic" },
  robots: { index: false, follow: false },
};

export default function ComparerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
