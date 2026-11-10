import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  mensagemErro: string = '';

  constructor(private router: Router) {}

  entrar() {
  this.mensagemErro = '';
  const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios_sistema') || '[]');

  const usuarioValido = usuariosSalvos.find(
    (u: any) => u.email === this.email && u.senha === this.senha
  );

  if (usuarioValido) {
    localStorage.setItem('usuario_logado', 'true');
    localStorage.setItem('usuario_email', this.email); // Guarda o e-mail do usuário logado
    this.router.navigate(['/chamados']);
  } else {
    this.mensagemErro = 'E-mail ou senha incorretos!';
  }
}
  
}