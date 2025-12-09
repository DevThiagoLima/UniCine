import { Ingresso, Id } from "../entities";
import { randomUUID } from "crypto";

export class IngressoBuilder {
  private _id: Id = randomUUID();
  private _clienteNome = "";
  private _cpf = "";
  private _email = "";
  private _sessaoId: Id = "";
  private _assentos: string[] = [];

  id(v: Id) {
    this._id = v;
    return this;
  }
  clienteNome(v: string) {
    this._clienteNome = v;
    return this;
  }
  cpf(v: string) {
    this._cpf = v;
    return this;
  }
  email(v: string) {
    this._email = v;
    return this;
  }
  sessaoId(v: Id) {
    this._sessaoId = v;
    return this;
  }
  assentos(v: string[]) {
    this._assentos = [...v];
    return this;
  }
  build(): Ingresso {
    return {
      id: this._id,
      clienteNome: this._clienteNome,
      cpf: this._cpf,
      email: this._email,
      sessaoId: this._sessaoId,
      assentos: this._assentos,
    };
  }
}
