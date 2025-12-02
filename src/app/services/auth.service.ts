import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap, BehaviorSubject } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBaseUrl}/api/auth`;
  private loggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('jwt'));

  constructor(private http: HttpClient) {}

  // 👇 Registrering med text-svar
  register(username: string, password: string): Observable<string> {
    return this.http.post(
      `${this.base}/register`,
      { username, password },
      { responseType: 'text' } // 👈 viktigt: backend returnerar plain text
    );
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, { username, password }).pipe(
      tap(res => {
        localStorage.setItem('jwt', res.token);
        this.loggedIn$.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.loggedIn$.next(false);
  }

  get token(): string | null {
    return localStorage.getItem('jwt');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}
