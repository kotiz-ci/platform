// 8 rôles RBAC KOTIZ (cf. ADR-007 + Story 1.4 AC9).
// Sprint 1 : constants partagées. Sprint 2+ : helpers de check côté admin-web.

export const KOTIZ_ROLES = [
  "CLIENT",
  "AGENT",
  "OPS",
  "RISK",
  "FINANCE",
  "PO",
  "ADMIN",
  "AUDITOR",
] as const;

export type KotizRole = (typeof KOTIZ_ROLES)[number];

export const ADMIN_ROLES: ReadonlyArray<KotizRole> = ["OPS", "RISK", "FINANCE", "PO", "ADMIN", "AUDITOR"];
export const FIELD_ROLES: ReadonlyArray<KotizRole> = ["CLIENT", "AGENT"];

export function isAdminRole(role: KotizRole): boolean {
  return ADMIN_ROLES.includes(role);
}

export function isFieldRole(role: KotizRole): boolean {
  return FIELD_ROLES.includes(role);
}

/**
 * Separation of Duties (ADR-007) : un même utilisateur ne peut pas cumuler
 * deux rôles "incompatibles" sur une même opération métier.
 *
 * Sprint 1 = liste minimale ; à enrichir Story 10.2.
 */
export const SOD_INCOMPATIBLE_PAIRS: ReadonlyArray<readonly [KotizRole, KotizRole]> = [
  ["RISK", "FINANCE"],
  ["OPS", "AUDITOR"],
  ["PO", "AUDITOR"],
];

export function violatesSod(roleA: KotizRole, roleB: KotizRole): boolean {
  return SOD_INCOMPATIBLE_PAIRS.some(
    ([a, b]) => (a === roleA && b === roleB) || (a === roleB && b === roleA)
  );
}
