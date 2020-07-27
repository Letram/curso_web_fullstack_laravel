import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public identifiedUser: any;

  public userName: string;
  public userEmail: string;
  public userDescription: string;
  public userImage_url: string;
  
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.identifiedUser = this._userService.getIdentifiedUser();
    console.log(this.identifiedUser);
    this.userName = this.identifiedUser.name;
    this.userEmail = this.identifiedUser.email;
    this.userDescription = this.identifiedUser.description;
    this.userImage_url = this.identifiedUser.image_url;
    if (this.userDescription == undefined) {
      this.identifiedUser.description = "";
      this.userDescription = "";
    }
  }

  public editUser(){
    this._userService.update({id: this.identifiedUser.sub, name: this.userName, email: this.userEmail, description: this.userDescription}).subscribe(
      (response) => {console.log(response)},
      (error) => {console.log(error)}
    );
  }

}
