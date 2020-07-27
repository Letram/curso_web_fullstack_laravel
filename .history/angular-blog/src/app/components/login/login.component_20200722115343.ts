import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    this._userService.login(this.userToRegister, true).subscribe(
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
