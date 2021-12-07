import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static passwordsMatch(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ passwordMatching: true });
        return { passwordMatching: true };
      } else {
        return null;
      }
    };
  }

  static emailMatch(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ emailMatching: true });
        return { emailMatching: true };
      } else {
        return null;
      }
    };
  }
}
