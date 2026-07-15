# API interne d'audit de securite

Cette API Next.js App Router sert de base backend pour de futures Actions d'un agent GPT OptimalLogic. Elle expose une route de sante publique, un premier controle fonctionnel des headers HTTP de securite, et des routes temporaires explicites pour les futurs modules.

## Arborescence

- `app/api/health`: route publique de sante.
- `app/api/checks/*`: controles de securite appeles par l'agent GPT, proteges par cle API.
- `app/api/audits/*`: futures routes d'orchestration et de reporting, protegees par cle API.
- `lib/security/checks`: moteurs de controles.
- `lib/security/authorization`: cle API, domaines autorises et premiere barriere SSRF.
- `lib/security/validation`: validation des demandes et normalisation des URLs.
- `lib/security/scoring`: score interne deterministe.
- `lib/security/types`: types communs d'audit et de findings.
- `lib/security/repositories`: interfaces de persistance futures.
- `lib/security/clients`: clients serveur minimaux pour integrations futures.

## Variables d'environnement

```bash
SECURITY_AGENT_API_KEY=
SECURITY_AUDIT_ALLOWED_DOMAINS=optimal-logic.com,www.optimal-logic.com
SECURITY_AUDIT_ALLOW_LOCALHOST=false
GITHUB_SECURITY_TOKEN=
```

`SECURITY_AGENT_API_KEY` est attendue dans le header `Authorization: Bearer <cle>`. La route `/api/health` reste publique. Les domaines autorises sont compares strictement: `optimal-logic.com.attacker.com` n'est pas accepte si seul `optimal-logic.com` est configure.

## Format JSON

Succes:

```json
{
  "success": true,
  "data": {}
}
```

Erreur:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "La requete est invalide."
  }
}
```

Les routes ne renvoient pas de stack trace, de secret, ni de details bruts provenant d'exceptions internes.

## Tester la route de sante

```bash
curl http://localhost:3000/api/health
```

## Tester le controle des headers

Avant le test, definir localement `SECURITY_AGENT_API_KEY` et `SECURITY_AUDIT_ALLOWED_DOMAINS`.

```bash
curl -X POST http://localhost:3000/api/checks/headers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_CLE_LOCALE" \
  -d '{
    "target_url": "https://optimal-logic.com",
    "authorization_confirmed": true,
    "audit_type": "quick",
    "environment": "production"
  }'
```

## Modules non implementes

Les routes suivantes existent, exigent la cle API et renvoient `501 NOT_IMPLEMENTED` sans simuler de resultat:

- `POST /api/checks/tls`
- `POST /api/checks/public-pages`
- `POST /api/checks/forms`
- `POST /api/checks/dependencies`
- `POST /api/checks/supabase`
- `POST /api/audits/start`
- `GET /api/audits/[auditId]`
- `GET /api/audits/[auditId]/report`

## Limites actuelles

La protection SSRF bloque les cas internes courants, les ports non autorises et reverifie les redirections avant de les suivre. Elle ne remplace pas un filtrage reseau sortant, une politique DNS dediee, ni un audit de securite complet de l'infrastructure.

Le score est un indicateur interne calcule depuis les findings. Il ne constitue pas une certification de securite.

Les audits doivent uniquement viser des domaines pour lesquels OptimalLogic dispose d'une autorisation explicite.
