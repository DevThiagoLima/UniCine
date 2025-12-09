import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-filmes-cadastrar',
  standalone: true,
  imports: [FormsModule, NgIf, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  template: `
    <mat-card>
      <mat-card-title>Cadastrar Filme</mat-card-title>
      <mat-card-content>
        <form (ngSubmit)="create()" style="margin-top:12px">
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Título</mat-label>
            <input matInput [(ngModel)]="titulo" name="titulo" required>
          </mat-form-field>
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Duração (min)</mat-label>
            <input matInput type="number" [(ngModel)]="duracaoMin" name="duracaoMin" required>
          </mat-form-field>
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Classificação</mat-label>
            <input matInput [(ngModel)]="classificacao" name="classificacao" required>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="loading">Cadastrar</button>
          <div style="margin-top:8px" *ngIf="mensagem">{{mensagem}}</div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
})
export class FilmesCadastrarComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);
  titulo = '';
  duracaoMin: number | null = null;
  classificacao = '';
  mensagem = '';
  loading = false;
  create() {
    if (!this.titulo || !this.duracaoMin || !this.classificacao) return;
    this.loading = true;
    this.mensagem = '';
    this.api.filmes.create({ titulo: this.titulo, duracaoMin: Number(this.duracaoMin), classificacao: this.classificacao })
      .subscribe({
        next: () => {
          this.titulo='';
          this.duracaoMin=null;
          this.classificacao='';
          this.loading = false;
          this.mensagem = 'Filme cadastrado com sucesso';
          this.snack.open('Filme cadastrado com sucesso', 'OK', { duration: 3000 });
          window.dispatchEvent(new CustomEvent('filmes:changed'));
        },
        error: (e) => {
          const msg = e?.error?.error ?? 'Erro ao cadastrar';
          this.loading = false;
          this.mensagem = msg;
          this.snack.open(msg, 'Fechar', { duration: 4000 });
        }
      });
  }
}
