# Documentation KOTIZ

Documentation de cadrage du dépôt, en plus des contextes (`CONTEXT-MAP.md`)
et des ADR (`docs/adr/`). La lire seulement quand le sujet le demande.

| Sujet                                                      | Fichier                                                                           |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Périmètre MVP en vigueur (re-scope approuvé le 2026-09-01) | `docs/product/sprint-change-proposal-2026-09-01.md`                               |
| Frontières Spring Modulith et FSD (2026-09-11)             | `docs/product/sprint-change-proposal-2026-09-11.md`                               |
| Exigences produit                                          | `docs/product/prd-mvp.md` (validation : `prd-mvp-validation.md`)                  |
| Règles métier des parcours                                 | `docs/product/regles-metier-parcours-mvp.md`                                      |
| Epics et stories d'origine                                 | `docs/product/epics.md`                                                           |
| Vision et personas (Fatou, Moussa, Ibrahima)               | `docs/product/product-brief.md`, `docs/product/trigger-map/`                      |
| Glossaire et context map DDD                               | `docs/architecture/ddd-context-map-glossaire.md`                                  |
| Architecture, données, sécurité, DevOps                    | `docs/architecture/{hld,erd,plan-securite,plan-devops}.md`                        |
| Refonte UX des parcours (travail en cours)                 | `docs/design/refonte-parcours/brief.md`                                           |
| Spécification UX et PRD design                             | `docs/design/ux-design-specification.md`, `prd-design-mvp.md`                     |
| Couverture du socle et inventaire du lot A                 | `docs/design/matrice-couverture-socle.md`, `lot-a-inventaire-avant-production.md` |
| Audit du design system                                     | `docs/design/audit-design-system-2026-10-11.md`                                   |
| Dette technique différée                                   | `docs/dev/deferred-work.md`                                                       |
| Conventions, CI et promotion                               | `CONTRIBUTING.md`, `docs/ci/`                                                     |

Règles de priorité :

- Le backlog vivant, ce sont les issues GitHub. `epics.md` est l'historique du
  cadrage ; une story qui n'a pas d'issue n'est pas planifiée.
- En cas de conflit, le re-scope du 2026-09-01 l'emporte sur le PRD, et un ADR
  l'emporte sur le HLD.
- Tant que les `CONTEXT.md` de contexte n'existent pas, le glossaire de
  `docs/architecture/ddd-context-map-glossaire.md` fait foi pour le vocabulaire.
