#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${repo_root}"

compose=(docker compose -p kotiz-issue35-verify -f infra/docker/docker-compose.dev.yml)
volume_name=kotiz-issue35-verify_pgdata

cleanup() {
  "${compose[@]}" down -v >/dev/null 2>&1 || true
}

migration_execution_count() {
  "${compose[@]}" exec -T -e PGPASSWORD="${migration_password}" postgres \
    psql -h 127.0.0.1 -U kotiz_migrator -d kotiz_dev -tAc \
    "SELECT count(*) FROM flyway_schema_history WHERE version = '1' AND success = true"
}

trap cleanup EXIT

bash infra/docker/init-dev-secrets.sh
application_password="$(tr -d '\r\n' <infra/docker/secrets-dev/postgres_app_password.txt)"
migration_password="$(tr -d '\r\n' <infra/docker/secrets-dev/postgres_migration_password.txt)"
"${compose[@]}" up --build --detach --wait

health="$(curl --fail --silent http://localhost:8080/actuator/health)"
[[ "${health}" == *'"status":"UP"'* ]]

"${compose[@]}" exec -T -e PGPASSWORD="${migration_password}" postgres \
  psql -h 127.0.0.1 -U kotiz_migrator -d kotiz_dev -v ON_ERROR_STOP=1 \
  -c "CREATE TABLE local_dev_persistence (value text NOT NULL);" \
  >/dev/null

if "${compose[@]}" exec -T -e PGPASSWORD="${application_password}" postgres \
  psql -h 127.0.0.1 -U kotiz_app -d kotiz_dev -v ON_ERROR_STOP=1 \
  -c "CREATE TABLE forbidden_application_table (id bigint);" >/dev/null 2>&1; then
  echo "Le rôle applicatif a pu créer une table." >&2
  exit 1
fi

if "${compose[@]}" exec -T -e PGPASSWORD="${application_password}" postgres \
  psql -h 127.0.0.1 -U kotiz_app -d kotiz_dev -v ON_ERROR_STOP=1 \
  -c "ALTER TABLE flyway_schema_history ADD COLUMN forbidden_column text;" \
  >/dev/null 2>&1; then
  echo "Le rôle applicatif a pu modifier une table." >&2
  exit 1
fi

"${compose[@]}" exec -T -e PGPASSWORD="${application_password}" postgres \
  psql -h 127.0.0.1 -U kotiz_app -d kotiz_dev -v ON_ERROR_STOP=1 \
  -c "INSERT INTO local_dev_persistence VALUES ('preserved');" \
  >/dev/null

migration_count="$(migration_execution_count)"
[[ "${migration_count}" == "1" ]]

"${compose[@]}" down
"${compose[@]}" up --detach --wait

persisted="$(
  "${compose[@]}" exec -T -e PGPASSWORD="${application_password}" postgres \
    psql -h 127.0.0.1 -U kotiz_app -d kotiz_dev -tAc \
    "SELECT value FROM local_dev_persistence"
)"
[[ "${persisted}" == "preserved" ]]

migration_count="$(migration_execution_count)"
[[ "${migration_count}" == "1" ]]

"${compose[@]}" down -v
if docker volume inspect "${volume_name}" >/dev/null 2>&1; then
  echo "Le volume ${volume_name} existe encore après le reset." >&2
  exit 1
fi

trap - EXIT
echo "Environnement local vérifié : migrations, rôles, persistance et reset OK."
