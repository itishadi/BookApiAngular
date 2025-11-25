// // // src/app/pages/login/login.component.ts
// // import { Component } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { AuthService } from '../../services/auth.service';

// // @Component({ selector: 'app-login', templateUrl: './login.component.html' })
// // export class LoginComponent {
// //   username = ''; password = ''; loading = false; error = '';
// //   constructor(private auth: AuthService, private router: Router) {}
// //   submit() {
// //     this.loading = true; this.error = '';
// //     this.auth.login(this.username, this.password).subscribe({
// //       next: () => this.router.navigate(['/books']),
// //       error: e => { this.error = e.error?.message || 'Fel vid inloggning'; this.loading = false; }
// //     });
// //   }
// // }

// // src/app/pages/login/login.component.ts
// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   imports: [CommonModule, FormsModule, RouterModule]
// })
// export class LoginComponent {
//   username = '';
//   password = '';
//   constructor(private auth: AuthService, private router: Router) {}
//   submit() {
//     this.auth.login(this.username, this.password).subscribe({
//       next: () => this.router.navigate(['/books'])
//     });
//   }
// }

// Begin Patch
// Update File: src/app/pages/login/login.component.ts
// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   imports: [CommonModule, FormsModule, RouterModule]
// })
//  export class LoginComponent {
//    username = '';
//    password = '';
//   loading = false;
//   error = '';
//    constructor(private auth: AuthService, private router: Router) {}
//    submit() {
//     this.auth.login(this.username, this.password).subscribe({
//       next: () => this.router.navigate(['/books'])
//     });
//     this.loading = true;
//     this.error = '';
//     this.auth.login(this.username, this.password).subscribe({
//       next: () => this.router.navigate(['/books']),
//       error: e => { this.error = e.error?.message || 'Fel vid inloggning'; this.loading = false; }
//     });
//    }
//  }
// // End Patch

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
//   imports: [CommonModule, FormsModule]
// })
// export class LoginComponent {
//   username = '';
//   password = '';
//   loading = false;
//   error = '';
//   loggedIn = false;   // <-- ny flagga

//   constructor(private auth: AuthService, private router: Router) {}

//  submit() {
//   this.loading = true;
//   this.error = '';
//   this.auth.login(this.username, this.password).subscribe({
//     next: res => {
//       localStorage.setItem('token', res.token);
//       this.loggedIn = true;
//       this.loading = false;
//       this.router.navigate(['/']);   // <-- skickar användaren till Home
//     },
//     error: e => {
//       this.error = e.error?.message || 'Fel vid inloggning';
//       this.loading = false;
//     }
//   });
// }

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]   // <-- lägg till RouterModule
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';
  loggedIn = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loggedIn = true;
        this.loading = false;
        this.router.navigate(['/home']);   // navigera till Home
      },
      error: e => {
        this.error = e.error?.message || 'Fel vid inloggning';
        this.loading = false;
      }
    });
  }
}
