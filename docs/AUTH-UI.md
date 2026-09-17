# Interfaces d’authentification

Le showroom `/showroom/auth` expose 30 compositions : six layouts pour chacun des parcours de connexion, inscription, activation, récupération et vérification d’email.

## Limite fonctionnelle

Ces composants sont des contrats d’interface. Ils n’appellent aucune API, ne créent aucune session et ne stockent aucune information. Un site client doit raccorder les actions au backend d’authentification réellement validé et appliquer côté serveur les contrôles, délais, jetons, cookies, limitations de débit et redirections.

## Inscription

- `disabled` : aucune création de compte n’est permise.
- `invite_only` : le serveur doit vérifier une invitation valide avant l’activation.
- `public` : l’inscription est ouverte selon les règles du site client.

## Sécurité et accessibilité

- Les erreurs de connexion et récupération ne révèlent jamais si une adresse existe.
- Les champs utilisent des labels et attributs `autocomplete` adaptés.
- Les erreurs utilisent `aria-invalid` et une description associée.
- Les états finaux utilisent `role="status"` ou `role="alert"`.
- Aucun mot de passe ne doit être conservé dans le navigateur par le composant.
- Les états doivent rester compréhensibles avec JavaScript, animation ou backend indisponibles.

Exécuter `npm run check:auth` puis les suites Playwright avant toute réutilisation.
