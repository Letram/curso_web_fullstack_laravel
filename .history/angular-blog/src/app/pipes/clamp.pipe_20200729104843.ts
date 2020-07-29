import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clamp'
})
export class ClampPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
