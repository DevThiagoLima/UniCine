import { ReservaTemporaria, Id } from "../entities";
import { randomUUID } from "crypto";

export class ReservaTemporariaBuilder {
  private _id: Id = randomUUID();
  private _sessaoId: Id = "";
  private _assentos: string[] = [];
  private _expiresAt = Date.now();

  id(v: Id) {
    this._id = v;
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
  expiresAt(v: number) {
    this._expiresAt = v;
    return this;
  }
  build(): ReservaTemporaria {
    return {
      id: this._id,
      sessaoId: this._sessaoId,
      assentos: this._assentos,
      expiresAt: this._expiresAt,
    };
  }
}
