---
date: 2026-06-04
session: WDS Phase 3 — Scenario 05 (Fatou active sa couverture santé)
author: Henoch Lonzo Koffi × Freya (WDS Designer)
status: validé
---

# Décision Produit — Santé : Deux Flux de Prise en Charge

> Décision prise lors de l'outlining du scénario 05

---

## Décision

Le modèle santé KOTIZ supporte deux flux distincts selon que la clinique est dans le réseau de soins ou non.

---

## Flux 1 — Clinique en réseau (Tiers Payant)

```
Fatou est malade
  → Va dans une clinique partenaire KOTIZ
  → Montre sa carte assurée digitale (QR code dans l'app)
  → La clinique scanne / vérifie avec CIMA partenaire
  → Fatou paie seulement le ticket modérateur (% à définir)
  → Zéro déclaration dans l'app — traitement automatique
```

**MVP :** Tiers payant semi-manuel — la clinique appelle CIMA pour vérification. Pas encore de scan automatique.

---

## Flux 2 — Clinique hors réseau (Remboursement)

```
Fatou est malade → Va dans une clinique hors réseau
  → Paie le plein tarif
  → Ouvre l'app → "Déclarer un sinistre"
  → Upload photo du reçu de consultation
  → CIMA traite manuellement (délai MVP : 5-10 jours)
  → Remboursement sur wallet KOTIZ ou mobile money
```

---

## Vue ajoutée — "Ma carte assurée"

Nouvelle vue à ajouter à l'inventaire (Scénario 05) :

| Élément               | Contenu                                              |
| --------------------- | ---------------------------------------------------- |
| Nom assurée           | Fatou (prénom + initiale nom)                        |
| Numéro de membre      | Identifiant unique KOTIZ-CIMA                        |
| Couverture active     | Formule choisie (50/100/200 FCFA/j) + dates validité |
| QR code               | Scannable par la clinique pour vérification          |
| Liste réseau de soins | Cliniques partenaires Abidjan (MVP : 3-5 cliniques)  |

---

## Réseau de soins MVP

- Périmètre : Abidjan (Adjamé, Yopougon, Abobo, Treichville — zones cibles)
- Volume initial : 3 à 5 cliniques partenaires CIMA
- Critères de sélection : à définir avec partenaire assureur
- Affichage dans l'app : liste simple (nom + adresse + téléphone) — pas de carte interactive en MVP

---

## Phase 2 — Digitalisation

- OCR automatique des reçus
- Auto-approbation sous seuil défini
- Suivi temps réel du statut de sinistre
- Intégration directe avec les cliniques partenaires (facturation directe sans appel)
- Remboursement automatique déclenché sur wallet KOTIZ

---

## Impact sur l'inventaire des vues

| Vue                        | Statut                                                  |
| -------------------------- | ------------------------------------------------------- |
| #16 — Santé dashboard      | ✅ Existante — ajouter accès "Ma carte assurée"         |
| #17 — Choix formule        | ✅ Existante                                            |
| #18 — Déclaration sinistre | ✅ Existante — flux hors réseau uniquement              |
| #16b — Ma carte assurée    | ✅ **Nouvelle** — carte digitale + QR + réseau de soins |

**Inventaire mis à jour : 56 vues**

---

## Lien avec autres décisions

- `kyc-progressif.md` — la carte assurée nécessite un minimum d'identification (nom)
- Scénario 05 — "Fatou active sa couverture santé" : ajouter étape "Ma carte assurée" au chemin

---

_Validé par Henoch Lonzo Koffi · 4 juin 2026_
_À intégrer dans : PRD v1.2 · Stories Epic Santé · Specs UX App Cliente (Santé)_
