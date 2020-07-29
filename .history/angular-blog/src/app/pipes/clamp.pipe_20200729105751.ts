import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clamp',
})
export class ClampPipe implements PipeTransform {
  transform(postBody: string, textSize: number): string {
    if (postBody.length > textSize) return `${postBody.substr(0, textSize)}...`;
    return postBody;
  }
}
