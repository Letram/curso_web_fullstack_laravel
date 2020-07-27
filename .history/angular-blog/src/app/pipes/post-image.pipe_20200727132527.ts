import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postImage'
})
export class PostImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
