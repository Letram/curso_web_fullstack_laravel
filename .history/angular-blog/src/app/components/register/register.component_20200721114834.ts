import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public userToRegister: User
  ) { }

  ngOnInit(): void {
  }

  private onUserSubmit(){
    console.log(this.userToRegister);
  }

}
