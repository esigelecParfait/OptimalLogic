import type { Metadata } from "next";

import { MotionShowroom } from "./MotionShowroom";

export const metadata: Metadata = {
  title: "Showroom Motion — OptimalLogic",
  robots: { index: false, follow: false },
};

export default function MotionPage() {
  return <MotionShowroom />;
}
