# @kotiz/api-types

Types TypeScript générés automatiquement depuis l'OpenAPI 3.x exposé par `apps/backend`. Consommés par `apps/mobile` (RN/Expo) + `apps/admin-web` (Next.js).

## Pipeline (à implémenter en Story 1.2)

```
apps/backend (Spring Boot + springdoc-openapi)
    │
    │ /v3/api-docs (JSON)
    ▼
openapi-typescript
    │
    ▼
packages/api-types/src/generated.ts
    │
    ├──► apps/mobile (import type)
    └──► apps/admin-web (import type)
```

## Pourquoi un package séparé ?

- **Source de vérité unique** : si backend change un DTO, mobile + admin se cassent à la compilation TS, pas en runtime.
- **Cohérence ADR-008 + ADR-009** : monorepo TypeScript-first ⇒ vrai code partagé entre mobile RN et admin-web.
- **Audit BCEAO** : 1 commit hash → état complet (types ↔ implémentation backend).

## Consommation (exemple)

```ts
import type { ApiHealthResponse } from "@kotiz/api-types";

async function health(): Promise<ApiHealthResponse> {
  const res = await fetch("/actuator/health");
  return res.json();
}
```

## Status

- **Sprint 1 — Story 1.2** : génération automatique CI (PR : si OpenAPI change, types régénérés et committés)
- **Sprint 2+** : enrichissement par module (savings, payments, agents, etc.)
