# Domain Docs

KOTIZ utilise une documentation multi-context.

## Avant d’explorer

1. Lire `CONTEXT-MAP.md` à la racine s’il existe.
2. Lire le `CONTEXT.md` du contexte concerné.
3. Lire les ADR système dans `docs/adr/`.
4. Lire les ADR propres au contexte dans son dossier `docs/adr/`.

Si un fichier n’existe pas encore, poursuivre silencieusement. Les documents de
contexte sont créés progressivement lorsque les termes et décisions sont stabilisés.

## Structure

`CONTEXT-MAP.md` est la source de vérité : il liste les onze bounded contexts
backend, leur statut (actif, différé, retiré) et le chemin de leur `CONTEXT.md`.

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← décisions transversales
└── apps/backend/
    ├── iam/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← décisions propres au contexte
    ├── savings/
    └── …
```

Ne lire que les contextes concernés par le sujet. Un contexte différé ou retiré
ne reçoit ni implémentation ni ticket actif (voir la règle d’activation de
`CONTEXT-MAP.md`).

## Vocabulaire

Utiliser les termes définis dans les fichiers `CONTEXT.md`. Ne pas introduire de
synonymes lorsqu’un terme canonique existe.

Si un concept manque, le signaler pour traitement par le skill `domain-modeling`.

## Conflits avec les ADR

Toute proposition contredisant un ADR existant doit identifier explicitement
l’ADR concerné et justifier sa réouverture.
