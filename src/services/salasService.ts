import { Sala } from "../domain/entities";
import { SalaBuilder } from "../domain/builders/SalaBuilder";
import { salas } from "../repositories/db";

export function criarSala(data: { nome: string; capacidade: number }): Sala {
  const s = new SalaBuilder().nome(data.nome).capacidade(data.capacidade).build();
  salas.push(s);
  return s;
}

export function listarSalas(): Sala[] {
  return salas;
}
