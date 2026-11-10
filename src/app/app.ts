import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'sistema-suporte';
  modoEscuro: boolean = false;

  constructor(public router: Router) {}

  ngOnInit() {
    this.modoEscuro = localStorage.getItem('tema_escuro') === 'true';
    this.aplicarTema();
  }

  isTelaAuth(): boolean {
    return this.router.url === '/login' || this.router.url === '/cadastro' || this.router.url === '/';
  }

  alternarTema() {
    this.modoEscuro = !this.modoEscuro;
    localStorage.setItem('tema_escuro', String(this.modoEscuro));
    this.aplicarTema();
  }

  aplicarTema() {
    if (this.modoEscuro) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  sair() {
    localStorage.removeItem('usuario_logado');
    localStorage.removeItem('usuario_email');
    this.router.navigate(['/login']);
  }
}