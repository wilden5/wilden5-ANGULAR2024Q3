import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // eslint-disable-next-line class-methods-use-this
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth');
  }
}
