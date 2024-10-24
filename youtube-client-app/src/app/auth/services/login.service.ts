import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isUserLoggedIn = signal(!!localStorage.getItem('auth'));

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth');
  }

  login(user: User): void {
    if (user.username && user.password) {
      localStorage.setItem('auth', JSON.stringify(user));
      this.router.navigate(['/']);
      this.isUserLoggedIn.set(true);
    }
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/auth']);
    this.isUserLoggedIn.set(false);
  }
}
