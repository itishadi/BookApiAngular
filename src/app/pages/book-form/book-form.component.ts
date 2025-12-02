// src/app/pages/book-form/book-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class BookFormComponent implements OnInit {
  model: Book = { title: '', author: '', publishedDate: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: BookService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.svc.get(+id).subscribe(b => this.model = b);
    }
  }

  submit() {
    if (this.isEdit && this.model.id) {
      this.svc.update(this.model.id, this.model).subscribe(() => this.router.navigate(['/books']));
    } else {
      this.svc.create(this.model).subscribe(() => this.router.navigate(['/books']));
    }
  }

  // Use this from the template
  cancel() {
    this.router.navigate(['/books']);
  }
}
