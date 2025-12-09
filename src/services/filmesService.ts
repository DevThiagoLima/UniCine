import { Filme } from "../domain/entities";
import { FilmeBuilder } from "../domain/builders/FilmeBuilder";
import { filmes } from "../repositories/db";

export function criarFilme(data: { titulo: string; duracaoMin: number; classificacao: string }): Filme {
  const f = new FilmeBuilder()
    .titulo(data.titulo)
    .duracaoMin(data.duracaoMin)
    .classificacao(data.classificacao)
    .build();
  filmes.push(f);
  return f;
}

export function listarFilmes(): Filme[] {
  return filmes;
}
