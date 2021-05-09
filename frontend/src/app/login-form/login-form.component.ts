import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  phone: '11';
  password: 'test';
  constructor(public authService: AuthService) {}

  async login() {
    const data = {
      phone: this.phone,
      password: this.password,
    };
    console.log('data for login', data);
    const response = await this.authService.login(data);

    if (response?.user) {
      localStorage.setItem('token', response.token);
    }
  }
  async register() {
    const data = {
      phone: this.phone,
      password: this.password,
    };

    console.log('data for register', data);

    try {
      const { token } = await this.authService.register(data);
      localStorage.setItem('token', token);
    } catch (error) {}
  }

  logout() {
    this.authService.setCurrentUser(undefined);
  }

  getUserString() {
    return JSON.stringify(this.authService.getCurrentUser(), null, 2);
  }

  ngOnInit(): void {}
}
