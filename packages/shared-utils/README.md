# @kotiz/shared-utils

Utilitaires TypeScript partagés entre `apps/mobile` (RN/Expo) et `apps/admin-web` (Next.js). Pas de dépendances runtime.

## Modules

| Module | Contenu |
|---|---|
| `fcfa.ts` | `formatFcfa(amount)`, `parseFcfa(text)` — convention NBSP + suffixe FCFA |
| `phone.ts` | `normalizePhoneCI(input)`, `isValidPhoneCI(input)`, `guessOperator(phone)` (heuristique MM) |
| `rbac.ts` | 8 rôles `KotizRole`, helpers `isAdminRole`/`isFieldRole`/`violatesSod` (cf. ADR-007) |

## Consommation

```ts
import { formatFcfa, normalizePhoneCI, isAdminRole } from "@kotiz/shared-utils";

formatFcfa(125000); // "125 000 FCFA"
normalizePhoneCI("07 07 07 07 07"); // "+2250707070707"
isAdminRole("OPS"); // true
```

## Tests (Sprint 2+)

Jest + ts-jest. Tests unitaires DoD ≥ 80% — couvrir les cas limites :
- `formatFcfa` : 0, négatifs, > 10⁹, non-finis
- `normalizePhoneCI` : tous les formats acceptés, longueurs invalides, non-string
- `guessOperator` : tous les préfixes connus + unknown
- `violatesSod` : symétrie de la fonction (A,B) ↔ (B,A)

## Status

- **Sprint 1** : constants + utilitaires de base
- **Sprint 2+** : enrichissement par module métier (validators KYC, format date FR, etc.)
