/* Il permet de combiner proprement plusieurs classes CSS. */
// "export" permet d'utiliser cette fonction dans d'autres fichiers.
export function cx(
  // "...classes" récupère tous les arguments dans un tableau.
  // Chaque valeur peut être une chaîne, false, null ou undefined.
  ...classes: Array<string | false | null | undefined>
): string {
  // filter(Boolean) supprime false, null, undefined et les chaînes vides.
  // join(" ") rassemble les classes restantes avec un espace.
  return classes.filter(Boolean).join(" ");
}
