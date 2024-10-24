import { AbstractControl, ValidationErrors } from '@angular/forms';

export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value.length < 8) {
    return { length: true };
  }

  if (!/^(?=.*[a-z]).+$/.test(control.value)) {
    return { lowerCaseLetter: true };
  }

  if (!/^(?=.*[A-Z]).+$/.test(control.value)) {
    return { upperCaseLetter: true };
  }

  if (!/^(?=.*[a-zA-Z]).+$/.test(control.value)) {
    return { anyLetter: true };
  }

  if (!/^(?=.*\d).+$/.test(control.value)) {
    return { digit: true };
  }

  if (!/^(?=.*[^A-Za-z0-9]).+$/.test(control.value)) {
    return { specialCharacter: true };
  }

  return null;
}
