import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public identifiedUser: User;

  public name: string;
  public email: string;
  public description: string;
  public image_url: string;
  
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.identifiedUser = this._userService.getIdentifiedUser();
    console.log(this.identifiedUser);
    this.name = this.identifiedUser.name;
    this.email = this.identifiedUser.email;
    this.description = this.identifiedUser.description;
    this.image_url = this.identifiedUser.image_url;
  }

}
