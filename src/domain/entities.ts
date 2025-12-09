export type Id = string;

export interface Filme {
  id: Id;
  titulo: string;
  duracaoMin: number;
  classificacao: string;
}

export interface Sala {
  id: Id;
  nome: string;
  capacidade: number;
}

export interface Sessao {
  id: Id;
  filmeId: Id;
  salaId: Id;
  data: string;
  horario: string;
}

export interface AssentoSessao {
  id: Id;
  sessaoId: Id;
  assento: string;
  reservado: boolean;
}

export interface ReservaTemporaria {
  id: Id;
  sessaoId: Id;
  assentos: string[];
  expiresAt: number;
}

export interface Ingresso {
  id: Id;
  clienteNome: string;
  cpf: string;
  email: string;
  sessaoId: Id;
  assentos: string[];
}
