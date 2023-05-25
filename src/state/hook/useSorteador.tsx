import { useListaDeParticipantes } from "./useListaDeParticipantes";
import { useSetRecoilState } from "recoil";
import { resultadoSorteio } from "../atom";
import { realizarSorteio } from "../helpers/realizarSorteio";

export const useSorteador = () => {
  const setResultado = useSetRecoilState(resultadoSorteio);
  const lista = useListaDeParticipantes();

  return () => {
    const resultado = realizarSorteio(lista);
    setResultado(resultado);
  };
};
