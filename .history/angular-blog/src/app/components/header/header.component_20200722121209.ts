import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public identifiedUser: User;

  constructor(
    private _userService: UserService
  ) {
    this.identifiedUser = null;
  }

  ngOnInit(): void {
    this.identifiedUser = this._userService.getIdentifiedUser();
  }

}
