import shuffle from "just-shuffle";

export function realizarSorteio(lista: string[]) {
  const listaRandomizada = shuffle(lista);
  const tamanhoLista = lista.length;
  const resultado = new Map<string, string>();

  for (let index = 0; index < tamanhoLista; index++) {
    const indexSorteado = index === tamanhoLista - 1 ? 0 : index + 1;
    resultado.set(listaRandomizada[index], listaRandomizada[indexSorteado]);
  }
  return resultado;
}
