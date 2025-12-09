import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  health() { return this.http.get(`${BASE_URL}/health`); }

  filmes = {
    list: () => this.http.get(`${BASE_URL}/filmes`),
    create: (body: { titulo: string; duracaoMin: number; classificacao: string; }) =>
      this.http.post(`${BASE_URL}/filmes`, body),
  };

  salas = {
    list: () => this.http.get(`${BASE_URL}/salas`),
    create: (body: { nome: string; capacidade: number; }) =>
      this.http.post(`${BASE_URL}/salas`, body),
  };

  sessoes = {
    list: () => this.http.get(`${BASE_URL}/sessoes`),
    create: (body: { filmeId: string; salaId: string; data: string; horario: string; }) =>
      this.http.post(`${BASE_URL}/sessoes`, body),
    assentos: (sessaoId: string) => this.http.get(`${BASE_URL}/sessoes/${sessaoId}/assentos`),
  };

  reservas = {
    create: (body: { sessaoId: string; assentos: string[]; }) =>
      this.http.post(`${BASE_URL}/reservas-temporarias`, body),
    delete: (id: string) => this.http.delete(`${BASE_URL}/reservas-temporarias/${id}`),
  };

  ingressos = {
    list: () => this.http.get(`${BASE_URL}/ingressos`),
    create: (body: { clienteNome: string; cpf: string; email: string; sessaoId: string; assentos: string[]; reservaTemporariaId?: string; }) =>
      this.http.post(`${BASE_URL}/ingressos`, body),
  };
}
