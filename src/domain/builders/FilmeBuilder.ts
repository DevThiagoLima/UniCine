import { Filme, Id } from "../entities";
import { randomUUID } from "crypto";

export class FilmeBuilder {
  private _id: Id = randomUUID();
  private _titulo = "";
  private _duracaoMin = 0;
  private _classificacao = "";

  id(v: Id) {
    this._id = v;
    return this;
  }
  titulo(v: string) {
    this._titulo = v.trim();
    return this;
  }
  duracaoMin(v: number) {
    this._duracaoMin = v;
    return this;
  }
  classificacao(v: string) {
    this._classificacao = v.trim();
    return this;
  }
  build(): Filme {
    return {
      id: this._id,
      titulo: this._titulo,
      duracaoMin: this._duracaoMin,
      classificacao: this._classificacao,
    };
  }
}
