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
if node --version | grep -q "v20.18"; then
  ok "Node $(node --version)"
else
  ko "Node attendu v20.18.x, trouvé $(node --version 2>/dev/null || echo 'absent')"
  echo "   → installer via : nvm install 20.18.0 && nvm use 20.18.0"
  exit 1
fi

step "2/4  Corepack + pnpm"
if ! command -v corepack >/dev/null 2>&1; then
  ko "Corepack absent — installer Node 20+ via nvm"
  exit 1
fi
if pnpm --version | grep -q "^9\.12\.3$"; then
  ok "pnpm $(pnpm --version) (via Corepack)"
else
  ko "pnpm attendu 9.12.3, trouvé $(pnpm --version 2>/dev/null || echo 'absent')"
  echo "   → corepack enable && corepack prepare pnpm@9.12.3 --activate"
  exit 1
fi

step "3/4  Java 17 (backend Spring Boot)"
if java --version 2>&1 | grep -q "17\."; then
  ok "Java $(java --version | head -1)"
else
  ko "Java 17 attendu — installer via : sdk install java 17.0.13-tem"
  echo "   (skip non-bloquant si tu touches uniquement mobile/admin-web pour le moment)"
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
echo "  curl http://localhost/actuator/health       # Smoke API"
echo
echo "Cible globale : ≤ 1 h chronométrée."
