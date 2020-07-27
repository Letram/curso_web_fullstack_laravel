import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userImage'
})
export class UserImagePipe implements PipeTransform {

  transform(image_url: string): string {
    if(image_url == "" || image_url == null)
      return "../../assets/user_default.png";
    else
      return image_url;
  }

}
