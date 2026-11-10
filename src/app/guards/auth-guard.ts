import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Verifica se existe algum indicador de sessão (ex: chave no localStorage)
  const estaLogado = localStorage.getItem('usuario_logado') === 'true';

  if (estaLogado) {
    return true; // Permite o acesso à rota
  } else {
    // Redireciona para o login se tentar acessar direto pela URL
    alert('Acesso negado! Por favor, faça login para continuar.');
    router.navigate(['/login']);
    return false;
  }
};