import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minMaxValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const minPrice = control.get('minPrice').value;
    const maxPrice = control.get('maxPrice').value;

    if (minPrice !== '' && maxPrice !== '' && maxPrice > minPrice) {
      return { minGreaterThanMax: true };
    }

    return null;
  };
}
