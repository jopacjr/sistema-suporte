import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chamado } from '../../models/chamado';
import { ChamadoService } from '../../services/chamado';

@Component({
  selector: 'app-lista-chamados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-chamados.html',
  styleUrls: ['./lista-chamados.css']
})
export class ListaChamadosComponent implements OnInit {
  chamados: Chamado[] = [];

  constructor(private chamadoService: ChamadoService) {}

  ngOnInit(): void {
    this.chamados = this.chamadoService.obterChamados();
  }
}