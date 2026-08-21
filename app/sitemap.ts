import type { MetadataRoute } from "next";

const routes = [
  "",
  "/services",
  "/tarifs",
  "/contact",
  "/prise-de-rdv",
  "/mentions-legales",
  "/confidentialite",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `https://optimal-logic.com${route}`,
    changeFrequency: index < 5 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : index < 5 ? 0.8 : 0.3,
  }));
}
