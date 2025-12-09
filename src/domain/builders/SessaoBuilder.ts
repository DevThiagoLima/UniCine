import { Sessao, Id } from "../entities";
import { randomUUID } from "crypto";

export class SessaoBuilder {
  private _id: Id = randomUUID();
  private _filmeId: Id = "";
  private _salaId: Id = "";
  private _data = "";
  private _horario = "";

  id(v: Id) {
    this._id = v;
    return this;
  }
  filmeId(v: Id) {
    this._filmeId = v;
    return this;
  }
  salaId(v: Id) {
    this._salaId = v;
    return this;
  }
  data(v: string) {
    this._data = v;
    return this;
  }
  horario(v: string) {
    this._horario = v;
    return this;
  }
  build(): Sessao {
    return {
      id: this._id,
      filmeId: this._filmeId,
      salaId: this._salaId,
      data: this._data,
      horario: this._horario,
    };
  }
}
