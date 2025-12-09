import { Ingresso } from "../domain/entities";
import { IngressoBuilder } from "../domain/builders/IngressoBuilder";
import { assentosSessao, ingressos } from "../repositories/db";
import { existeReservaTempParaAssentos, cancelarReservaTemp, obterReservaTemp } from "./reservasTempService";

export function emitirIngresso(data: {
  clienteNome: string;
  cpf: string;
  email: string;
  sessaoId: string;
  assentos: string[];
  reservaTemporariaId?: string;
}): Ingresso {
  const ocupados = new Set(
    assentosSessao.filter((a) => a.sessaoId === data.sessaoId && a.reservado).map((a) => a.assento)
  );
  for (const a of data.assentos) if (ocupados.has(a)) throw new Error("assento_indisponivel");
  if (existeReservaTempParaAssentos(data.sessaoId, data.assentos) && !data.reservaTemporariaId)
    throw new Error("assento_temporariamente_reservado");
  if (data.reservaTemporariaId) {
    const r = obterReservaTemp(data.reservaTemporariaId);
    if (!r || r.expiresAt <= Date.now() || r.sessaoId !== data.sessaoId)
      throw new Error("reserva_temporaria_invalida");
    const set = new Set(r.assentos);
    const todasContidas = data.assentos.every((a) => set.has(a));
    if (!todasContidas) throw new Error("assentos_divergem_da_reserva");
  }
  for (const a of assentosSessao) {
    if (a.sessaoId === data.sessaoId && data.assentos.includes(a.assento)) a.reservado = true;
  }
  const ing = new IngressoBuilder()
    .clienteNome(data.clienteNome)
    .cpf(data.cpf)
    .email(data.email)
    .sessaoId(data.sessaoId)
    .assentos(data.assentos)
    .build();
  ingressos.push(ing);
  if (data.reservaTemporariaId) cancelarReservaTemp(data.reservaTemporariaId);
  return ing;
}

export function listarIngressos(): Ingresso[] {
  return ingressos;
}
