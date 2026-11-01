---
status: accepted (décision PO du 30 octobre 2026, lot G, PNV-G1 et PO-G2 à PO-G4)
date: 2026-10-30
amends: ADR-007 (rôle AGENT, colonne « MFA obligatoire »)
---

# Second facteur de l'agente : téléphone enregistré et PIN agente, sans TOTP

L'ADR-007 impose un TOTP comme second facteur au rôle `AGENT`, et le plan sécurité
écrit « numéro + mot de passe + TOTP ». Le lot G de la refonte UX (app agente :
accès et accueil, `docs/design/refonte-parcours/ux-spec-lot-g.md`) montre que ce
choix ne tient pas sur le terrain : l'agente (Moussa, 28-45 ans, souvent ancien
collecteur) n'a pas d'application d'authentification, travaille au marché en plein
soleil et se connecte plusieurs fois par jour. Décision : pour le rôle `AGENT`
seulement, l'authentification à deux facteurs reste obligatoire, mais ses facteurs
deviennent **le téléphone enregistré** (possession) et **le PIN de l'agente**
(connaissance). Le TOTP et le mot de passe sont retirés pour ce rôle.

## Ce qui est décidé

- **Possession : le téléphone enregistré.** Le téléphone est lié à l'accès agente
  à l'activation, après un code SMS envoyé au numéro de l'agente. Un code SMS seul
  n'ouvre jamais l'accès.
- **Connaissance : le PIN agente.** Il est demandé à chaque ouverture de l'app et
  après le délai de verrouillage. Il appartient à l'agente seule et reste distinct
  de tout PIN de cliente, y compris le sien si elle est aussi cliente. Il est haché
  comme les autres PIN (plan sécurité § 3.2), jamais affiché ni journalisé.
- **Identifiant : le numéro de téléphone.** Le code agente (`agent_code`) est
  affiché, jamais demandé.

## Mesures compensatoires

Elles remplacent la protection qu'apportait un TOTP contre la prise d'un compte par
quelqu'un qui obtient le numéro et le PIN.

1. **Nouveau téléphone : accord de KOTIZ obligatoire** (PO-G3). Sur un téléphone
   non enregistré, l'agente prouve son numéro par code SMS puis saisit son PIN ; le
   téléphone reste inutilisable pour toute opération tant que KOTIZ ne l'a pas
   accepté. Le refus est possible.
2. **PIN oublié ou bloqué : seul KOTIZ réinitialise** (PO-G4). Aucune récupération
   en libre-service pour l'agente, même avec le code SMS (PRD design § 4.1 : SMS
   seul insuffisant). KOTIZ vérifie l'agente, autorise la réinitialisation, puis
   l'agente crée elle-même un nouveau PIN par le chemin d'activation.
3. Chaque enregistrement de téléphone, accord ou refus, réinitialisation de PIN et
   blocage est tracé dans l'audit, avec l'acteur KOTIZ qui l'a décidé.

## Valeurs non fixées ici

Longueur du PIN (4 au prototype, composant capable de 6), longueur, validité,
essais et renvoi du code SMS, nombre d'essais du PIN et règle de blocage, délai de
verrouillage, délai et forme de l'accord d'un nouveau téléphone, sort des sessions
de l'ancien téléphone : **gate G02** (sécurité et SMS), à fixer avec le partenaire.
Aucun chiffre n'est décidé par cet ADR.

## Ce qui ne change pas

- **OPS, RISK, FINANCE, PO** : TOTP obligatoire, email + mot de passe, sessions de
  2 h au plus, comme dans l'ADR-007 et le plan sécurité.
- **USER** (cliente) : numéro, code SMS et PIN, sans changement (ADR-007, lot A).
- **PARTNER, SYSTEM** : inchangés.
- La matrice de permissions et les règles de séparation des fonctions de l'ADR-007
  sont inchangées. `requires_mfa` reste vrai pour `AGENT` : seuls les facteurs
  changent.

## Options envisagées

- **A. Garder le TOTP (ADR-007).** Rejetée : une seconde application et un code
  de plus à chaque connexion pour un public peu équipé ; activation plus longue ;
  récupération du secret TOTP aussi lourde qu'une réinitialisation de PIN.
- **B. Code SMS à chaque connexion en plus du PIN.** Rejetée : coût et dépendance au
  réseau SMS à chaque ouverture ; le SMS est exposé au changement de carte SIM.
- **C. Téléphone enregistré + PIN, avec accord de KOTIZ pour un nouveau téléphone
  et réinitialisation par KOTIZ (retenue).** Même geste que l'app cliente, deux
  facteurs réels, et les deux moments à risque (changer de téléphone, perdre son
  PIN) passent par KOTIZ, qui connaît l'agente, l'a formée et a signé son contrat.

## Conséquences

- L'ADR-007 porte la mention « amendé par ADR-0021 » sur la ligne `AGENT` ; le plan
  sécurité et le HLD sont alignés.
- L'issue #70 porte l'enregistrement du téléphone, l'accord ou le refus d'un
  nouveau téléphone et l'autorisation de réinitialiser un PIN agente côté
  administration ; le ticket de connexion de l'agente (D28) porte les écrans.
- L'app agente n'a besoin d'aucune bibliothèque TOTP ; aucun secret TOTP agente
  n'est stocké.
- Si le partenaire exige un facteur plus fort (G02), cet ADR est rouvert ; les
  écrans du lot G prévoient alors une étape après le PIN, non dessinée.
