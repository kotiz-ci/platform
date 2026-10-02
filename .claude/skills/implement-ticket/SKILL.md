---
name: implement-ticket
description: Prepare an existing ticket for implementation by checking readiness, deriving traceable Gherkin only when behaviour warrants it, agreeing test seams or another verification plan, then following the implement skill while keeping a visible task list and short status reports. Use for framed tickets; route unclear work back to clarification and oversized work back to ticket slicing.
---

# Implement Ticket

Qualify one ticket and its proof strategy, then follow
[implement](../implement/SKILL.md). `implement` owns development, TDD, verification,
code review, and commit. This skill owns scope, proof, the task list, and reporting.

## Output rules

Apply to every message produced while this skill is active, including while following
`implement`. These rules override any reporting style in `implement`, `tdd`, or
`code-review`.

- No prose between steps. Report state, not intentions.
- Status report: at most 3 lines (format in step 5).
- One question at a time, on one line, with its options.
- Never restate the ticket, the source ledger, or a plan already shown.
- Show code only when asking for its approval.

## Boundaries

- Work from an existing ticket. Never create, enlarge, or reinterpret its scope.
- Trace every expected outcome to the ticket or an approved, referenced decision.
- Use ADRs and domain docs to clarify decisions and vocabulary, never to add behaviour.
- Treat missing behaviour as a question. Never assume it.
- Write no production code while the ticket is uncertain, blocked, or too large for one
  coherent green delivery.

## 1. Load sources

1. Read the ticket, acceptance criteria, blockers, linked specs, approved ADRs, glossary.
   Follow the project's issue-tracker instructions.
2. Inspect current code at the affected public boundaries. Do not trust the ticket's
   claims about existing code.
3. Record the review fixed point (current commit).
4. Build the source ledger: one line per source, stable id (`AC-1`, `ADR-12 §3`).
5. On conflicting sources: stop, report the conflict, choose nothing.

## 2. Readiness gate

Ready only when every applicable item is known:

- expected result and verifiable acceptance criteria;
- actors, permissions, errors, limits;
- dependencies and blockers;
- affected public contracts and compatibility;
- migration, rollback, transaction, retry, idempotency.

| Situation | Action |
|---|---|
| Missing or contradictory product decision | Stop → `grill-with-docs`. Apply `needs-info` only if the tracker workflow allows it |
| Cannot land as one coherent green delivery | Stop → `to-tickets`, with the proposed vertical split and blocking edges |
| Unfinished blocker | Stop and report it |
| Otherwise | Choose the proof path |

One coherent green delivery: one commit that leaves the system green, with no half-built
intermediate state visible to users or other modules.

## 3. Proof path

### Behaviour path

Use for observable behaviour: business rules, APIs, authorization, state transitions,
validation, regressions.

Write Gherkin from the ledger only. Save it in the project's test-artifact location,
else `.scratch/test-artifacts/<ticket-id>/gherkin.md`.

- One rule per scenario. One `Quand` per scenario.
- `Alors` states an observable outcome, never an implementation detail.
- Put `# Source: <id>` directly above each scenario.
- Add nominal, error, limit, or authorization scenarios only when the ledger defines
  their outcome. A missing outcome goes back to the readiness gate.

```gherkin
# Source: AC-2
Scénario: Refuser un virement sans la permission d'approbation
  Étant donné un utilisateur sans la permission "VIREMENT_APPROUVER"
  Quand il approuve le virement "VIR-001"
  Alors la réponse est 403
  Et le virement "VIR-001" reste "EN_ATTENTE"
```

Map each scenario to the cheapest public seam that proves it (unit, use-case,
integration, contract, component, e2e). Do not duplicate levels without a distinct risk.

A seam declared in the approved ticket or spec is agreed. Otherwise ask for approval.
Always get explicit approval of Gherkin and seams for: authorization, security, money,
regulated data, irreversible state, migrations, cross-module or cross-contract work.

### Verification path

Use when no testable behaviour is introduced: docs, presentation-only styling,
mechanical config.

