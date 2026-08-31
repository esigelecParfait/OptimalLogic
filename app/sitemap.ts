import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tarifs", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/prise-de-rdv", priority: 0.8, changeFrequency: "weekly" },
  { path: "/aide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
  { path: "/confidentialite", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
