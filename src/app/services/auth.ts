import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Define o estado inicial de login como falso
  private estaLogadoSubject = new BehaviorSubject<boolean>(false);
  estaLogado$ = this.estaLogadoSubject.asObservable();

  login() {
    this.estaLogadoSubject.next(true);
  }

  logout() {
    this.estaLogadoSubject.next(false);
  }
}