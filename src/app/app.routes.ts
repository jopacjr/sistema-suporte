import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { CadastroComponent } from './components/cadastro/cadastro';
import { ListaChamadosComponent } from './components/lista-chamados/lista-chamados';
import { NovoChamadoComponent } from './components/novo-chamado/novo-chamado';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent},
  { path: 'chamados', component: ListaChamadosComponent },
  { path: 'novo-chamado', component: NovoChamadoComponent }
];