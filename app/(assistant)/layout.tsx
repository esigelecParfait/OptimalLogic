import type { Viewport } from "next";
import CookieConsent from "@/components/CookieConsent";
import "@/styles/marketing-v2.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#080a09",
};

export default function AssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="marketing-v2">
      {children}
      <CookieConsent />
    </div>
  );
}
