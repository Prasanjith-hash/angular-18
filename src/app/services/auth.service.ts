import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  register(name: string, email: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((user: any) => user.email === email)) {
      return false; // Email already registered
    }
    users.push({ name, email });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ name, email }));
    return true;
  }

  login(email: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find((user: any) => user.email === email);
    if (!user) return false;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
