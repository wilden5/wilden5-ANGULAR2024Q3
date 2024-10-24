import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  if (new Date(control.value).getTime() > new Date().getTime()) {
    return { futureDate: true };
  }

  return null;
}
