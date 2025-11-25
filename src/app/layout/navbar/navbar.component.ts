// // src/app/layout/navbar/navbar.component.ts
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-navbar',              // <-- rätt selector
//   standalone: true,
//   templateUrl: './navbar.component.html', // <-- pekar på sin egen HTML-fil
//   styleUrls: ['./navbar.component.scss'], // om du har en SCSS-fil
//   imports: [CommonModule, RouterModule]
// })
// export class NavbarComponent {
//   isDark = false;

//   toggleTheme() {
//     this.isDark = !this.isDark;
//     document.body.classList.toggle('dark', this.isDark);
//   }
// }
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

  // constructor(public auth: AuthService) {
  //   // prenumerera på loginstatus
  //   this.auth.isLoggedIn().subscribe(status => this.loggedIn = status);
  // }

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

  // logout() {
  //   this.auth.logout();
  // }
}
