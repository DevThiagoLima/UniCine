import { ReservaTemporaria } from "../domain/entities";
import { reservasTemp } from "../repositories/db";
import { ReservaTemporariaBuilder } from "../domain/builders/ReservaTemporariaBuilder";

const TTL_MS = 10 * 60 * 1000;

export function startCleanupJob() {
  setInterval(() => {
    const now = Date.now();
    for (let i = reservasTemp.length - 1; i >= 0; i--) {
      if (reservasTemp[i].expiresAt <= now) reservasTemp.splice(i, 1);
    }
  }, 60 * 1000);
}

export function criarReservaTemp(data: { sessaoId: string; assentos: string[] }): ReservaTemporaria {
  const r = new ReservaTemporariaBuilder()
    .sessaoId(data.sessaoId)
    .assentos(data.assentos)
    .expiresAt(Date.now() + TTL_MS)
    .build();
  reservasTemp.push(r);
  return r;
}

export function cancelarReservaTemp(id: string): boolean {
  const idx = reservasTemp.findIndex((x) => x.id === id);
  if (idx >= 0) reservasTemp.splice(idx, 1);
  return idx >= 0;
}

export function listarReservasTemp(sessaoId?: string): ReservaTemporaria[] {
  return sessaoId ? reservasTemp.filter((x) => x.sessaoId === sessaoId) : reservasTemp;
}

export function existeReservaTempParaAssentos(sessaoId: string, assentos: string[]): boolean {
  const set = new Set(assentos);
  return reservasTemp.some((r) => r.sessaoId === sessaoId && r.assentos.some((a) => set.has(a)) && r.expiresAt > Date.now());
}

export function obterReservaTemp(id: string): ReservaTemporaria | undefined {
  return reservasTemp.find((r) => r.id === id);
}
