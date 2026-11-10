import { Injectable } from '@angular/core';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private storageKey = 'chamados_lgpd';

  constructor() {}

  obterChamadosDoUsuario(emailUsuario: string): Chamado[] {
    const dados = localStorage.getItem(this.storageKey);
    const todosChamados: Chamado[] = dados ? JSON.parse(dados) : [];
    if (!emailUsuario) return todosChamados;
    return todosChamados.filter(
      c => c.usuarioEmail && c.usuarioEmail.toLowerCase() === emailUsuario.toLowerCase()
    );
  }

  adicionarChamado(chamado: Omit<Chamado, 'id' | 'dataCriacao' | 'status' | 'usuarioEmail'>, emailUsuario: string): void {
    const dados = localStorage.getItem(this.storageKey);
    const todosChamados: Chamado[] = dados ? JSON.parse(dados) : [];

    const novoChamado: Chamado = {
      ...chamado,
      id: Date.now(),
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
      status: 'Aberto',
      usuarioEmail: emailUsuario.toLowerCase(),
      historico: [
        { autor: 'Sistema', texto: 'Chamado aberto com sucesso.', data: new Date().toLocaleString('pt-BR') }
      ]
    };

    todosChamados.push(novoChamado);
    localStorage.setItem(this.storageKey, JSON.stringify(todosChamados));
  }

  adicionarMensagem(idChamado: number, texto: string, autor: string): void {
    const dados = localStorage.getItem(this.storageKey);
    let todosChamados: Chamado[] = dados ? JSON.parse(dados) : [];
    const chamado = todosChamados.find(c => c.id === idChamado);
    
    if (chamado) {
      if (!chamado.historico) chamado.historico = [];
      chamado.historico.push({
        autor: autor,
        texto: texto,
        data: new Date().toLocaleString('pt-BR')
      });
      localStorage.setItem(this.storageKey, JSON.stringify(todosChamados));
    }
  }

  deletarChamado(id: number): void {
    const dados = localStorage.getItem(this.storageKey);
    let todosChamados: Chamado[] = dados ? JSON.parse(dados) : [];
    todosChamados = todosChamados.filter(c => c.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(todosChamados));
  }

  exportarDadosLGPD(emailUsuario: string): void {
    const chamados = this.obterChamadosDoUsuario(emailUsuario);
    const conteudo = JSON.stringify({
      usuario: emailUsuario,
      dataExportacao: new Date().toISOString(),
      chamadosCadastrados: chamados
    }, null, 2);

    const blob = new Blob([conteudo], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-lgpd-${emailUsuario}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Exclusão Definitiva da Conta (LGPD Art. 18)
  excluirContaUsuario(emailUsuario: string): void {
    // Apaga os chamados do utilizador
    const dados = localStorage.getItem(this.storageKey);
    let todosChamados: Chamado[] = dados ? JSON.parse(dados) : [];
    todosChamados = todosChamados.filter(c => c.usuarioEmail.toLowerCase() !== emailUsuario.toLowerCase());
    localStorage.setItem(this.storageKey, JSON.stringify(todosChamados));

    // Apaga o registo do utilizador
    const usuarios = JSON.parse(localStorage.getItem('usuarios_sistema') || '[]');
    const usuariosFiltrados = usuarios.filter((u: any) => u.email.toLowerCase() !== emailUsuario.toLowerCase());
    localStorage.setItem('usuarios_sistema', JSON.stringify(usuariosFiltrados));
  }
}