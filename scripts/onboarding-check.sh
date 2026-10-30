#!/usr/bin/env bash
# KOTIZ — script de vérification onboarding chronométré (Story 1.6 AC10).
# Cible : ≤ 1 h sur machine clean (mitigation R1 bus factor — PRD §14).
#
# Sprint 1 : version minimale (toolchain only). Story 1.6 enrichira avec dev:up + db:migrate + smoke API.

set -euo pipefail

# ----- couleurs -----
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

step() { printf "${YELLOW}▶ %s${NC}\n" "$1"; }
ok()   { printf "${GREEN}✅ %s${NC}\n" "$1"; }
ko()   { printf "${RED}❌ %s${NC}\n" "$1"; }

START=$(date +%s)

step "1/4  Node.js"
NODE_VERSION=$(node --version 2>/dev/null || true)
if [[ "$NODE_VERSION" == "v24.21.0" ]]; then
  ok "Node $NODE_VERSION"
else
  ko "Node attendu v24.21.0, trouvé ${NODE_VERSION:-absent}"
  echo "   → installer via : nvm install 24.21.0 && nvm use 24.21.0"
  exit 1
fi

step "2/4  Corepack + pnpm"
if ! command -v corepack >/dev/null 2>&1; then
  ko "Corepack absent — installer Node 24.21.0 via nvm"
  exit 1
fi
PNPM_VERSION=$(pnpm --version 2>/dev/null || true)
if [[ "$PNPM_VERSION" == "9.12.3" ]]; then
  ok "pnpm $PNPM_VERSION (via Corepack)"
else
  ko "pnpm attendu 9.12.3, trouvé ${PNPM_VERSION:-absent}"
  echo "   → corepack enable && corepack prepare pnpm@9.12.3 --activate"
  exit 1
fi

step "3/4  Java 21.0.12 (backend Spring Boot)"
JAVA_VERSION=$(java --version 2>&1 | head -1 || true)
if [[ "$JAVA_VERSION" =~ (^|[[:space:]])21\.0\.12([+[:space:]]|$) ]]; then
  ok "Java $JAVA_VERSION"
else
  ko "Java 21.0.12 attendu, trouvé ${JAVA_VERSION:-absent}"
  echo "   → installer via : sdk install java 21.0.12-tem"
  exit 1
fi

step "4/4  Docker"
if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
  ok "Docker $(docker --version)"
else
  ko "Docker daemon absent / non démarré — installer Docker Desktop ou OrbStack"
  exit 1
fi

END=$(date +%s)
ELAPSED=$((END - START))

echo
ok "Toolchain OK en ${ELAPSED}s"
echo
echo "Prochaines étapes (à automatiser Story 1.6) :"
echo "  pnpm install                                # ~2 min"
echo "  cp .env.example .env                        # Story 1.3a"
echo "  bash infra/docker/init-dev-secrets.sh       # Story 1.3a"
echo "  pnpm dev:up                                 # Story 1.3a"
echo "  pnpm db:migrate && pnpm db:seed             # Story 1.4"
echo "  curl http://localhost:8080/actuator/health  # Smoke API"
echo
echo "Cible globale : ≤ 1 h chronométrée."
