import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, NgIf, NgFor],
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
})
export class HomeComponent {
  private api = inject(ApiService);
  filmesCount = 0;
  filmesPreview: any[] = [];
  salasCount = 0;
  sessoesCount = 0;
  ingressosCount = 0;
  private intervalId: any;
  constructor() {
    this.refresh();
    this.intervalId = setInterval(() => this.refresh(), 3000);
    window.addEventListener('filmes:changed', () => this.refresh());
  }
  refresh() {
    this.api.filmes.list().subscribe((l: any) => {
      const arr = Array.isArray(l) ? l : (l?.value ?? []);
      this.filmesCount = arr.length;
      this.filmesPreview = arr.slice(0, 5);
    });
    this.api.salas.list().subscribe((l: any) => this.salasCount = Array.isArray(l) ? l.length : ((l?.value ?? []) as any[]).length);
    this.api.sessoes.list().subscribe((l: any) => this.sessoesCount = Array.isArray(l) ? l.length : ((l?.value ?? []) as any[]).length);
    this.api.ingressos.list().subscribe((l: any) => this.ingressosCount = Array.isArray(l) ? l.length : ((l?.value ?? []) as any[]).length);
  }
  ngOnDestroy() { if (this.intervalId) clearInterval(this.intervalId); window.removeEventListener('filmes:changed', () => this.refresh()); }
}
