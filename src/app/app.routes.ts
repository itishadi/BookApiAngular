import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { QuotesComponent } from './pages/quotes/quotes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },   // root -> login
  { path: 'home', component: HomeComponent },             // home på egen path
  { path: 'books', component: BookListComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books/:id/edit', component: BookFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: '**', redirectTo: 'login' }                     // fallback
];

