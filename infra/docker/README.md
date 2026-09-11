# Environnement Docker local

L'environnement de développement contient volontairement deux services : le
backend KOTIZ et PostgreSQL 15.19. Redis, MinIO et Nginx seront introduits seulement
par les vertical slices qui en auront besoin.

## Démarrage depuis un clone frais

Prérequis : Docker avec Compose v2, Node.js et pnpm aux versions indiquées dans le
README racine.

```bash
git clone git@github.com:kotiz-ci/platform.git
cd platform
corepack enable
pnpm install
pnpm dev:up
curl http://localhost:8080/actuator/health # → {"status":"UP"}
```

`pnpm dev:up` génère une première fois un mot de passe aléatoire dans
`secrets-dev/postgres_password.txt`, un dossier ignoré par Git. Le secret est monté
par Compose dans les conteneurs et n'est pas écrit en clair dans la définition des
services. La commande construit et démarre les deux services, puis attend leurs
health checks.

## Cycle de vie

```bash
pnpm dev:up    # démarre ou redémarre et attend l'état sain
pnpm dev:logs  # suit les logs
pnpm dev:down  # arrête les services et conserve les données PostgreSQL
pnpm dev:reset # arrête les services et supprime les volumes de développement
```

Après un arrêt normal, un nouveau `pnpm dev:up` réutilise le volume `pgdata`. La
commande `pnpm dev:reset` est la seule commande standard qui supprime ce volume.

La vérification d'acceptation isolée construit les services, contrôle le health
check, prouve la persistance après arrêt et confirme la suppression au reset :

```bash
pnpm verify:local-dev
```
