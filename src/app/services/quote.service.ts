import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// Matchar backend-svaret
export interface Quote {
  id: number;
  text: string;
  author: string;
  userId: number;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private base = `${environment.apiBaseUrl}/api/quotes`;

  constructor(private http: HttpClient) {}

  getMy(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.base}/my`);
  }

  create(q: Partial<Quote>): Observable<Quote> {
    return this.http.post<Quote>(this.base, q);
  }

  update(id: number, q: Partial<Quote>): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, q);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
