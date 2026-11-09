import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  aceitouTermos: boolean = false;

  constructor(private router: Router) {}

  cadastrar() {
    if (!this.aceitouTermos) {
      alert('É necessário aceitar os termos da LGPD para criar a conta.');
      return;
    }
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }
}