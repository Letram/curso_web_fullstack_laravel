import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'angular-blog';
  identifiedUser: User;
  
  constructor(
    private _userService: UserService,
  ) {
    this.identifiedUser = null;
  }
  
  ngDoCheck(): void {
    this.identifiedUser = this._userService.getIdentifiedUser();
    console.log(this.identifiedUser);
  }
  ngOnInit(): void {
    this.identifiedUser = this._userService.getIdentifiedUser();
  }
}
