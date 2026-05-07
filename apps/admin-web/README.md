# `apps/admin-web` — KOTIZ Admin Console (Next.js)

Console web admin KOTIZ pour les rôles **OPS** (Ibrahima, KYC Tier 2), **RISK**, **FINANCE**, **PO**, **ADMIN**, **AUDITOR** (cf. ADR-007 — RBAC 8 rôles).

## Status Sprint 1

⚠️ **Placeholder** — sera initialisé via `pnpm create next-app` lors de l'exécution Story 1.1 par Desiré.

## Stack cible

| Composant | Version | Rôle |
|---|---|---|
| Next.js | 15.x stable | Framework SSR/RSC |
| React | 19.x | Lib UI |
| TypeScript | 5.6.x strict | Langage |
| Tailwind CSS | 3.4.x (preset `@kotiz/design-tokens/tailwind`) | Styling |
| App Router | natif | Routing file-based |
| TanStack Query | 5.x | Server state mgmt (Sprint 2+) |

## Init (commande Story 1.1)

```bash
cd apps/admin-web
pnpm dlx create-next-app@^15 . --typescript --tailwind --app --use-pnpm --eslint --src-dir=false --import-alias="@/*"
```

Puis :
- Installer `@kotiz/design-tokens`, `@kotiz/api-types`, `@kotiz/shared-utils`, `lucide-react`
- Configurer `tailwind.config.ts` avec `presets: [require("@kotiz/design-tokens/tailwind")]`
- Importer `@kotiz/design-tokens/css` dans `app/globals.css`

## Routes prévues (Sprints 4-5 — Epic 10)

| Route | Rôle | Story |
|---|---|---|
| `/login` | tous | 10.1 |
| `/queue/kyc-tier2` | OPS (Ibrahima) | 10.3 |
| `/aml/alerts` | RISK | 10.4 |
| `/str-reports` | RISK | 10.5 |
| `/audit` | AUDITOR | 10.7 |
| `/reports/bceao` | FINANCE | 10.6 |

## Référence

- ADR-007 — RBAC 8 rôles + SoD
- Epic 10 — Admin & Conformité
- Story 1.1 AC1 — init Next.js
