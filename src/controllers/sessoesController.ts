import { Request, Response } from "express";
import { criarSessao, listarAssentosSessao, listarSessoes } from "../services/sessoesService";
import { listarReservasTemp } from "../services/reservasTempService";

export function listSessoes(req: Request, res: Response) {
  res.json(listarSessoes());
}

export function createSessao(req: Request, res: Response) {
  const { filmeId, salaId, data, horario } = req.body || {};
  if (!filmeId || !salaId || !data || !horario) return res.status(400).json({ error: "dados_invalidos" });
  const result = criarSessao({ filmeId, salaId, data, horario });
  res.status(201).json(result);
}

export function listAssentos(req: Request, res: Response) {
  const { id } = req.params;
  const assentos = listarAssentosSessao(id);
  const reservas = listarReservasTemp(id).filter((r) => r.expiresAt > Date.now());
  res.json({ assentos, reservasTemporarias: reservas });
}
