import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import Sorteio from "./Sorteio";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";
import { act } from "react-dom/test-utils";

jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock("../state/hook/useResultadoSorteio", () => {
  return {
    useResultadoSorteio: jest.fn(),
  };
});

describe("Pagina sorteio", () => {
  const participantesMock = ["a", "b", "c"];
  const resultado = new Map([
    ["a", "b"],
    ["b", "c"],
    ["c", "a"],
  ]);

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantesMock);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });
  test("Todos os participantes podem exibir o seu amigo secreto", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );
    const opcoes = screen.queryAllByRole("option");
    expect(opcoes).toHaveLength(participantesMock.length + 1);
  });

  test("o amigo secreto é exibido quando solicitado", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );
    const select = screen.getByPlaceholderText("Selecione o seu nome");
    fireEvent.change(select, { target: { value: participantesMock[0] } });

    const botao = screen.getByRole("button");
    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole("alert");
    expect(amigoSecreto).not.toHaveTextContent("");
  });

  test("esconde amigo secreto após timer", () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );
    const select = screen.getByPlaceholderText("Selecione o seu nome");
    fireEvent.change(select, { target: { value: participantesMock[0] } });
    const botao = screen.getByRole("button");
    fireEvent.click(botao);

    act(() => {
      jest.runAllTimers();
    });

    const amigo = screen.getByRole("alert");
    expect(amigo).toHaveTextContent("");
  });
});
