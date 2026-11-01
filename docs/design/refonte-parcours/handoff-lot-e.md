# Handoff — Refonte des parcours, lot E : espèces et accompagnement par une agente (React Native / Expo, apps cliente et agente + backend Spring Boot)

Date : 30 octobre 2026. Statut : lot E validé par le PO et sa conjointe (test à deux téléphones de [test-lot-e.md](test-lot-e.md), réussi), critiqué le 30 octobre 2026 ([critique-lot-e.md](critique-lot-e.md), 15 corrections faites ou assumées) et corrigé ; décisions PO du 21 et du 30 octobre 2026 appliquées.

- Maquettes et prototype : [screens-lot-e.md](screens-lot-e.md) · canvas [KOTIZ — App cliente](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF), pages « Lot E — Espèces et agente » (E-01 à E-19) et « Lot E — app agente » (E-51 à E-72), **version 36** (`1793360611-467c`, critique appliquée ; maquettes d'origine en version 34). Composants d'écrans `E-Proto.dc.html` (app cliente) et `E-Agente.dc.html` (app agente) ; contenu espèces de C-11 à C-14 dans `C-Proto.dc.html` ; D-04 et D-05 ouverts depuis E-11 dans `D-Proto.dc.html` ; prototype `Main.dc.html` (sections « Lot E — Espèces et agente », 27 entrées, et « Lot E — app agente », 24 entrées). Le canvas fait foi pour la composition et les textes.
- Design system : [DESIGN.md](../../../DESIGN.md) (racine) · [KOTIZ Design System v15](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134), **non modifié par le lot E** (la copie `ds/kotiz` du canvas v36 est identique au DS v15 publié). Composants `Kotiz.*`, illustrations `Actions/agente.svg`, `Actions/mon-solde.svg`, logos `Operateurs/`.
- Parcours, écrans, états : [ux-spec-lot-e.md](ux-spec-lot-e.md) (fait foi pour le comportement, avec ses sections « Décisions PO du 21 octobre 2026 », « Décision PO du 30 octobre 2026 » et « Textes changés par la critique du 30 octobre 2026 »). Corrections : [critique-lot-e.md](critique-lot-e.md). Test : [test-lot-e.md](test-lot-e.md).
- Socle commun (tokens, composants, masquage, formats, résultat plein écran, `TransactionRow`, Opérations, détail, reçu, signalement, PIN, retrait Mobile Money) : [handoff-lot-a.md](handoff-lot-a.md), [handoff-lot-b.md](handoff-lot-b.md), [handoff-lot-c.md](handoff-lot-c.md), [handoff-lot-d.md](handoff-lot-d.md). Ce document ne répète que ce qui change ou s'ajoute.
- Scénarios d'acceptation : [gherkin-lot-e.md](gherkin-lot-e.md) (IDs `E-Pn-Sm`). Rattachement aux issues : [issues-lot-e.md](issues-lot-e.md).
- Cible : app mobile React Native + Expo, **deux variants** (ADR-010, ADR-019) : `client` (E-01 à E-19) et `agent` (E-51 à E-72), mêmes composants et tokens (`@kotiz/design-tokens`). Backend Java 21 / Spring Boot 3, hexagonal (ADR-011) : contextes **Agents** (agente, demande, fonds de l'agente, accompagnement), **Savings** (dépôt, retrait, affectation liée, carnet, relevé), **Payments** (retrait Mobile Money préparé), **IAM** (PIN KOTIZ, permissions, codes ponctuels), **Notifications** (SMS, demandes), **Assistance** (signalement, ADR-0020). Le contexte de la demande, de l'accompagnement et de la permission de point est **à trancher** (voir Avant de coder).

Rappel : « E-01 » (avec tiret) est un **écran** du lot E ; « A · E01 » (sans tiret) est un écran d'inscription du lot A ; « D10 » est le code de l'issue [kotiz-ci/platform#71](https://github.com/kotiz-ci/platform/issues/71). Une issue est toujours citée avec son numéro.

Conventions (reprises des lots A à D) :

- **« à confirmer (Gxx) »** : paramètre non tranché, lu dans une configuration, jamais écrit en dur ni annoncé dans l'interface. G01 = partenaire et règles financières, G02 = sécurité et SMS, G03 = assistance, G04 = carnet et partage, G05 = exceptions du PRD § 15.2. **Ce document ne contient aucune valeur G01 ni G02** : il renvoie aux gates.
- **« à dessiner »** : comportement de la spec sans état dessiné ; le texte exact viendra des maquettes.
- **Dépendant du lot G** : état dessiné au canvas pour le lot G (app agente : accès et accueil, [ux-spec-lot-g.md](ux-spec-lot-g.md), [screens-lot-g.md](screens-lot-g.md)), **pas encore testé** ; il n'est pas spécifié ici (voir Points ouverts).
- **Frais du cash : non confirmés (G01).** Le prototype affiche « Frais · à confirmer » et « Pris sur ton solde · à confirmer » et laisse continuer (décision PO-1 du 21 octobre 2026, prototype seulement), avec une bande hors produit « Frais pas encore connus : en vrai, tu ne pourrais pas confirmer. » (« … envoyer. » côté agente). **Règle produit : frais inconnus = autorisation bloquée** (état « frais inconnus » dessiné et jouable, E-P1′). Quand un frais est confirmé, il est lu dans la configuration du partenaire et renvoyé par le serveur avec le récapitulatif ; jamais calculé par l'app.
- **Note PO 4 (décision PO du 30 octobre 2026)** : en production, **une opération faite affiche toujours son montant réel**. « Pris sur ton solde · à confirmer » sur un retrait fait (E-09, reçu C-13) n'existe qu'au prototype : des frais inconnus bloquent l'autorisation, donc aucune opération faite ne peut avoir un montant « à confirmer ».
- **Valeurs de démonstration du prototype, qui ne sont pas des règles** : Fatou Koné, 07 08 12 34 56 (vu par l'agente : 07 •• •• •• 56), solde 12 400 FCFA, École Awa 45 000 / 100 000 F, Boutique 8 000 / 50 000 F, Moto 300 000 F ; Awa Traoré, AG-0142 ; Binta Koffi ; montants 3 000 / 4 500 / 5 000 ; demandes n° 2110-0031 à 2110-0033 ; opérations KTZ-2110-0103, KTZ-2110-0107, KTZ-2110-0111 ; dossier n° 2110-0019 ; « 21 oct. 2026 à 10:45 », « 10:42 » ; PIN 2468 et blocage au 3e essai faux ; codes SMS « au moins 4 chiffres, 0000 faux, 9999 expiré » ; ouverture de la demande 3 s après Mon QR ; avance seule de E-03 après 4 s. Aucune ne doit être reprise dans le code, les tests ou les textes.
- **Apostrophe** : les chaînes d'interface de ce document s'écrivent avec ’ (critique n° 11). Le catalogue de textes du lot E n'utilise que ’ ; les gabarits « de {épargne} » appliquent l'élision (« Carnet d’École Awa », « Point d’École Awa », « le point d’École Awa »).
- Dans ce document : `{agente}` = prénom de l'agente (« Awa ») ; `{agente complète}` = nom complet (« Awa Traoré ») ; `{code agente}` = « AG-0142 » ; `{cliente}` = prénom de la cliente vu par l'agente (« Fatou ») ; `{cliente complète}` = « Fatou Koné » ; `{numéro masqué}` = « 07 •• •• •• 56 » (seule forme vue par l'agente) ; `{montant}` = montant des espèces ; `{épargne}` = nom d'une épargne ; `{n° demande}` = numéro de la demande ; `{référence}` = référence de l'opération.

## Points ouverts

**Critique** ([critique-lot-e.md](critique-lot-e.md)) : la correction **Bloquant** n° 1 (E-58 et E-03 quand la confirmation n'est plus valable) est **corrigée** (canvas v36). Les 14 autres (Important et Mineur) sont corrigées ou assumées. **Aucune correction ouverte.**

**Écarts assumés de la critique** (à coder tels quels) :

1. **D-04 (lot D) garde `PinScreen` tel quel** tant que le Design System n'a pas évolué ; E-07 est composé avec les pièces de `PinScreen` pour garder l'avertissement dans tous les états (n° 6). Quand `PinScreen` aura l'option (§ Composants), D-04 la prendra.
2. **Apostrophes et élision** corrigées pour le lot E seulement ; les chaînes des lots A à D et G ne sont pas reprises (n° 11). Le code applique ’ et l'élision **à tout le catalogue** quand il le construit (une seule règle de formatage), sans changer le sens des textes validés.
3. **E-51 et E-53 ont deux boutons texte** dans l'`ActionZone` (« Chercher par numéro » / « Ce n’est pas elle », puis « Contacter l’aide ») (n° 5).
4. **Variante neutre de `ResultScreen`** (E-03 confirmation plus valable, E-04 « Refusé par toi », E-56 « Refusée ») dessinée par une composition locale (`.le-res.is-neutral`) en attendant le Design System (décision PO 2 du 30 octobre 2026) : à coder comme une variante `neutral` du composant (§ Composants).
5. **E-08 « Pas fait »** : « Rien n’a été pris sur ton solde. » est affiché ; la variante « On vérifie ton solde. » (passage en « En attente ») dépend de G01 (n° 7). Tant que G01 ne garantit pas qu'un échec confirmé n'a rien débité, la phrase est lue dans une configuration (voir Questions).

**Décisions PO à respecter** (21 et 30 octobre 2026, spec validée)

1. **Deux apps, deux téléphones** : l'agente agit dans l'app agente, la cliente confirme dans l'app cliente ou, sans smartphone, par un code reçu par SMS sur son numéro vérifié. L'appareil de l'agente ne confirme jamais à la place de la cliente ; aucun écran agente dans l'app cliente, et inversement.
2. **PIN KOTIZ seulement quand l'argent sort** : aucun PIN au dépôt (« Je confirme ») ; PIN au retrait en espèces (E-07) et au retrait Mobile Money préparé (D-04). **Aucun champ PIN dans l'app agente.** Le PIN de la cliente n'existe que sur E-07 et D-04, avec « Cache ton écran. Ne montre ton PIN à personne, même à l’agente. ».
3. **Ordre du dépôt** : identification → montant → contrôle des fonds de l'agente → récapitulatif → confirmation de la cliente → remise et comptage → **« Confirmer les espèces reçues »** (l'agente lance le dépôt) → résultat. La confirmation seule, ou le code seul, ne déplace rien.
4. **Ordre du retrait** : identification → montant → l'agente déclare avoir les espèces → récapitulatif → autorisation de la cliente (PIN, ou code du retrait par SMS) → **résultat financier confirmé** → remise et comptage → **« J’ai reçu mes espèces »** (app) ou **code de réception** (SMS). Aucune remise avant le résultat confirmé ; le second code ne débite rien ; **aucun « Espèces remises » côté agente**.
5. **Destination du dépôt** : avec smartphone, la cliente la choisit dans son app (E-01, E-02) ; sans smartphone, l'agente la choisit avec elle après un accord de noms (code des noms), valable pour ce dépôt seulement. Une seule destination pour tout le montant ; défaut « Mon solde ».
6. **L'agente ne voit jamais l'argent de la cliente** : ni solde, ni montants d'épargne, ni opérations ; exceptions : le point d'une épargne autorisée, et les noms (sans montant) pour un dépôt sans smartphone. Les refus liés à l'argent de la cliente sont dits **à la cliente seule**.
7. **PO-1** : « Frais · à confirmer », jamais une valeur ; frais inconnus = autorisation bloquée en production (voir Conventions).
8. **PO-4** : si l'app de la cliente n'a pas internet, l'agente passe au SMS **pour la même demande**, sans l'annuler ; dès l'envoi du code, l'accord dans l'app n'est plus possible.
9. **PO-5** : aucune relance automatique après un refus d'accompagnement ; bouton texte discret « Elle a changé d’avis ? Redemander » (nouvelle demande, à utiliser seulement si la cliente le demande).
10. **PO-6** : E-17 suit le masquage ; le relevé E-18 est toujours en clair.
11. **PO-7** : l'agente crée une épargne **seulement pour une cliente sans accès à l'app**.
12. **PO-8** : pas d'impression au MVP. **PO-9** : la ligne « Awa attend ta réponse › » de l'accueil (PNV-3) est dans le canvas validé (v36) ; elle ne serait retirée que sur décision du PO après le test (E-P9-4), et aucune décision de retrait n'est écrite. **PO-10** : écrans agente dans le même canvas.
13. **PNV-1** : le carnet et le relevé montrent aussi les retours au solde (« Vers ton solde », −, « Avec ton PIN »). **PNV-2** : accroche « Ton signé-signé, sur ton téléphone. » (le titre garde « Carnet »). **PNV-3** : `InfoLine` « Awa attend ta réponse › » sur l'accueil. **PNV-4** : point d'une épargne côté agente (E-69, E-70) seulement, sans liste ni tableau de bord.
14. **G05-1** : une création assistée confirmée au résultat incertain suit son résultat réel, sans annulation automatique ; l'ancienne agente perd tout droit dès le retrait de l'accompagnement ; E-15 « On vérifie la création de {épargne}. » sans action. **G05-2** : retour au solde et reprise assistés sans smartphone : règle validée (disponible envoyé par SMS à la cliente seule ; l'agente saisit le montant dit ; refus « Montant pas possible. Elle a reçu la raison par SMS. ») mais **aucun écran** dans ce lot : hors handoff.
15. **PO 1 (30 oct.)** : « Espèces reçues » s'écrit **« En attente » + horloge** dans les deux apps, jamais « À confirmer » ; sous-textes « Tu confirmes quand tu as compté. » (cliente) et « Fatou confirme quand elle a compté. » (agente ; sans app : « Avec le code de réception ») ; la liste des opérations dit « Espèces en attente ».
16. **PO 2 (30 oct.)** : un refus volontaire est **neutre**, sans croix rouge (« Refusé par toi », « Refusée »), pastille grise ; même pastille neutre sur E-03 quand la confirmation n'est plus valable.
17. **PO 3 (30 oct.)** : E-71 limite « Elle ne peut pas créer d’autre épargne pour l’instant. » (l'agente n'apprend pas combien d'épargnes la cliente a).
18. **PO 4 (30 oct.)** : voir Conventions.

**Écarts entre la spec et le canvas validé** (le canvas fait foi ; ceux de la critique sont déjà reportés dans la spec, section « Textes changés »)

| Écran                              | Spec                                                                       | Canvas validé (fait foi)                                                                                                                                                                                                                                                                             |
| ---------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E-01 consigne                      | Consigne en bas, après la `DetailList`                                     | « Ne donne pas encore les espèces. » sous le montant (note de `SummaryFlow`, 16 Semi Bold)                                                                                                                                                                                                           |
| E-01 « Changer »                   | « Changer » sur la ligne Vers                                              | Bouton texte « Changer la destination » sous le trajet (`FlowPath` sans action par nœud)                                                                                                                                                                                                             |
| E-01 frais inconnus                | « Je confirme » désactivé, raison « Les frais ne sont pas encore connus. » | `Message` info titre « On ne connaît pas encore les frais. », texte « Rien n’a bougé. Réessaie plus tard. » ; « Je confirme » désactivé avec la raison « Les frais ne sont pas encore connus. »                                                                                                      |
| E-03 confirmation plus valable     | `Message` + « Confirmer à nouveau »                                        | Pastille neutre, **sans pill** ; titre « Confirme à nouveau. », sous-titre « Awa ne peut pas encore lancer le dépôt. » ; `Message` titre « Ta confirmation n’est plus valable. », texte « Rien n’est entré. Confirme à nouveau. » ; étape 1 « Ta confirmation · Plus valable » sans coche            |
| E-05, E-10                         | « Contacter l’aide › » dans le corps                                       | Boutons de la feuille : principal « Signaler un problème », puis « Revenir », puis « Contacter l’aide » (modèle D-07)                                                                                                                                                                                |
| E-06 consigne, flux                | Consigne en bas ; Vers « En espèces · Awa »                                | « Prends les espèces seulement quand c’est fait. » sous le montant ; Vers « En espèces » · « De la main d’Awa » ; phrase « L’argent sort : tu confirmes avec ton PIN KOTIZ. »                                                                                                                        |
| E-06, E-11 frais inconnus          | Continuer désactivé + raison                                               | `Message` info titre « On ne connaît pas encore les frais. », texte « Rien n’est sorti. Réessaie plus tard. » ; Continuer désactivé, raison « Les frais ne sont pas encore connus. »                                                                                                                 |
| E-07 PIN bloqué                    | État `blocked` de `PinScreen` (D-04)                                       | Titre « Ton PIN est bloqué » ; `Message` erreur « Trop d’essais. » / « Rien n’est sorti. Awa ne te donne rien. »                                                                                                                                                                                     |
| E-08 envoi de « J’ai reçu » échoué | « Pas envoyé. Réessaie. »                                                  | `Message` erreur titre « Pas envoyé. », texte « Réessaie. Tes espèces restent en attente. »                                                                                                                                                                                                          |
| E-11                               | Ligne compacte « Préparé avec Awa · agente »                               | « Préparé avec **Awa Traoré** · agente » ; sous le trajet « Le numéro est le tien. On ne peut pas le changer. »                                                                                                                                                                                      |
| E-14 hors connexion                | Liste datée, actions désactivées                                           | Raison « Répondre demande la connexion. »                                                                                                                                                                                                                                                            |
| E-15                               | `OptionRow` + « Retirer » ; « Pas retiré. Réessaie. »                      | Lignes composées avec un bouton « Retirer » nommé « Retirer le point d’{épargne} » ; erreur « Pas retiré. » / « Réessaie. Rien n’a changé. » ; raison hors connexion « Retirer demande la connexion. » ; création assistée : « Création de {épargne} en attente de ta confirmation par SMS. »        |
| E-14 ligne d'une agente            | « Voit le point de 1 épargne »                                             | « Voit le point de {n} épargne(s) » ou « Ne voit aucun point »                                                                                                                                                                                                                                       |
| E-17 épargne fermée                | « carnet consultable, en lecture »                                         | `StatusPill` neutre « Fermée le {date} » au-dessus de `GoalProgress` (taille normale, pas compacte)                                                                                                                                                                                                  |
| E-18                               | `Statement`                                                                | En-tête « KOTIZ » · « Relevé daté » ; chargement « Préparation de ton point » ; envoi non abouti `Message` erreur « Envoi non abouti. » / « Le même point sera renvoyé. » ; raisons hors connexion « Mon point demande la connexion. », « Partager demande la connexion. »                           |
| E-51                               | « Ce compte ne peut pas être servi. Contacte l’aide. »                     | « Ce compte ne peut pas être servi. » + bouton texte « Contacter l’aide » ; viseur « Vise le QR de la cliente » ; « Lecture… » ; « Caméra non autorisée »                                                                                                                                            |
| E-52                               | Incomplet : erreur sur place                                               | Erreurs « Écris son numéro. » (vide au toucher), « Écris les 10 chiffres de son numéro. » ; « Recherche… » ; raison hors connexion « Chercher demande la connexion. »                                                                                                                                |
| E-54 montant hors règles           | Raison générique                                                           | `Message` erreur « Ce montant n’est pas possible pour cette cliente. »                                                                                                                                                                                                                               |
| E-55 sans app                      | `OptionRow` « Son solde »                                                  | « Son compte KOTIZ » (critique n° 9) ; sous-titre de la feuille de choix « Où va l’argent ? Choisis avec elle. » ; option « Une de ses épargnes » sous-titre « Elle doit accepter que tu voies les noms. »                                                                                           |
| E-56 sans réponse                  | « Pas de réponse pour l’instant. »                                         | Titre « Pas de réponse pour l’instant. », sous-titre « Tu peux renvoyer une nouvelle demande. » ; principal « Renvoyer la demande » ; bouton texte « Annuler la demande »                                                                                                                            |
| E-57                               | Champ nommé par sa finalité                                                | `TextField` libellé = nom du code, indication « Code lu par Fatou », aide « Ce n’est jamais son PIN. » ; consigne sous le rappel « Ne prends pas les espèces sans code. » (dépôt) / « Ne donne pas les espèces sans code. » (retrait, réception) ; vide : raison « Écris le code que Fatou te dit. » |
| E-60                               | Retour non spécifié après annulation                                       | Retour sur E-53 avec un message : « Demande n° {n° demande} annulée. Fatou reçoit un SMS. » ; « Demande d’accompagnement annulée. » ; « Demande de point annulée. »                                                                                                                                  |
| E-62 case non cochée               | « Coche si tu as les espèces. »                                            | Libellé de la case « J’ai {montant} en espèces sur moi. » (« J’ai ce montant en espèces sur moi. » tant que le champ est vide)                                                                                                                                                                       |
| E-66                               | Pas d'aide                                                                 | Aide « Sur son Wave. Tu ne vois pas son solde. » ; montant refusé : erreur du champ « Montant pas possible. »                                                                                                                                                                                        |
| E-68                               | En attente : bouton absent                                                 | En attente : « Aucune relance automatique. Elle répond quand elle veut. » ; refusé : « Elle a refusé. Redemande seulement si elle te le dit. » + bouton texte « Elle a changé d’avis ? Redemander »                                                                                                  |
| E-69                               | `SectionHeader` « Demandes »                                               | Ligne d'une épargne autorisée sous-titre « Voir et envoyer son point » ; demande en attente : « Une demande attend sa réponse. » ; vide « Aucune épargne pour l’instant. » ; sans app : choix « Choisis l’épargne avec elle » / « Noms seulement, pour cette demande. Aucun montant. »               |
| E-70 accès retiré                  | « Fatou a retiré ton accès à ce point. »                                   | `Message` « Fatou a retiré ton accès à ce point. » et rien d'affiché ; bouton « Envoyer le point à Fatou par SMS » ; ligne « Envoyé à : 07 •• •• •• 56 (son numéro vérifié) »                                                                                                                        |
| Résultats cliente « Terminé »      | → A · H01                                                                  | Le prototype ouvre l'accueil du lot C (C · H01, même composition) pour garder les données ; **à coder vers l'accueil unique** (A · H01)                                                                                                                                                              |

**Dépendant du lot G (pas encore testé, non spécifié ici)** : les états **« accès suspendu »** de **E-53** (message et lignes désactivées), **E-58** (lancement refusé, résultat E-59 « Dépôt pas fait » avec consigne de rendre les espèces) et **E-64** (remise à finir) viennent du lot G (décision PO-G5, [screens-lot-g.md](screens-lot-g.md) § Raccords). Ils seront spécifiés dans le handoff du lot G, après son test. Ce handoff ne les code pas ; le ticket qui les porte est D29 (accueil de l'agente, lot G). De même, E-51 `←` (accueil agente G-20), E-54 « Mes fonds › » (G-21) et la reprise d'une opération en cours après le PIN agente (H12 du lot G) relèvent de D28 et D29.

**États « à dessiner »** (comportement spécifié, texte à venir des maquettes ; scénarios `@a-dessiner`)

- E-01 **deux demandes à la fois** (deux agentes) : deux écrans et deux références, jamais fusionnés (E-P1-S24).
- E-14 **agente désactivée par KOTIZ** : ligne « N’est plus agente KOTIZ », droits retirés (à confirmer avec #70).
- E-19 **hors connexion avec un relevé déjà généré** : partage possible si le fichier est sur le téléphone (G04).
- E-53 **agente qui sert sa propre fiche** : refus générique (G01).
- E-57 **SMS de réception absent, assistance** : recueil de la confirmation par l'assistance (G03, lot F).

**Petites incohérences du prototype à ne pas reproduire**

- Bande sombre « Awa lance › », « Fatou répond › », « Fatou confirme › », « Scanner le QR › », ouverture de la demande 3 s après Mon QR, avance seule de E-03 après 4 s : simulation de l'autre téléphone. **En production, les deux apps reçoivent l'état réel de la demande** (mécanisme G02, technique).
- Lignes « à confirmer » sur une opération **faite** (E-09, C-12, C-13, D-04 et D-05 depuis E-11) : prototype seulement (note PO 4).
- PIN bloqué au 3e essai faux ; codes « 0000 » / « 9999 » ; longueur minimale de 4 chiffres pour activer « Valider le code » : prototype seulement (G02).
- `StepTracker` de E-03 : la première étape « Tu as confirmé » est rendue en `sent` avec le mot « Confirmé » ; à coder avec un état `sent` et le mot « Confirmé » (jamais `done` sur un écran d'attente, règle du lot B).
- Carnet rempli pour École Awa seulement, « Mon carnet › » de B · B07 limité à École Awa : prototype seulement ; en production, chaque épargne a son carnet.
- « Reçu agente » (E-59 « Voir le reçu ») ouvre « Bientôt ici » : le reçu agente est hors lot (PRD 19).

**Avant de coder**

1. **Prérequis** : tokens ([kotiz-ci/platform#96](https://github.com/kotiz-ci/platform/issues/96)), socle UI ([kotiz-ci/platform#59](https://github.com/kotiz-ci/platform/issues/59)), cycle de vie ([kotiz-ci/platform#67](https://github.com/kotiz-ci/platform/issues/67)), Opérations ([kotiz-ci/platform#99](https://github.com/kotiz-ci/platform/issues/99)), accueil ([kotiz-ci/platform#94](https://github.com/kotiz-ci/platform/issues/94)), Mon QR ([kotiz-ci/platform#95](https://github.com/kotiz-ci/platform/issues/95)), PIN KOTIZ (lot A), retrait Mobile Money ([kotiz-ci/platform#68](https://github.com/kotiz-ci/platform/issues/68), pour E-P8), mise de côté et reprise ([kotiz-ci/platform#98](https://github.com/kotiz-ci/platform/issues/98), pour E-P2), signalement ([kotiz-ci/platform#69](https://github.com/kotiz-ci/platform/issues/69)), épargnes ([kotiz-ci/platform#73](https://github.com/kotiz-ci/platform/issues/73)), agente et fonds ([kotiz-ci/platform#70](https://github.com/kotiz-ci/platform/issues/70)), **connexion et accueil de l'agente (lot G, D28 et D29, issues à créer)** et son second facteur ([ADR-0021](../../adr/0021-second-facteur-agente-telephone-pin.md)).
2. **Gates** :
   - **G01** : frais du dépôt et du retrait en espèces et leur modèle ; minimum, maximum, plafonds du niveau d'accès ; moment du débit des fonds de l'agente et du crédit de la cliente (atomicité) ; moment du débit du solde au retrait ; sens d'un échec confirmé ; durée de validité de la confirmation d'un dépôt ; agente qui sert sa propre fiche. Sans G01, aucun dépôt ni retrait en espèces ne peut être démontré de bout en bout hors sandbox ; en sandbox, les frais sont une valeur de configuration de test, nommée comme telle.
   - **G02** : protocole des **huit codes ponctuels** (longueur, validité, essais, renvoi, blocage, preuve d'accord, texte final des SMS) ; temps réel de la demande vers l'app cliente ; capture d'écran sur E-07 ; données du point sur le téléphone de l'agente. **E-P3, E-P6, E-P12 et les branches sans app ne sont pas livrables en production avant G02.**
   - **G03** : motifs « J’ai remis les espèces » et « Espèces non reçues », contact derrière « Contacter l’aide », recueil d'une confirmation de réception sans smartphone, retrait de l'accompagnement sans smartphone.
   - **G04** : contenu final du résumé SMS et du relevé, format partagé (image ou PDF), faisabilité du partage externe (G05-3).
3. **Vocabulaire** (`domain-modeling`, avant le code) — termes **absents** du [glossaire DDD](../../architecture/ddd-context-map-glossaire.md) v1.1 :
   - **Demande** (de dépôt, de retrait, de retrait Mobile Money, d'accompagnement, de point, de création) : ce que l'agente prépare et que la cliente confirme ; existe même si aucun argent ne bouge ; statuts envoyée, confirmée, refusée, annulée, expirée ; distincte de l'opération (`CashInOperation`, `CashOutOperation`, `Withdrawal`).
   - **Accompagnement** (« rattachement » du registre RM-PERM) : accord de la cliente pour qu'une agente l'aide ; non exclusif, révocable ; statuts pas demandé, en attente, accepté, refusé, retiré par la cliente.
   - **Permission de point** : accord **par épargne** pour voir et envoyer le point ; jamais ajoutée seule ; révocable ; contrôlée à chaque consultation et à chaque envoi.
   - **Code ponctuel** : code reçu par SMS, propre à **une** demande et à **une** finalité (dépôt, noms, retrait, réception, retrait Mobile Money, accompagnement, point, création) ; jamais un PIN.
   - **Remise** des espèces (et **réception**) : statut distinct du statut financier : en attente, reçues (confirmé par la cliente), contestée.
   - Aussi : **accord de noms** (contextuel à un dépôt), **fonds de l'agente** (float, #70), **restitution** (lot F) ; et les termes du lot D encore absents (montant engagé, montant reçu / pris). Le glossaire § 5.3 garde `KYCTier` « Tier 3 biométrie » et « KYC Tier 1 auto < 5 min », contraires au périmètre : à corriger.
   - **Contexte à trancher** : la demande et l'accompagnement (Agents ou IAM ?), la permission de point (IAM ou Savings ?), le carnet et le relevé (Savings), les codes ponctuels (IAM ou Notifications ?).
4. **Contrat d'API à écrire** : aucun champ n'existe. Nommer les données par leur sens métier et les termes du glossaire, complétés après le point 3.

**Questions encore ouvertes sur le comportement** (aucune ne change la composition validée)

- G01 : liste ci-dessus ; en particulier, un échec confirmé du retrait en espèces garantit-il que rien n'a été pris (sinon E-08 « On vérifie ton solde. ») ; recontrôle des fonds de l'agente au lancement et réservation éventuelle.
- G02 : liste ci-dessus ; authentification de l'agente avant d'envoyer une demande ou de lancer un dépôt (tranchée pour la session par l'ADR-0021 ; à chaque opération : non, sauf décision G02).
- Technique : mécanisme de la demande en direct (push, interrogation) ; `<délai de confirmation>` avant « On vérifie » ; permission caméra ; génération du relevé ; reprise de la demande en cours dans les deux apps.
- PO : aucune.

## Tokens

Aucun token nouveau : le lot E utilise ceux du [handoff du lot A § Tokens](handoff-lot-a.md#tokens) (noms cibles `@kotiz/design-tokens`). Usages propres au lot E :

| DESIGN.md                                                       | Code (cible)                                        | Usage lot E                                                                                                                                                                                                        |
| --------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `typography.amount` (34 / 42 / 700, tabulaires)                 | `typography.amount`                                 | Montant dominant de E-01, E-06, E-11, E-55, E-63, E-67 ; montant de E-03, E-04, E-08, E-09, E-56, E-58, E-59, **E-64 Fait** (critique n° 2) ; saisie E-54, E-62, E-66, E-71                                        |
| `typography.title`                                              | `typography.title`                                  | Titres d'écran, de résultat, de feuille et de dialogue ; nom de la cliente sur E-53                                                                                                                                |
| `typography.label` (16 Semi Bold)                               | `typography.label`                                  | Nom de l'agente dans `AgentIdentity`, consignes espèces sous le montant (E-01, E-06), libellés de lignes                                                                                                           |
| `typography.body` Semi Bold                                     | `typography.body` + `fontWeight 600`                | Consignes espèces des écrans agente (« Ne prends pas encore les espèces. », « Rends les 5 000 F à Fatou. »), « Rien n’a été pris sur ton solde. », « Ne refais pas le retrait. »                                   |
| `typography.caption` (12)                                       | `typography.caption`                                | Dates du carnet E-17 seulement (permis)                                                                                                                                                                            |
| `colors.surface-pending` / `text-pending` + horloge             | `palette.surfacePending` / `palette.textPending`    | « En attente » financier, **remise « En attente »** (PO 1), E-03, E-56, attente et « On vérifie » de E-04, E-08, E-59, E-64, note « Espèces en attente » de C-11                                                   |
| `colors.surface-error` / `text-danger` + croix                  | `palette.surfaceError` / `palette.textDanger`       | Échecs (E-04, E-08, E-59, E-64), « Annulé » (C-11, E-04), erreurs de code (E-57), fonds insuffisants (E-54)                                                                                                        |
| `colors.surface-canvas` + `text-secondary`                      | `palette.surfaceCanvas`, `palette.textSecondary`    | **Variante neutre** de `ResultScreen` (E-03 plus valable, E-04 « Refusé par toi », E-56 « Refusée ») ; pill neutre « Confirmé par Fatou », « Pas demandé », « Refusé », « Retiré par la cliente », « Fermée le … » |
| `colors.surface-brand-subtle` + `border-focus` 2                | `palette.surfaceBrandSubtle`, `palette.borderFocus` | Option sélectionnée (E-02, E-55), case cochée (E-13, E-62), pastille « Fait »                                                                                                                                      |
| `colors.surface-information`                                    | `palette.surfaceInformation`                        | Messages info (montant changé, frais inconnus, hors connexion, « Awa t’accompagne. », « Point envoyé par SMS. », « Résumé envoyé sur ton numéro. »)                                                                |
| `size.touchMin` (48) / `size.pastille` (64) / `pastilleLg` (80) | `size.*`                                            | Lignes de choix ≥ 64 (E-02, E-53, E-61, E-65), pastille 48 de `AgentIdentity`, viseur de `QrScanner`                                                                                                               |
| `opacity-disabled` (0,4)                                        | `opacity.disabled`                                  | Pavé du PIN pendant l'envoi (E-07), lignes désactivées (E-53, E-61, E-65), média de l'option désactivée                                                                                                            |

**Valeurs en dur relevées dans le canvas** (à porter par des tokens existants ou à proposer au DS) : illustration agente 40 sur pastille 48 (`le-agent`) ; champ de montant vide gardé à 48 de large (`.lot-e .kz-amount-input`) ; règle `.lot-e dd > .kz-pill` (pill à sa largeur dans une `DetailList`) ; viseur `le-scan`. Aucune couleur nouvelle. Corail jamais dans l'interface.

## Composants

Rien n'existe encore dans `apps/mobile/components/`. Les composants des lots A à D sont des prérequis. Règle commune : un composant affiche des valeurs fournies par l'écran (montants, frais confirmés, statuts, identité de l'agente) ; il ne calcule ni frais, ni résultat financier, ni droit.

### Réutilisés tels quels (DS v15 et compositions validées des lots C et D)

`PageHeader` (`step`, `backLabel="Fermer"` + croix sur les résultats et les demandes), `ActionZone` (avec `reason`), `Button` (`primary`, `secondary`, `text` ; « Envoi… »), `SummaryFlow` + `FlowPath` + `DetailList`, `ResultScreen` (`done`, `pending`, `failed`), `PinSlots` + `PinPad` (`disabled`), `StepTracker` (`sent`), `StatusPill`, `Message` (`info`, `error`, `loading`, `pending`), `InfoLine`, `OptionRow` + `BottomSheet`, modèle de feuille de C-00 / D-00 (E-61), `ConfirmDialog` (E-16, E-60), `CheckOption` (E-13, E-62), `IconPastille` (E-12), `AmountField` (E-54, E-62, E-66, E-71), `TextField` (+225 sur E-52 ; code sur E-57), `GoalProgress` (E-17, taille normale), `GoalTypeGrid` + `GoalTypeOption`, `DateChoice`, `SummaryPreview` (E-72), `TransactionRow` (`note`), `SectionHeader`, `MaskToggle`, `Amount`, `Skeleton`, `OFFLINE`, illustrations `Actions/agente.svg` et `Actions/mon-solde.svg`, logos `Operateurs/`.

### Nouveaux (proposés au Design System, à construire dans l'app en attendant)

**`AgentIdentity`** — qui est l'agente, sur chaque écran cliente lié à une agente (E-01, E-06, E-11, E-12, E-15 ; aussi E-14 en ligne).

- Propriétés : `name: string` (nom complet), `code: string` (`agent_code`), `variant: 'block' | 'compact'` (défaut `block`), `illustration?` (défaut `Actions/agente.svg` ; initiales si absente).
- `block` : illustration agente 40 sur pastille 48 (`surface-canvas`), nom 16 Semi Bold, dessous « Agente KOTIZ · {code agente} » (`text-secondary`). `compact` (E-11) : une ligne « Préparé avec **{agente complète}** · agente ».
- États : nominal ; nom long (retour à la ligne, jamais tronqué). Lu par TalkBack « Agente KOTIZ {agente complète}, code {code agente} ». Pas d'action.

**`OneTimeCodeField`** — code ponctuel saisi par l'agente (E-57). **Ne ressemble jamais à `PinSlots`.**

- Propriétés : `purpose` (`deposit`, `names`, `withdrawal`, `receipt`, `mobileMoney`, `support`, `point`, `creation`) qui donne le libellé (« Code du dépôt », « Code pour voir les noms », « Code du retrait », « Code de réception », « Code du retrait Mobile Money », « Code d’accompagnement », « Code du point », « Code de création ») ; `length` lu en configuration (G02, jamais écrit en dur) ; `value`, `onChange` ; `state: 'idle' | 'checking' | 'wrong' | 'expired' | 'blocked' | 'resent'`.
- Rendu : champ texte, **chiffres visibles**, clavier numérique, `autocomplete="one-time-code"`, indication « Code lu par Fatou » (gabarit « Code lu par {cliente} »), aide fixe « Ce n’est jamais son PIN. ».
- États : `wrong` erreur « Code incorrect. Demande-lui de relire le SMS. » ; `expired` erreur « Ce code n’est plus valable. » ; `blocked` champ désactivé ; `resent` `Message` « Nouveau SMS envoyé. L’ancien code ne marche plus. ». Aucune longueur, durée ni nombre d'essais affiché.
- Existant : `TextField` du DS v15 (canvas) ; à promouvoir.

**`QrScanner`** — viseur de E-51.

- Propriétés : `onRead(payload)`, `state: 'aiming' | 'reading' | 'cameraDenied' | 'invalid' | 'cannotServe' | 'offline'`, `onFallback` (« Chercher par numéro »).
- Rendu : viseur plein cadre (caméra), cadre de visée, texte du viseur « Vise le QR de la cliente » ; consigne « Scanne le QR de la cliente. » ; rappel « Le QR sert à la trouver. Il ne paie rien. ».
- États : `reading` « Lecture… » ; `cameraDenied` viseur « Caméra non autorisée », `Message` « Autorise la caméra ou cherche par numéro. » ; `invalid` « Ce n’est pas un QR KOTIZ. » ; `cannotServe` « Ce compte ne peut pas être servi. » (sans détail) + bouton texte « Contacter l’aide » dans l'`ActionZone` ; `offline` « Cet écran a besoin d’internet. Réessaie plus tard. ».
- Permission caméra demandée à la première ouverture ; refus = recherche par numéro toujours disponible. Aucune image gardée.

**`Statement`** (famille de `Receipt`) — relevé daté d'une épargne (E-18, E-70).

- Propriétés : `title` (« Mon point · {épargne} » cliente, « Point · {épargne} » agente), `date` (« Au {date} à {HH:MM} »), `totals` (`Total épargné`, `Cible`), `rows` (versements confirmés et retours au solde : date, libellé, montant signé, référence, accords), `footer` (cliente : mention « Ce relevé montre tes versements confirmés à cette date. » + « {cliente complète} · {numéro masqué} » ; agente : « Envoyé à : {numéro masqué} (son numéro vérifié) »).
- En-tête « KOTIZ » + « Relevé daté ». **Toujours en clair** (le masquage ne s'y applique pas, PO-6). Aucune signature dessinée, aucune certification.
- Existant : carte du reçu C-13 (`lc-receipt`) + `DetailList` ; à promouvoir.

### Variantes et évolutions de composants existants

**`ResultScreen` variante neutre** (PO 2 du 30 octobre 2026) — `status: 'neutral'` : pastille `surface-canvas`, pictogramme au trait `text-secondary` (un trait, **jamais une croix**), pill neutre (texte fourni : « Refusé par toi », « Refusée » ; aucune pill sur E-03 plus valable), annonce `polite` (jamais `alert`). Usages : E-03 confirmation plus valable, E-04 refusé par toi (dépôt, retrait, Mobile Money), E-56 refusée.

**`PinScreen` avertissement dans tous les états** (critique n° 6) — `messages.warning` (« Cache ton écran. Ne montre ton PIN à personne, même à l’agente. ») reste affiché en `idle`, `wrong`, `offline` et `sending` ; le message d'état (« PIN incorrect. Réessaie. », « Pas de connexion. » / « Rien n’a été envoyé. », « Envoi… ») passe **sous** `PinSlots`. En `blocked`, cases et pavé retirés. E-07 le compose avec `PinSlots` + `PinPad` + `Message` + `ActionZone` ; D-04 le prendra quand le composant évoluera (écart assumé).

**`StatusRows`** (variante de `DetailList`, absente du DS v15) — deux statuts liés, pill à sa largeur, sous-texte sous la pill :

- Dépôt vers une épargne : « Dépôt » · `done` ; « Dans {épargne} » · `done` | `pending` | `failed` (« Échoué »).
- Retrait en espèces : « Retrait » · `done` ; « Espèces reçues » · `pending` « En attente » + horloge (sous-texte cliente « Tu confirmes quand tu as compté. » ; agente « Fatou confirme quand elle a compté. », sans app « Avec le code de réception ») | `done` « Fait » (sous-texte « Confirmé par toi » / « Confirmé par Fatou ») | contestée.
- Usages : E-04, E-08, E-09, E-59, E-64, C-12. Jamais « À confirmer » (PO 1).

**Ligne « à confirmer »** (`SummaryFlow.fee` / `DetailList`, PO-1) — au MVP, une ligne Frais n'existe que pour un frais confirmé (règle DS). PO-1 l'ajoute **au prototype** sous la forme « Frais · à confirmer » (ligne vide). **En production** : frais confirmés → ligne « Frais » avec la valeur du serveur ; frais inconnus → état « frais inconnus » (autorisation bloquée). La ligne « à confirmer » n'est jamais codée sur une opération faite (note PO 4).

**`TransactionRow` contenu espèces** — `note` pour les accords (« Confirmé par toi · Espèces reçues par Awa ») ; libellé `failed` « Annulé » ; note « Espèces en attente » (ou « Espèces non reçues : on vérifie. ») sur un retrait en espèces fait dont la remise n'est pas confirmée.

**`StepTracker` contenu dépôt en espèces** (E-03) — `label` « Où en est ton dépôt » ; étapes « Tu as confirmé » (`sent`, mot « Confirmé ») · « Awa compte les espèces » (`pending`) · « Arrive sur ton solde » (`todo`, « Pas encore ») · avec une épargne : « Passe dans {épargne} » (`todo`). Confirmation plus valable : étape 1 « Ta confirmation » mot « Plus valable », texte secondaire, sans coche.

**`OptionRow` avec action** (E-15) — ligne avec une action texte en fin (« Retirer »), cible ≥ 48, nom accessible « Retirer le point d’{épargne} ». Existant : `le-perm`.

**`CheckOption` avec illustration** (E-13) — nom + illustration du type d'épargne, **sans montant** ; la carte entière est la cible. Au canvas, sans illustration : à coder avec l'illustration quand le DS l'aura.

**`FlowPath` nœud modifiable** (E-01) — action « Changer » sur le nœud d'arrivée. Au canvas : bouton texte « Changer la destination » sous le trajet (**c'est ce qui se code**).

**`AmountField` cible vide** (E-54, E-62, E-66, E-71) — champ vide gardé à 48 de large au moins (toute la ligne ouvre le clavier, règle du lot D).

**Icônes SMS et Partager** (E-19) — à dessiner au DS ; options sans pictogramme en attendant.

| Élément                           | Où                                 | Statut                                | À faire                                   |
| --------------------------------- | ---------------------------------- | ------------------------------------- | ----------------------------------------- |
| `AgentIdentity`                   | E-01, E-06, E-11, E-12, E-14, E-15 | Composé (`le-agent`, `le-agent-line`) | Construire dans l'app ; proposer au DS    |
| `OneTimeCodeField`                | E-57                               | `TextField` du DS                     | Construire ; proposer au DS               |
| `QrScanner`                       | E-51                               | Composé (`le-scan`)                   | Construire ; proposer au DS               |
| `Statement`                       | E-18, E-70                         | Carte de reçu + `DetailList`          | Construire ; proposer au DS               |
| `ResultScreen` `neutral`          | E-03, E-04, E-56                   | CSS local `.le-res.is-neutral`        | Variante du composant ; proposer au DS    |
| `PinScreen` avertissement         | E-07 (puis D-04)                   | Composition des pièces                | Option du composant ; proposer au DS      |
| `StatusRows`                      | E-04, E-08, E-09, E-59, E-64, C-12 | `DetailList` + `StatusPill`           | Variante de `DetailList` ; proposer au DS |
| `OptionRow` avec action           | E-15                               | Composé (`le-perm`)                   | Prop `trailingAction`                     |
| `CheckOption` avec illustration   | E-13                               | Sans média                            | Prop `media`                              |
| Raison liée à un bouton désactivé | tous                               | `ActionZone` `reason`                 | `accessibilityHint` relié au bouton       |

## Écrans

Plateforme : Android d'abord ; largeurs 320 à 430 (contrôle à 320, 360, 390, 430) ; portrait seul. **Aucune barre basse** dans le lot E (sauf racines A · H01, C-11, B · B07 hors lot). Pages poussées avec `PageHeader`, feuilles ou dialogues. Clavier ouvert : champ actif et bouton principal visibles. Montants, numéros et références jamais coupés (espaces insécables, tirets insécables).

Règles communes aux deux apps :

- **Orientation** : le titre dit ce que fait la personne qui tient le téléphone. Chaque écran cliente lié à une agente montre `AgentIdentity` ; chaque écran agente dit **pour qui** (« Pour Fatou Koné », « Cliente · Fatou Koné »).
- **Une décision par écran**, un seul bouton principal. Accepter / Refuser (E-12, E-13) : principal + secondaire.
- **Consignes espèces** : chaque écran agente avant la remise porte « Ne prends pas encore les espèces. » (dépôt) ou « Ne donne pas encore les espèces. » (retrait) ; l'écran cliente correspondant dit « Ne donne pas encore les espèces. » (E-01) ou « Prends les espèces seulement quand c’est fait. » (E-06).
- **Attente réseau** > 1 s : bouton en « Envoi… » (ou « Vérification… », « Recherche… », « Lancement du dépôt… »), double appui ignoré.
- **Hors connexion** : phrases `Kotiz.OFFLINE` ; le `Message` dit l'état une fois ; la raison du bouton suit les lots C et D (« Continuer demande la connexion. », « Envoyer demande la connexion. », « Valider demande la connexion. », « Renvoyer demande la connexion. », « Chercher demande la connexion. », « Demander demande la connexion. », « Répondre demande la connexion. », « Retirer demande la connexion. », « Mon point demande la connexion. », « Partager demande la connexion. »).
- **Retour** `←` : écran précédent, saisie gardée. Depuis un résultat, la croix, « Terminé » et le retour Android ramènent au point de départ (accueil côté cliente, E-51 côté agente), jamais à la saisie.
- **Reprise après interruption** : l'app cliente rouvre la demande en cours sur son écran (E-01, E-03, E-06, E-08) ; l'app agente rouvre la demande en cours sur son étape (E-56, E-57, E-58, E-64). **Jamais une nouvelle demande.**

### App cliente

#### E-01 — Awa te propose un dépôt

- Ouverture : demande reçue pendant que Mon QR est affiché (ouverture automatique, raccord A · Q01), notification (lot F), ligne « Awa attend ta réponse › » de l'accueil, ou Opérations.
- Structure : `PageHeader` (× « Fermer », titre « Dépôt en espèces ») ; messages éventuels ; `AgentIdentity` ; `SummaryFlow` : « Tu donnes » + montant ; note sous le montant « Ne donne pas encore les espèces. » (16 Semi Bold) ; `FlowPath` Depuis « Tes espèces » (illustration agente) → Vers « Mon solde » (`mon-solde.svg`) ou « {épargne} » (illustration du type), nommé « De tes espèces vers {destination} » ; bouton texte « Changer la destination » sous le trajet ; `DetailList` : « Frais » (valeur confirmée ; prototype « à confirmer ») ; « Demande » « n° {n° demande} » ; `ActionZone` : principal **« Je confirme »**, bouton texte « Ce n’est pas le bon montant ».
- Données : demande (n°, agente : nom, code ; montant ; destination par défaut « Mon solde » ; frais renvoyés par le serveur ; statut), épargnes actives (noms et types, sans montant) pour E-02.
- Interactions : « Je confirme » → envoi (« Envoi… ») → E-03. « Changer la destination » → E-02. « Ce n’est pas le bon montant » → demande **refusée** → E-04 « Refusé par toi ». × / retour Android → accueil ; la demande reste **en attente** (pas de refus implicite), retrouvable par l'accueil (« Awa attend ta réponse › ») et Opérations.
- États :
  - **Montant changé** (nouvelle demande de l'agente) : `Message` info titre « Le montant a changé. », texte « Vérifie à nouveau. » ; l'ancienne confirmation ne compte plus.
  - **Nouvelle confirmation demandée** (après expiration) : `Message` info « Ta confirmation n’est plus valable. » / « Confirme à nouveau. ».
  - **Épargne fermée entre-temps** : `Message` info « École Awa est fermée. » / « Ton argent ira sur Mon solde. » (gabarit « {épargne} est fermée. ») ; Vers repasse sur « Mon solde » ; « Changer la destination » reste.
  - **Frais inconnus** (production tant que G01 n'est pas levé) : `Message` info titre « On ne connaît pas encore les frais. », texte « Rien n’a bougé. Réessaie plus tard. » ; « Je confirme » désactivé, raison « Les frais ne sont pas encore connus. ».
  - **Annulée par l'agente** pendant la lecture : l'écran passe à E-04 « Annulé ».
  - **Envoi** : « Envoi… », boutons texte masqués. **Hors connexion** : `Message` « Pas de connexion. Rien n’a été envoyé. » ; « Je confirme » remplacé par principal « Réessayer ».
- Cas : deux demandes à la fois (deux agentes) : deux écrans, deux références, jamais fusionnées ; agente inconnue : identité et code toujours visibles, « Ce n’est pas le bon montant » sert aussi à refuser ; **aucun solde affiché** ; **aucun PIN**.

#### E-02 — Où va l'argent ? (feuille)

- Structure : `BottomSheet`, × « Fermer » ; titre « Où va l’argent ? » ; sous-titre « Tout le montant va au même endroit. » ; `OptionRow` « Mon solde » (`mon-solde.svg`, sélectionnée par défaut) ; une `OptionRow` par **épargne active** (illustration du type, nom, **sans montant**) ; sélection vert doux + coche, `accessibilityState.selected`.
- Interactions : toucher une destination → la feuille se ferme, E-01 affiche le choix ; × / retour Android → destination inchangée.
- États : **aucune épargne** : seule « Mon solde » + `InfoLine` « Tu pourras créer une épargne après. » (aucune création enchaînée) ; épargne fermée : absente ; **chargement** : `Skeleton` liste sans chiffre, annoncé « Chargement de tes épargnes ».
- Cas : 3 épargnes actives (limite) : la feuille n'invite pas à en créer ; noms longs sur deux lignes.

#### E-03 — Donne les espèces à Awa

- Structure : `ResultScreen` `pending` plein écran : × seule ; pastille horloge ambre ; `StatusPill` « En attente » ; titre « Donne les espèces à Awa. » ; sous-titre « Elle les compte devant toi. » ; montant ; `StepTracker` « Où en est ton dépôt » (§ Composants) ; `DetailList` : « Avec » {agente complète} ; « Vers » {destination} ; « Demande » n° ; zone d'action : bouton texte « Voir dans Opérations ».
- Interactions : aucune action obligatoire ; l'écran **avance seul** vers E-04 quand l'agente lance le dépôt. × / retour Android → accueil ; la demande continue (carte solde « Dépôt en attente », lot C). « Voir dans Opérations » → C-12 de la demande.
- États :
  - **Confirmation plus valable** (critique n° 1, PO 2) : `ResultScreen` neutre, **sans pill** ; titre « Confirme à nouveau. » ; sous-titre « Awa ne peut pas encore lancer le dépôt. » ; `Message` info titre « Ta confirmation n’est plus valable. », texte « Rien n’est entré. Confirme à nouveau. » ; étape 1 « Ta confirmation · Plus valable » (texte secondaire, sans coche) ; principal « Confirmer à nouveau » (→ E-01 actualisé).
  - **Montant corrigé par l'agente** → E-01 « Le montant a changé. ». **Annulée** → E-04 « Annulé ».
  - **Hors connexion** : « Mis à jour à {HH:MM} · hors connexion » ; la demande continue côté agente.
- Cas : aucune durée affichée (G02) ; Fatou ferme l'app : la notification de résultat (lot F) et Opérations ramènent à E-04 ; **pas de destination modifiable** après la confirmation (nouvelle demande).

#### E-04 — Résultat du dépôt en espèces

- Structure : `ResultScreen` plein écran (composition C-05) : × seule ; bloc de statut ; montant sur sa ligne (sauf refus) ; lignes et `DetailList` ; zone d'action. Pas d'illustration. Annonce `polite` (fait, attente, refusé) ou `assertive` (échec, annulé).

| Variante                               | Statut / pill                 | Titre                              | Contenu                                                                                                    | Principal                                                        | Boutons texte                                   |
| -------------------------------------- | ----------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| Fait, sur le solde                     | `done` « Fait »               | « Ton argent est sur ton solde. »  | Avec {agente complète} ; Référence {référence} ; « Tu reçois aussi un SMS. »                               | « Terminé »                                                      | « Voir le reçu »                                |
| Fait, dans une épargne                 | `done` « Fait »               | « Ton argent est dans {épargne}. » | `StatusRows` Dépôt · Fait ; Dans {épargne} · Fait ; Avec ; Référence(s)                                    | « Terminé »                                                      | « Voir mon épargne », « Voir le reçu »          |
| Dépôt fait, mise de côté échouée       | `failed` « À reprendre »      | « Ton argent est sur ton solde. »  | « Il n’est pas allé dans {épargne}. » ; `StatusRows` Dépôt · Fait ; Dans {épargne} · Échoué                | « Réessayer de mettre de côté » (→ C-08)                         | « Laisser sur mon solde »                       |
| Dépôt fait, mise de côté en attente    | `pending` « En attente »      | « Ton argent est sur ton solde. »  | `StatusRows` Dépôt · Fait ; Dans {épargne} · En attente ; « Ne refais rien. »                              | « Terminé »                                                      | « Voir dans Opérations »                        |
| En cours de vérification               | `pending` « En attente »      | « On vérifie ton dépôt. »          | « Awa a reçu tes espèces. Ce n’est pas encore sur ton compte. » ; « Ne refais pas le dépôt. » ; Demande n° | « Terminé »                                                      | « Signaler un problème »                        |
| Échoué après le lancement              | `failed` « Échoué »           | « Ton dépôt n’est pas fait. »      | « Rien n’est entré sur ton compte. » ; « Awa doit te rendre tes espèces. »                                 | « Terminé »                                                      | « Tu n’as pas récupéré tes espèces ? » (→ E-05) |
| Annulé par l'agente                    | `failed` mot « Annulé »       | « Awa a annulé le dépôt. »         | « Rien n’est entré sur ton compte. » ; Demande n°                                                          | « Terminé » ; **secondaire** « J’ai donné les espèces » (→ E-05) | —                                               |
| Refusé par toi (dépôt)                 | **neutre** « Refusé par toi » | « Tu as refusé ce dépôt. »         | « Rien n’a bougé. » ; Demande n° ; **sans montant**                                                        | « Terminé »                                                      | —                                               |
| Refusé par toi (retrait, Mobile Money) | **neutre** « Refusé par toi » | « Tu as refusé ce retrait. »       | « Rien n’est sorti. » ; Demande n° ; sans montant                                                          | « Terminé »                                                      | —                                               |

- Interactions : × / « Terminé » / retour Android → accueil (A · H01) ; jamais E-01 ni E-03. « Voir le reçu » → C-13 (fait seulement). « Signaler un problème » → C-14 de la demande. Les variantes « Refusé par toi » d'un retrait servent aussi E-06 et E-11.
- Interdits : aucun « Réessayer le dépôt » (un nouveau dépôt part de l'agente) ; « Remboursé » n'apparaît jamais ; hors connexion : dernier état connu, daté.

#### E-05 — Tu as donné les espèces ? (feuille)

- Structure : `BottomSheet`, × ; titre « Tu as donné les espèces ? » ; « Dis-le-nous. On vérifie avec l’agente. » ; « Ce n’est pas encore un remboursement. » ; rappel « Demande n° {n° demande} » · « {montant} · {agente complète} » (`text-secondary`) ; boutons de la feuille : principal **« Signaler un problème »** (→ C-14, motif « J’ai remis les espèces » présélectionné, demande, agente et montant repris sans ressaisie), « Revenir » (ferme), « Contacter l’aide » (lot F, G03).
- États : signalement déjà envoyé : principal « Voir mon signalement » (→ C-15) ; hors connexion : C-14 garde la saisie.
- Cas : aucun délai, aucune promesse de restitution (suivi de restitution : lot F) ; le signalement ne crée aucun mouvement.

#### E-06 — Vérifie ton retrait (proposé par une agente)

- Structure : `PageHeader` (× , « Retrait en espèces ») ; messages ; `AgentIdentity` ; `SummaryFlow` « Tu reçois en espèces » + montant ; note sous le montant « Prends les espèces seulement quand c’est fait. » ; `FlowPath` Depuis « Mon solde » → Vers « En espèces » · « De la main d’Awa », nommé « De Mon solde vers tes espèces, avec Awa » ; `DetailList` : « Frais » ; « Pris sur ton solde » (valeurs du serveur ; prototype « à confirmer ») ; « Demande » n° ; phrase « L’argent sort : tu confirmes avec ton PIN KOTIZ. » ; `ActionZone` : principal **« Continuer »** (→ E-07), bouton texte « Ce n’est pas le bon montant ».
- Interactions : « Ce n’est pas le bon montant » → refus → E-04 « Tu as refusé ce retrait. ». × → accueil, la demande reste en attente, rien ne sort.
- États :
  - **Refusé avant le PIN** (raison dite à Fatou seule) : `Message` erreur, « Continuer » retiré, principal « Terminé » (→ accueil) :
    - solde : « Ton solde ne suffit pas pour ce retrait. » ;
    - niveau d'accès : « Ce retrait dépasse ce que ton compte permet. » + bouton texte « Vérifier mon identité » (→ sous-lot A2, KYC) ;
    - argent dans les épargnes : « Ton argent est dans tes épargnes. » + bouton texte « Remettre sur mon solde » (→ B · B01, lot B).
  - **Frais inconnus** : `Message` info titre « On ne connaît pas encore les frais. », texte « Rien n’est sorti. Réessaie plus tard. » ; « Continuer » désactivé, raison « Les frais ne sont pas encore connus. ».
  - **Annulée par l'agente** : `Message` « Awa a annulé la demande. » / « Rien n’est sorti. » ; principal « Terminé ».
  - **Montant changé** (nouvelle demande) : `Message` « Le montant a changé. » / « Vérifie à nouveau. ».
  - **Hors connexion** : `Message` « Pas de connexion. Rien n’a été envoyé. » ; principal « Réessayer » (critique n° 12).
- Cas : **aucun solde complet** à l'écran (Fatou peut être regardée) ; une seule ligne « Pris sur ton solde » ; aucun délai ; aucune valeur chiffrée dans un refus.

#### E-07 — Entre ton PIN (retrait en espèces)

- Structure (composition des pièces de `PinScreen`, critique n° 6) : `PageHeader` (←, titre « Entre ton PIN ») ; rappel « Retrait en espèces » · « {montant} F · avec {agente complète} » ; `PinSlots` (longueur lue en configuration, G02) ; **avertissement fixe** « Cache ton écran. Ne montre ton PIN à personne, même à l’agente. » ; message d'état **sous les cases** ; bouton texte « PIN oublié ? » (lot F) ; `PinPad`. La saisie complète envoie.
- États : **saisie** (cases qui se remplissent, jamais un chiffre affiché) ; **PIN incorrect** (`Message` erreur « PIN incorrect. Réessaie. » sous les cases, cases vidées, avertissement gardé ; aucun nombre d'essais) ; **envoi** (`Message` chargement « Envoi… », pavé désactivé, « PIN oublié ? » masqué, ← inactif, avertissement gardé) ; **hors connexion** (`Message` info « Pas de connexion. » / « Rien n’a été envoyé. », PIN effacé, avertissement gardé) ; **bloqué** (titre « Ton PIN est bloqué », `Message` erreur « Trop d’essais. » / « Rien n’est sorti. Awa ne te donne rien. », cases et pavé retirés, principal « Terminé », bouton texte « PIN oublié ? » ; aucun nombre ni durée).
- Interactions : ← → E-06 (PIN effacé, rien n'est envoyé) ; appel entrant ou arrière-plan : retour sur E-06, PIN effacé.
- Sécurité : PIN jamais affiché, gardé ni journalisé ; capture d'écran bloquée (à confirmer, G02) ; **l'agente ne voit ni ne saisit jamais le PIN**.

#### E-08 — Résultat du retrait et remise des espèces

- Structure : `ResultScreen` plein écran, × seule.

| Variante             | Statut / pill            | Titre                           | Contenu                                                                                                                                                                                          | Principal                     | Boutons texte                    |
| -------------------- | ------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | -------------------------------- |
| Fait                 | `done` « Fait »          | « Ton retrait est fait. »       | « Awa te donne tes espèces. Compte-les. » ; montant ; `StatusRows` Retrait · Fait ; Espèces reçues · En attente (« Tu confirmes quand tu as compté. ») ; « Avec » {agente complète} ; Demande n° | **« J’ai reçu mes espèces »** | « Je n’ai pas reçu mes espèces » |
| En attente / inconnu | `pending` « En attente » | « On vérifie ton retrait. »     | « Ne prends pas encore les espèces. » ; « Ne refais pas le retrait. » ; Demande n°                                                                                                               | « Terminé »                   | « Signaler un problème »         |
| Échoué               | `failed` « Échoué »      | « Ton retrait n’est pas fait. » | « Rien n’a été pris sur ton solde. » (Semi Bold, sous le titre) ; « Awa ne te donne rien. »                                                                                                      | « Terminé »                   | —                                |

- « J’ai reçu mes espèces » : aide lue par TalkBack « Appuie quand tu as compté tes espèces. » ; **n'existe jamais avant « Fait »** ; envoi « Envoi… » puis E-09 ; envoi échoué : reste sur E-08, `Message` erreur « Pas envoyé. » / « Réessaie. Tes espèces restent en attente. », remise toujours « En attente ».
- La page passe seule de « En attente » à « Fait » ou « Échoué » (annonce `polite`, `assertive` pour l'échec). × / retour Android → accueil ; la remise reste « En attente » et C-12 garde le bouton « J’ai reçu mes espèces ».
- « Je n’ai pas reçu mes espèces » → E-10. Hors connexion : dernier état connu, daté.
- G01 : si un échec confirmé ne garantit pas que rien n'a été pris, la variante devient « On vérifie ton solde. » en « En attente » (configuration, voir Points ouverts).

#### E-09 — Tu as reçu tes espèces

- Structure : `ResultScreen` `done` ; pill « Fait » ; titre « Tu as reçu tes espèces. » ; montant ; `StatusRows` Retrait · Fait ; Espèces reçues · Fait (« Confirmé par toi ») ; `DetailList` : « Avec » ; « Référence » ; « Pris sur ton solde » **{montant réel renvoyé par le serveur}** (note PO 4 ; « à confirmer » = prototype) ; principal « Terminé » (→ accueil), bouton texte « Voir le reçu » (→ C-13).
- Cas : confirmer deux fois ne crée rien (idempotent) ; aucune illustration.

#### E-10 — Tu n'as pas reçu tes espèces ? (feuille)

- Structure : `BottomSheet`, × ; titre « Tu n’as pas reçu tes espèces ? » ; « Ne refais pas le retrait. » (Semi Bold) ; « L’assistance vérifie avec l’agente. » ; rappel « Retrait de {montant} F · {agente complète} · {référence} » ; boutons de la feuille : principal « Signaler un problème » (→ C-14, motif « Espèces non reçues » présélectionné, retrait repris ; dossier existant → C-15), « Revenir », « Contacter l’aide ».
- Après l'envoi du signalement : la remise passe à **« Contestée »** (C-12) ; l'agente le voit sur E-64. Aucun délai, aucune promesse, aucune nouvelle transaction.

#### E-11 — Vérifie ton retrait Mobile Money (préparé par une agente)

- Structure (composition de D-03) : `PageHeader` (× , « Retrait Mobile Money ») ; `AgentIdentity` compacte « Préparé avec {agente complète} · agente » ; `SummaryFlow` « Tu reçois sur ton {opérateur} » + montant reçu ; flux Depuis « Mon solde » → Vers « Vers ton numéro » {numéro vérifié en entier} · {opérateur} (logo), nommé « De Mon solde vers ton {opérateur} » ; phrase « Le numéro est le tien. On ne peut pas le changer. » ; `DetailList` « Frais », « Pris sur ton solde », « Ton solde après » (valeurs du serveur, seulement si frais confirmés ; « Ton solde après » retirée en masqué) ; principal « Continuer » (→ D-04 puis D-05), bouton texte « Je ne veux pas ce retrait » (refus → E-04 « Tu as refusé ce retrait. »).
- États : ceux de D-03 (frais inconnus avec le texte de E-06, opérateur devenu indisponible « {opérateur} est indisponible pour l’instant. ») ; **refus avant le PIN : les trois variantes de E-06** (critique n° 8) ; annulée par l'agente ; montant changé ; masqué.
- D-04 et D-05 ouverts depuis E-11 : **sans compteur d'étape**, rappel « Préparé avec : {agente complète} » ; le reste est celui du lot D ([handoff-lot-d.md](handoff-lot-d.md)). **Aucun « J’ai reçu », aucun code de réception** dans cette branche.

#### E-12 — Awa veut t'accompagner

- Structure : `PageHeader` (× , « Accompagnement ») ; `IconPastille` agente ; titre « Awa veut t’accompagner » (gabarit « {agente} veut t’accompagner ») ; `AgentIdentity` ; « Avec ton accord, elle peut : » — « t’aider à créer une épargne ; » « te demander de voir le point d’une épargne. » ; « Elle ne peut pas : » — « voir ton solde ni tes opérations ; » « voir un point sans ton accord ; » « connaître ton PIN. » ; « Tu peux arrêter quand tu veux, dans Profil. » ; principal **« Accepter »**, secondaire « Refuser ».
- Interactions : Accepter → E-15 avec `Message` info « Awa t’accompagne. » ; Refuser → accueil avec `Message` « Tu as refusé. Awa ne peut pas t’accompagner. » ; × → demande en attente, aucun droit.
- États : envoi ; hors connexion ; demande retirée entre-temps « Cette demande n’existe plus. » (principal « Fermer ») ; déjà accompagnée par cette agente : la demande n'est pas proposée.
- Cas : accepter ne vaut ni autorisation d'opération, ni permission de point, ni rattachement exclusif ; plusieurs agentes possibles ; aucune relance automatique après refus.

#### E-13 — Awa veut voir le point de tes épargnes

- Structure : `PageHeader` (× , « Point d’une épargne ») ; titre « Awa veut voir le point de tes épargnes » ; « Elle verra les versements, le total et la cible. Jamais ton solde ni tes autres opérations. » ; groupe « Épargnes qu’Awa peut voir » : une `CheckOption` par épargne active (nom, illustration du type, **sans montant**), **aucune cochée** ; `InfoLine` « Une nouvelle épargne ne sera pas ajoutée seule. » ; principal **« Autoriser »** puis « Autoriser pour {n} épargne(s) » selon les cases (désactivé tant que rien n'est coché, raison « Coche au moins une épargne. ») ; secondaire « Refuser ».
- États : épargne déjà autorisée (cochée, désactivée, « Déjà autorisée ») ; **aucune épargne active** (« Tu n’as pas d’épargne. », principal « Fermer », **aucune raison**, la demande reste sans réponse) ; accompagnement retiré entre-temps « Cette demande n’existe plus. » ; envoi ; hors connexion.
- Interactions : Autoriser → E-15 (lignes ajoutées) ; Refuser → accueil + message ; les autorisations s'ajoutent, elles ne retirent rien.

#### E-14 — Mon accompagnement

- Entrée : Profil > « Mon accompagnement » (lot F ; « Bientôt ici » tant que Profil n'est pas livré).
- Structure : `PageHeader` (←, « Mon accompagnement ») ; `SectionHeader` « À répondre » (si besoin) : `OptionRow` « {agente complète} veut t’accompagner » sub « En attente de ta réponse » (→ E-12) ; `SectionHeader` « T’accompagnent » : `OptionRow` « {agente complète} » sub « Voit le point de {n} épargne(s) » ou « Ne voit aucun point » (→ E-15) ; texte bas « Une agente ne voit jamais ton solde. ».
- États : vide « Aucune agente ne t’accompagne. » / « Une agente peut te le proposer. » (aucun bouton d'ajout) ; chargement (`Skeleton`) ; hors connexion (liste datée, raison « Répondre demande la connexion. »).

#### E-15 — Awa, mon agente

- Structure : `PageHeader` (←, {agente complète}) ; messages ; `AgentIdentity` ; « T’accompagne depuis le {date} » ; `SectionHeader` « Elle peut voir le point de » : une ligne par épargne autorisée (illustration, nom, bouton « Retirer » nommé « Retirer le point d’{épargne} », → E-16 variante point) ; sinon « Aucune épargne. » ; « Elle ne voit pas ton solde ni tes opérations. » ; zone d'action : bouton texte destructif « Retirer Awa de mon accompagnement » (→ E-16 variante accompagnement).
- États : après Accepter (`Message` « Awa t’accompagne. ») ; nominal ; aucune épargne ; **création en attente** (cliente qui active son app pendant une création assistée) : « Création de {épargne} en attente de ta confirmation par SMS. » ; **on vérifie la création** (G05-1) : « On vérifie la création de {épargne}. » sans action ; retrait en cours ; échec du retrait `Message` erreur « Pas retiré. » / « Réessaie. Rien n’a changé. » (droits inchangés) ; hors connexion (retraits désactivés, **une seule** raison « Retirer demande la connexion. »).

#### E-16 — Retirer … ? (dialogue, 2 variantes)

- `ConfirmDialog`. **Accompagnement** : titre « Retirer Awa de ton accompagnement ? » ; « Elle ne pourra plus t’aider ni voir tes points. » ; « Ton argent et tes opérations ne changent pas. » ; « Les points déjà envoyés restent envoyés. » ; si une création assistée attend sa confirmation : « Sa demande de création sera annulée. » ; principal « Retirer Awa », secondaire « Garder » → E-14.
- **Point** : titre « Awa ne verra plus le point d’{épargne} ? » ; « Elle t’accompagne toujours. » ; « Les points déjà envoyés restent envoyés. » ; principal « Retirer », secondaire « Garder » → E-15 sans cette épargne.
- États : envoi ; échec (→ E-15 erreur) ; hors connexion : dialogue non ouvert. Aucune opération financière annulée ; aucune promesse d'effacement des points envoyés.

#### E-17 — Carnet d'{épargne}

- Entrée : B · B07, bouton texte « Mon carnet › » au-dessus de « Derniers mouvements ».
- Structure : `PageHeader` (←, « Carnet d’{épargne} », œil `MaskToggle`) ; accroche « Ton signé-signé, sur ton téléphone. » ; épargne fermée : `StatusPill` neutre « Fermée le {date} » ; `GoalProgress` (taille normale) ; `InfoLine` « 1 dépôt en attente n’est pas encore dans ton carnet. » (gabarit au pluriel, → C-12) ; liste par mois de `TransactionRow` **confirmées seulement**, avec `note` :
  - dépôt en espèces : « Dépôt en espèces » · « Avec {agente} » · « +{montant} F » · note « Confirmé par toi · Espèces reçues par {agente} » ;
  - dépôt Mobile Money : « Dépôt {opérateur} » · note « Validé sur ton {opérateur} » ;
  - mise de côté depuis le solde : « Depuis ton solde » · note « Confirmé par toi » ;
  - retour au solde : « Vers ton solde » · « −{montant} F » · note « Avec ton PIN » (PNV-1) ;
  - principal « Mon point du jour » (→ E-18).
- Interactions : une ligne → C-12 ; ← → B · B07 ; l'œil applique le réglage unique de masquage.
- États : vide « Pas encore de versement. » ; chargement annoncé « Chargement du carnet » ; masqué (« ••• ») ; hors connexion « Mis à jour à {HH:MM} · hors connexion » ; épargne fermée (lecture seule).
- Cas : aucune « signature » dessinée ; aucune validation agente inventée pour un versement autonome ; dépôt en espèces vers l'épargne = une ligne, deux références au détail ; horodatages et identités affichés seulement s'ils existent.

#### E-18 — Mon point au {date}

- Structure : `PageHeader` (←, « Mon point ») ; messages ; `Statement` (§ Composants), **toujours en clair** ; principal « Partager » (→ E-19).
- États : préparation (`Skeleton`, annoncé « Préparation de ton point ») ; erreur « Ton point ne s’affiche pas. » + « Réessaie » ; hors connexion « Cet écran a besoin d’internet. Réessaie plus tard. » (raison « Mon point demande la connexion. ») ; résumé envoyé `Message` info « Résumé envoyé sur ton numéro. » ; **envoi non abouti** `Message` erreur « Envoi non abouti. » / « Le même point sera renvoyé. » + principal « Renvoyer ce point » (même point daté, aucun nouveau mouvement).
- Cas : le relevé ne devient jamais un solde en direct ; « Mon point du jour » plus tard crée un nouveau point daté.

#### E-19 — Partager mon point (feuille)

- Structure : `BottomSheet`, × ; titre « Partager mon point » ; `OptionRow` « Recevoir un résumé par SMS » sub « Sur ton numéro {numéro vérifié en entier} » ; `OptionRow` « Partager le relevé » sub « Tu choisis l’application et la personne. » (feuille de partage Android) ; « KOTIZ ne sait pas si la personne l’a reçu. ».
- Interactions : SMS → envoi vers le numéro vérifié → E-18 avec le statut d'envoi ; Partager → feuille de partage du téléphone, **aucun statut** (ni « envoyé », ni « reçu »).
- États : hors connexion : SMS désactivé, raison « Partager demande la connexion. ». Aucun destinataire saisi dans KOTIZ ; aucun envoi WhatsApp automatique ; texte du résumé SMS : G04.

### App agente

En-tête de chaque écran : identité de la cliente (« Pour Fatou Koné » ou ligne « Cliente »), **jamais** son solde, ses épargnes ni ses opérations. Numéro toujours masqué « 07 •• •• •• 56 ».

#### E-51 — Trouver la cliente

- Structure : `PageHeader` (←, « Trouver la cliente ») ; `QrScanner` ; consigne et rappel (§ Composants) ; `ActionZone` : bouton texte « Chercher par numéro » (→ E-52) ; « Contacter l’aide » seulement pour un compte qui ne peut pas être servi.
- Interactions : lecture d'un QR KOTIZ valide → E-53 ; ← → accueil agente (G-20, lot G).
- États : voir `QrScanner`. QR photographié d'un autre téléphone : l'identité se vérifie sur E-53.

#### E-52 — Chercher par numéro

- Structure : `PageHeader` (←, « Chercher par numéro ») ; `TextField` +225 « Son numéro KOTIZ » (clavier du téléphone) ; « Tu vérifies son nom à l’étape suivante. » ; principal « Chercher ».
- États : vide (« Chercher » désactivé, raison « Écris son numéro. ») ; incomplet (erreur « Écris les 10 chiffres de son numéro. ») ; recherche (« Recherche… ») ; **introuvable** (« Aucune cliente à ce numéro. » + bouton texte « Créer sa fiche » → A · A02, [#93](https://github.com/kotiz-ci/platform/issues/93)) ; hors connexion (raison « Chercher demande la connexion. »).
- Cas : la recherche n'exécute aucune opération ; aucun indice sur un compte au-delà du nom affiché sur E-53.

#### E-53 — C'est bien elle ?

- Structure : `PageHeader` (←, « C’est bien elle ? ») ; messages (annulation récente) ; nom {cliente complète} (`title`) ; {numéro masqué} ; « Accès à l’app : activé » ou « pas activé » ; « Demande-lui son nom avant de continuer. » ; lignes de choix : « Dépôt en espèces » (→ E-54) ; « Retrait » (→ E-61) ; « Accompagnement » sub statut (« Pas demandé », « En attente », « Accepté », « Refusé », « Retiré par la cliente ») (→ E-68) ; « Point de ses épargnes » (→ E-69) ; « Créer une épargne pour elle » (→ E-71) **seulement si l'accès à l'app n'est pas activé** (PO-7) ; `ActionZone` : bouton texte « Ce n’est pas elle » (→ E-51, rien n'est enregistré).
- États : chargement ; hors connexion ; **après une annulation** : `Message` « Demande n° {n° demande} annulée. Fatou reçoit un SMS. » (ou « Demande d’accompagnement annulée. », « Demande de point annulée. ») ; **compte restreint** : lignes désactivées, raison « Pas possible pour cette cliente. », bouton texte « Contacter l’aide » sous « Ce n’est pas elle » ; **accès suspendu de l'agente : dépendant du lot G**.
- Interdit : **aucun solde, aucune épargne, aucune opération** de la cliente.

#### E-54 — Combien elle dépose ?

- Structure : `PageHeader` (←, « Dépôt en espèces », « Étape 1 sur 3 ») ; « Pour {cliente complète} » ; `AmountField` (34 Bold, clavier numérique, sans montants rapides) ; consigne « Ne prends pas encore les espèces. » ; principal « Continuer » (contrôle des fonds, puis E-55).
- États : vide (Continuer désactivé, raison « Écris le montant. ») ; **montant corrigé** (prérempli depuis E-58, `Message` info « Nouveau montant : elle doit confirmer à nouveau. ») ; contrôle (« Vérification… ») ; **fonds insuffisants** (`Message` erreur « Tes fonds ne suffisent pas pour ce dépôt. », **une seule** consigne « Ne prends pas les espèces. », **aucun montant des fonds**, lien « Mes fonds › » → G-21, lot G) ; **montant hors règles** (minimum, maximum, niveau d'accès de la cliente : `Message` erreur « Ce montant n’est pas possible pour cette cliente. », valeurs G01) ; hors connexion (`Message` « Pas de connexion. Rien n’a été envoyé. », raison « Continuer demande la connexion. »).
- Cas : le contrôle ne garantit pas les fonds au lancement (recontrôle au lancement, E-58).

#### E-55 — Vérifie le dépôt avec elle

- Structure : `PageHeader` (←, « Vérifie le dépôt avec elle », « Étape 2 sur 3 ») ; `SummaryFlow` « Elle donne » + montant + « Modifier » (→ E-54) ; flux Depuis « Ses espèces » → Vers ; `DetailList` : « Cliente » {cliente complète} ; « Agente » « Toi (Awa Traoré) » ; « Vers » : avec app « Elle choisit sur son téléphone » ; sans app choix « Son compte KOTIZ » (sélectionné) / « Une de ses épargnes » (sub « Elle doit accepter que tu voies les noms. ») ; « Frais » ; consigne « Elle confirme d’abord. Ensuite seulement, prends les espèces. » (sans app : « Elle reçoit un SMS avec le code du dépôt. ») ; principal **« Envoyer à son téléphone »** (accès activé) ou **« Envoyer le code par SMS »** (sans app) ; bouton texte « Annuler » (aucune demande envoyée : retour E-53 sans trace).
- **Sans app, « Une de ses épargnes »** : si les noms ne sont pas autorisés, feuille « Voir les noms de ses épargnes ? » : « Elle reçoit un code par SMS. Tu verras les noms, jamais les montants. » ; principal « Envoyer le code des noms » (→ E-57 « Code pour voir les noms », rappel « Pour · Voir les noms de ses épargnes », « Durée · Ce dépôt seulement ») ; « Garder son solde ». Code valide → retour ici, choix « Où va l’argent ? Choisis avec elle. » avec les noms (sans montant) ; raison tant que rien n'est choisi « Choisis une de ses épargnes avec elle. ». Noms refusés ou code non donné : « Son compte KOTIZ » reste ; le dépôt n'est jamais bloqué faute d'épargne.
- États : envoi (« Envoi… ») ; échec d'envoi « Pas envoyé. » ; hors connexion (raison « Envoyer demande la connexion. ») ; frais inconnus (`Message` « On ne connaît pas encore les frais. » / « Rien n’est envoyé. Réessaie plus tard. », envoi désactivé, raison « Les frais ne sont pas encore connus. »).
- Cas : changer de destination après l'envoi = annuler puis nouvelle demande ; l'accord de noms ne vaut que pour **ce** dépôt.

#### E-56 — Attends sa réponse (générique)

- Structure : `ResultScreen` `pending` : × (→ E-53) ; horloge ; pill « En attente » ; titre selon la variante ; montant (variantes d'argent) ; `DetailList` (montant, cliente, demande n°) ; consigne ; `ActionZone` : boutons texte « Elle n’a pas internet ? Envoyer le code par SMS » (→ E-57 de la finalité, **même demande**) et « Annuler la demande » (→ E-60).

| Variante             | Titre                                 | Consigne                                                       | Suite quand elle accepte |
| -------------------- | ------------------------------------- | -------------------------------------------------------------- | ------------------------ |
| Dépôt                | « Fatou confirme sur son téléphone. » | « Ne prends pas encore les espèces. »                          | E-58                     |
| Retrait en espèces   | « Fatou confirme avec son PIN. »      | « Ne regarde pas son écran. Ne donne pas encore les espèces. » | E-64                     |
| Retrait Mobile Money | « Fatou confirme avec son PIN. »      | « Ne regarde pas son écran. »                                  | E-59                     |
| Accompagnement       | « Fatou répond sur son téléphone. »   | —                                                              | E-68 « Accepté »         |
| Point d'une épargne  | « Fatou choisit les épargnes. »       | —                                                              | E-69 épargnes autorisées |

- Point sans accord des noms : « Elle n’a pas internet ? » passe d'abord par le code des noms, puis le choix de l'épargne, puis « Code du point ».
- États : **refusée** (`ResultScreen` neutre, pill « Refusée », titre « Fatou n’a pas confirmé. », « Rien n’a bougé. » ; dépôt : « Ne prends pas les espèces. » ; principal « Revenir à sa fiche » → E-53) ; **sans réponse / expirée** (« Pas de réponse pour l’instant. » / « Tu peux renvoyer une nouvelle demande. », principal « Renvoyer la demande » = nouvelle demande, « Annuler la demande » ; aucune relance automatique ; durée G02) ; hors connexion (« Mis à jour à {HH:MM} · hors connexion »).
- Règle PO-4 : dès l'envoi du code, l'accord dans l'app n'est plus possible pour cette demande. L'agente ne voit jamais l'écran de la cliente.

#### E-57 — Code de la cliente (générique, 8 finalités)

- Structure : `PageHeader` (←, titre = nom du code ; « Annuler » dans l'en-tête quand la finalité permet l'annulation) ; consigne « Fatou lit le SMS. Elle vérifie, puis te dit le code. » ; rappel de la demande (`DetailList` : montant, destination ou objet) ; consigne espèces « Ne prends pas les espèces sans code. » (dépôt) / « Ne donne pas les espèces sans code. » (retrait, réception) ; `OneTimeCodeField` ; principal **« Valider le code »** (désactivé tant que le code n'a pas la longueur configurée, raison « Écris le code que Fatou te dit. ») ; bouton texte « Elle n’a pas reçu le SMS » (→ feuille).

| Titre                            | Ce que le SMS dit à la cliente                      | Effet du code valide                           | Ne fait jamais                     |
| -------------------------------- | --------------------------------------------------- | ---------------------------------------------- | ---------------------------------- |
| « Code du dépôt »                | agente, montant, destination, frais                 | confirme les conditions du dépôt → E-58        | lancer le dépôt, prouver la remise |
| « Code pour voir les noms »      | l'agente veut voir les noms pour ce dépôt           | noms des épargnes, sans montant, pour ce dépôt | donner le point                    |
| « Code du retrait »              | agente, montant, frais                              | autorise le retrait → E-64                     | prouver la remise                  |
| « Code de réception »            | « As-tu reçu {montant} F ? »                        | confirme la réception → E-59 Retrait terminé   | débiter                            |
| « Code du retrait Mobile Money » | opérateur, numéro, montant, frais                   | autorise le retrait Mobile Money → E-59        | bouger des espèces                 |
| « Code d’accompagnement »        | agente, ce qu'elle pourra faire                     | accompagnement accepté → E-68                  | donner un accès au solde           |
| « Code du point »                | agente, épargne, droit « voir et envoyer le point » | permission pour cette épargne → E-69           | ouvrir une autre épargne           |
| « Code de création »             | type, cible, nom                                    | création de l'épargne → E-59                   | bouger de l'argent                 |

- États : vérification ; **incorrect** (erreur « Code incorrect. Demande-lui de relire le SMS. ») ; **expiré** (erreur « Ce code n’est plus valable. », principal **« Renvoyer le SMS »**) ; **bloqué** (`Message` « Trop d’essais. », « Valider le code » désactivé, raison « Code bloqué pour cette demande. », bouton texte « Contacter l’aide ») ; SMS renvoyé (« Nouveau SMS envoyé. L’ancien code ne marche plus. ») ; **demande annulée entre-temps** (création après retrait de l'accompagnement : `Message` « Demande annulée. » / « Fatou a retiré ton accompagnement. », principal « Revenir à sa fiche ») ; hors connexion (raisons « Valider demande la connexion. », « Renvoyer demande la connexion. »).
- Feuille « Elle n’a pas reçu le SMS ? » : « Vérifie son numéro avec elle : 07 •• •• •• 56. » ; principal « Renvoyer le SMS » (règles G02) ; « Revenir » ; « Contacter l’aide ».
- Interdits : un code d'une autre finalité ou d'une autre demande est toujours refusé ; aucune longueur, durée ni nombre d'essais affichés ; jamais un champ PIN.

#### E-58 — Reçois et compte les espèces

- Structure : `PageHeader` (« Dépôt en espèces », « Étape 3 sur 3 », « Annuler » dans l'en-tête → E-60, **pas de flèche retour**) ; `StatusPill` neutre « Confirmé par Fatou » (sans app : « Code du dépôt validé ») ; titre « Prends les espèces et compte-les. » ; montant ; « Devant elle. » ; `DetailList` : Cliente ; Demande n° ; Vers (si choisi par l'agente) ; principal **« Confirmer les espèces reçues »** (aide « {montant} F comptés devant elle ») ; secondaire « Le montant n’est pas le même » (→ E-54 prérempli, nouvelle confirmation).
- États :
  - **Lancement** : « Lancement du dépôt… », double appui bloqué → E-59.
  - **Confirmation plus valable** (critique n° 1) : **sans pill** ; titre « Redemande sa confirmation. » ; consigne « Ne prends pas encore les espèces. Si tu les as, garde-les de côté. » ; `Message` « Sa confirmation n’est plus valable. » / « Rien n’est lancé. » ; montant gardé ; principal « Redemander sa confirmation » (→ E-56 ou E-57).
  - **Fonds devenus insuffisants au lancement** → E-59 « Dépôt pas fait. » + « Rends les {montant} F à Fatou. ».
  - **Hors connexion** : `Message` « Pas de connexion. Rien n’a été envoyé. » / « Garde les espèces de côté. ».
  - **Accès suspendu : dépendant du lot G.**
- Interactions : retour Android = rien ne part, l'écran reste. Après le lancement, plus d'annulation.

#### E-59 — Résultat (app agente)

- Structure : `ResultScreen` plein écran : × ; consignes espèces en tête de contenu, Semi Bold ; principal « Terminé » (→ E-51) ; boutons texte « Voir le reçu » (fait seulement ; reçu agente hors lot, PRD 19) et « Contacter l’aide » selon la variante.

| Variante                        | Pill       | Titre                               | Contenu                                                                                                                             |
| ------------------------------- | ---------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Dépôt fait                      | Fait       | « Dépôt fait. »                     | montant ; « Sur le compte de Fatou Koné » ; Référence ; « Fatou reçoit un SMS. »                                                    |
| Dépôt en vérification           | En attente | « Dépôt en cours de vérification. » | « Ne refais pas le dépôt. » ; « Garde le numéro de demande. » ; Demande n°                                                          |
| Dépôt pas fait                  | Échoué     | « Dépôt pas fait. »                 | « Rien n’est entré sur son compte. » ; **« Rends les {montant} F à Fatou. »**                                                       |
| Retrait terminé                 | Fait       | « Retrait terminé. »                | `StatusRows` Retrait · Fait ; Espèces reçues · Fait (« Confirmé par Fatou ») ; Référence                                            |
| Retrait Mobile Money fait       | Fait       | « Retrait fait. »                   | « Wave a confirmé. » ; Vers « Wave · 07 •• •• •• 56 » ; Référence ; « Aucune espèce à donner. »                                     |
| Retrait Mobile Money en attente | En attente | « On vérifie. »                     | « Wave n’a pas encore confirmé. »                                                                                                   |
| Retrait Mobile Money pas fait   | Échoué     | « Pas fait. »                       | « Rien n’est sorti de son compte. »                                                                                                 |
| Épargne créée                   | Fait       | « Épargne créée. »                  | « {épargne}, pour Fatou Koné » ; Objectif ; « Pour l’instant » 0 F ; « Aucun argent n’a bougé. » ; « Pour l’alimenter : un dépôt. » |
| Création en vérification        | En attente | « On vérifie. »                     | « La création de {épargne} n’est pas encore confirmée. » ; « Ne la recrée pas. »                                                    |
| Épargne pas créée               | Échoué     | « Pas créée. »                      | « Aucune épargne n’a été créée. » ; « Aucun argent n’a bougé. »                                                                     |

- Interdits : l'agente ne voit pas le résultat d'une mise de côté choisie par la cliente ni le nom de l'épargne ; le statut d'envoi d'un SMS est distinct (« SMS pas parti » n'est jamais un échec du dépôt).

#### E-60 — Annuler la demande ? (dialogue)

- `ConfirmDialog` : titre « Annuler la demande ? » ; « Elle reste dans l’historique. » ; « Fatou reçoit un SMS. » ; dépôt : « Si elle t’a donné des espèces, rends-les. » ; principal « Annuler la demande », secondaire « Continuer ».
- Après l'annulation : retour sur E-53 avec le message de la demande (§ E-53) ; SMS d'annulation à la cliente ; demande « Annulée » conservée.
- États : envoi ; échec « Pas annulée. Réessaie. » ; lancement ou autorisation déjà faits entre-temps : « Le dépôt est déjà lancé. Tu ne peux plus l’annuler. » → E-59.
- Cas : l'annulation ne prouve jamais que la cliente n'a pas remis d'espèces ; non proposée après le lancement ou l'autorisation.

#### E-61 — Comment elle retire ? (feuille)

- `BottomSheet`, titre « Comment elle retire ? » ; « En espèces » (→ E-62) ; « Sur son Mobile Money » sub « Vers son numéro vérifié » (→ E-65). × → E-53.
- États : aucun opérateur : ligne 2 désactivée, raison « Mobile Money indisponible pour l’instant. » ; compte restreint : lignes désactivées.

#### E-62 — Combien elle retire en espèces ?

- Structure : `PageHeader` (←, « Retrait en espèces », « Étape 1 sur 2 ») ; « Pour {cliente complète} » ; `AmountField` « Elle reçoit » ; `CheckOption` **« J’ai {montant} en espèces sur moi. »** (requise ; se décoche si le montant change) ; consigne « Ne donne pas encore les espèces. » ; principal « Continuer ».
- États : vide ; case non cochée (Continuer désactivé, raison « Coche si tu as les espèces. ») ; montant hors règles (raison générique, G01) ; hors connexion (raison « Continuer demande la connexion. »).
- Interdits : aucun « Tout son solde », aucune suggestion de montant (l'agente ne connaît pas le solde).

#### E-63 — Vérifie le retrait avec elle

- Structure : `PageHeader` (←, « Vérifie le retrait avec elle », « Étape 2 sur 2 ») ; `SummaryFlow` « Elle reçoit en espèces » + montant + « Modifier » ; flux Depuis « Son compte KOTIZ » → Vers « En espèces » · « De ta main » ; `DetailList` : Cliente ; « Frais » ; consignes avec app « Elle confirme avec son PIN. Ne regarde pas son écran. » / sans app « Elle reçoit un SMS avec un code. » ; « Ne donne pas encore les espèces. » ; principal « Envoyer à son téléphone » / « Envoyer le code par SMS » ; bouton texte « Annuler ».
- États : **refus avant l'autorisation** : `Message` erreur « Ce retrait n’est pas possible pour cette cliente. » + « Elle voit la raison sur son téléphone. » (app) / « Elle reçoit la raison par SMS. » (sans app) ; principal « Revenir à sa fiche » ; frais inconnus ; envoi ; hors connexion.
- Interdit : **jamais la raison détaillée chez l'agente.**

#### E-64 — Retrait : donne les espèces

- Structure : `ResultScreen` : × (le retrait reste « remise en attente » dans l'historique agente) ; zone d'action selon la variante.

| Variante             | Titre                                        | Contenu                                                                                                                                                                          | Actions                                                                            |
| -------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Fait, avec app       | « Retrait fait. Donne {montant} F. »         | `Amount` 34 « {montant} FCFA » ; « Elle les compte devant toi. » ; `StatusRows` Retrait · Fait ; Espèces reçues · En attente (« Fatou confirme quand elle a compté. »)           | **aucun principal** ; bouton texte « Elle ne confirme pas ? » ; passe seule à E-59 |
| Fait, sans app       | « Retrait fait. Donne {montant} F. »         | `Amount` 34 ; « Elle les compte devant toi. » ; Espèces reçues · En attente (« Avec le code de réception ») ; consigne « Quand elle a compté, envoie-lui le code de réception. » | principal « Envoyer le code de réception » (→ SMS → E-57 réception)                |
| En attente / inconnu | « On vérifie le retrait. »                   | **« Ne donne pas encore les espèces. »**                                                                                                                                         | passe à Fait ou Échoué                                                             |
| Échoué               | « Retrait pas fait. »                        | **« Ne donne rien. »**                                                                                                                                                           | « Terminé »                                                                        |
| Remise contestée     | « Fatou dit ne pas avoir reçu les espèces. » | « L’assistance va vérifier. »                                                                                                                                                    | « Terminé » ; « Contacter l’aide »                                                 |

- Feuille « Elle ne confirme pas ? » : « Elle confirme sur son téléphone quand elle a compté. » ; « Ne refais pas le retrait. » ; « L’assistance peut recueillir sa confirmation. » ; « Contacter l’aide ».
- Sans app, SMS de réception non reçu : feuille « Renvoyer le SMS » / « Contacter l’aide ».
- Interdits : **aucun bouton « Espèces remises »** ; la déclaration de l'agente ne clôt jamais le retrait ; pas de nouveau retrait pour la même remise. **Accès suspendu : dépendant du lot G.**

#### E-65, E-66, E-67 — Retrait Mobile Money préparé

- **E-65 « Sur quel Mobile Money ? »** : en tête « Vers son numéro vérifié » · « 07 •• •• •• 56 » (non modifiable) ; lignes d'opérateurs disponibles pour ce numéro (logo, nom, chevron) ; indisponible : ligne désactivée, raison « {opérateur} est indisponible pour l’instant. » ; aucun : retour à E-61 avec la ligne désactivée.
- **E-66 « Combien elle reçoit ? »** : `AmountField` « Elle reçoit » ; aide « Sur son {opérateur}. Tu ne vois pas son solde. » ; montant refusé (raison dite à la cliente) : erreur « Montant pas possible. » ; ni solde, ni « Tout son solde ».
- **E-67 « Vérifie le retrait Mobile Money »** : « Elle reçoit » + montant + « Modifier » ; Vers « Son numéro » « 07 •• •• •• 56 · {opérateur} » ; « Frais » ; consignes « Elle confirme avec son PIN. Ne regarde pas son écran. » / « Elle reçoit un SMS avec un code. » ; principal « Envoyer à son téléphone » (→ E-56 → E-59) / « Envoyer le code par SMS » (→ E-57 → E-59) ; frais inconnus (envoi désactivé).
- Cas : changement d'opérateur, de montant ou de conditions après l'envoi = nouvelle autorisation ; aucun code de réception ; aucun mouvement sur les fonds de l'agente.

#### E-68 — Accompagnement

- Structure : `PageHeader` (←, « Accompagnement ») ; `StatusPill` du statut (« Pas demandé » neutre, « En attente » ambre, « Accepté » fait, « Refusé » neutre, « Retiré par la cliente » neutre) ; « Avec son accord, tu pourras : » « l’aider à créer une épargne ; » « demander à voir le point d’une épargne. » ; « Tu ne verras jamais son solde ni son PIN. » ; principal « Envoyer la demande » (app) / « Envoyer le code par SMS » (sans app) quand le statut est « Pas demandé » ou « Retiré par la cliente ».
- États : **En attente** : pas de bouton, « Aucune relance automatique. Elle répond quand elle veut. » ; **Refusé** : pas de principal, « Elle a refusé. Redemande seulement si elle te le dit. » + bouton texte « Elle a changé d’avis ? Redemander » (nouvelle demande) ; **Accepté** : lignes « Point de ses épargnes › » et (sans app) « Créer une épargne pour elle › » ; hors connexion.
- Interdits : jamais un accord déduit du silence ; un dépôt ou un retrait ne crée jamais d'accompagnement.

#### E-69 — Point de ses épargnes

- Structure : `PageHeader` (←, « Point de ses épargnes ») ; si l'accompagnement n'est pas accepté : `Message` info « Elle doit d’abord accepter ton accompagnement. » + ligne « Accompagnement › » (→ E-68) ; `SectionHeader` « Tu peux voir » : une ligne par épargne autorisée (illustration, nom, sub « Voir et envoyer son point », → E-70) ; demande en attente : « Une demande attend sa réponse. » ; rappel « Tu ne vois que les épargnes qu’elle choisit. » ; principal « Demander à voir un point » (app : → E-56 « Fatou choisit les épargnes. » ; sans app : code des noms → « Choisis l’épargne avec elle » / « Noms seulement, pour cette demande. Aucun montant. » → « Code du point »).
- États : aucune autorisée « Aucune épargne pour l’instant. » ; en attente ; refusée (aucune relance) ; permission retirée (l'épargne disparaît) ; hors connexion (raison « Demander demande la connexion. »).
- Interdit : le nom d'une épargne non autorisée n'est jamais affiché (hors choix sans app, sous accord de noms pour cette demande).

#### E-70 — Point d'{épargne}

- Structure : `PageHeader` (←, « Point d’{épargne} ») ; `Statement` agente : « Point · {épargne} », « Au {date} à {HH:MM} », Total épargné, Cible, versements confirmés avec accords et retours au solde, « Envoyé à : 07 •• •• •• 56 (son numéro vérifié) » ; principal « Envoyer le point à Fatou par SMS ».
- États : permission contrôlée **à chaque ouverture et à chaque envoi** (retirée : `Message` « Fatou a retiré ton accès à ce point. », rien d'affiché ; raison du bouton « Tu n’as plus accès à ce point. ») ; envoi ; envoyé `Message` info « Point envoyé par SMS. » ; envoi non abouti `Message` erreur « Envoi non abouti. » / « Le même point sera renvoyé. » + « Renvoyer ce point » (même point daté, permission revérifiée) ; hors connexion « Cet écran a besoin d’internet. Réessaie plus tard. ».
- Interdits : **aucun champ destinataire, aucun partage vers une autre application** ; pas d'impression ; aucune donnée du point gardée hors ligne sur le téléphone de l'agente (G02).

#### E-71 — Créer une épargne pour elle (4 étapes)

- Compositions de B · B02 à B · B05, au « elle » : « Quel projet ? » (« Type d’épargne », « Elle lui donnera un nom plus loin. ») ; « Combien elle veut mettre de côté ? » (« Montant de son objectif », vide : « Écris l’objectif qu’elle te dit. ») ; « Pour quand ? » (`DateChoice` + « Pas de date pour l’instant », **sans date personnalisée** ; vide : « Choisis une durée, ou continue sans date. ») ; « Comment elle l’appelle ? » (nom prérempli avec le type). « Étape n sur 5 » (la 5e est E-72) ; rappel « Pour {cliente complète} ».
- États : accompagnement non accepté : entrée absente de E-53 ; **accord retiré pendant la saisie** : « Fatou a retiré ton accompagnement. » et sortie (« Revenir à sa fiche ») ; **limite** : « Elle ne peut pas créer d’autre épargne pour l’instant. » (aucun nombre, aucun nom, aucun montant, aucune fermeture proposée) ; hors connexion (saisie gardée).

#### E-72 — Vérifie l'épargne avec elle

- Structure : `PageHeader` (←, « Vérifie l’épargne avec elle », « Étape 5 sur 5 ») ; `SummaryPreview` (B · B06) : nom, type, objectif, « 0 F pour l’instant », date ou « Pas de date » ; « Modifier » par ligne ; « Aucun argent ne bouge. » ; « Elle confirme avec un code SMS. » ; principal « Envoyer le code par SMS » (→ E-57 « Code de création » → E-59) ; bouton texte « Annuler ».
- États : envoi ; échec « Pas envoyé. » ; demande annulée par retrait de l'accompagnement ; hors connexion.

### Écrans des autres lots, contenu espèces

- **A · Q01 Mon QR** : une demande d'agente reçue pendant l'affichage **ouvre seule** E-01, E-06 ou E-11 ; la luminosité revient au réglage de Fatou. Rendu de Q01 inchangé. Depuis C-17 et D-06, « Afficher Mon QR » mène à Mon QR puis à la demande.
- **A · H01 Accueil** : `InfoLine` **« {agente} attend ta réponse › »** tant qu'une demande (dépôt, retrait, Mobile Money, accompagnement, point) attend ; elle prend la place de « Ton identité est en vérification. » (une seule `InfoLine` par écran) et ouvre la demande. Après un refus (E-12, E-13) : `Message` « Tu as refusé. {agente} ne peut pas t’accompagner. ». Carte solde : « Dépôt en attente » (lot C) pendant E-03 ; « Retrait en attente · − {montant pris} » (lot D) tant que le retrait n'est pas confirmé.
- **B · B07** : bouton texte « Mon carnet › » au-dessus de « Derniers mouvements » → E-17.
- **C-08** : reprise d'une mise de côté pas faite depuis E-04 « Réessayer de mettre de côté » (aucun nouveau dépôt, aucune espèce).
- **C-11 Opérations** : « Dépôt en espèces » · « Avec {agente} · Sur ton solde » · « + {montant} F » ; dépôt vers une épargne : une ligne « Dépôt vers {épargne} » · « En espèces avec {agente} » (statut combiné du lot C) ; « Retrait en espèces » · « Avec {agente} » · « − {montant} F » (signe seulement si fait) + note **« Espèces en attente »** tant que la remise n'est pas confirmée (« Espèces non reçues : on vérifie. » si contestée) ; demande annulée : montant sans signe, croix + « Annulé ». Filtres Dépôts, Retraits, Épargnes les incluent.
- **C-12 Détail** : flux « Tes espèces » → Mon solde / {épargne}, ou Mon solde → « En espèces » ; lignes « Avec » ({agente complète}, {code agente}), « Demande n° », « Confirmé par toi · {HH:MM} », « Espèces reçues par {agente} · {HH:MM} » (dépôt), « Référence(s) » (dépôt et mise de côté distinctes), « Frais » ou « Pris sur ton solde » (valeurs réelles). Retrait : `StatusRows` Retrait · Fait / Espèces reçues · En attente + horloge, note « Tu confirmes quand tu as compté. » sous le montant, principal **« J’ai reçu mes espèces »** tant que la remise est en attente ; « Signaler un problème » en bouton texte. Annulé : « Awa a annulé le dépôt. », sans référence d'opération.
- **C-13 Reçu** : dépôt ou retrait **fait** seulement : montant, date, agente, référence, statut ; retrait : ligne « Espèces reçues : confirmé par toi » ou « en attente » ; frais et montant pris **réels** (note PO 4).
- **C-14** : motif présélectionné « J’ai remis les espèces » (dépôt) ou « Espèces non reçues » (retrait) en tête des motifs G03 ; demande ou opération reprise sans ressaisie ; l'envoi de « Espèces non reçues » passe la remise à « Contestée ».
- **D-04, D-05** depuis E-11 : voir E-11.
- **Profil (lot F)** : ligne « Mon accompagnement » → E-14 (rien n'est dessiné ; « Bientôt ici »).

## Règles transverses

### Cinq statuts qui ne se mélangent jamais

- **Demande** : envoyée, confirmée, refusée, annulée, expirée. **Financier** : fait, en attente, échoué (« Fait » seulement après confirmation). **Remise** des espèces : en attente, reçues, contestée. **Signalement** : Envoyé, En cours, Résolu. **Envoi d'un SMS ou d'un point** : envoyé, non abouti. Chaque écran dit lequel il montre ; un statut d'envoi de SMS n'est jamais un statut financier.
- En attente : ambre + horloge, jamais de reçu ni de célébration ; refus volontaire : neutre ; échec : rouge + croix ; aucune illustration de résultat au lot E.

### Espèces et secrets

- Les espèces changent de main **seulement** : dépôt, après la confirmation de la cliente et avant « Confirmer les espèces reçues » ; retrait, après le résultat financier confirmé. Hors connexion, les espèces ne changent jamais de main.
- Aucun champ PIN dans l'app agente ; PIN de la cliente sur E-07 et D-04 seulement ; code ponctuel saisi par l'agente, **dit** par la cliente après lecture, dans un champ propre à la demande ; un code n'est jamais réutilisable pour une autre demande ou une autre finalité.

### Vie privée face à l'agente

- L'agente ne voit ni solde, ni montant d'épargne, ni opération ; numéro toujours masqué ; refus liés à l'argent dits à la cliente seule (app ou SMS) ; « Fonds insuffisants » sans le montant des fonds de l'agente ; noms d'épargnes seulement sous accord de noms (ce dépôt) ou permission de point (cette épargne).

### Frais (G01)

- Lus dans la configuration du partenaire, renvoyés par le serveur avec le récapitulatif. **Frais inconnus = autorisation bloquée** (E-01, E-06, E-11, E-55, E-63, E-67), côté app et serveur. Aucun taux, aucun frais par défaut dans le code. En production, aucune ligne « à confirmer ».

### Formats (PRODUCT.md)

- Montants entiers FCFA, espace insécable des milliers, « {n} FCFA » dans les montants dominants, « {n} F » dans les lignes ; `formatAmount` partagé ; backend `Money` en centimes, jamais de `float`.
- Numéro : « 07 08 12 34 56 » en entier côté cliente ; « 07 •• •• •• 56 » côté agente, toujours. Dates : « 21 oct. 2026 », « 21 oct. · 10:45 » en ligne, « Au 21 oct. 2026 à 10:45 » sur un relevé. Espace insécable avant « ? », « ! », « : ». Apostrophe ’ et élision « d’{épargne} ».

### Masquage

- Réglage unique des lots A à D. **Toujours visibles** : demandes (E-01, E-06, E-11), PIN, résultats, relevé E-18 (PO-6), toute l'app agente (aucun solde). Masqués selon le réglage : carte solde, lignes d'Opérations, détail, reçu, carnet E-17.

### Navigation et pile

- App cliente : E-01 → E-03 → E-04 et E-06 → E-07 → E-08 → E-09 forment une pile ; après l'envoi, la pile est vidée : résultat → accueil. Feuilles E-02, E-05, E-10, E-19 et dialogue E-16 : retour Android = fermer.
- App agente : E-51 → E-53 → … ; après l'envoi d'une demande, l'agente ne revient pas modifier en silence (« Modifier » passe par l'annulation ou une nouvelle demande) ; E-58 sans retour ; résultat → E-51.

### Réseau, idempotence, concurrence

- **Pas de file hors ligne.** Toute demande, confirmation, code ou lancement exige le réseau ; la saisie est gardée, rien n'est envoyé en silence.
- **Une clé d'idempotence par demande et par lancement** (#67) : double appui sur « Envoyer », « Je confirme », « Confirmer les espèces reçues », « J’ai reçu mes espèces », « Valider le code » = un seul effet. Une confirmation rejouée ou tardive ne produit jamais un second mouvement.
- Montant ou destination modifiés = **nouvelle demande**, nouvelle confirmation ; l'ancienne ne compte plus. Confirmation expirée = nouvelle confirmation, sans mouvement.
- Résultat inconnu = « En attente » interrogeable, **ni annulation, ni nouveau dépôt ou retrait** ; aucun remboursement automatique tant qu'un crédit reste possible.
- Au retour au premier plan ou au relancement, chaque app interroge la demande en cours (même référence) ; aucune nouvelle demande.
- Le serveur fait foi pour : identité de la cliente, statut de l'accès à l'app, fonds suffisants (sans montant), règles du compte (refus sans valeur chiffrée), frais, statuts, permissions.

### Backend

- **Agents** — demande (préparée par l'agente, statuts, expiration, annulation avant lancement seulement), contrôle des fonds de l'agente (oui / non, jamais le montant) puis **recontrôle au lancement** ; `CashInOperation` lancée par « Confirmer les espèces reçues » après une confirmation valide ; `CashOutOperation` autorisée par le PIN ou le code du retrait ; remise (en attente, reçues, contestée) ; accompagnement ; événements `CashInCompleted`, `CashOutCompleted` (à compléter : demande et remise, `domain-modeling`).
- **Savings** — dépôt crédité au solde disponible puis **affectation liée** si une épargne est choisie (l'échec de l'affectation ne rend pas le dépôt échoué ; reprise C-P4) ; retrait débité du solde disponible (moment du débit : G01) ; écritures équilibrées entre le solde de la cliente et les fonds de l'agente (atomicité, G01) ; carnet = versements confirmés et retours au solde d'une épargne, avec les accords réels ; relevé daté (même point renvoyé, nouveau point = nouvelle date) ; création d'épargne assistée (limite de 3, aucun argent).
- **Payments** — retrait Mobile Money préparé : celui du lot D (numéro vérifié, frais confirmés, `IdempotencyKey`), avec l'agente qui l'a préparé.
- **IAM** — PIN KOTIZ (E-07, D-04) ; permissions (accompagnement, permission de point par épargne, accord de noms par dépôt) contrôlées à chaque usage ; codes ponctuels (G02) liés à une demande et une finalité ; authentification de l'agente (ADR-0021).
- **Notifications** — demandes en direct vers l'app cliente (H2) ; SMS du lot E (brouillons de la spec, § SMS, contenu G02 et G04) ; statut d'envoi distinct.
- **Assistance** (ADR-0020) — motifs espèces (G03) ; « Espèces non reçues » passe la remise à « Contestée » ; aucun mouvement d'argent.

### Accessibilité

- Cibles ≥ 48 (lignes de choix ≥ 64 ; carte entière de `CheckOption`) ; texte essentiel ≥ 14 (dates du carnet à 12, permis) ; titre de chaque écran annoncé `header` ; résultats en zone de statut (`polite`, `assertive` pour échec et annulé ; `polite` pour un refus neutre) ; erreurs `alert`.
- Noms accessibles : « Agente KOTIZ {agente complète}, code {code agente} », flux « De tes espèces vers {destination} », « De Mon solde vers tes espèces, avec {agente} », « Retirer le point d’{épargne} », « J’ai reçu mes espèces » avec l'aide « Appuie quand tu as compté tes espèces. », squelettes « Chargement de tes épargnes », « Chargement du carnet », « Préparation de ton point », « Montant masqué ».
- Bouton désactivé : raison lue et reliée au bouton. Statut jamais porté par la couleur seule. Illustrations et logos décoratifs. Grand texte : noms, consignes et lignes passent à la ligne ; montant à 34 garde sa taille.

### Animations

- Apparition d'un résultat et passage d'un état d'attente à un résultat (E-03 → E-04, E-08, E-56, E-64) : fondu ≤ 200 ms, sans célébration ; 0 ms en « réduire les animations ».

## Cas limites

- **Montants** : 7 chiffres à 320 ; montant corrigé après comptage (nouvelle confirmation) ; montant hors règles (raison générique, G01).
- **Concurrence** : deux demandes de deux agentes en même temps (deux écrans, deux références) ; l'agente annule pendant que la cliente confirme (la cliente voit « Annulé ») ; confirmation qui expire pendant le comptage ; fonds de l'agente qui baissent entre le contrôle et le lancement ; épargne fermée entre la demande et la confirmation ; accompagnement retiré pendant une création, une demande de point ou la consultation d'un point.
- **Double soumission** : chaque bouton qui engage (voir Réseau) ; code validé deux fois ; « J’ai reçu mes espèces » deux fois.
- **Interruption** : app cliente fermée sur E-01, E-03, E-06, E-08 ; app agente fermée sur E-56, E-57, E-58, E-64 : reprise de la même demande.
- **Hors ligne** : à chaque étape, rien n'est envoyé, espèces gardées ; perte de réseau après le lancement (« En cours de vérification »).
- **Sans smartphone** : SMS non reçu, code expiré, code bloqué, code d'une autre demande, cliente qui active son app pendant une création assistée (E-15).
- **Agente** : partie avant la fin (C-12 → C-14) ; accès suspendu (lot G) ; agente désactivée par KOTIZ (E-14, à dessiner).
- **Session expirée** côté cliente : retour à A · C01 ; une demande déjà confirmée n'est jamais reconfirmée en silence. Côté agente : connexion du lot G, puis reprise de l'étape (H12 du lot G).
- **Permissions** : caméra refusée (E-51 → E-52) ; permission de point retirée entre l'ouverture et l'envoi (E-70).

## Critères d'acceptation

Chaque groupe peut devenir un ticket ; le rattachement aux issues est dans [issues-lot-e.md](issues-lot-e.md), les scénarios dans [gherkin-lot-e.md](gherkin-lot-e.md).

### Socle lot E — composants

- [ ] `AgentIdentity` (bloc et compact) affiche nom et code de l'agente, sans action ; nom long sur deux lignes.
- [ ] `OneTimeCodeField` : libellé = finalité, chiffres visibles, aide « Ce n’est jamais son PIN. », états incorrect, expiré, bloqué, renvoyé ; longueur lue en configuration ; ne ressemble pas à `PinSlots`.
- [ ] `QrScanner` : viseur, lecture, caméra refusée, QR invalide, compte non servi, hors connexion ; recherche par numéro toujours proposée.
- [ ] `Statement` : relevé daté toujours en clair, totaux, versements confirmés et retours au solde, pied cliente ou agente.
- [ ] `ResultScreen` `neutral` (pastille grise, trait, pill neutre, annonce `polite`) ; `PinScreen` garde l'avertissement en saisie, erreur, envoi et hors connexion ; `StatusRows` (Dépôt / Dans {épargne} ; Retrait / Espèces reçues, jamais « À confirmer »).
- [ ] Aucun frais, plafond, minimum, durée, longueur de code, nombre d'essais, motif ni contact écrit en dur ; aucune ligne « à confirmer » en production.

### App cliente — dépôt en espèces (E-01 à E-05)

- [ ] Une demande reçue pendant Mon QR ouvre seule E-01 ; fermée sans réponse, elle reste en attente et l'accueil affiche « {agente} attend ta réponse › ».
- [ ] E-01 montre l'agente, « Tu donnes » + montant, « Ne donne pas encore les espèces. », le trajet, la demande ; « Je confirme » sans PIN ; « Ce n’est pas le bon montant » refuse (E-04 neutre) ; aucun solde affiché.
- [ ] La destination se choisit dans l'app (E-02, épargnes actives sans montant) ; une épargne fermée entre-temps repasse sur « Mon solde » avec un message.
- [ ] Frais inconnus : « Je confirme » désactivé avec sa raison, aucune confirmation envoyée.
- [ ] E-03 dit « Donne les espèces à Awa. », étapes « Confirmé / En attente / Pas encore », avance seul ; confirmation plus valable : neutre, « Confirme à nouveau. », « Confirmer à nouveau ».
- [ ] E-04 : neuf variantes conformes au tableau ; « Fait » seulement après confirmation ; « Réessayer de mettre de côté » ouvre la reprise sans nouveau dépôt ; aucun « Réessayer le dépôt », jamais « Remboursé ».
- [ ] « J’ai donné les espèces » / « Tu n’as pas récupéré tes espèces ? » ouvrent E-05 puis le signalement « J’ai remis les espèces », sans mouvement.

### App cliente — retrait en espèces (E-06 à E-10)

- [ ] E-06 : « Tu reçois en espèces », « Prends les espèces seulement quand c’est fait. », frais et montant pris réels, « L’argent sort : tu confirmes avec ton PIN KOTIZ. » ; refus avant le PIN (trois raisons et leurs gestes), frais inconnus, annulée, montant changé, hors connexion.
- [ ] E-07 garde l'avertissement dans tous les états de saisie ; aucun nombre d'essais ni durée ; PIN jamais affiché ni gardé.
- [ ] E-08 : « J’ai reçu mes espèces » seulement en « Fait » ; en attente « Ne prends pas encore les espèces. » ; échoué « Rien n’a été pris sur ton solde. » et « Awa ne te donne rien. ».
- [ ] E-09 après « J’ai reçu mes espèces » (idempotent) ; montant pris réel ; « Voir le reçu ».
- [ ] « Je n’ai pas reçu mes espèces » → E-10 → signalement « Espèces non reçues » → remise « Contestée », visible chez l'agente ; aucun nouveau retrait proposé.

### App cliente — retrait Mobile Money préparé (E-11)

- [ ] E-11 : préparé avec l'agente, numéro vérifié non modifiable, « Je ne veux pas ce retrait » ; refus avant le PIN (trois variantes), frais inconnus, opérateur indisponible ; puis D-04 et D-05 du lot D, sans compteur ; aucun « J’ai reçu ».

### App cliente — accompagnement et permissions (E-12 à E-16)

- [ ] E-12 dit ce que l'agente peut et ne peut pas faire ; Accepter → E-15 « Awa t’accompagne. » ; Refuser → accueil + message ; silence = aucun droit.
- [ ] E-13 : aucune épargne cochée au départ, « Autoriser » puis « Autoriser pour N épargne(s) », raison seulement quand le bouton est désactivé ; une nouvelle épargne n'est jamais ajoutée seule.
- [ ] E-14 et E-15 listent les agentes, leurs permissions, les demandes à répondre ; « Retirer » une permission garde l'accompagnement ; « Retirer Awa » retire ses permissions et annule une création en attente ; « Les points déjà envoyés restent envoyés. ».

### App cliente — carnet et relevé (E-17 à E-19)

- [ ] « Mon carnet › » de B · B07 ouvre E-17 : versements confirmés seulement, accords réels en note, retours au solde en −, mouvement en attente signalé à part, masquage du réglage.
- [ ] E-18 : relevé daté toujours en clair ; « Renvoyer ce point » renvoie le même point.
- [ ] E-19 : résumé SMS sur le numéro vérifié, partage par la feuille du téléphone sans aucun statut.

### App agente — identification (E-51 à E-53)

- [ ] Scan d'un QR KOTIZ ou recherche par numéro ; caméra refusée, QR invalide, compte non servi (« Contacter l’aide »), introuvable (« Créer sa fiche ») ; E-53 sans solde, ni épargne, ni opération ; « Créer une épargne pour elle » seulement sans accès à l'app.

### App agente — dépôt (E-54 à E-60)

- [ ] Fonds insuffisants : arrêt avant toute demande, sans montant des fonds ; recontrôle au lancement.
- [ ] Avec app : « Envoyer à son téléphone », E-56 « Fatou confirme sur son téléphone. » ; sans app : destination « Son compte KOTIZ » ou une épargne après accord de noms, « Code du dépôt ».
- [ ] E-58 n'apparaît qu'après une confirmation valide ; « Confirmer les espèces reçues » lance le dépôt une seule fois ; confirmation plus valable : « Redemande sa confirmation. », rien n'est lancé ; montant différent : nouvelle confirmation.
- [ ] E-59 : dix variantes conformes au tableau ; « Rends les {montant} F à Fatou. » quand le dépôt n'est pas fait.
- [ ] E-60 : annulation avant le lancement seulement, demande gardée, SMS à la cliente, message sur E-53.
- [ ] E-56 propose « Elle n’a pas internet ? Envoyer le code par SMS » (même demande) et « Annuler la demande » pour toutes les variantes ; refus neutre ; sans réponse : « Renvoyer la demande ».

### App agente — retrait (E-61 à E-67)

- [ ] E-62 exige « J’ai {montant} en espèces sur moi. » ; aucun « Tout son solde ».
- [ ] E-63 : refus « Ce retrait n’est pas possible pour cette cliente. » sans raison détaillée.
- [ ] E-64 : « Donne {montant} F » + montant 34 seulement après le résultat confirmé ; en attente « Ne donne pas encore les espèces. » ; échoué « Ne donne rien. » ; avec app aucun bouton principal ; sans app « Envoyer le code de réception » ; contestée visible ; aucun « Espèces remises ».
- [ ] E-65 à E-67 : numéro vérifié masqué non modifiable, aucun solde, « Fatou confirme avec son PIN. » ; E-59 Mobile Money « Aucune espèce à donner. ».

### App agente — codes ponctuels (E-57)

- [ ] Huit finalités, chacune son titre ; un code d'une autre finalité ou demande est refusé ; incorrect, expiré (« Renvoyer le SMS » principal), bloqué (« Valider le code » désactivé + « Contacter l’aide »), SMS renvoyé ; aucune longueur, durée ni nombre d'essais affichés.

### App agente — accompagnement, point, création (E-68 à E-72)

- [ ] E-68 : statuts, aucune relance automatique, « Elle a changé d’avis ? Redemander » après un refus seulement.
- [ ] E-69 et E-70 : seulement les épargnes autorisées ; permission revérifiée à chaque ouverture et envoi ; envoi par SMS vers le numéro vérifié seulement, renvoi du même point.
- [ ] E-71 et E-72 : accompagnement requis, cliente sans app, limite sans nombre, code de création, aucun argent ne bouge ; demande annulée si l'accompagnement est retiré.

### Raccords et backend

- [ ] Opérations, détail et reçu affichent les opérations en espèces (une ligne par opération, « Espèces en attente », « Annulé », « J’ai reçu mes espèces » sur le détail), avec les montants réels.
- [ ] Une demande n'est jamais dupliquée (clé par demande et par lancement) ; un résultat inconnu reste interrogeable ; aucune remise ni débit en double.
- [ ] Le serveur refuse : une confirmation expirée, un code d'une autre demande ou finalité, un lancement sans confirmation valide, des frais inconnus, une consultation de point sans permission, une création sans accompagnement.
