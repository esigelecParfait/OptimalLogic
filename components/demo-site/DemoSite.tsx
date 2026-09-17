import Link from "next/link";

import { AuthStage } from "@/components/auth";
import { ClientAreaStage } from "@/components/client-area";
import { VisualSystemStage } from "@/components/visual-systems";
import type { DemoRecipe } from "@/design-system/site-recipes";

import styles from "./demo-site.module.css";

const services = [
  ["Cadrer", "Clarifier les objectifs, les contraintes et les décisions attendues."],
  ["Concevoir", "Construire une réponse cohérente autour du besoin prioritaire."],
  ["Accompagner", "Suivre les prochaines étapes avec des repères compréhensibles."],
] as const;

export function DemoSite({ recipe }: { recipe: DemoRecipe }) {
  return (
    <main className={styles.site} data-theme={recipe.theme} data-recipe={recipe.slug}>
      <div className={styles.demoNotice}>Démonstration fictive · ne pas publier</div>
      <header className={styles.navigation}>
        <a href="#top" className={styles.logo}>
          {recipe.name}
        </a>
        <nav aria-label="Navigation principale">
          <a href="#services">Services</a>
          <a href="#method">Méthode</a>
          <a href="#offers">Formules</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className={styles.login} href="#private-preview">
          Connexion
        </a>
      </header>
      <section className={styles.hero} data-layout={recipe.hero} id="top">
        <div className={styles.heroCopy}>
          <span>{recipe.eyebrow}</span>
          <h1>{recipe.headline}</h1>
          <p>{recipe.summary}</p>
          <div>
            <a href="#contact">Parler du projet</a>
            <a href="#method">Découvrir la méthode</a>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <i />
          <i />
          <i />
          <strong>{recipe.name.slice(0, 1)}</strong>
        </div>
      </section>
      <section className={styles.services} data-layout={recipe.services} id="services">
        <header>
          <span>Services fictifs</span>
          <h2>Une structure claire à adapter au besoin réel.</h2>
        </header>
        <div>
          {services.map(([title, text], index) => (
            <article key={title}>
              <small>0{index + 1}</small>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#contact">En savoir plus</a>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.method} id="method">
        <div>
          <span>Méthode de démonstration</span>
          <h2>Du premier échange à une livraison maîtrisée.</h2>
          <ol>
            {[
              "Écouter et qualifier",
              "Définir la solution",
              "Produire et vérifier",
              "Livrer et transmettre",
            ].map((item, index) => (
              <li key={item}>
                <b>{index + 1}</b>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
        <VisualSystemStage variantId={recipe.visualSystem} animated={false} />
      </section>
      <section className={styles.proof} data-layout={recipe.proof}>
        <span>Preuves à remplacer</span>
        <h2>Aucun résultat commercial n’est affirmé dans cette démonstration.</h2>
        <div>
          {[
            "Indicateur vérifié à fournir",
            "Référence autorisée à fournir",
            "Témoignage validé à fournir",
          ].map((item) => (
            <article key={item}>
              <strong>—</strong>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.offers} id="offers">
        <header>
          <span>Formules fictives</span>
          <h2>Choisir un périmètre, sans prix inventé.</h2>
        </header>
        <div>
          {["Essentielle", "Accompagnement", "Sur mesure"].map((name, index) => (
            <article key={name} data-featured={index === 1}>
              <small>{index === 1 ? "Exemple recommandé" : "Démonstration"}</small>
              <h3>{name}</h3>
              <strong>Sur devis</strong>
              <p>Prestations, modalités et délais à confirmer dans le site-spec.</p>
              <a href="#contact">Demander un échange</a>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.compatibility} aria-label="Recette technique">
        <header>
          <span>Recette compatible</span>
          <h2>Les choix utilisés dans cette démonstration.</h2>
        </header>
        <dl>
          <div>
            <dt>Mouvement</dt>
            <dd>{recipe.motion}</dd>
          </div>
          <div>
            <dt>Profondeur</dt>
            <dd>{recipe.depth}</dd>
          </div>
          <div>
            <dt>Système visuel</dt>
            <dd>{recipe.visualSystem}</dd>
          </div>
          <div>
            <dt>Authentification</dt>
            <dd>{recipe.authVariant}</dd>
          </div>
          <div>
            <dt>Espace client</dt>
            <dd>{recipe.clientVariant}</dd>
          </div>
          <div>
            <dt>Navigation privée</dt>
            <dd>{recipe.clientNavigation}</dd>
          </div>
        </dl>
      </section>
      <section className={styles.private} id="private-preview">
        <header>
          <span>Aperçus privés compatibles</span>
          <h2>Du site public à l’espace client.</h2>
        </header>
        <div>
          <AuthStage
            variantId={recipe.authVariant}
            state="initial"
            registrationMode="invite_only"
          />
          <ClientAreaStage variantId={recipe.clientVariant} state="normal" />
        </div>
      </section>
      <section className={styles.contact} id="contact">
        <span>Formulaire non connecté</span>
        <h2>Décrivez le besoin à intégrer au futur site.</h2>
        <form>
          <label>
            Nom
            <input name="name" autoComplete="name" />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label>
            Message
            <textarea name="message" rows={4} />
          </label>
          <button type="button">Action de démonstration</button>
        </form>
      </section>
      <footer>
        <strong>{recipe.name}</strong>
        <span>
          Site fictif interne · contenus et preuves à remplacer avant publication.
        </span>
        <Link href="/showroom/sites">Retour aux démonstrations</Link>
      </footer>
    </main>
  );
}
