# Deferred Work — KOTIZ

Travail réel identifié mais reporté à un sprint/epic ultérieur (non actionnable maintenant).

## Deferred from: code review of story-1.1 (2026-06-26)

- **`phone.ts` — cas limites non gérés** : numéros locaux commençant par `225` rejetés à tort ; `isValidPhoneCI` accepte 10 chiffres arbitraires (pas de validation du plan de numérotation CI) ; `guessOperator` ne renvoie jamais `"wave"` (code mort) et mappe des préfixes non fiables. Utilitaire pas encore consommé en logique métier → à couvrir en ATDD à l'**Epic 3** (Auth / OTP SMS). Fichier : `./packages/shared-utils/src/phone.ts`.
- **`fcfa.ts` — cas limites non gérés** : `formatFcfa(NaN/Infinity)` renvoie silencieusement `"0 FCFA"` (masque une valeur corrompue) ; `parseFcfa` accepte la notation scientifique (`"1e3"` → 1000), les séparateurs multiples et ne retire pas l'espace fin insécable `U+202F`. À couvrir en ATDD quand consommé (**Epic 4/5** — Wallet / Épargne). Fichier : `./packages/shared-utils/src/fcfa.ts`.
- **`rbac.ts` — pas de garde runtime (risque sécurité)** : `isAdminRole`/`isFieldRole`/`violatesSod` ne valident pas les entrées hors-type (casse, rôle inconnu) → risque de fail-open sur des données externes (JWT/API) ; `SOD_INCOMPATIBLE_PAIRS` minimal (ADMIN incompatible avec aucun rôle). ⚠️ À durcir en ATDD à l'**Epic 3 / Epic 10** (RBAC 8 rôles + SoD). Fichier : `./packages/shared-utils/src/rbac.ts`.
- **Protection de branche `main` (AC4)** : non vérifiable dans le diff (config GitHub côté serveur). Valider hors-diff : review ≥ 1 obligatoire, force-push interdit, GPG requis. Rattaché à la DoD sprint.
