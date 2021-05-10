import { AuthService } from './../services/auth.service';
import { environment } from './../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user;
  @Output() onLogedOut = new EventEmitter();

  public name: string;
  public phone: string;
  public email: string;
  public password: string;

  constructor(public authService: AuthService) {}

  setUser() {
    this.name = this.user.name;
    this.phone = this.user.phone_number;
    this.email = this.user.email;
    this.password = this.user.password;
  }

  updateUser() {
    this.authService.updateUser({
      id: this.user.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
    });
  }

  logout() {
    this.authService.logout();
    this.onLogedOut.emit();
  }

  ngOnInit(): void {
    this.setUser();
  }
}
