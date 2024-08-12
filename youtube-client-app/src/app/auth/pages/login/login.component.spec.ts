import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

describe('login component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, BrowserAnimationsModule, CustomButtonComponent],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have username and password form controls', () => {
    expect(component.loginForm.contains('username')).toBe(true);
    expect(component.loginForm.contains('password')).toBe(true);
  });

  it('should require username and password', () => {
    const username = component.loginForm.get('username');
    const password = component.loginForm.get('password');

    username?.setValue('');
    password?.setValue('');

    expect(username?.valid).toBeFalsy();
    expect(password?.valid).toBeFalsy();
  });
});
