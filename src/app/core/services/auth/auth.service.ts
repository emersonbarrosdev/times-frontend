import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IAuthResponse } from 'src/app/shared/interfaces/iauth-response';
import { IUser } from 'src/app/shared/interfaces/iuser';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser: Observable<IUser | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<IUser | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Realiza o login do usuário.
   * @param username O nome de usuário.
   * @param password A senha.
   * @returns Um Observable com a resposta de autenticação.
   */
  login(username: string, password: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${environment.authUrl}/login`, { username, password })
      .pipe(map(response => {
        if (response.user && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  /**
   * Realiza o logout do usuário.
   */
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
  
  /**
   * Recupera o token do local storage.
   * @returns O token armazenado ou null se não houver token.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Verifica se o usuário está logado.
   * @returns True se o usuário estiver logado, caso contrário, false.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Verifica se o usuário está autenticado.
   * @returns True se o usuário estiver autenticado, caso contrário, false.
   */
  isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.getToken();
  }
  
}
