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

  public isDriver: boolean;

  public name: string;
  public phone: string;
  public email: string;
  public password: string;

  public carColor: string;
  public carModel: string;
  public carNumber: string;
  public currentRequest: string;

  constructor(public authService: AuthService) {}

  setUser() {
    this.name = this.user.name;
    this.phone = this.user.phone_number;
    this.email = this.user.email;
    this.password = this.user.password;
    this.isDriver = false;

    if (this.user?.driverInfo) {
      this.setDriver();
    }
  }

  setDriver() {
    this.carColor = this.user.driverInfo.car_color;
    this.carModel = this.user.driverInfo.car_model;
    this.carNumber = this.user.driverInfo.car_number;
    this.currentRequest = this.user.driverInfo.request_id;
    this.isDriver = true;
  }

  updateUser() {
    this.authService.updateUser({
      id: this.user.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
    });

    if (this.isDriver) {
      this.updateDriver();
    }
  }

  updateDriver() {
    this.authService.updateDriver({
      id: this.user.driverInfo.id,
      carColor: this.carColor,
      carModel: this.carModel,
      carNumber: this.carNumber,
    });
  }

  logout() {
    this.authService.logout();
    this.onLogedOut.emit();
  }

  ngOnInit(): void {
    console.log('user in info comp', this.user);
    this.setUser();
  }
}
