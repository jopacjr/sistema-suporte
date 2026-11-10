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
  anexoBase64: string = '';

  constructor(private chamadoService: ChamadoService, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.anexoBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  salvarChamado() {
    if (!this.assunto || !this.descricao) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    const emailLogado = localStorage.getItem('usuario_email') || '';

    this.chamadoService.adicionarChamado({
      assunto: this.assunto,
      descricao: this.descricao,
      categoria: this.categoria,
      anexoBase64: this.anexoBase64
    }, emailLogado);

    alert('Chamado criado com sucesso!');
    this.router.navigate(['/chamados']);
  }
}