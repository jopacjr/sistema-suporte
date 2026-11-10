import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { CadastroComponent } from './components/cadastro/cadastro';
import { ListaChamadosComponent } from './components/lista-chamados/lista-chamados';
import { NovoChamadoComponent } from './components/novo-chamado/novo-chamado';
import { PrivacidadeComponent } from './components/privacidade/privacidade';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'chamados', component: ListaChamadosComponent, canActivate: [authGuard] },
  { path: 'novo-chamado', component: NovoChamadoComponent, canActivate: [authGuard] },
  { path: 'privacidade', component: PrivacidadeComponent, canActivate: [authGuard] }
];