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

`pnpm dev:up` génère une première fois trois mots de passe aléatoires dans
`secrets-dev/`, un dossier ignoré par Git : administration initiale, migrations et
application. Les secrets sont montés par Compose dans les conteneurs et ne sont pas
écrits en clair dans la définition des services. PostgreSQL initialise
`kotiz_migrator`, propriétaire du schéma, et `kotiz_app`, limité à l'usage du schéma
et aux futures opérations de données. Spring JDBC utilise `kotiz_app` tandis que
Flyway utilise `kotiz_migrator`. La commande construit et démarre les deux services,
puis attend leurs health checks.

Après l'introduction de cette séparation, une ancienne base locale créée avant
l'issue #35 doit être réinitialisée une fois avec `pnpm dev:reset` pour recevoir les
nouveaux rôles.

## Cycle de vie

```bash
pnpm dev:up    # démarre ou redémarre et attend l'état sain
pnpm dev:logs  # suit les logs
pnpm dev:down  # arrête les services et conserve les données PostgreSQL
pnpm dev:reset # arrête les services et supprime les volumes de développement
```

## Convention des migrations

Les migrations SQL vivent dans `apps/backend/src/main/resources/db/migration` et
suivent le nommage Flyway `V<version>__<description>.sql`. Une migration déjà
fusionnée est immuable : toute correction utilise une nouvelle version additive.
La modification ou la suppression rétroactive d'une migration fusionnée est
interdite, car son checksum peut déjà être enregistré dans des environnements
partagés.

Après un arrêt normal, un nouveau `pnpm dev:up` réutilise le volume `pgdata`. La
commande `pnpm dev:reset` est la seule commande standard qui supprime ce volume.

La vérification d'acceptation isolée construit les services, contrôle le health
check, les privilèges séparés, l'unicité de la migration après redémarrage, la
persistance après arrêt et la suppression au reset :

```bash
pnpm verify:local-dev
```
