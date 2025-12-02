// // src/app/pages/quotes/quotes.component.ts
// import { Component, OnInit } from '@angular/core';
// import { QuoteService, Quote } from '../../services/quote.service';

// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';


// @Component({ 
//     selector: 'app-quotes',
//   standalone: true,
//   templateUrl: './quotes.component.html',
//   imports: [CommonModule, FormsModule]
//  })
// export class QuotesComponent implements OnInit {
//   quotes: Quote[] = []; text = ''; author = ''; editId: number | null = null;
//   constructor(private svc: QuoteService) {}
//   ngOnInit() {
//     this.svc.getMy().subscribe(q => {
//       this.quotes = q.length ? q : [
//         { text: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
//         { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
//         { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
//         { text: 'Programs must be written for people to read.', author: 'Harold Abelson' },
//         { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' }
//       ];
//     });
//   }
//   save() {
//     const q: Quote = { text: this.text, author: this.author };
//     if (this.editId) {
//       this.svc.update(this.editId, q).subscribe(() => { this.editId = null; this.clear(); this.refresh(); });
//     } else {
//       this.svc.create(q).subscribe(() => { this.clear(); this.refresh(); });
//     }
//   }
//   edit(q: Quote) { this.editId = q.id ?? null; this.text = q.text; this.author = q.author; }
//   remove(id: number) { if (confirm('Ta bort?')) this.svc.delete(id).subscribe(() => this.refresh()); }
//   refresh() { this.svc.getMy().subscribe(q => this.quotes = q); }
//   clear() { this.text = ''; this.author = ''; }
// }




import { Component, OnInit } from '@angular/core';
import { QuoteService, Quote } from '../../services/quote.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotes',
  standalone: true,
  templateUrl: './quotes.component.html',
  imports: [CommonModule, FormsModule]
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] = [];
  text = '';
  author = '';
  editId: number | null = null;

  constructor(private svc: QuoteService) {}

  ngOnInit() {
    this.refresh();
  }

  save() {
    const q: Partial<Quote> = { text: this.text, author: this.author };
    if (this.editId) {
      this.svc.update(this.editId, q).subscribe(() => {
        this.editId = null;
        this.clear();
        this.refresh();
      });
    } else {
      this.svc.create(q).subscribe(() => {
        this.clear();
        this.refresh();
      });
    }
  }

  edit(q: Quote) {
    this.editId = q.id;
    this.text = q.text;
    this.author = q.author;
  }

  remove(id: number) {
    if (confirm('Ta bort?')) {
      this.svc.delete(id).subscribe(() => this.refresh());
    }
  }

  refresh() {
    this.svc.getMy().subscribe(q => {
      this.quotes = q.length ? q : [
        { id: 0, text: 'Stay hungry, stay foolish.', author: 'Steve Jobs', userId: 0, username: 'demo' },
        { id: 0, text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci', userId: 0, username: 'demo' },
        { id: 0, text: 'Make it work, make it right, make it fast.', author: 'Kent Beck', userId: 0, username: 'demo' },
        { id: 0, text: 'Programs must be written for people to read.', author: 'Harold Abelson', userId: 0, username: 'demo' },
        { id: 0, text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds', userId: 0, username: 'demo' }
      ];
    });
  }

  clear() {
    this.text = '';
    this.author = '';
  }
}
