import type { Metadata } from "next";

import { ClientAreaShowroom } from "./ClientAreaShowroom";

export const metadata: Metadata = {
  title: "Showroom espaces clients | OptimalLogic",
  description: "Catalogue interne des espaces clients configurables.",
  robots: { index: false, follow: false },
};

export default function ClientAreaPage() {
  return <ClientAreaShowroom />;
}
