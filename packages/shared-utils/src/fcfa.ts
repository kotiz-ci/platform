// Formatage FCFA — convention KOTIZ : pas de décimales, espace insécable comme séparateur de milliers, suffixe "FCFA".
// Exemple : 100000 → "100 000 FCFA"

const NBSP = " ";

export interface FcfaFormatOptions {
  /** Inclure le suffixe " FCFA" (défaut : true) */
  readonly withSuffix?: boolean;
}

export function formatFcfa(amount: number, options: FcfaFormatOptions = {}): string {
  const { withSuffix = true } = options;
  if (!Number.isFinite(amount)) {
    return withSuffix ? `0${NBSP}FCFA` : "0";
  }
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? "-" : "";
  const abs = Math.abs(rounded);
  const groups: string[] = [];
  let s = abs.toString();
  while (s.length > 3) {
    groups.unshift(s.slice(-3));
    s = s.slice(0, -3);
  }
  groups.unshift(s);
  const formatted = sign + groups.join(NBSP);
  return withSuffix ? `${formatted}${NBSP}FCFA` : formatted;
}

/**
 * Parse un montant FCFA texte vers un nombre. Tolère espaces / NBSP / suffixe FCFA.
 * Retourne NaN si non parsable.
 */
export function parseFcfa(input: string): number {
  if (typeof input !== "string") return NaN;
  const cleaned = input.replace(/FCFA/gi, "").replace(/[\s ]/g, "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}
