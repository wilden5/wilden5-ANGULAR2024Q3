import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected isUserLoggedIn: boolean = false;

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth');
  }

  login(user: User): void {
    if (user.username && user.password) {
      this.isUserLoggedIn = true;
      localStorage.setItem('auth', JSON.stringify(user));
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/auth']);
  }
}
