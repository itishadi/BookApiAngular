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
//   loading = false;

//   constructor(private auth: AuthService, private router: Router) {}

//   submit() {
//   this.error = '';
//   this.msg = '';
//   this.loading = true;

// //   this.auth.register(this.username, this.password).subscribe({
// //     next: () => {
// //       this.msg = '✅ Användare skapad! Logga in nu.';
// //       this.loading = false;
// //       this.router.navigate(['/login']);
// //     },
// //   error: (e: HttpErrorResponse) => {
// //   if (e.status === 400 && e.error?.message?.includes('exists')) {
// //     this.error = '❌ Användaren finns redan.';
// //   } else  {
// //     this.msg = '✅ Användare skapad!';
// //   } 
// //   this.loading = false;
// // }
// // });
// this.auth.register(this.username, this.password).subscribe({
//   next: () => {
//     this.msg = '✅ Användare skapad! Logga in nu.';
//     this.loading = false;
//     this.router.navigate(['/login']);
//   },
//   error: (e: HttpErrorResponse) => {
//   if (e.status === 400 && e.error?.message?.includes('exists')) {
//     this.error = '❌ Användaren finns redan.';
//   } else if (e.status === 400) {
//     this.error = '❌ Ogiltigt användarnamn eller lösenord.';
//   } else {
//     this.error = '❌ Något gick fel vid registreringen.';
//   }
//   this.loading = false;
// }
// });

// }
// }

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
//   loading = false;

//   constructor(private auth: AuthService, private router: Router) {}

//   submit(): void {
//     // Nollställ status
//     this.error = '';
//     this.msg = '';
//     this.loading = true;

//     this.auth.register(this.username, this.password).subscribe({
//       next: () => {
//         this.msg = '✅ Användare skapad! Logga in nu.';
//         this.router.navigate(['/login']);
//       },
//       error: (e: HttpErrorResponse) => {
//         if (e.status === 400 && e.error?.message?.includes('exists')) {
//           this.error = '❌ Användaren finns redan.';
//         } else if (e.status === 400) {
//           this.error = '❌ Ogiltigt användarnamn eller lösenord.';
//         } else {
//           this.error = '❌ Något gick fel vid registreringen.';
//         }
//       },
//       complete: () => {
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
import { finalize } from 'rxjs/operators';

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

  submit(): void {
    this.error = '';
    this.msg = '';
    this.loading = true;

    console.log('Register payload:', { username: this.username, password: this.password });

    this.auth.register(this.username, this.password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res: string) => {
          console.log('Register success response:', res);
          this.msg = '✅ Användare skapad! Logga in nu.';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (e: HttpErrorResponse) => {
          console.error('Register error:', e.status, e.error);
          if (e.status === 400 && e.error?.message?.includes('exists')) {
            this.error = '❌ Användaren finns redan.';
          } else if (e.status === 400) {
            this.error = '❌ Ogiltigt användarnamn eller lösenord.';
          } else {
            this.error = `❌ Något gick fel vid registreringen. (Status: ${e.status})`;
          }
        }
      });
  }
}
