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
exports.FilmesListarComponent = void 0;
const core_1 = require("@angular/core");
const api_service_1 = require("../../services/api.service");
const common_1 = require("@angular/common");
const card_1 = require("@angular/material/card");
let FilmesListarComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-filmes-listar',
            standalone: true,
            imports: [common_1.NgFor, common_1.NgIf, card_1.MatCardModule],
            template: `
    <mat-card>
      <mat-card-title>Lista de Filmes</mat-card-title>
      <mat-card-content>
        <div *ngIf="filmes.length === 0">Nenhum filme cadastrado.</div>
        <div *ngIf="filmes.length > 0" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:12px">
          <mat-card *ngFor="let f of filmes">
            <mat-card-title>{{f.titulo}}</mat-card-title>
            <mat-card-content>
              <div>Duração: {{f.duracaoMin}} min</div>
              <div>Classificação: {{f.classificacao}}</div>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-card-content>
    </mat-card>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FilmesListarComponent = _classThis = class {
        constructor() {
            this.api = (0, core_1.inject)(api_service_1.ApiService);
            this.filmes = [];
            this.refresh();
            this.intervalId = setInterval(() => this.refresh(), 3000);
        }
        refresh() { this.api.filmes.list().subscribe((l) => this.filmes = (l?.value ?? l) || []); }
        ngOnDestroy() { if (this.intervalId)
            clearInterval(this.intervalId); }
    };
    __setFunctionName(_classThis, "FilmesListarComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FilmesListarComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FilmesListarComponent = _classThis;
})();
exports.FilmesListarComponent = FilmesListarComponent;
