import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/images/refonte-v2/hero-signal-house-v1.webp",
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: path,
      siteName: "OptimalLogic",
      title: `${title} | OptimalLogic`,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | OptimalLogic`,
      description,
      images: [image],
    },
  };
}
