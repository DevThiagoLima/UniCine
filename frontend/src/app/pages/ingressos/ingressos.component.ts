import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ingressos',
  standalone: true,
  imports: [NgFor, NgIf, MatCardModule],
  template: `
    <mat-card>
      <mat-card-title>Ingressos</mat-card-title>
      <mat-card-content>
        <div *ngIf="list.length===0">Nenhum ingresso emitido ainda.</div>
        <div *ngIf="list.length>0" style="display:flex; flex-direction:column; gap:12px; margin-top:8px">
          <mat-card *ngFor="let ing of list">
            <mat-card-title>{{ing.clienteNome}}</mat-card-title>
            <mat-card-content>
              <div>Sessão: {{ing.sessaoId}}</div>
              <div>Assentos: {{ing.assentos?.join(', ')}}</div>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class IngressosComponent {
  private api = inject(ApiService);
  list: any[] = [];
  private onChanged = () => this.refresh();
  constructor(){
    this.refresh();
    window.addEventListener('ingressos:changed', this.onChanged);
  }
  refresh(){ this.api.ingressos.list().subscribe((l:any)=> this.list = l.value ?? l); }
  ngOnDestroy(){ window.removeEventListener('ingressos:changed', this.onChanged); }
}
