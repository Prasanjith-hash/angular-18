import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Add this
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const { name, email } = this.authForm.value;
    if (this.authService.register(name!, email!)) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Email already registered. Try logging in.';
    }
  }

  onLogin() {
    const email = this.authForm.controls.email.value;
    if (this.authService.login(email!)) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'User not found. Please register first.';
    }
  }
}
