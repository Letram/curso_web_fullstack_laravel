import { global } from './../../services/global';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userToRegister: User;
  public status: number;
  constructor(
    private _userService: UserService
  ) {
    this.status = 0; //-1 es que ha ido mal, 1 es que ha ido bien
    this.userToRegister = new User( 0, "", "", "", "", "", "" );
    /**
     *  public id: number,
        public name: string,
        public email: string,
        public password: string,
        public image_url: string,
        public description: string,
        public role: string
     */
  }

  ngOnInit(): void {
  }

  public onSubmit(registerForm){
    this._userService.register(this.userToRegister).subscribe(
      (response) => {
        console.log(response);
        this.status=1;
        registerForm.reset();
      },
      (errorResponse) => {
        console.error(errorResponse.error);
        this.status = -1;
      }
    );
  }
}
