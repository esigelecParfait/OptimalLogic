import type { Metadata } from "next";

import { VisualSystemsShowroom } from "./VisualSystemsShowroom";

export const metadata: Metadata = {
  title: "Showroom des systèmes visuels — OptimalLogic",
  robots: { index: false, follow: false },
};

export default function VisualSystemsPage() {
  return <VisualSystemsShowroom />;
}
