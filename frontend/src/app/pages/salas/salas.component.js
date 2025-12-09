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
exports.SalasComponent = void 0;
const core_1 = require("@angular/core");
const api_service_1 = require("../../services/api.service");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const card_1 = require("@angular/material/card");
const form_field_1 = require("@angular/material/form-field");
const input_1 = require("@angular/material/input");
const button_1 = require("@angular/material/button");
const snack_bar_1 = require("@angular/material/snack-bar");
let SalasComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-salas',
            standalone: true,
            imports: [common_1.NgFor, common_1.NgIf, forms_1.FormsModule, card_1.MatCardModule, form_field_1.MatFormFieldModule, input_1.MatInputModule, button_1.MatButtonModule, snack_bar_1.MatSnackBarModule],
            template: `
    <mat-card>
      <mat-card-title>Salas</mat-card-title>
      <mat-card-content>
        <form (ngSubmit)="create()" style="margin-top:12px">
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Nome</mat-label>
            <input matInput [(ngModel)]="nome" name="nome" required>
          </mat-form-field>
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Capacidade</mat-label>
            <input matInput type="number" [(ngModel)]="capacidade" name="capacidade" required>
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
    var SalasComponent = _classThis = class {
        constructor() {
            this.api = (0, core_1.inject)(api_service_1.ApiService);
            this.snack = (0, core_1.inject)(snack_bar_1.MatSnackBar);
            this.salas = [];
            this.nome = '';
            this.capacidade = null;
            this.mensagem = '';
            this.loading = false;
            this.refresh();
        }
        refresh() { this.api.salas.list().subscribe((list) => this.salas = list); }
        create() {
            if (!this.nome || !this.capacidade)
                return;
            this.loading = true;
            this.mensagem = '';
            this.api.salas.create({ nome: this.nome, capacidade: Number(this.capacidade) })
                .subscribe({
                next: () => {
                    this.nome = '';
                    this.capacidade = null;
                    this.loading = false;
                    this.mensagem = 'Sala cadastrada com sucesso';
                    this.snack.open('Sala cadastrada com sucesso', 'OK', { duration: 3000 });
                    this.refresh();
                },
                error: (e) => {
                    const msg = e?.error?.error ?? 'Erro ao cadastrar sala';
                    this.loading = false;
                    this.mensagem = msg;
                    this.snack.open(msg, 'Fechar', { duration: 4000 });
                }
            });
        }
    };
    __setFunctionName(_classThis, "SalasComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SalasComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SalasComponent = _classThis;
})();
exports.SalasComponent = SalasComponent;
