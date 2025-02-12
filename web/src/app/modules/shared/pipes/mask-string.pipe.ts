import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskString'
})
export class MaskStringPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) {
      return ''; 
    }

    const length = value.length;

    if (length <= 10) {
      if (length <= 2) {
        return value; 
      }
      const firstChar = value.charAt(0);
      const lastChar = value.charAt(length - 1);
      return `${firstChar}*${lastChar}`;
    } else {
      const first5 = value.substring(0, 5);
      const last5 = value.substring(length - 5);
      const middle = '*'.repeat(length - 10);
      return `${first5}${middle}${last5}`;
    }
  }

}
