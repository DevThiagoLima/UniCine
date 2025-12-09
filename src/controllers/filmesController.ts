import { Request, Response } from "express";
import { criarFilme, listarFilmes } from "../services/filmesService";

export function listFilmes(req: Request, res: Response) {
  res.json(listarFilmes());
}

export function createFilme(req: Request, res: Response) {
  const { titulo, duracaoMin, classificacao } = req.body || {};
  if (!titulo || !duracaoMin || !classificacao) return res.status(400).json({ error: "dados_invalidos" });
  const filme = criarFilme({ titulo, duracaoMin: Number(duracaoMin), classificacao });
  res.status(201).json(filme);
}
