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
exports.FilmesCadastrarComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const api_service_1 = require("../../services/api.service");
const forms_1 = require("@angular/forms");
const card_1 = require("@angular/material/card");
const form_field_1 = require("@angular/material/form-field");
const input_1 = require("@angular/material/input");
const button_1 = require("@angular/material/button");
const snack_bar_1 = require("@angular/material/snack-bar");
let FilmesCadastrarComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-filmes-cadastrar',
            standalone: true,
            imports: [forms_1.FormsModule, common_1.NgIf, card_1.MatCardModule, form_field_1.MatFormFieldModule, input_1.MatInputModule, button_1.MatButtonModule, snack_bar_1.MatSnackBarModule],
            template: `
    <mat-card>
      <mat-card-title>Cadastrar Filme</mat-card-title>
      <mat-card-content>
        <form (ngSubmit)="create()" style="margin-top:12px">
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Título</mat-label>
            <input matInput [(ngModel)]="titulo" name="titulo" required>
          </mat-form-field>
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Duração (min)</mat-label>
            <input matInput type="number" [(ngModel)]="duracaoMin" name="duracaoMin" required>
          </mat-form-field>
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Classificação</mat-label>
            <input matInput [(ngModel)]="classificacao" name="classificacao" required>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="loading">Cadastrar</button>
          <div style="margin-top:8px" *ngIf="mensagem">{{mensagem}}</div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FilmesCadastrarComponent = _classThis = class {
        constructor() {
            this.api = (0, core_1.inject)(api_service_1.ApiService);
            this.router = (0, core_1.inject)(router_1.Router);
            this.snack = (0, core_1.inject)(snack_bar_1.MatSnackBar);
            this.titulo = '';
            this.duracaoMin = null;
            this.classificacao = '';
            this.mensagem = '';
            this.loading = false;
        }
        create() {
            if (!this.titulo || !this.duracaoMin || !this.classificacao)
                return;
            this.loading = true;
            this.mensagem = '';
            this.api.filmes.create({ titulo: this.titulo, duracaoMin: Number(this.duracaoMin), classificacao: this.classificacao })
                .subscribe({
                next: () => {
                    this.titulo = '';
                    this.duracaoMin = null;
                    this.classificacao = '';
                    this.loading = false;
                    this.mensagem = 'Filme cadastrado com sucesso';
                    this.snack.open('Filme cadastrado com sucesso', 'OK', { duration: 3000 });
                    window.dispatchEvent(new CustomEvent('filmes:changed'));
                },
                error: (e) => {
                    const msg = e?.error?.error ?? 'Erro ao cadastrar';
                    this.loading = false;
                    this.mensagem = msg;
                    this.snack.open(msg, 'Fechar', { duration: 4000 });
                }
            });
        }
    };
    __setFunctionName(_classThis, "FilmesCadastrarComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FilmesCadastrarComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FilmesCadastrarComponent = _classThis;
})();
exports.FilmesCadastrarComponent = FilmesCadastrarComponent;
