import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/comparer", "/espace-client/", "/preview/"],
    },
    sitemap: "https://optimal-logic.com/sitemap.xml",
    host: "https://optimal-logic.com",
  };
}
