import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chamado } from '../../models/chamado';
import { ChamadoService } from '../../services/chamado';

@Component({
  selector: 'app-lista-chamados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-chamados.html',
  styleUrls: ['./lista-chamados.css']
})
export class ListaChamadosComponent implements OnInit {
  chamados: Chamado[] = [];
  termoBusca: string = '';
  filtroStatus: string = 'Todos';
  
  // Variáveis para a API de Status de Serviços
  statusServidor: 'online' | 'offline' | 'verificando' = 'verificando';
  tempoRespostaMs: number = 0;

  constructor(
    private chamadoService: ChamadoService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.carregarChamados();
    this.verificarStatusServicos();
  }

  // Consome a API de status pós-login
  verificarStatusServicos(): void {
    const inicio = performance.now();
    this.statusServidor = 'verificando';

    // Faz um GET numa API rápida de infraestrutura
    this.http.get('https://httpbin.org/status/200').subscribe({
      next: () => {
        const fim = performance.now();
        this.tempoRespostaMs = Math.round(fim - inicio);
        this.statusServidor = 'online';
      },
      error: () => {
        this.statusServidor = 'offline';
      }
    });
  }

  carregarChamados(): void {
    const emailLogado = localStorage.getItem('usuario_email') || '';
    this.chamados = this.chamadoService.obterChamadosDoUsuario(emailLogado);
  }

  get chamadosFiltrados(): Chamado[] {
    return this.chamados.filter(c => {
      const bateTexto = c.assunto.toLowerCase().includes(this.termoBusca.toLowerCase()) ||
                        c.categoria.toLowerCase().includes(this.termoBusca.toLowerCase());
      const bateStatus = this.filtroStatus === 'Todos' || c.status === this.filtroStatus;
      return bateTexto && bateStatus;
    });
  }

  excluir(id: number): void {
    if (confirm('Deseja apagar este chamado? (Art. 18 LGPD)')) {
      this.chamadoService.deletarChamado(id);
      this.carregarChamados();
    }
  }

  exportarLGPD(): void {
    const emailLogado = localStorage.getItem('usuario_email') || '';
    this.chamadoService.exportarDadosLGPD(emailLogado);
  }
}