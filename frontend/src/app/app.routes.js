"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const filmes_component_1 = require("./pages/filmes/filmes.component");
const filmes_listar_component_1 = require("./pages/filmes/filmes-listar.component");
const filmes_cadastrar_component_1 = require("./pages/filmes/filmes-cadastrar.component");
const salas_component_1 = require("./pages/salas/salas.component");
const sessoes_component_1 = require("./pages/sessoes/sessoes.component");
const ingressos_component_1 = require("./pages/ingressos/ingressos.component");
exports.routes = [
    { path: '', redirectTo: 'filmes', pathMatch: 'full' },
    { path: 'filmes', component: filmes_component_1.FilmesComponent },
    { path: 'filmes/listar', component: filmes_listar_component_1.FilmesListarComponent },
    { path: 'filmes/cadastrar', component: filmes_cadastrar_component_1.FilmesCadastrarComponent },
    { path: 'salas', component: salas_component_1.SalasComponent },
    { path: 'sessoes', component: sessoes_component_1.SessoesComponent },
    { path: 'ingressos', component: ingressos_component_1.IngressosComponent },
];
