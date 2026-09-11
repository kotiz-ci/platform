# Session — Issue #33 — Image OCI backend

## Contexte

- Branche : `feat/backend-oci-image`
- Base initialement inspectée : `d5413868d2fc15e45f9965df775c12423f0969bc`.
- Branche rebasée avant livraison sur `origin/develop` à `e8699d8e7e99460ed670e94a1e2d04759fca6025`.
- Dépendance : issue #32 fermée après fusion de la PR #53.

## Livré

- Dockerfile Java 21 multi-stage avec images Temurin épinglées par digest.
- Runtime Alpine non privilégié (`kotiz`) sans JDK, Maven Wrapper ou cache Maven.
- Build reproductible normalisé par `SOURCE_DATE_EPOCH`.
- CI Buildx sans publication, digest OCI extrait des métadonnées du manifest.
- Double build propre obligatoire avec comparaison des digests.
- Scan Trivy bloquant les vulnérabilités `CRITICAL` non dérogées.
- Health check réel avec PostgreSQL avant déclaration de l’image candidate.
- Agrégation du contrôle OCI dans le job protégé `CI required`.

## RED observés

1. Le contrat initial a refusé les images Temurin non épinglées par digest.
2. Le premier scan réel a trouvé trois CVE critiques corrigées dans Tomcat 11.0.25 :
   `CVE-2026-65182`, `CVE-2026-65905`, `CVE-2026-68525`.
3. La review a montré que `--iidfile` exposait un ID de configuration et non le digest du manifest OCI.
4. Les deux premiers builds propres avaient des digests différents à cause des mtimes des fichiers et répertoires créés dans les couches.

## GREEN vérifiés

- Deux builds Buildx `--no-cache` : digest identique
  `sha256:29a91d6e0dcfae979c735c1f76a1005f628a610de47c1dd48b9efafb79f00069`.
- Trivy 0.70.0 : 0 vulnérabilité critique dans Alpine et dans `app.jar`.
- Image réelle : Java 21, utilisateur `kotiz`, aucun outil de build, endpoint `/actuator/health` à `UP`.
- Tests dépôt : 55 tests, 54 passés, 1 test live ignoré, couverture scripts 83,98 % lignes.
- Maven : 2 tests passés et seuil JaCoCo respecté après passage à Tomcat 11.0.25.

## Notes d’environnement

Les doublons iCloud non suivis suffixés par un espace puis le chiffre 2 présents dans `apps/backend` ont été préservés. Les preuves Docker ont utilisé un contexte temporaire propre qui les exclut, car ils rendent le contexte Maven invalide sans appartenir à cette issue.
