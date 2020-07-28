import { global } from './../services/global';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postImage'
})
export class PostImagePipe implements PipeTransform {

  transform(image_url: string): string {
    if(image_url == "" || image_url == null)
      return "assets/post_default.png";
    else{
      return `${global.url_api}/posts/download?image_url=${image_url}`;
    }
  }

}
