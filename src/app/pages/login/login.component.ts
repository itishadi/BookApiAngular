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
