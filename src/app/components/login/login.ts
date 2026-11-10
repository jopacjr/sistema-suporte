import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

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

  constructor(private router: Router, private authService: AuthService) {}

  entrar() {
    if (this.email && this.senha) {
      this.authService.login(); // Notifica que o usuário logou
      this.router.navigate(['/chamados']);
    } else {
      alert('Preencha os campos de login.');
    }
  }
}