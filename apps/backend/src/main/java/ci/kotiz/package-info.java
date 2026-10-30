/**
 * Point d'entrée du monolithe modulaire KOTIZ.
 *
 * <p>Chaque sous-package direct est un module Spring Modulith correspondant à un contexte actif de
 * {@code CONTEXT-MAP.md}. Un module n'expose aux autres que son package {@code api} nommé ; son
 * implémentation reste sous {@code internal}. Aucun contexte différé ou retiré n'est initialisé.
 */
package ci.kotiz;
