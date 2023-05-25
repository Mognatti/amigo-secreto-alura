import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useState } from "react";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";
import Card from "../componentes/Card";
import "./Sorteio.css";

export default function Sorteio() {
  const participantes = useListaDeParticipantes();
  const [participanteDaVez, setParticipanteDaVez] = useState<string>("");
  const [amigoSecreto, setAmigoSecreto] = useState<string>();
  const resultado = useResultadoSorteio();

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAmigoSecreto(resultado.get(participanteDaVez));
    setTimeout(() => {
      setAmigoSecreto("");
    }, 5000);
  };
  return (
    <Card>
      <section className="sorteio">
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={enviar}>
          <select
            required
            name="participantesDaVez"
            id="participantesDaVez"
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={(e) => setParticipanteDaVez(e.target.value)}
          >
            <option key={"start"}>Selecione seu nome</option>
            {participantes.map((participante) => (
              <option key={participante}>{participante}</option>
            ))}
          </select>
          <p>Clique em sortear para ver quem é seu amigo secreto! </p>
          <p>O nome dele irá sumir depois de 5 segundos!</p>
          <button className="botao-sortear">Sortear</button>
        </form>

        <p className="resultado" role="alert">
          {amigoSecreto}
        </p>

        <footer className="sorteio">
          <img
            src="/imagens/aviao.png"
            className="aviao"
            alt="Um desenho de um avião de papel"
          />
        </footer>
      </section>
    </Card>
  );
}
