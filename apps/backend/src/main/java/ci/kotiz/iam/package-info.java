/**
 * Contexte IAM : identité, accès et profils des acteurs (voir {@code apps/backend/iam/CONTEXT.md}).
 *
 * <p>Module de référence de la structure Spring Modulith. Il ne porte encore aucune règle métier :
 * le premier comportement arrive avec l'ouverture de compte (D03).
 */
@ApplicationModule(displayName = "IAM")
package ci.kotiz.iam;

import org.springframework.modulith.ApplicationModule;
