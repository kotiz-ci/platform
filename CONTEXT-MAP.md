# KOTIZ Context Map

KOTIZ est organisé en onze contextes métier ou d'intégration. Le MVP réduit
n'active que les contextes nécessaires au vertical slice sandbox ; les autres
restent explicitement conservés pour une réactivation ultérieure.

## Contextes actifs dans le MVP réduit

- **IAM** — `apps/backend/iam/CONTEXT.md` — identité, accès et profils des acteurs.
- **Savings** — `apps/backend/savings/CONTEXT.md` — portefeuille, solde et ledger.
- **Agents** — `apps/backend/agents/CONTEXT.md` — activité et float des agents KOTIZ.
- **Payments** — `apps/backend/payments/CONTEXT.md` — ordres et confirmations de paiement sandbox.
- **Notifications** — `apps/backend/notifications/CONTEXT.md` — confirmations et alertes transactionnelles.
- **Admin & Conformité** — `apps/backend/admin/CONTEXT.md` — contrôle opérationnel, rôles sensibles et audit.

## Contextes différés

- **Health** — `apps/backend/health/CONTEXT.md` — différé jusqu'à la réactivation du produit Santé.
- **Scoring** — `apps/backend/scoring/CONTEXT.md` — différé jusqu'à la gouvernance du Score 5 étoiles.
- **WhatsApp** — `apps/backend/wa/CONTEXT.md` — différé jusqu'à la validation du canal WhatsApp.

## Contextes retirés du MVP réduit

- **Growth** — `apps/backend/growth/CONTEXT.md` — parrainage et anti-churn, hors périmètre actuel.
- **USSD** — `apps/backend/ussd/CONTEXT.md` — canal USSD, hors périmètre actuel.

## Règle d'activation

Un contexte différé ou retiré ne reçoit ni migration, ni implémentation, ni ticket
actif tant que sa condition de réactivation n'a pas été explicitement approuvée.
Sa présence dans cette carte conserve son vocabulaire et sa frontière sans créer
de portée de développement implicite.
