import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  cep: string = '';
  logradouro: string = '';
  bairro: string = '';
  cidade: string = '';
  uf: string = '';
  aceitouTermos: boolean = false;
  buscandoCep: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  // Consulta a API do ViaCEP quando o utilizador digita 8 números
  buscarCep() {
    const cepLimpo = this.cep.replace(/\D/g, '');

    if (cepLimpo.length === 8) {
      this.buscandoCep = true;
      this.http.get<any>(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe({
        next: (dados) => {
          this.buscandoCep = false;
          if (dados.erro) {
            alert('CEP não encontrado!');
            return;
          }
          this.logradouro = dados.logradouro;
          this.bairro = dados.bairro;
          this.cidade = dados.localidade;
          this.uf = dados.uf;
        },
        error: () => {
          this.buscandoCep = false;
          alert('Erro ao consultar o CEP!');
        }
      });
    }
  }

  cadastrar() {
    if (!this.aceitouTermos) {
      alert('É necessário aceitar os termos da LGPD para criar a conta.');
      return;
    }

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios_sistema') || '[]');
    
    const usuarioExiste = usuariosSalvos.find((u: any) => u.email === this.email);
    if (usuarioExiste) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    const novoUsuario = { 
      nome: this.nome, 
      email: this.email, 
      senha: this.senha,
      endereco: { cep: this.cep, logradouro: this.logradouro, bairro: this.bairro, cidade: this.cidade, uf: this.uf }
    };
    
    usuariosSalvos.push(novoUsuario);
    localStorage.setItem('usuarios_sistema', JSON.stringify(usuariosSalvos));

    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }
}