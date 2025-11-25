import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent {
  isDark = false;
  loggedIn = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
  }
constructor(public auth: AuthService, private router: Router) {
  this.auth.isLoggedIn().subscribe(status => this.loggedIn = status);
}

logout() {
  this.auth.logout();
  this.router.navigate(['/login']); // skickar användaren till login-sidan
}
}
