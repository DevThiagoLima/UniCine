import { AssentoSessao, Sessao } from "../domain/entities";
import { SessaoBuilder } from "../domain/builders/SessaoBuilder";
import { assentosSessao, salas, sessoes } from "../repositories/db";
import { AssentoSessaoBuilder } from "../domain/builders/AssentoSessaoBuilder";

function gerarCodigoAssento(index: number): string {
  const row = Math.floor(index / 10);
  const col = index % 10;
  const letra = String.fromCharCode(65 + row);
  return `${letra}${col + 1}`;
}

export function criarSessao(data: { filmeId: string; salaId: string; data: string; horario: string }): { sessao: Sessao; assentos: AssentoSessao[] } {
  const s = new SessaoBuilder().filmeId(data.filmeId).salaId(data.salaId).data(data.data).horario(data.horario).build();
  sessoes.push(s);
  const sala = salas.find((x) => x.id === data.salaId);
  const capacidade = sala ? sala.capacidade : 0;
  const gerados: AssentoSessao[] = [];
  for (let i = 0; i < capacidade; i++) {
    const a = new AssentoSessaoBuilder().sessaoId(s.id).assento(gerarCodigoAssento(i)).reservado(false).build();
    assentosSessao.push(a);
    gerados.push(a);
  }
  return { sessao: s, assentos: gerados };
}

export function listarSessoes(): Sessao[] {
  return sessoes;
}

export function listarAssentosSessao(sessaoId: string): AssentoSessao[] {
  return assentosSessao.filter((a) => a.sessaoId === sessaoId);
}
