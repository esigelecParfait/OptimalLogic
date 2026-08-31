import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Présentez votre activité et votre besoin à OptimalLogic. Nous vous orientons vers l’offre ou la prochaine action réellement utile.",
  path: "/contact",
  image: "/images/refonte-v2/contact-signal-v1.webp",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
