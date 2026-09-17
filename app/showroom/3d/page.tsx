import type { Metadata } from "next";

import { ThreeDShowroom } from "./ThreeDShowroom";

export const metadata: Metadata = {
  title: "Showroom 3D — OptimalLogic",
  robots: { index: false, follow: false },
};

export default function ThreeDPage() {
  return <ThreeDShowroom />;
}
