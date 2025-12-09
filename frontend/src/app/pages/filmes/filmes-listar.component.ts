import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
 

@Component({
  selector: 'app-filmes-listar',
  standalone: true,
  imports: [NgFor, NgIf, MatCardModule],
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
})
export class FilmesListarComponent {
  private api = inject(ApiService);
  filmes: any[] = [];
  private intervalId: any;
  constructor() { this.refresh(); this.intervalId = setInterval(() => this.refresh(), 3000); }
  refresh() { this.api.filmes.list().subscribe((l: any) => this.filmes = (l?.value ?? l) || []); }
  ngOnDestroy() { if (this.intervalId) clearInterval(this.intervalId); }
}
