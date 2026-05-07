// Placeholder — Story 1.2 remplira ce fichier par génération automatique
// depuis l'OpenAPI 3.x exposé par apps/backend (springdoc-openapi).
//
// Pipeline cible (Story 1.2 AC#) :
//   1. apps/backend expose /v3/api-docs (OpenAPI JSON)
//   2. CI : npx openapi-typescript http://backend:8080/v3/api-docs -o packages/api-types/src/generated.ts
//   3. Consumers : import type { components, paths } from "@kotiz/api-types"
//
// En attendant, on exporte un type "Hello world" pour valider la chaîne TS.

export type ApiHealthStatus = "UP" | "DOWN" | "OUT_OF_SERVICE" | "UNKNOWN";

export interface ApiHealthResponse {
  readonly status: ApiHealthStatus;
  readonly components?: Record<string, { status: ApiHealthStatus }>;
}
