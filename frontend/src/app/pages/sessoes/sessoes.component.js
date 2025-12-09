"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessoesComponent = void 0;
const core_1 = require("@angular/core");
const api_service_1 = require("../../services/api.service");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const card_1 = require("@angular/material/card");
const form_field_1 = require("@angular/material/form-field");
const input_1 = require("@angular/material/input");
const select_1 = require("@angular/material/select");
const button_1 = require("@angular/material/button");
const chips_1 = require("@angular/material/chips");
let SessoesComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-sessoes',
            standalone: true,
            imports: [common_1.NgFor, common_1.NgIf, forms_1.FormsModule, card_1.MatCardModule, form_field_1.MatFormFieldModule, input_1.MatInputModule, button_1.MatButtonModule, chips_1.MatChipsModule, select_1.MatSelectModule],
            template: `
    <mat-card>
      <mat-card-title>Criar Sessão</mat-card-title>
      <mat-card-content>
        <form (ngSubmit)="create()" style="margin-top:12px">
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Filme</mat-label>
            <mat-select [(ngModel)]="filmeId" name="filmeId" required>
              <mat-option *ngFor="let f of filmes" [value]="f.id">{{f.titulo}}</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Sala</mat-label>
            <mat-select [(ngModel)]="salaId" name="salaId" required>
              <mat-option *ngFor="let s of salas" [value]="s.id">{{s.nome}} ({{s.capacidade}})</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Data</mat-label>
            <input matInput [(ngModel)]="data" name="data" placeholder="YYYY-MM-DD" required>
          </mat-form-field>
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Horário</mat-label>
            <input matInput [(ngModel)]="horario" name="horario" placeholder="HH:mm" required>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit">Criar</button>
        </form>
      </mat-card-content>
    </mat-card>

    <mat-card style="margin-top:16px" *ngIf="sessao">
      <mat-card-title>Assentos</mat-card-title>
      <mat-card-content>
        <div style="display:flex; flex-wrap:wrap; gap:8px">
          <mat-chip-set>
            <mat-chip *ngFor="let a of assentos" [disabled]="a.reservado" [color]="selecionados.has(a.assento) ? 'primary' : undefined" (click)="toggle(a.assento)">
              {{a.assento}} {{a.reservado ? '(Reservado)' : ''}}
            </mat-chip>
          </mat-chip-set>
        </div>
        <div style="margin-top:12px">
          <button mat-raised-button color="accent" (click)="reservar()" [disabled]="selecionados.size===0">Reservar Temporariamente</button>
          <button mat-raised-button color="primary" (click)="comprar()" [disabled]="selecionados.size===0">Comprar</button>
        </div>
        <div style="margin-top:8px" *ngIf="mensagem">{{mensagem}}</div>
      </mat-card-content>
    </mat-card>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SessoesComponent = _classThis = class {
        constructor() {
            this.api = (0, core_1.inject)(api_service_1.ApiService);
            this.filmeId = '';
            this.salaId = '';
            this.data = '';
            this.horario = '';
            this.sessao = null;
            this.assentos = [];
            this.reservaId = null;
            this.selecionados = new Set();
            this.mensagem = '';
            this.filmes = [];
            this.salas = [];
            this.clienteIndex = 1;
            this.api.filmes.list().subscribe((l) => this.filmes = l);
            this.api.salas.list().subscribe((l) => this.salas = l);
        }
        create() {
            this.api.sessoes.create({ filmeId: this.filmeId, salaId: this.salaId, data: this.data, horario: this.horario })
                .subscribe((resp) => {
                this.sessao = resp.sessao;
                this.api.sessoes.assentos(this.sessao.id).subscribe((r) => this.assentos = r.assentos);
            });
        }
        toggle(a) {
            if (this.selecionados.has(a))
                this.selecionados.delete(a);
            else
                this.selecionados.add(a);
        }
        reservar() {
            if (!this.sessao)
                return;
            this.api.reservas.create({ sessaoId: this.sessao.id, assentos: Array.from(this.selecionados) })
                .subscribe((r) => { this.reservaId = r.id; this.mensagem = `Reserva temporária criada: ${r.id}`; });
        }
        comprar() {
            if (!this.sessao)
                return;
            const body = { clienteNome: `Cliente ${this.clienteIndex}`, cpf: '52998224725', email: 'cliente@ui.com', sessaoId: this.sessao.id, assentos: Array.from(this.selecionados) };
            if (this.reservaId)
                body.reservaTemporariaId = this.reservaId;
            this.api.ingressos.create(body).subscribe({
                next: () => { this.mensagem = 'Compra realizada!'; window.dispatchEvent(new CustomEvent('ingressos:changed')); this.api.sessoes.assentos(this.sessao.id).subscribe((r) => this.assentos = r.assentos); this.clienteIndex = this.clienteIndex === 1 ? 2 : 1; },
                error: (e) => { this.mensagem = e?.error?.error ?? 'Erro na compra'; }
            });
        }
    };
    __setFunctionName(_classThis, "SessoesComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SessoesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SessoesComponent = _classThis;
})();
exports.SessoesComponent = SessoesComponent;
