---
status: proposed (brouillon, non accepté — décision PO / tech attendue)
date: 2026-10-20
---

# Porter le signalement dans un contexte Assistance distinct

Le lot C de la refonte UX introduit le signalement d'une opération, son suivi
(Envoyé > En cours > Résolu), la contestation sur le même signalement et la
correction financière confirmée. `CONTEXT-MAP.md` n'a aucun contexte pour le
signalement. Proposition : créer un contexte **Assistance** (`support`), actif dans
le MVP réduit, qui porte le signalement, ses motifs, ses réponses et la contestation.
La **correction** reste dans **Savings**, seul propriétaire du ledger : Assistance la
demande, Savings l'écrit et la confirme.

## Options envisagées

- **A. Admin & Conformité porte le signalement.** Aucun nouveau module et le
  périmètre de l'ADR-016 reste intact. Rejetée : ce contexte parle de contrôle
  réglementaire (audit, STR, alertes AML). Un signalement de cliente s'y
  confondrait avec la « déclaration de soupçon », et le langage de conformité
  fuirait vers l'app cliente.
- **B. Savings porte le signalement et la correction.** Correction et signalement
  restent au même endroit. Rejetée : le cœur du domaine, avec ses invariants de
  ledger, recevrait un cycle de traitement humain (motifs, réponses, pièces
  jointes, délais) qui n'a rien de financier. « Résolu » doit justement rester
  indépendant de l'argent.
- **C. Nouveau contexte Assistance (recommandée).** Langage propre (« Résolu ≠
  remboursé »), frontière nette avec le ledger, et un point d'accueil pour le lot F
  (aide, contact, motifs, délais, G03) sans créer de module plus tard.

## Conséquences

- L'ADR-016 est amendé : un septième contexte actif. Aucune migration avant
  l'acceptation de cet ADR et la validation des critères de l'issue #69.
- Le contexte a une relation Customer/Supplier avec Savings pour demander une
  correction. Savings publie `CorrectionConfirmed`, qui relie la correction au
  signalement.
- Admin & Conformité reste aval (Conformist) : il reçoit la trace d'audit des
  signalements, sans les porter.
- Si l'ADR est refusé, les termes du glossaire (§5.12) restent valables ; seul
  leur contexte d'accueil change (option A ou B).
