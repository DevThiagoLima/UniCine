import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-salas',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
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
})
export class SalasComponent {
  private api = inject(ApiService);
  private snack = inject(MatSnackBar);
  salas: any[] = [];
  nome = '';
  capacidade: number | null = null;
  mensagem = '';
  loading = false;
  constructor() { this.refresh(); }
  refresh() { this.api.salas.list().subscribe((list: any) => this.salas = list); }
  create() {
    if (!this.nome || !this.capacidade) return;
    this.loading = true;
    this.mensagem = '';
    this.api.salas.create({ nome: this.nome, capacidade: Number(this.capacidade) })
      .subscribe({
        next: () => {
          this.nome='';
          this.capacidade=null;
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
}
