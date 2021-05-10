import { AuthService } from './../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  phone: '11';
  password: 'test';
  errorMessage: '';

  @Output() onLogedIn = new EventEmitter();
  logedIn(user) {
    this.onLogedIn.emit(user);
  }
  constructor(public authService: AuthService) {}

  async login() {
    const data = {
      phone: this.phone,
      password: this.password,
    };
    console.log('data for login', data);
    const response = await this.authService.login(data);
    if (response?.message) {
      this.errorMessage = response.message;
    }
    if (response?.user) {
      this.logedIn(response.user);
    }
  }
  async register() {
    const data = {
      phone: this.phone,
      password: this.password,
    };

    console.log('data for register', data);

    try {
      const res = await this.authService.register(data);
      if (res.message) {
        this.errorMessage = res.message;
      }
    } catch (error) {}
  }

  getUserString() {
    return JSON.stringify(this.authService.getCurrentUser(), null, 2);
  }

  ngOnInit(): void {}
}
