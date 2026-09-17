# Étape 5 — Système d'animation

## Catalogue

Le système expose 34 presets : 8 micro-interactions, 6 animations typographiques, 6 trajectoires SVG, 6 séquences de défilement, 4 compositions 3D CSS et 4 scènes WebGL. Le registre et les tokens vivent dans `design-system/motion.ts`.

Le showroom `/showroom/motion` permet la lecture, la pause, la relance, la comparaison, le réglage de vitesse, le changement de thème et la simulation de `prefers-reduced-motion`.

## Règles d'utilisation

- Deux séquences fortes maximum par page.
- Cinq éléments maximum dans un stagger.
- Aucun scroll-jacking, curseur personnalisé ou smooth scroll global.
- Les animations de contenu utilisent principalement `opacity`, `transform` et `stroke-dashoffset`.
- Une scène WebGL s'arrête après six secondes et n'est jamais nécessaire à la compréhension.
- Les effets de survol sont neutralisés sur pointeur tactile.
- L'état final existe avant l'animation et demeure visible sans JavaScript.
- En mouvement réduit : aucun tracé progressif, stagger, zoom, parallaxe ou rotation 3D.

## Dépendances validées

- `motion` orchestre HTML, SVG, gestes et séquences React.
- `three` fournit le moteur WebGL.
- `@react-three/fiber` relie Three.js à React 19.
- `@types/three` fournit les contrats TypeScript de Three.js.

Les scènes WebGL sont importées dynamiquement avec `ssr: false`. Les pages qui n'utilisent pas de 3D ne chargent pas leur moteur.

## États interactifs

Les presets doivent préserver les états natifs `hover`, `focus-visible`, `pressed`, `disabled`, `loading`, `success` et `error`. Une animation ne remplace jamais un libellé, une annonce ARIA ou une modification d'état compréhensible.

## Vérification

`npm run check:motion` contrôle les 34 identifiants, les répartitions par famille et les motifs interdits. Playwright vérifie les contrôles du showroom, la comparaison, la vitesse, le mode réduit et le responsive.
