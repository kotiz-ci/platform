#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${repo_root}"

bash infra/docker/init-dev-secrets.sh
exec docker compose -f infra/docker/docker-compose.dev.yml up --build --detach --wait
