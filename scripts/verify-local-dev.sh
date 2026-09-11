#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${repo_root}"

compose=(docker compose -p kotiz-issue34-verify -f infra/docker/docker-compose.dev.yml)
volume_name=kotiz-issue34-verify_pgdata

cleanup() {
  "${compose[@]}" down -v >/dev/null 2>&1 || true
}
trap cleanup EXIT

bash infra/docker/init-dev-secrets.sh
"${compose[@]}" up --build --detach --wait

health="$(curl --fail --silent http://localhost:8080/actuator/health)"
[[ "${health}" == *'"status":"UP"'* ]]

"${compose[@]}" exec -T postgres psql -U kotiz -d kotiz_dev -v ON_ERROR_STOP=1 \
  -c "CREATE TABLE local_dev_persistence (value text NOT NULL); INSERT INTO local_dev_persistence VALUES ('preserved');" \
  >/dev/null

"${compose[@]}" down
"${compose[@]}" up --detach --wait

persisted="$(
  "${compose[@]}" exec -T postgres psql -U kotiz -d kotiz_dev -tAc \
    "SELECT value FROM local_dev_persistence"
)"
[[ "${persisted}" == "preserved" ]]

"${compose[@]}" down -v
if docker volume inspect "${volume_name}" >/dev/null 2>&1; then
  echo "Le volume ${volume_name} existe encore après le reset." >&2
  exit 1
fi

trap - EXIT
echo "Environnement local vérifié : santé, persistance et reset OK."
