// src/app/pages/book-list/book-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  imports: [CommonModule, RouterModule]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error = '';

  constructor(private svc: BookService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: b => { this.books = b; this.loading = false; },
      error: () => { this.error = 'Kunde inte hämta böcker'; this.loading = false; }
    });
  }

  addBook() { this.router.navigate(['/books/new']); }
  editBook(id?: number) {
  if (id !== undefined) {
    this.router.navigate(['/books', id, 'edit']);
  }
}

deleteBook(id?: number) {
  if (id !== undefined && confirm('Ta bort?')) {
    this.svc.delete(id).subscribe(() => this.load());
  }
}

}
