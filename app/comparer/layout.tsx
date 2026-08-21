import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparateur interne",
  robots: { index: false, follow: false, nocache: true },
};

export default function ComparerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
