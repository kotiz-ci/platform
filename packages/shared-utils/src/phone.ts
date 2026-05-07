// Validation E.164 simple pour numéros Côte d'Ivoire (+225) et UEMOA voisins.
// MVP KOTIZ cible CI uniquement (cf. ADR-005 data residency UEMOA).

const COUNTRY_CI = "225";

/**
 * Normalise un numéro saisi par l'utilisateur en format E.164 (+2250707070707).
 * Accepte : "07 07 07 07 07", "0707070707", "+225 07 07 07 07 07", "2250707070707".
 * Retourne null si non parsable ou pas un numéro CI valide (10 chiffres après +225).
 */
export function normalizePhoneCI(input: string): string | null {
  if (typeof input !== "string") return null;
  const digits = input.replace(/[^\d]/g, "");
  let normalized: string;
  if (digits.startsWith(COUNTRY_CI)) {
    normalized = digits;
  } else if (digits.length === 10) {
    normalized = COUNTRY_CI + digits;
  } else {
    return null;
  }
  if (normalized.length !== 13) return null;
  if (!/^\d+$/.test(normalized)) return null;
  return `+${normalized}`;
}

export function isValidPhoneCI(input: string): boolean {
  return normalizePhoneCI(input) !== null;
}

/**
 * Identifie l'opérateur Mobile Money probable depuis le préfixe (heuristique 2026 — à valider Story 4.x).
 * Renvoie "unknown" si non identifié.
 */
export type MobileMoneyOperator = "orange" | "mtn" | "wave" | "moov" | "unknown";

export function guessOperator(phone: string): MobileMoneyOperator {
  const e164 = normalizePhoneCI(phone);
  if (!e164) return "unknown";
  const local = e164.slice(4); // après +225
  const prefix = local.slice(0, 2);
  if (["07", "08", "09"].includes(prefix)) return "orange";
  if (["05", "06", "04"].includes(prefix)) return "mtn";
  if (["01", "02", "03"].includes(prefix)) return "moov";
  return "unknown";
}
