import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isUserLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('auth'));

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth');
  }

  login(user: User): void {
    if (user.username && user.password) {
      localStorage.setItem('auth', JSON.stringify(user));
      this.router.navigate(['/']);
      this.isUserLoggedIn.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/auth']);
    this.isUserLoggedIn.next(false);
  }
}
