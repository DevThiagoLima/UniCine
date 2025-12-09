import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../services/api.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, RouterLink, NgFor, NgIf],
  template: `
    <mat-card>
      <mat-card-title>Filmes</mat-card-title>
      <mat-card-content>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px">
          <a mat-stroked-button color="primary" routerLink="/filmes/cadastrar">Abrir Cadastro</a>
          <button mat-stroked-button color="primary" (click)="listar()">Listar Filmes</button>
        </div>
        <div *ngIf="mostrarLista" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:16px">
          <mat-card *ngFor="let f of filmes" class="mat-elevation-z4" style="border-radius:12px">
            <mat-card-header>
              <mat-card-title>{{f.titulo}}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px">
                <mat-chip color="primary">{{f.duracaoMin}} min</mat-chip>
                <mat-chip color="accent">Class: {{f.classificacao}}</mat-chip>
              </div>
            </mat-card-content>
          </mat-card>
          <div *ngIf="filmes.length === 0">Nenhum filme cadastrado.</div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class FilmesComponent {
  private api = inject(ApiService);
  filmes: any[] = [];
  mostrarLista = false;
  private intervalId: any;
  constructor() { this.listar(); }
  refresh() { this.api.filmes.list().subscribe((l: any) => this.filmes = (l?.value ?? l) || []); }
  listar() {
    this.refresh();
    this.mostrarLista = true;
    if (!this.intervalId) this.intervalId = setInterval(() => this.refresh(), 3000);
  }
  ngOnDestroy() { if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = null; } }
}
