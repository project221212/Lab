import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userId = '';
  password = '';
  errorMsg = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMsg = '';
    this.loading = true;
    this.auth.login(this.userId, this.password).subscribe({
      next: (res) => {
        const data = res?.data || res?.Data || res?.gridData;
        const message = res?.message || res?.Message;
        
        if (data) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMsg = message || 'Invalid User ID or Password';
          this.loading = false;
        }
      },
      error: (err) => {
        this.errorMsg = 'Internal server error';
        this.loading = false;
      }
    });
  }
}
