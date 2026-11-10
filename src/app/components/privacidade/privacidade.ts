import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChamadoService } from '../../services/chamado';

@Component({
  selector: 'app-privacidade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './privacidade.html',
  styleUrls: ['./privacidade.css']
})
export class PrivacidadeComponent implements OnInit {
  emailUsuario: string = '';
  marketingConsent: boolean = false;
  analyticsConsent: boolean = true;

  constructor(private chamadoService: ChamadoService, private router: Router) {}

  ngOnInit(): void {
    this.emailUsuario = localStorage.getItem('usuario_email') || '';
  }

  exportarDados() {
    this.chamadoService.exportarDadosLGPD(this.emailUsuario);
  }

  eliminarConta() {
    if (confirm('ATENÇÃO: Deseja apagar permanentemente a sua conta e todos os chamados? Esta ação cumpre o Art. 18 da LGPD.')) {
      this.chamadoService.excluirContaUsuario(this.emailUsuario);
      localStorage.removeItem('usuario_logado');
      localStorage.removeItem('usuario_email');
      alert('Sua conta e dados foram excluídos com sucesso.');
      this.router.navigate(['/login']);
    }
  }
}