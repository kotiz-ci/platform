---
persona: Moussa
role: Agent terrain
priority: Primary (co-#1)
wds_phase: 2
date: 2026-06-04
---

# Persona — Moussa

> Agent terrain · Primary · Co-#1 avec Fatou

---

## Profil

- **Prénom :** Moussa (nom générique — représente tous les agents terrain)
- **Âge :** 28–45 ans
- **Profession :** Ex-collecteur "signé signé" reconverti en agent KOTIZ
- **Niveau actuel :** Bronze (entrée) → cible Silver puis Gold
- **Device :** Smartphone Android mid-range · bonne autonomie essentielle
- **Rapport au terrain :** Travaille tôt le matin (marchés à l'aube) · en mouvement constant · réseau social dense dans sa zone

## Contexte d'usage

Moussa connaît ses clientes par prénom. Son capital, c'est sa réputation locale. Quand il utilise l'app agent, il a besoin que ça marche — vite, sans bug, sans ambiguïté — devant une cliente qui le regarde.

## Positive Drivers

1. **Revenu structuré et croissant** — commission prévisible, qui grandit avec les collectes
2. **Progresser Bronze → Silver → Gold** — statut, revenus supérieurs, reconnaissance
3. **Ne jamais manquer de float** — pouvoir dire "oui" à toutes ses clientes
4. **Être reconnu comme professionnel certifié** dans son quartier
5. **Former des sous-agents au niveau Gold** — devenir entrepreneur avec un réseau

## Negative Drivers ⚠️ PRIORITAIRES

1. 🔴 **Float épuisé → refuser une cliente en public** — réputation détruite
2. 🔴 **Un bug le fait passer pour malhonnête** devant sa cliente
3. 🟠 **KOTIZ remplace les agents par l'app** — crainte existentielle
4. 🟠 **Perdre sa caution (50 000 FCFA)** pour une erreur technique involontaire
5. 🟠 **L'app plante en plein marché** — il ne peut plus travailler

## Décisions Produit Validées

**Système Float Tournée** — `decisions/agent-float-system.md`

- Recharge float mobile money depuis le terrain
- Float Margin dynamique quotidienne (basée sur historique fiabilité)
- Séparation stricte Float Margin / Tier Progression
- Float Margin comme signal positif de dossier de passage de palier

## Implications Design

- **App agent = outil de travail** — vitesse et fiabilité avant l'esthétique
- **Float visible en permanence** en home screen agent (gros, impossible à rater)
- **Alerte préventive float** à 30 % du seuil — jamais de surprise sur le terrain
- **"Préparer ma tournée"** — workflow matinal simple (clients prévus → float calculé → marge accordée → 1 tap)
- **Transaction confirmée en < 3 secondes** — Moussa ne peut pas attendre devant une cliente
- **Mode offline partiel** — enregistrement local si réseau coupé, sync automatique
- **Jamais de jargon technique** dans les erreurs — "Essaie encore" plutôt que "Erreur 503"
- **Progression Bronze→Silver visible** — barre de progression dans son profil agent
