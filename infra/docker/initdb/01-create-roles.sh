#!/usr/bin/env bash
set -euo pipefail

migration_password="$(tr -d '\r\n' </run/secrets/postgres_migration_password)"
application_password="$(tr -d '\r\n' </run/secrets/postgres_app_password)"

if [[ -z "${migration_password}" || -z "${application_password}" ]]; then
  echo "Les mots de passe PostgreSQL des rôles séparés sont requis." >&2
  exit 1
fi

psql --set=ON_ERROR_STOP=1 \
  --username "${POSTGRES_USER}" \
  --dbname "${POSTGRES_DB}" \
  --set=migration_password="${migration_password}" \
  --set=application_password="${application_password}" <<'SQL'
CREATE ROLE kotiz_migrator LOGIN PASSWORD :'migration_password';
CREATE ROLE kotiz_app LOGIN PASSWORD :'application_password';

REVOKE CREATE ON SCHEMA public FROM PUBLIC;
ALTER SCHEMA public OWNER TO kotiz_migrator;
GRANT USAGE ON SCHEMA public TO kotiz_app;

ALTER DEFAULT PRIVILEGES FOR ROLE kotiz_migrator IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO kotiz_app;
ALTER DEFAULT PRIVILEGES FOR ROLE kotiz_migrator IN SCHEMA public
  GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO kotiz_app;
SQL
