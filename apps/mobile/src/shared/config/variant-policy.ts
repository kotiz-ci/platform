export type AppVariant = "client" | "agent";

export function resolveAppVariant(configuredVariant: unknown): AppVariant {
  return configuredVariant === "agent" ? "agent" : "client";
}

export function expectedRolesForVariant(variant: AppVariant): readonly string[] {
  return variant === "agent" ? ["AGENT"] : ["CLIENT"];
}
