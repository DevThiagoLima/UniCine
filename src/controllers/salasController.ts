import { Request, Response } from "express";
import { criarSala, listarSalas } from "../services/salasService";

export function listSalas(req: Request, res: Response) {
  res.json(listarSalas());
}

export function createSala(req: Request, res: Response) {
  const { nome, capacidade } = req.body || {};
  if (!nome || !capacidade) return res.status(400).json({ error: "dados_invalidos" });
  const sala = criarSala({ nome, capacidade: Number(capacidade) });
  res.status(201).json(sala);
}
