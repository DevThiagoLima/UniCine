import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-sessoes',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatChipsModule, MatSelectModule],
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
})
export class SessoesComponent {
  private api = inject(ApiService);
  filmeId = '';
  salaId = '';
  data = '';
  horario = '';
  sessao: any = null;
  assentos: any[] = [];
  reservaId: string | null = null;
  selecionados = new Set<string>();
  mensagem = '';
  filmes: any[] = [];
  salas: any[] = [];
  clienteIndex = 1;

  constructor() {
    this.api.filmes.list().subscribe((l: any) => this.filmes = l);
    this.api.salas.list().subscribe((l: any) => this.salas = l);
  }

  create() {
    this.api.sessoes.create({ filmeId: this.filmeId, salaId: this.salaId, data: this.data, horario: this.horario })
      .subscribe((resp: any) => {
        this.sessao = resp.sessao;
        this.api.sessoes.assentos(this.sessao.id).subscribe((r: any) => this.assentos = r.assentos);
      });
  }
  toggle(a: string) {
    if (this.selecionados.has(a)) this.selecionados.delete(a); else this.selecionados.add(a);
  }
  reservar() {
    if (!this.sessao) return;
    this.api.reservas.create({ sessaoId: this.sessao.id, assentos: Array.from(this.selecionados) })
      .subscribe((r: any) => { this.reservaId = r.id; this.mensagem = `Reserva temporária criada: ${r.id}`; });
  }
  comprar() {
    if (!this.sessao) return;
    const body = { clienteNome: `Cliente ${this.clienteIndex}`, cpf: '52998224725', email: 'cliente@ui.com', sessaoId: this.sessao.id, assentos: Array.from(this.selecionados) } as any;
    if (this.reservaId) body.reservaTemporariaId = this.reservaId;
    this.api.ingressos.create(body).subscribe({
      next: () => { this.mensagem = 'Compra realizada!'; window.dispatchEvent(new CustomEvent('ingressos:changed')); this.api.sessoes.assentos(this.sessao.id).subscribe((r: any) => this.assentos = r.assentos); this.clienteIndex = this.clienteIndex === 1 ? 2 : 1; },
      error: (e) => { this.mensagem = e?.error?.error ?? 'Erro na compra'; }
    });
  }
}
