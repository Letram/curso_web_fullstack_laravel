import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() identifiedUser: string;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.identifiedUser = null;
  }
  ngOnInit(): void {
  }

  public logout(){
    this._userService.logout();
    this._router.navigate(["/login"]);
  }

}
