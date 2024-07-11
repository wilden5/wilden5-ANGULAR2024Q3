import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  // eslint-disable-next-line class-methods-use-this
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth');
  }

  // eslint-disable-next-line class-methods-use-this
  login(user: User): void {
    if (user.username && user.password) {
      localStorage.setItem('auth', JSON.stringify(user));
      this.router.navigate(['/']);
    }
  }
}
