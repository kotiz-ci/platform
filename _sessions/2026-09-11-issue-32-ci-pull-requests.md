# Session — Issue #32 : contrôles CI des pull requests

Date : 2026-09-11

Contexte : KOTIZ — Sprint 1, protection des PR vers `develop` et `main`

## Livré

- Workflow PR unique avec annulation des runs obsolètes.
- Toolchains Node.js 24.21.0, pnpm 9.12.3 et Eclipse Temurin
  21.0.12+8.0.LTS.
- Formatage ciblé, contrôle anti-contournement de la couverture et pipeline
  Turborepo limité aux workspaces affectés.
- ESLint strict, markdownlint ciblé, type-check, tests avec couverture et builds,
  dont les deux variants Expo.
- JaCoCo 0.8.15 bloquant sous 80 % pour le backend.
- Couverture Node bloquante pour la politique et l'adaptateur mobile, les
  utilitaires partagés, ainsi que tous les scripts exécutables de design tokens.
- Spotless Java et ESLint réel pour les packages TypeScript/Node.
- Scripts d'orchestration du dépôt couverts à plus de 80 % et testés avec des
  adaptateurs injectés.
- Gitleaks 8.30.1 par image OCI épinglée, avec une seule exception de chemin pour
  `.env.example`, réservé aux valeurs factices.
- Trivy 0.70.0 bloquant les vulnérabilités critiques non dérogées.
- Check agrégé `CI required` déclaré dans les deux rulesets protégés.
- Vérificateur GitHub étendu aux checks obligatoires.

## Preuves locales

- RED : 4 tests de contrat échouaient sans workflow, checks requis, JaCoCo et
  politique de couverture.
- GREEN : 6 tests de contrat CI et 38 tests de configuration,
  GitHub/formatage/Markdown/périmètre de couverture et smoke.
- Suite complète Turborepo : 20 tâches réussies sur 20.
- Backend : 2 tests réussis et seuil JaCoCo respecté.
- Couverture Node : mobile 100 %, design tokens 97,74 % lignes, 93,94 % branches
  et 100 % fonctions, shared-utils 100 % lignes, 100 % fonctions et 90,70 %
  branches, scripts racine 83,98 % lignes, 86,32 % branches et 87,50 %
  fonctions.
- Revue croisée standards/spec : formatage documenté corrigé, Spotless ajouté,
  faux lints supprimés et sources exécutables hors gate désormais refusées.
- Exports Expo web client et agent réussis.
- Gitleaks : aucune fuite sur le checkout ni sur les 16 commits, avec deux
  valeurs AES factices historiques ciblées exactement.
- Trivy : aucune vulnérabilité critique dans le lockfile pnpm ou le POM Maven.

## Limite de livraison

Les rulesets sont versionnés mais leur mise à jour distante doit être appliquée
après publication de la branche, afin que le check `CI required` existe sur la PR
avant de devenir obligatoire sur `develop` et `main`.
