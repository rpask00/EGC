import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidator {
    static onlyNumbers(control: AbstractControl): ValidationErrors | null {
        if (control.value) {
            var x = control.value

            const regex = /[0-9]| /g;
            const nospace = /[0-9]/g;

            let res = x.match(regex) || []
            let resnospace = x.match(nospace) || []


            let test = res.join('') == x && resnospace.length == 9
            return !test ? { 'forbiddenName': { value: control.value } } : null;
        }
    }

}
