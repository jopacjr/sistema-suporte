import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Cadastro } from './components/cadastro/cadastro';
import { ListaChamadosComponent } from './components/lista-chamados/lista-chamados';
import { NovoChamadoComponent } from './components/novo-chamado/novo-chamado';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'chamados', component: ListaChamadosComponent },
  { path: 'novo-chamado', component: NovoChamadoComponent }
];