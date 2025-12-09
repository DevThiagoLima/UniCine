import { Sala, Id } from "../entities";
import { randomUUID } from "crypto";

export class SalaBuilder {
  private _id: Id = randomUUID();
  private _nome = "";
  private _capacidade = 0;

  id(v: Id) {
    this._id = v;
    return this;
  }
  nome(v: string) {
    this._nome = v.trim();
    return this;
  }
  capacidade(v: number) {
    this._capacidade = v;
    return this;
  }
  build(): Sala {
    return { id: this._id, nome: this._nome, capacidade: this._capacidade };
  }
}
