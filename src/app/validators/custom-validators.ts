import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidator {
  static onlyNumbers(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const x = control.value;

      const regex = /[0-9]| /g;
      const nospace = /[0-9]/g;

      const res = x.match(regex) || [];
      const resnospace = x.match(nospace) || [];

      const test = res.join('') == x && resnospace.length == 9;
      return !test ? {forbiddenName: {value: control.value}} : null;
    }
  }
}
