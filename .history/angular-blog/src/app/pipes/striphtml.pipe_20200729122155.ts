import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striphtml'
})
export class StriphtmlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
