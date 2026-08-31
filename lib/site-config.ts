const DEFAULT_SITE_URL = "https://optimal-logic.com";

export const siteConfig = {
  name: "OptimalLogic",
  description:
    "OptimalLogic améliore votre image en ligne et installe des systèmes IA simples pour recevoir, qualifier et transmettre les demandes clients.",
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL),
} as const;

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, siteConfig.url).toString();
}
