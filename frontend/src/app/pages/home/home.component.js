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
exports.HomeComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const api_service_1 = require("../../services/api.service");
const card_1 = require("@angular/material/card");
const button_1 = require("@angular/material/button");
let HomeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-home',
            standalone: true,
            imports: [card_1.MatCardModule, button_1.MatButtonModule, router_1.RouterLink, common_1.NgIf, common_1.NgFor],
            template: `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:16px;">
      <mat-card>
        <mat-card-title>Filmes</mat-card-title>
        <mat-card-content>
          <div>Total: {{filmesCount}}</div>
          <a mat-button color="primary" routerLink="/filmes">Visualizar</a>
          <div *ngIf="filmesPreview.length > 0" style="margin-top:8px; display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:8px">
            <mat-card *ngFor="let f of filmesPreview" class="mat-elevation-z2" style="border-radius:10px">
              <mat-card-title style="font-size:1rem">{{f.titulo}}</mat-card-title>
              <mat-card-content>
                <div>{{f.duracaoMin}} min</div>
                <div>Class: {{f.classificacao}}</div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Salas</mat-card-title>
        <mat-card-content>
          <div>Total: {{salasCount}}</div>
          <a mat-button color="primary" routerLink="/salas">Visualizar</a>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Sessões</mat-card-title>
        <mat-card-content>
          <div>Total: {{sessoesCount}}</div>
          <a mat-button color="primary" routerLink="/sessoes">Montar Sessão</a>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Ingressos</mat-card-title>
        <mat-card-content>
          <div>Total: {{ingressosCount}}</div>
          <a mat-button color="primary" routerLink="/ingressos">Visualizar</a>
        </mat-card-content>
      </mat-card>
    </div>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HomeComponent = _classThis = class {
        constructor() {
            this.api = (0, core_1.inject)(api_service_1.ApiService);
            this.filmesCount = 0;
            this.filmesPreview = [];
            this.salasCount = 0;
            this.sessoesCount = 0;
            this.ingressosCount = 0;
            this.refresh();
            this.intervalId = setInterval(() => this.refresh(), 3000);
            window.addEventListener('filmes:changed', () => this.refresh());
        }
        refresh() {
            this.api.filmes.list().subscribe((l) => {
                const arr = Array.isArray(l) ? l : (l?.value ?? []);
                this.filmesCount = arr.length;
                this.filmesPreview = arr.slice(0, 5);
            });
            this.api.salas.list().subscribe((l) => this.salasCount = Array.isArray(l) ? l.length : (l?.value ?? []).length);
            this.api.sessoes.list().subscribe((l) => this.sessoesCount = Array.isArray(l) ? l.length : (l?.value ?? []).length);
            this.api.ingressos.list().subscribe((l) => this.ingressosCount = Array.isArray(l) ? l.length : (l?.value ?? []).length);
        }
        ngOnDestroy() { if (this.intervalId)
            clearInterval(this.intervalId); window.removeEventListener('filmes:changed', () => this.refresh()); }
    };
    __setFunctionName(_classThis, "HomeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HomeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HomeComponent = _classThis;
})();
exports.HomeComponent = HomeComponent;
