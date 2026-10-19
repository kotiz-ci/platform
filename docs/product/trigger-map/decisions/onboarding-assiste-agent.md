---
date: 2026-06-04
session: WDS Phase 3 — Scope Analysis (Step 02)
author: Henoch Lonzo Koffi × Freya (WDS Designer)
status: validé
---

# Décision Produit — Onboarding Assisté par l'Agent

> Décision prise lors de l'analyse de scope UX Scenarios (Phase 3)

---

## Décision

L'agent Moussa peut **inscrire une nouvelle cliente** directement depuis son app agent, sans que Fatou ait besoin d'aller sur l'app cliente pour créer son compte.

C'est le canal d'acquisition principal pour les 1 000 premières clientes MVP.

---

## Fonctionnement

### Flow Onboarding Assisté (App Agent → Compte Cliente)

1. **Moussa** appuie sur "Inscrire une nouvelle cliente" (depuis home agent ou liste clients)
2. **Moussa** saisit le numéro de téléphone de Fatou
3. **Fatou** reçoit un OTP sur son téléphone et le valide (ou le donne à voix haute à Moussa)
4. **KYC optionnel** — Moussa propose à Fatou de vérifier son identité maintenant (photo CNI) ou plus tard
5. **Compte créé** — Fatou reçoit une notification "Ton compte KOTIZ est prêt"
6. **Enchaînement naturel** — Moussa propose immédiatement le premier dépôt

### Points clés

- Fatou n'a pas besoin de smartphone pour être inscrite — Moussa fait tout depuis son app
- L'OTP va sur le téléphone de Fatou (feature phone = SMS) — elle valide et donne le code
- Le compte simplifié (sans KYC) est activé par défaut — Fatou peut toujours déplafonner plus tard
- Après l'inscription, Moussa peut enchaîner directement avec la collecte du premier dépôt

---

## Impact sur l'inventaire des vues

**Vues ajoutées — App Agent :**

| Vue  | Description                                                |
| ---- | ---------------------------------------------------------- |
| #37b | Inscrire une nouvelle cliente — saisie numéro de téléphone |
| #37c | Inscription assistée — attente validation OTP cliente      |
| #37d | Inscription assistée — KYC optionnel (photo CNI)           |
| #37e | Inscription confirmée → Proposition premier dépôt          |

**Scénario ajouté :**

- Scénario 06b — "Inscription assistée : Moussa inscrit une nouvelle cliente"

---

## Rationale

- **Acquisition** : C'est le vrai canal de croissance MVP — Moussa connaît ses clientes, il va vers elles
- **Inclusion** : Fatou n'a pas besoin d'un smartphone ni de data pour créer son compte
- **Confiance** : Fatou crée son compte avec quelqu'un qu'elle connaît → barrière de défiance réduite
- **Conversion** : Inscription + premier dépôt dans la même interaction → rétention day-1 maximale
- **Benchmark** : Pattern utilisé par tous les grands réseaux d'agents (Wave, Orange Money, MTN MoMo)

---

## Lien avec les autres décisions

- `kyc-progressif.md` — KYC optionnel pendant l'inscription assistée aussi
- `agent-float-system.md` — après l'inscription, Moussa enchaîne avec la collecte (utilise son float)

---

_Validé par Henoch Lonzo Koffi · 4 juin 2026_
_À intégrer dans : PRD v1.2 · Stories Epic Agent · Stories Epic Onboarding · Specs UX App Agent_
