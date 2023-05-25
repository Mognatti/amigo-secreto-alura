import { realizarSorteio } from "./realizarSorteio";

describe("dado um soretio de amigo secreto", () => {
  test("cada participante não soretie o própio nome", () => {
    const participantes = ["a", "b", "c", "d", "e", "f"];
    const sorteio = realizarSorteio(participantes);
    participantes.forEach((participante) => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});
