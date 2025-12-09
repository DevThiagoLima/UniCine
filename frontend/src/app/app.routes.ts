import { Routes } from '@angular/router';
import { FilmesComponent } from './pages/filmes/filmes.component';
import { FilmesListarComponent } from './pages/filmes/filmes-listar.component';
import { FilmesCadastrarComponent } from './pages/filmes/filmes-cadastrar.component';
import { SalasComponent } from './pages/salas/salas.component';
import { SessoesComponent } from './pages/sessoes/sessoes.component';
import { IngressosComponent } from './pages/ingressos/ingressos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'filmes', pathMatch: 'full' },
  { path: 'filmes', component: FilmesComponent },
  { path: 'filmes/listar', component: FilmesListarComponent },
  { path: 'filmes/cadastrar', component: FilmesCadastrarComponent },
  { path: 'salas', component: SalasComponent },
  { path: 'sessoes', component: SessoesComponent },
  { path: 'ingressos', component: IngressosComponent },
];
