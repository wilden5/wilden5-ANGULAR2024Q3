import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { strongPasswordValidator } from '../../validators/strong-password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, strongPasswordValidator]],
  });

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  onLoginClick(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as User);
    }
  }

  getUsernameErrorMessage(): string {
    const usernameControl = this.loginForm.get('username');

    if (usernameControl?.hasError('required')) {
      return 'Please enter a login email';
    }

    if (usernameControl?.hasError('email')) {
      return 'The login email is invalid';
    }

    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');

    if (passwordControl?.hasError('required')) {
      return 'Please enter a password';
    }

    if (passwordControl?.hasError('length')) {
      return 'at least 8 characters';
    }

    if (passwordControl?.hasError('lowerCaseLetter') || passwordControl?.hasError('upperCaseLetter')) {
      return 'a mixture of both uppercase and lowercase letters';
    }

    if (passwordControl?.hasError('anyLetter') || passwordControl?.hasError('digit')) {
      return 'a mixture of letters and numbers';
    }

    if (passwordControl?.hasError('specialCharacter')) {
      return 'at least one special character, e.g., ! @ # ?';
    }

    return '';
  }
}
