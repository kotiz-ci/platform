# `infra/docker`

Configuration Docker / Compose pour l'environnement de développement local KOTIZ (Story 1.3a) et plus tard staging/prod (Story 1.3b sur Orange Business Abidjan, après contrat signé).

## Status Sprint 1

⚠️ **Placeholders** — Story 1.3a enrichira `docker-compose.dev.yml` avec les vrais services :
- `nginx` (reverse proxy TLS 1.2+, HSTS)
- `postgres` `15.8-alpine` (avec `pgaudit`)
- `redis` `7.4-alpine`
- `minio` (KYC files + audio WhatsApp)
- `backend` (Spring Boot, build local)

## Secrets dev factices

`secrets-dev/` est git-ignoré. Le script `init-dev-secrets.sh` (Story 1.3a) générera des secrets factices locaux :
- `secrets-dev/postgres_password.txt`
- `secrets-dev/jwt_signing_key.txt`
- `secrets-dev/aes_master_key.txt` (clé AES-256-GCM pour PII — cf. Story 1.4 AC5)

⚠️ **Jamais de secrets en clair dans `docker-compose.dev.yml`.** Toujours `secrets:` + `file:` (Docker Secrets).

## Commandes (depuis racine monorepo)

```bash
pnpm dev:up      # docker compose up -d
pnpm dev:logs    # docker compose logs -f
pnpm dev:down    # docker compose down
pnpm dev:reset   # docker compose down -v (efface volumes)
```