- Write no Gherkin and no RED test.
- For each AC, record the command or observable evidence that proves it.
- Refactoring: run the relevant existing suite as green baseline, rerun after. Add a
  characterization test only when protection is missing.
- Hard to test is not a reason to take this path. Find a public seam, report the design
  limitation, or route a preparatory ticket.

## 4. Task list

Build the task list before following `implement`. Use the agent's native todo tool if
available; otherwise a markdown checklist, reposted only when a status changes.

- One task = one scenario (or one AC on the verification path) = one RED→GREEN cycle.
- Add the closing tasks, in this order: `Suite complète`, `Commit`, `Revue de code`,
  `Corrections + re-test`.
- Exactly one task `en cours` at a time. Mark `terminé` only with evidence.
- Never add a task that is not traceable to the ledger.
- More than 10 tasks is a warning sign: re-check the readiness gate before continuing.
  Never merge scenarios to reduce the count.

```
[x] AC-1  Approuver un virement avec la permission   unit         RED ✔ GREEN ✔
[>] AC-2  Refuser sans permission (403)              integration  RED ✔
[ ] AC-3  Refuser un virement déjà approuvé          unit
[ ] ---   Suite complète
[ ] ---   Commit
[ ] ---   Revue de code
[ ] ---   Corrections + re-test
```

## 5. Follow implement

Read and follow [implement](../implement/SKILL.md) completely, with the ticket and
ledger, the Gherkin and seams (or the verification plan), the review fixed point, and
the compatibility and risk constraints as its spec.

Keep the task list yourself while following `implement`: it does not know about it.
Do not orchestrate `tdd` or `code-review` separately; `implement` calls them.

- Behaviour path: agreed automatable seam = TDD applies. RED verified before any
  production code, then GREEN.
- Verification path: run the agreed evidence checks. Invent no failing test.
- Test already green: do not force it to fail. Check whether the behaviour exists, the
  test is insensitive, or the ticket is already satisfied.
- Cross-cutting change: follow an ordered contract-and-compatibility plan. Prefer
  compatible intermediate states.

Review order: `code-review` only sees committed work (`git diff <fixed-point>...HEAD`).
So, once the full suite is green:

1. Commit the work to the current branch.
2. Run `code-review` against the recorded fixed point. An empty diff is a failure:
   stop and report it, never report the review as passed.
3. Fix each finding you accept in a follow-up commit, rerun the affected tests and the
   full suite. List rejected findings with a one-line reason.
4. Never rewrite or squash commits; the user squashes at merge if wanted.

Once started, run to commit without a human gate. Pause only for: a new product
decision, an invalid RED, an unexpected blocker, a required external permission, or a
destructive action.

After every RED, GREEN, suite run, review, or commit, update the task list and emit one
status report:

```
▸ AC-2 · integration · RED ✔ → GREEN en cours
  Preuve : ApprovalIT#refuseSansPermission échoue (attendu 403, reçu 200)
  Tâches : 3/6
```

## 6. Final report

At most 8 lines:

```
Ticket CMB-412 · chemin comportement · 3 scénarios
RED/GREEN : AC-1 ✔ AC-2 ✔ AC-3 ✔
Vérification : typecheck ✔ suite 142/142 ✔
Revue : 2 remarques corrigées · 0 rejetée
Commits : a3f9c21 (travail) · b7e0d14 (corrections)
Non vérifié : aucun
```

Never present an environment or provider failure as a valid business RED.

## Contract assumed from implement

This skill relies on `implement` to:

- use `tdd` at pre-agreed seams;
- run typechecking and single test files regularly, the full suite once at the end;
- run `code-review` on the work, reviewing `git diff <fixed-point>...HEAD`;
- commit to the current branch.

This skill deliberately commits before `code-review` (step 5) because the review only
sees committed changes. If upstream fixes that order, re-check step 5.

`implement` is an upstream Matt Pocock skill: never edit it. After updating it, re-check
these four points. If one no longer holds, update this skill before using it.
