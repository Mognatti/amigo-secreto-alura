import { useRecoilValue } from "recoil";
import { resultadoSorteio } from "../atom";

export const useResultadoSorteio = () => {
  return useRecoilValue(resultadoSorteio);
};
