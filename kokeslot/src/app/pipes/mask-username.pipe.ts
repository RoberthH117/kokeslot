import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskUsername'
})
export class MaskUsernamePipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.length <= 4) {
      return value;
    }

    const first = value.substring(0, 2);
    const last = value.substring(value.length - 2);
    const masked = '*'.repeat(value.length - 4);

    return `${first}${masked}${last}`;
  }
}