import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoSite } from "@/components/demo-site";
import { demoRecipes, getDemoRecipe } from "@/design-system/site-recipes";

export const dynamicParams = false;

export function generateStaticParams() {
  return demoRecipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const recipe = getDemoRecipe((await params).slug);
  return {
    title: recipe
      ? `${recipe.name} | Démonstration OptimalLogic`
      : "Démonstration introuvable",
    description: recipe?.summary,
    robots: { index: false, follow: false },
  };
}

export default async function DemoSitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const recipe = getDemoRecipe((await params).slug);
  if (!recipe) notFound();
  return <DemoSite recipe={recipe} />;
}
