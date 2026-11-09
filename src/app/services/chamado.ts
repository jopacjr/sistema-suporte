import { Injectable } from '@angular/core';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private storageKey = 'chamados_lgpd';

  constructor() {}

  // Retorna todos os chamados salvos
  obterChamados(): Chamado[] {
    const dados = localStorage.getItem(this.storageKey);
    return dados ? JSON.parse(dados) : [];
  }

  // Adiciona um novo chamado garantindo minimização e criação de ID
  adicionarChamado(chamado: Omit<Chamado, 'id' | 'dataCriacao' | 'status'>): void {
    const chamados = this.obterChamados();
    const novoChamado: Chamado = {
      ...chamado,
      id: Date.now(),
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
      status: 'Aberto'
    };
    chamados.push(novoChamado);
    localStorage.setItem(this.storageKey, JSON.stringify(chamados));
  }
}