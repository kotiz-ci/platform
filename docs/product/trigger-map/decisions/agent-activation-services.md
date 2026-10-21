---
date: 2026-06-04
session: WDS Phase 3 — Post-scenarios (avant génération overview)
author: Henoch Lonzo Koffi × Freya (WDS Designer)
status: validé
---

# Décision Produit — Agent habilité à activer des services pour ses clientes

> Décision prise après finalisation des 12 scénarios

---

## Décision

Moussa peut **proposer et initier l'activation de services** (bundle Santé, autres services futurs) pour ses clientes depuis son app agent.

**Règle absolue : Fatou doit toujours confirmer explicitement via OTP/SMS sur son propre téléphone.** Moussa ne peut jamais activer un service sans consentement explicite de la cliente.

---

## Flux d'activation par l'agent

```
Moussa sélectionne une cliente dans son portefeuille
  → Tape "Proposer un service"
  → Choisit le service (ex : Santé 50 FCFA/jour)
  → Tape "Envoyer la proposition"
  → Fatou reçoit un SMS : "Moussa vous propose la couverture
    santé KOTIZ à 50 FCFA/j. Confirmez avec ce code : XXXXX"
  → Fatou répond avec le code OTP
  → Service activé · Moussa reçoit confirmation · commission enregistrée
```

---

## Consentement & Conformité

- **OTP = consentement digital** — valable pour conformité CIMA (signature électronique)
- Fatou peut refuser (ignorer le SMS ou taper "NON") → aucune activation
- Délai d'expiration du code OTP : 10 minutes
- Trace complète dans le back-office (qui a proposé, quand, réponse cliente)
- Moussa ne peut PAS voir les codes OTP — ils vont directement sur le téléphone de Fatou

---

## Services activables par l'agent (MVP)

| Service                          | Commission agent        | Condition           |
| -------------------------------- | ----------------------- | ------------------- |
| Bundle Santé (50/100/200 FCFA/j) | À définir (% sur prime) | Compte client actif |
| Autres services Phase 2+         | À définir               | —                   |

---

## Vue ajoutée — App Agent

**"Proposer un service" — intégrée dans le Profil client (vue 33)**

Depuis le profil d'une cliente dans son portefeuille :

- Section "Services actifs" → liste des services souscrites
- Bouton "Proposer un service" → liste des services disponibles
- Sélection + envoi OTP → confirmation

**Inventaire : Vue 33 enrichie — pas de vue supplémentaire**
(La fonctionnalité est intégrée dans le Profil client existant comme storyboard item)

---

## Impact sur les Scénarios

| Scénario                           | Modification                                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **03 — Moussa inscrit**            | Après création du compte Awa, Moussa peut proposer le bundle Santé → Awa confirme par SMS → activé immédiatement |
| **04 — Moussa fait sa collecte**   | Pendant la collecte, si cliente sans Santé → Moussa peut proposer en 1 tap depuis la confirmation de reçu        |
| **08 — Moussa prépare sa journée** | Vue "Mes clients" montre les clientes sans services actifs → opportunités de vente identifiées avant la tournée  |

---

## Valeur stratégique

- **Pour Moussa :** Commission sur services activés → il est vendeur, pas juste collecteur
- **Pour KOTIZ :** Taux de conversion bundle Santé augmenté (face-à-face > notification push) → S1 ≥ 200 souscriptions
- **Pour Fatou :** Proposition contextualisée par quelqu'un qu'elle connaît → plus de confiance qu'une notif froide
- **Résout la peur de Moussa :** L'app ne le remplace pas — elle lui donne des outils pour vendre plus

---

## Points à préciser

- Taux de commission agent sur activation de services (à négocier avec partenaire assureur CIMA)
- Limite du nombre de propositions par cliente (éviter le spam agent)
- Délai minimum entre deux propositions refusées par la même cliente

---

_Validé par Henoch Lonzo Koffi · 4 juin 2026_
_À intégrer dans : PRD v1.2 · Stories Epic Agent · Stories Epic Santé · RBAC (permissions agent)_
