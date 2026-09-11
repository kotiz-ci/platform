import Constants from "expo-constants";

export type AppVariant = "client" | "agent";

/**
 * Lit le variant courant depuis la config Expo (alimenté par app.config.ts).
 * Cohérent avec ADR-010 — gating runtime.
 */
export function getAppVariant(): AppVariant {
  const variant = Constants.expoConfig?.extra?.variant;
  return variant === "agent" ? "agent" : "client";
}

export function isAgentApp(): boolean {
  return getAppVariant() === "agent";
}

export function isClientApp(): boolean {
  return getAppVariant() === "client";
}

/**
 * Retourne le rôle backend attendu pour ce variant.
 * Sert au garde-fou auth : si l'utilisateur connecté n'a pas un rôle compatible,
 * on déconnecte (cf. ADR-010 §3.3).
 */
export function expectedRolesForVariant(variant: AppVariant): readonly string[] {
  return variant === "agent" ? ["AGENT"] : ["CLIENT"];
}
