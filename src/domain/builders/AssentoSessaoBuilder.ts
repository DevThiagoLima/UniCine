import { AssentoSessao, Id } from "../entities";
import { randomUUID } from "crypto";

export class AssentoSessaoBuilder {
  private _id: Id = randomUUID();
  private _sessaoId: Id = "";
  private _assento = "";
  private _reservado = false;

  id(v: Id) {
    this._id = v;
    return this;
  }
  sessaoId(v: Id) {
    this._sessaoId = v;
    return this;
  }
  assento(v: string) {
    this._assento = v;
    return this;
  }
  reservado(v: boolean) {
    this._reservado = v;
    return this;
  }
  build(): AssentoSessao {
    return {
      id: this._id,
      sessaoId: this._sessaoId,
      assento: this._assento,
      reservado: this._reservado,
    };
  }
}
