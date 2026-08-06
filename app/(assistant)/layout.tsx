import type { Viewport } from "next";
import CookieConsent from "@/components/CookieConsent";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#050505",
};

export default function AssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <CookieConsent />
    </>
  );
}
