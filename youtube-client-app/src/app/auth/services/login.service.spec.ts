import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { User } from '../models/user';

describe('login service', () => {
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loginService = TestBed.inject(LoginService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it('should login user when credentials are provided', () => {
    const user: User = {
      username: 'test@test.com',
      password: 'test123',
    };

    loginService.login(user);

    expect(localStorage.getItem('auth')).toEqual(JSON.stringify(user));
    expect(loginService.isUserLoggedIn).toBeTruthy();
  });

  it('should not login if username is empty', () => {
    const user: User = {
      username: '',
      password: 'test123',
    };

    loginService.login(user);

    expect(localStorage.getItem('auth')).toBeNull();
  });

  it('should not login if password is empty', () => {
    const user: User = {
      username: 'test@test.com',
      password: '',
    };

    loginService.login(user);

    expect(localStorage.getItem('auth')).toBeNull();
  });

  it('should logout user', () => {
    const user: User = {
      username: 'test@test.com',
      password: 'test123',
    };

    loginService.login(user);

    loginService.logout();

    expect(localStorage.getItem('auth')).toBeNull();
  });
});
