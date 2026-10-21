---
date: 2026-06-04
session: WDS Phase 3 — Scope Analysis (Step 02)
author: Henoch Lonzo Koffi × Freya (WDS Designer)
status: validé
---

# Décision Produit — KYC Progressif (Compte Simplifié)

> Décision prise lors de l'analyse de scope UX Scenarios (Phase 3)

---

## Décision

Le KYC n'est **pas bloquant à l'onboarding**. La cliente peut créer son compte et commencer à épargner immédiatement avec un **compte simplifié** (plafonds BCEAO activés automatiquement).

Le KYC est déclenché **contextuellement** — uniquement quand la cliente atteint un plafond de transaction ou de solde, via un flow "Déplafonner mon compte".

---

## Fonctionnement

### Compte simplifié (sans KYC)

- Dépôt max par transaction : à définir (ex : 50 000 FCFA)
- Solde max : à définir (ex : 150 000 FCFA)
- Retrait max : à définir
- Accès : toutes les fonctionnalités de base (dépôt, objectif, score, santé)

### Déclencheur KYC ("Déplafonner mon compte")

Déclenché automatiquement quand la cliente :

- Tente un dépôt supérieur au plafond
- Atteint le solde maximum
- Veut accéder à des services avancés (retraits importants, crédit futur)

### Flow KYC onboarding (optionnel, skippable)

Proposé à l'étape 4 de l'onboarding :

> "Vérifie ton identité pour profiter de KOTIZ sans limites"
> [Vérifier maintenant] · [Plus tard]

- **[Vérifier maintenant]** → KYC complété à l'inscription, compte déplafonné dès le départ
- **[Plus tard]** → compte simplifié actif, KYC différé

### Flow "Déplafonner mon compte" (différé)

Déclenché pour les clientes ayant skippé le KYC à l'inscription :

1. Écran d'information — ce que ça débloque
2. Photo pièce d'identité (CNI / passeport)
3. Selfie de vérification
4. Confirmation — compte déplafonné

---

## Rationale

- **UX** : Zéro friction à l'onboarding — Fatou commence immédiatement
- **Rétention** : Elle est accro avant d'être bloquée — le KYC arrive quand elle est déjà engagée
- **Conformité** : Conforme BCEAO (comptes de paiement de base, KYC allégé autorisé sous seuils)
- **Benchmark** : Pattern utilisé par Wave CI, Orange Money CI, MTN MoMo

---

## Impact sur l'inventaire des vues

| Vue                                | Statut                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| Vue #4 — KYC onboarding            | ✅ Maintenue — **optionnelle et skippable** (bouton "Plus tard")                     |
| Vue #4b — "Déplafonner mon compte" | ✅ Ajoutée — flow contextuel pour les clientes ayant skippé + déclenchée à la limite |

Onboarding : **7 étapes** — étape KYC présente mais non bloquante

---

## À préciser (prochaine étape)

- Seuils exacts des plafonds compte simplifié (en lien avec réglementation BCEAO en vigueur)
- Timing du déclencheur KYC (à la transaction bloquée ? avant ? proactif à X% du plafond ?)
- Gestion des agents : Moussa peut-il onboarder une cliente sans KYC ? (probable : oui)

---

_Validé par Henoch Lonzo Koffi · 4 juin 2026_
_À intégrer dans : PRD v1.2 · Stories Epic Onboarding · Specs UX App Cliente_
