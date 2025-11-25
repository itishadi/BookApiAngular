// src/app/services/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Book { id?: number; title: string; author: string; publishedDate: string; }

@Injectable({ providedIn: 'root' })
export class BookService {
  private base = `${environment.apiBaseUrl}/api/books`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Book[]> { return this.http.get<Book[]>(this.base); }
  get(id: number): Observable<Book> { return this.http.get<Book>(`${this.base}/${id}`); }
  create(book: Book): Observable<Book> { return this.http.post<Book>(this.base, book); }
  update(id: number, book: Book) { return this.http.put(`${this.base}/${id}`, book); }
  delete(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
