import { Request, Response } from "express";
import { emitirIngresso, listarIngressos } from "../services/ingressosService";
import { isValidCPF } from "../utils/validators";

export function listIngressos(req: Request, res: Response) {
  res.json(listarIngressos());
}

export function createIngresso(req: Request, res: Response) {
  const { clienteNome, cpf, email, sessaoId, assentos, reservaTemporariaId } = req.body || {};
  if (!clienteNome || !cpf || !email || !sessaoId || !Array.isArray(assentos) || assentos.length === 0)
    return res.status(400).json({ error: "dados_invalidos" });
  if (!isValidCPF(cpf)) return res.status(400).json({ error: "cpf_invalido" });
  try {
    const ing = emitirIngresso({ clienteNome, cpf, email, sessaoId, assentos, reservaTemporariaId });
    res.status(201).json(ing);
  } catch (e: any) {
    res.status(409).json({ error: e.message || "erro" });
  }
}
