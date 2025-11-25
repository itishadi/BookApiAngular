// // // src/app/services/auth.service.ts
// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { environment } from '../../environments/environment';
// // import { Observable, tap } from 'rxjs';

// // interface LoginResponse { token: string; }
// // @Injectable({ providedIn: 'root' })
// // export class AuthService {
// //   private base = `${environment.apiBaseUrl}/api/auth`;
// //   constructor(private http: HttpClient) {}
// //   register(username: string, password: string) {
// //     return this.http.post(`${this.base}/register`, { username, passwordHash: password });
// //   }
// //   login(username: string, password: string): Observable<LoginResponse> {
// //     return this.http.post<LoginResponse>(`${this.base}/login`, { username, passwordHash: password })
// //       .pipe(tap(res => localStorage.setItem('jwt', res.token)));
// //   }
// //   logout() { localStorage.removeItem('jwt'); }
// //   get token() { return localStorage.getItem('jwt'); }
// //   get isAuthenticated() { return !!this.token; }
// // }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { Observable, tap } from 'rxjs';

// // Svar från login-endpoint
// interface LoginResponse {
//   token: string;
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private base = `${environment.apiBaseUrl}/api/auth`;

//   constructor(private http: HttpClient) {}

//   // Registrera ny användare
//   register(username: string, password: string): Observable<any> {
//     // OBS: kontrollera med backend om det ska vara "password" eller "passwordHash"
//     return this.http.post(`${this.base}/register`, { username, password });
//   }

//   // Logga in och spara JWT-token i localStorage
//   login(username: string, password: string): Observable<LoginResponse> {
//     return this.http
//       .post<LoginResponse>(`${this.base}/login`, { username, password })
//       .pipe(tap(res => localStorage.setItem('jwt', res.token)));
//   }

//   // Logga ut
//   logout(): void {
//     localStorage.removeItem('jwt');
//   }

//   // Hämta token
//   get token(): string | null {
//     return localStorage.getItem('jwt');
//   }

//   // Kontrollera om användaren är inloggad
//   get isAuthenticated(): boolean {
//     return !!this.token;
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { Observable, tap } from 'rxjs';

// // Svar från login-endpoint
// interface LoginResponse {
//   token: string;
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private base = `${environment.apiBaseUrl}/api/auth`;

//   constructor(private http: HttpClient) {}

// //   // Registrera ny användare
// //   register(username: string, password: string): Observable<any> {
// //     // Backend förväntar sig fältet "passwordHash"
// //     return this.http.post(`${this.base}/register`, {
// //       username,
// //       passwordHash: password
// //     });
// //   }

// register(username: string, password: string): Observable<any> {
//   return this.http.post(`${this.base}/register`, {
//     username,
//     passwordHash: password   // OBS: backend vill ha fältet "passwordHash"
//   });
// }



//   // Logga in och spara JWT-token i localStorage
//   login(username: string, password: string): Observable<LoginResponse> {
//     // Backend förväntar sig fältet "passwordHash"
//     return this.http
//       .post<LoginResponse>(`${this.base}/login`, {
//         username,
//         passwordHash: password
//       })
//       .pipe(tap(res => localStorage.setItem('jwt', res.token)));
//   }

//   // Logga ut
//   logout(): void {
//     localStorage.removeItem('jwt');
//   }

//   // Hämta token
//   get token(): string | null {
//     return localStorage.getItem('jwt');
//   }

//   // Kontrollera om användaren är inloggad
//   get isAuthenticated(): boolean {
//     return !!this.token;
//   }
// }

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

  // BehaviorSubject håller koll på loginstatus
  private loggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('jwt'));

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.base}/register`, {
      username,
      passwordHash: password
    });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.base}/login`, {
        username,
        passwordHash: password
      })
      .pipe(
        tap(res => {
          localStorage.setItem('jwt', res.token);
          this.loggedIn$.next(true);   // markera som inloggad
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.loggedIn$.next(false);        // markera som utloggad
  }

  get token(): string | null {
    return localStorage.getItem('jwt');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  // Ny metod: observable för loginstatus
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}
