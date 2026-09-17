import type { Metadata } from "next";
import Link from "next/link";

import { demoRecipes } from "@/design-system/site-recipes";

import styles from "./sites.module.css";

export const metadata: Metadata = {
  title: "Sites de démonstration | OptimalLogic",
  description: "Huit recettes complètes et leur matrice de compatibilité.",
  robots: { index: false, follow: false },
};

const showrooms = [
  ["Fondations", "/showroom/foundations", "8 thèmes et leurs tokens"],
  ["Compositions", "/showroom/compositions", "38 blocs publics"],
  ["Layouts", "/showroom/layouts", "Pages complètes de référence"],
  ["Motion", "/showroom/motion", "34 comportements animés"],
  ["3D", "/showroom/3d", "18 variantes avec alternatives"],
  ["Systèmes visuels", "/showroom/visual-systems", "30 compositions narratives"],
  ["Authentification", "/showroom/auth", "30 parcours et 11 états"],
  ["Espaces clients", "/showroom/client-area", "36 compositions privées"],
] as const;

export default function DemoSitesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span>Étape 10 · Catalogue assemblé</span>
        <h1>Des composants isolés aux expériences complètes.</h1>
        <p>
          Huit recettes distinctes montrent les combinaisons recommandées. Tous les noms,
          contenus, indicateurs et offres sont fictifs.
        </p>
      </header>
      <nav className={styles.showrooms} aria-label="Catalogue des showrooms">
        {showrooms.map(([label, href, detail]) => (
          <Link href={href} key={href}>
            <strong>{label}</strong>
            <span>{detail}</span>
          </Link>
        ))}
      </nav>
      <section className={styles.recipes} aria-labelledby="recipes-title">
        <header>
          <span>8 thèmes · 8 recettes</span>
          <h2 id="recipes-title">Sites de démonstration</h2>
        </header>
        <div>
          {demoRecipes.map((recipe, index) => (
            <article data-theme={recipe.theme} key={recipe.slug}>
              <div className={styles.preview}>
                <span>0{index + 1}</span>
                <strong>{recipe.name.slice(0, 1)}</strong>
                <i />
              </div>
              <small>{recipe.category}</small>
              <h3>{recipe.name}</h3>
              <p>{recipe.summary}</p>
              <dl>
                <div>
                  <dt>Thème</dt>
                  <dd>{recipe.theme}</dd>
                </div>
                <div>
                  <dt>Hero</dt>
                  <dd>{recipe.hero}</dd>
                </div>
                <div>
                  <dt>Motion</dt>
                  <dd>{recipe.motion}</dd>
                </div>
              </dl>
              <Link href={`/showroom/sites/${recipe.slug}`}>Ouvrir la démonstration</Link>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.matrix} aria-labelledby="matrix-title">
        <header>
          <span>Matrice de compatibilité</span>
          <h2 id="matrix-title">Une recette traçable pour chaque direction.</h2>
        </header>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Recette</th>
                <th>Services</th>
                <th>Preuve</th>
                <th>Mouvement</th>
                <th>Profondeur</th>
                <th>Interface privée</th>
              </tr>
            </thead>
            <tbody>
              {demoRecipes.map((recipe) => (
                <tr key={recipe.slug}>
                  <th>
                    <Link href={`/showroom/sites/${recipe.slug}`}>{recipe.name}</Link>
                  </th>
                  <td>{recipe.services}</td>
                  <td>{recipe.proof}</td>
                  <td>{recipe.motion}</td>
                  <td>{recipe.depth}</td>
                  <td>{recipe.clientVariant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
