import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChamadoService } from '../../services/chamado';

@Component({
  selector: 'app-novo-chamado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novo-chamado.html',
  styleUrls: ['./novo-chamado.css']
})
export class NovoChamadoComponent {
  assunto: string = '';
  descricao: string = '';
  categoria: string = 'Suporte Técnico';

  constructor(private chamadoService: ChamadoService, private router: Router) {}

  salvarChamado() {
    if (!this.assunto || !this.descricao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.chamadoService.adicionarChamado({
      assunto: this.assunto,
      descricao: this.descricao,
      categoria: this.categoria
    });

    alert('Chamado registrado com sucesso!');
    this.router.navigate(['/chamados']);
  }
}