import Constants from "expo-constants";

import { resolveAppVariant, type AppVariant } from "./variant-policy.ts";

export { expectedRolesForVariant, type AppVariant } from "./variant-policy.ts";

/**
 * Lit le variant courant depuis la config Expo (alimenté par app.config.ts).
 * Cohérent avec ADR-010 — gating runtime.
 */
export function getAppVariant(): AppVariant {
  return resolveAppVariant(Constants.expoConfig?.extra?.variant);
}

export function isAgentApp(): boolean {
  return getAppVariant() === "agent";
}

export function isClientApp(): boolean {
  return getAppVariant() === "client";
}
