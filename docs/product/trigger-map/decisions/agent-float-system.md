---
date: 2026-06-04
session: WDS Phase 2 — Trigger Map Workshop (Driving Forces Moussa)
author: Henoch Lonzo Koffi × Freya (WDS Designer)
status: validé
---

# Décisions Produit — Système Float Agent

> Décisions prises lors du workshop Driving Forces (Phase 2 Trigger Map)
> Contexte : résolution du problème "Moussa doit refuser une cliente en public quand son float est épuisé"

---

## Décision 1 — Recharge float mobile money (terrain)

**Décision :** Moussa peut reconstituer son float depuis le terrain via Orange Money / Wave, sans avoir à se déplacer physiquement chez KOTIZ.

**Rationale :** Temps d'arrêt réduit de ~2h à ~2 minutes. Résout 80 % des situations de float épuisé sur le terrain.

**Contrainte :** Dépend des partenariats mobile money (Orange Money, Wave). À intégrer dans les négociations partenaires.

---

## Décision 2 — Float Margin dynamique quotidienne ("Float Tournée")

**Décision :** Avant de partir en tournée, Moussa peut bénéficier d'une marge de float automatique basée sur son historique de fiabilité.

### Fonctionnement

1. Le matin, Moussa déclare ses clients prévus et le montant estimé de la tournée
2. Le système compare au float disponible
3. Si gap → le système calcule une marge automatique selon l'algorithme ci-dessous
4. Moussa confirme en un tap et part avec le float étendu

### Algorithme de marge

| Facteur                               | Impact            |
| ------------------------------------- | ----------------- |
| Zéro incident sur 30 derniers jours   | +marge            |
| Reconstitution float < 24h en moyenne | +marge            |
| Niveau agent (Bronze / Silver / Gold) | plafond supérieur |
| Écart de réconciliation passé         | -marge (pénalité) |

### Plafonnement

- La marge ne dépasse **jamais le palier suivant − buffer de sécurité**
  - Exemple : palier Bronze 200k → palier Silver 500k → marge max ≈ 450k (jamais 500k)
- La marge est **temporaire et quotidienne** — elle se réinitialise chaque jour

### Reconstitution obligatoire

- Rappel push à 17h si marge utilisée
- Délai de reconstitution : avant 20h le même jour
- Non-reconstitution → réduction de la marge du lendemain

---

## Décision 3 — Séparation stricte Float Margin / Tier Progression

**Décision :** La Float Margin n'est PAS un mécanisme de changement de palier. Ce sont deux systèmes distincts.

|             | Float Margin                          | Tier Progression                          |
| ----------- | ------------------------------------- | ----------------------------------------- |
| Nature      | Opérationnel, temporaire, quotidien   | Statutaire, permanent                     |
| Déclencheur | Historique fiabilité + besoin du jour | Critères cumulatifs (temps + ops + audit) |
| Décision    | Automatique (algorithme)              | Validation humaine KOTIZ                  |
| Reset       | Chaque jour                           | Jamais (palier acquis = acquis)           |

**Rationale :** Éviter le gaming du système. Les paliers (Bronze→Silver→Gold) doivent refléter une fiabilité prouvée sur la durée, pas une capacité à emprunter du float.

---

## Décision 4 — Float Margin comme signal de progression de palier

**Décision :** Les données d'utilisation de la Float Margin alimentent le **dossier de revue de palier** de Moussa, sans le déclencher automatiquement.

**Exemple :**

```
Moussa — Revue Silver (trimestre 1)
  Utilisation Float Margin : 28 fois
  Reconstitution dans les délais : 28/28 (100%)
  Incidents : 0
  → Signal positif fort pour passage Silver
```

**Rationale :** La marge devient une preuve comportementale supplémentaire qui accélère l'accès au palier supérieur sans court-circuiter le processus de validation.

---

## UX — Wireframe conceptuel "Préparer ma tournée"

```
☀️ Bonjour Moussa — ta tournée du jour

Float disponible :     20 000 FCFA
Clients prévus :       8 clientes
Montant estimé :       30 000 FCFA
Gap :                  -10 000 FCFA

✅ Ton historique est excellent (47 jours sans incident)
→ Marge accordée : +12 000 FCFA

Float effectif aujourd'hui : 32 000 FCFA
                    [Confirmer et partir →]
```

---

## Impact sur les Driving Forces de Moussa

Ces décisions résolvent directement son negative driver principal :

> ~~Son float est épuisé → il doit refuser une cliente en public~~

Et renforcent ses positive drivers :

> ✅ Il ne dit jamais non à une cliente
> ✅ Sa marge grandit avec sa fiabilité → boucle vertueuse
> ✅ Ses données de marge accélèrent son passage Silver/Gold

---

_Décisions validées par Henoch Lonzo Koffi · 4 juin 2026_
_À intégrer dans : PRD v1.2 · Stories Epic Agent · Specs UX App Agent_
