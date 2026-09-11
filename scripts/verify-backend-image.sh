#!/usr/bin/env bash
set -euo pipefail

image_ref="${1:?usage: verify-backend-image.sh <image-ref>}"
run_id="${KOTIZ_OCI_RUN_ID:-$$}"
network="kotiz-image-check-${run_id}"
database="kotiz-image-db-${run_id}"
backend="kotiz-image-backend-${run_id}"
postgres_image="postgres:15.19-alpine3.24@sha256:fe0737ba566a2c5b2a28f34433c0a423261900ec17b9bf7ad115e1aae7e57f1b"
database_password="$(openssl rand -hex 32)"

cleanup() {
  docker rm --force "$backend" "$database" >/dev/null 2>&1 || true
  docker network rm "$network" >/dev/null 2>&1 || true
}
trap cleanup EXIT

test "$(docker image inspect --format '{{.Config.User}}' "$image_ref")" = "kotiz"
docker run --rm --entrypoint java "$image_ref" -version 2>&1 | grep --quiet 'version "21\.'
docker run --rm --entrypoint sh "$image_ref" -c \
  '! command -v javac && ! command -v mvn && ! test -e /workspace && ! test -e /root/.m2'

docker network create "$network" >/dev/null
docker run --detach \
  --name "$database" \
  --network "$network" \
  --env POSTGRES_DB=kotiz_ci \
  --env POSTGRES_USER=kotiz \
  --env POSTGRES_PASSWORD="$database_password" \
  --health-cmd 'pg_isready -U kotiz -d kotiz_ci' \
  --health-interval 1s \
  --health-timeout 3s \
  --health-retries 30 \
  "$postgres_image" >/dev/null

for _ in $(seq 1 30); do
  if test "$(docker inspect --format '{{.State.Health.Status}}' "$database")" = "healthy"; then
    break
  fi
  sleep 1
done
test "$(docker inspect --format '{{.State.Health.Status}}' "$database")" = "healthy"

docker run --detach \
  --name "$backend" \
  --network "$network" \
  --env SERVER_ADDRESS=0.0.0.0 \
  --env SPRING_PROFILES_ACTIVE=local \
  --env SPRING_DATASOURCE_URL="jdbc:postgresql://${database}:5432/kotiz_ci" \
  --env SPRING_DATASOURCE_USERNAME=kotiz \
  --env SPRING_DATASOURCE_PASSWORD="$database_password" \
  "$image_ref" >/dev/null

for _ in $(seq 1 60); do
  if docker exec "$backend" \
    wget --quiet --tries=1 --output-document=- http://127.0.0.1:8080/actuator/health \
    2>/dev/null | grep --quiet '"status":"UP"'; then
    echo "Backend image $image_ref is healthy"
    exit 0
  fi

  if test "$(docker inspect --format '{{.State.Running}}' "$backend")" != "true"; then
    docker logs "$backend"
    exit 1
  fi
  sleep 2
done

docker logs "$backend"
echo "Backend image $image_ref did not become healthy" >&2
exit 1
