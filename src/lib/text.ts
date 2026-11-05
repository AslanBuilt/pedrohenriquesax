/** Prende as últimas palavras umas às outras: a última linha nunca fica com uma palavra só. */
export function semViuva(texto: string, palavras = 3) {
  const partes = texto.trim().split(/\s+/);
  if (partes.length <= palavras) return partes.join(" ");
  return `${partes.slice(0, -palavras).join(" ")} ${partes.slice(-palavras).join(" ")}`;
}
