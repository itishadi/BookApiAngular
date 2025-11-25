// // src/app/pages/register/register.component.ts
// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({ 
//   selector: 'app-register',
//   standalone: true,
//   templateUrl: './register.component.html',
//   imports: [CommonModule, FormsModule, RouterModule]
//   })
// export class RegisterComponent {
//   username = ''; password = ''; msg = ''; error = '';
//   constructor(private auth: AuthService, private router: Router) {}
//   submit() {
//     this.auth.register(this.username, this.password).subscribe({
//       next: () => { this.msg = 'Registrerad! Logga in nu.'; this.router.navigate(['/login']); },
//       error: e => this.error = e.error?.message || 'Fel vid registrering'
//     });
//   }
// }

// src/app/pages/register/register.component.ts
// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({ 
//   selector: 'app-register',
//   standalone: true,
//   templateUrl: './register.component.html',
//   imports: [CommonModule, FormsModule, RouterModule]
// })
// export class RegisterComponent {
//   username = '';
//   password = '';
//   msg = '';
//   error = '';
//   loading = false;   // <-- lägg till denna

//   constructor(private auth: AuthService, private router: Router) {}

//   submit() {
//     this.error = '';
//     this.msg = '';
//     this.loading = true;

//     this.auth.register(this.username, this.password).subscribe({
//       next: () => {
//         this.msg = 'Registrerad! Logga in nu.';
//         this.loading = false;
//         this.router.navigate(['/login']);
//       },
//       error: (e: HttpErrorResponse) => {
//         this.error = e.error?.message || 'Fel vid registrering';
//         this.loading = false;
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({ 
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  username = '';
  password = '';
  msg = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
  this.error = '';
  this.msg = '';
  this.loading = true;

  this.auth.register(this.username, this.password).subscribe({
    next: () => {
      this.msg = '✅ Användare skapad! Logga in nu.';
      this.loading = false;
      this.router.navigate(['/login']);
    },
  error: (e: HttpErrorResponse) => {
  if (e.status === 400 && e.error?.message?.includes('exists')) {
    this.error = '❌ Användaren finns redan.';
  } else  {
    this.msg = '✅ Användare skapad!';
  } 
  this.loading = false;
}
});
}
}
