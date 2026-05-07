## Résumé

<!-- 1-3 phrases : qu'est-ce que cette PR change et pourquoi. -->

## Story / Ticket

<!-- ex : Story 1.1 / KOTIZ-XX / Closes #N -->

## Changements

- [ ] ...
- [ ] ...

## Tests

- [ ] Tests unitaires ajoutés / mis à jour (couverture ≥ 80% — exception Story 1.1 init)
- [ ] Tests d'intégration ajoutés / mis à jour (Testcontainers / Docker Compose)
- [ ] Smoke tests passent en local (`pnpm dev:up && pnpm db:migrate && pnpm db:seed`)
- [ ] Tests E2E (mobile = Maestro, admin-web = Playwright) — si UI changée

## DoD per_story (cf. sprint-status.yaml)

- [ ] Lint zéro erreur (`pnpm lint`)
- [ ] Type-check OK (`pnpm type-check`)
- [ ] Documentation mise à jour (README + OpenAPI si backend)
- [ ] Accessibilité WCAG AA (si UI : contrast ≥ 4,5:1, touch ≥ 44px, labels TalkBack/VoiceOver)
- [ ] Idempotency paiements (si touche `payments_orders`)
- [ ] Audit trail (événements métier loggés `core_audit_logs`)
- [ ] Pas de PII en clair dans les logs
- [ ] Data residency UEMOA respectée (cf. ADR-005)

## Sécurité

- [ ] Pas de secrets en clair (gitleaks pre-commit OK)
- [ ] Trivy 0 CVE HIGH/CRITICAL
- [ ] Cosign signature verify OK (sur images Docker)
- [ ] Commit signé GPG (cf. CONTRIBUTING.md)

## Risques / Notes

<!-- Effets de bord, migration nécessaire, breaking changes, runbooks à mettre à jour. -->

## Reviewer checklist

- [ ] Code review effectuée
- [ ] Tests pertinents et suffisants
- [ ] Pas de régression introduite
- [ ] Loom de démo joint si feature visible (cf. décisions 28 avril)
