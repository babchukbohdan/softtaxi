import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public user;
  constructor(public authService: AuthService) {}

  onLogedIn(user) {
    this.user = user;
  }
  onLogedOut() {
    console.log('logout in user');
    this.user = null;
  }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
}
