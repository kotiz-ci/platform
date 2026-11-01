---
persona: Ibrahima
role: Administrateur back-office
priority: Secondary (#2)
wds_phase: 2
date: 2026-06-04
---

# Persona — Ibrahima

> Administrateur back-office · Secondary · #2

---

## Profil

- **Prénom :** Ibrahima (nom générique — représente l'équipe ops/compliance KOTIZ)
- **Âge :** 30–45 ans
- **Rôle :** Gestionnaire back-office, KOTIZ SAS Abidjan
- **Responsabilités :** Réconciliation quotidienne · gestion incidents agents · compliance BCEAO/CENTIF · reporting direction
- **Device :** Poste de travail web (desktop/laptop) — pas mobile-first

## Contexte d'usage

Ibrahima est invisible dans l'organisation mais indispensable. Il ouvre son back-office tôt le matin pour vérifier la nuit passée — alertes, écarts, réconciliation. Il clôt sa journée en ayant tout vérifié. Sa journée est rythmée, prévisible, méthodique.

## ⚠️ Tension Critique

> Ibrahima est **Secondary en priorité design** mais **P0 en criticité opérationnelle**. Si ses outils échouent, KOTIZ est hors conformité BCEAO en 48h. La fiabilité et l'auditabilité de son back-office sont des requirements non-négociables — même si l'expérience peut être plus utilitaire qu'élégante.

## Positive Drivers

1. **Dashboard temps réel** — tout d'un coup d'œil, zéro blind spot
2. **Alertes automatiques** — il agit avant que ça devienne un incident
3. **Données exportables et auditables** — prêt pour tout contrôle BCEAO en 10 min
4. **Réconciliation automatisée** — moins de saisie manuelle, moins d'erreurs
5. **Clore sa journée tout réconcilié** — sérénité professionnelle

## Negative Drivers ⚠️ PRIORITAIRES

1. 🔴 **Écart de float inexpliqué** → il est en première ligne devant la direction
2. 🔴 **Incident détecté par une plainte client**, pas par le système → son échec professionnel
3. 🟠 **Rapport STR CENTIF incomplet ou tardif** → risque réglementaire pour KOTIZ
4. 🟠 **Volume qui triple sans outils supplémentaires** → surcharge et épuisement
5. 🟠 **Panne système lors d'un audit** → données inaccessibles

## Implications Design

- **Back-office utilitaire mais fiable** — density d'information élevée acceptable (contrairement à l'app Fatou)
- **Réconciliation quotidienne automatisée** — un tableau de bord, pas un tableur Excel
- **Alertes configurables par seuil** — Ibrahima définit ses propres seuils d'alerte
- **Logs complets et exportables** — CSV / PDF en un clic pour audit BCEAO
- **Séparation des droits RBAC** — il ne peut pas ce pour quoi il n'est pas autorisé (8 rôles ADR-007)
- **Zéro données orphelines** — chaque transaction a une trace de bout en bout
- **Scalabilité invisible** — si le volume triple, l'interface doit tenir sans dégradation
