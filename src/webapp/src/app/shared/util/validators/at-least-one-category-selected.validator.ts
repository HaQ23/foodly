import { AbstractControl, ValidatorFn } from '@angular/forms';

export function atLeastOneCategorySelectedValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const categories = control.value;
    if (Array.isArray(categories) && categories.length > 0) {
      return null;
    } else {
      return { atLeastOneCategorySelected: true };
    }
  };
}
