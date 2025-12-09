import { Request, Response } from "express";
import { criarReservaTemp, cancelarReservaTemp, existeReservaTempParaAssentos } from "../services/reservasTempService";
import { listarAssentosSessao } from "../services/sessoesService";

export function createReservaTemporaria(req: Request, res: Response) {
  const { sessaoId, assentos } = req.body || {};
  if (!sessaoId || !Array.isArray(assentos) || assentos.length === 0)
    return res.status(400).json({ error: "dados_invalidos" });
  const assentosSessao = listarAssentosSessao(sessaoId);
  const indisponivel = assentos.some((a: string) => assentosSessao.find((x) => x.assento === a && x.reservado));
  if (indisponivel) return res.status(409).json({ error: "assento_indisponivel" });
  if (existeReservaTempParaAssentos(sessaoId, assentos)) return res.status(409).json({ error: "assento_temporariamente_reservado" });
  const r = criarReservaTemp({ sessaoId, assentos });
  res.status(201).json(r);
}

export function deleteReservaTemporaria(req: Request, res: Response) {
  const ok = cancelarReservaTemp(req.params.id);
  res.status(ok ? 204 : 404).end();
}
