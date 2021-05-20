import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationService } from './../services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public errorMessage: string = '';
  public loginForm: FormGroup;

  @Output() onLogedIn = new EventEmitter();
  logedIn(user) {
    this.onLogedIn.emit(user);
  }
  constructor(
    public authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const user = this.authService.getCurrentUser();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['user/info']);
    } else if (user) {
      this.loginForm.patchValue({
        phone: user.phone_number,
      });
    }
  }

  initForm() {
    this.loginForm = new FormGroup({
      phone: new FormControl('380954061246', [
        Validators.required,
        Validators.pattern('380[0-9]{9}'),
      ]),
      password: new FormControl(`test`, [Validators.required]),
    });
  }

  // async loginAsDriver() {
  //   const body = {
  //     phone: this.loginForm.value.phone,
  //     password: this.loginForm.value.password,
  //   };
  //   const driver = await this.authService.getFullDriver(body);
  //   // console.log('driver', driver);
  //   if (driver?.message) {
  //     this.errorMessage = driver.message;
  //   }
  //   if (driver?.driverInfo) {
  //     this.logedIn(driver);
  //   }
  // }

  async login() {
    const data = {
      phone: this.loginForm.value.phone,
      password: this.loginForm.value.password,
    };
    const response = await this.authService.login(data);

    if (response?.message) {
      this.errorMessage = response.message;
    }
    if (response?.user) {
      this.logedIn(response.user);
      this.router.navigate(['/user/info']);
    }
    if (response?.status === 'NOT_VERIFIED') {
      this.router.navigate(['/user/registration']);
      this.notification.addNotification({
        message: 'You should register in app first',
        title: '',
      });
    }
  }

  // async register() {
  //   this.errorMessage = '';
  //   const data = {
  //     phone: this.phone,
  //     password: this.password,
  //   };

  //   console.log('data for register', data);

  //   try {
  //     const res = await this.authService.register(data);
  //     if (res.message) {
  //       this.errorMessage = res.message;
  //     }

  //     return res;
  //   } catch (error) {
  //     this.errorMessage = error;
  //   }
  // }
}
