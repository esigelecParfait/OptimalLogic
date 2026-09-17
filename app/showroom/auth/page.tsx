import type { Metadata } from "next";

import { AuthShowroom } from "./AuthShowroom";

export const metadata: Metadata = {
  title: "Showroom Auth — OptimalLogic",
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <AuthShowroom />;
}
