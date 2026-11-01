---
date: 2026-06-04
session: WDS Phase 3 — Scenario 03 (Moussa inscrit une nouvelle cliente)
author: Henoch Lonzo Koffi × Freya (WDS Designer)
status: validé
---

# Décision Produit — Portefeuille Agent (Cliente rattachée à Moussa)

> Décision prise lors de l'outlining du scénario 03

---

## Décision

Quand Moussa inscrit une cliente, elle est **rattachée à son portefeuille agent**. Moussa perçoit une commission résiduelle sur TOUS ses dépôts futurs — y compris quand elle dépose seule via l'app cliente.

---

## Fonctionnement

- **À l'inscription :** Awa est liée à l'ID agent de Moussa dans le système
- **Dépôt physique via Moussa :** commission agent normale (0.8–1.2% selon niveau)
- **Dépôt autonome via app (Awa seule) :** commission résiduelle réduite pour Moussa (taux à définir — ex : 0.2–0.3%)
- **Dépôt via USSD ou WhatsApp :** idem commission résiduelle
- **Un agent peut-il "voler" une cliente à Moussa ?** Non — la cliente reste dans son portefeuille sauf démarche explicite de transfert

---

## Rationale

### Résout le conflit app vs agent

Moussa craint que l'app le remplace. Avec le portefeuille, plus Awa dépose seule → plus Moussa gagne passivement. L'app devient son alliée, pas son concurrent.

### Crée un entrepreneur, pas un prestataire

Moussa a un intérêt financier direct à :

- Inscrire un maximum de clientes (taille du portefeuille = revenu passif)
- Fidéliser ses clientes (si Awa dépose tous les jours, Moussa gagne tous les jours)
- Encourager les clientes à utiliser l'app (il gagne même quand il dort)

### Boucle vertueuse

```
Moussa inscrit Awa
  → Awa dépose via app
    → Moussa gagne commission résiduelle
      → Moussa inscrit encore plus de clientes
        → Portefeuille grandit → revenus passifs croissants
```

### Cohérence avec le score agent

La taille et l'activité du portefeuille alimentent le dossier de progression Bronze→Silver→Gold.

---

## Impact sur le Design

### Dashboard Moussa — "Mes clients" devient un outil business central

| Info                          | Affichage                                  |
| ----------------------------- | ------------------------------------------ |
| Taille du portefeuille        | Nombre total de clientes rattachées        |
| Activité du portefeuille      | X clientes actives ce mois / Y inactives   |
| Commission résiduelle du jour | Montant généré par les dépôts autonomes    |
| Clientes à risque churn       | Celles qui n'ont pas déposé depuis X jours |

### Nouvel enjeu UX

Moussa voit ses clientes inactives → il peut les relancer (visite physique ou appel). Ça crée un **outil d'anti-churn terrain** naturel.

---

## Points à préciser

- Taux exact de commission résiduelle (dépôt autonome via app)
- Durée de rattachement (la cliente peut-elle changer d'agent ?)
- Règle de conflit (si deux agents tentent d'inscrire la même cliente)
- Visibilité côté cliente : est-elle informée qu'elle est rattachée à Moussa ?

---

## Lien avec autres décisions

- `agent-float-system.md` — le portefeuille enrichit le dossier de progression de palier
- Scénario 08 — "Moussa prépare sa journée" : vue "Mes clients" devient tableau de bord portefeuille

---

_Validé par Henoch Lonzo Koffi · 4 juin 2026_
_À intégrer dans : PRD v1.2 · Stories Epic Agent · Specs UX App Agent (vue Mes clients)_
