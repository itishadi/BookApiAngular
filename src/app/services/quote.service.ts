// src/app/services/quote.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Quote { id?: number; text: string; author: string; }
@Injectable({ providedIn: 'root' })
export class QuoteService {
  private base = `${environment.apiBaseUrl}/api/quotes`;
  constructor(private http: HttpClient) {}
  getMy(): Observable<Quote[]> { return this.http.get<Quote[]>(`${this.base}/my`); }
  create(q: Quote): Observable<Quote> { return this.http.post<Quote>(this.base, q); }
  update(id: number, q: Quote) { return this.http.put(`${this.base}/${id}`, q); }
  delete(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
