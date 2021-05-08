import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  phone: 11;
  password: 'test';
  constructor() {}

  login() {
    const data = {
      phone: this.phone,
      password: this.password,
    };
    const res = fetch('http://localhost:8080/user/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    console.log(data, 'data for login');

    res
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      });
  }

  ngOnInit(): void {}
}
