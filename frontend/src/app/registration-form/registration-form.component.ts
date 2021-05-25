import { randomInteger } from 'src/assets/utils';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  public showVerifyCodeInput = false;

  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const user = this.authService.getCurrentUser();

    if (!this.authService.isAuthenticated && user) {
      this.registrationForm.patchValue({
        phone: user.phone_number,
      });
    }
  }

  ngDoCheck(): void {}

  initForm() {
    this.registrationForm = new FormGroup({
      name: new FormControl(``, []),
      email: new FormControl(``, [Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('380[0-9]{9}'),
      ]),
      password: new FormControl(``, [
        Validators.required,
        Validators.minLength(14),
        Validators.pattern(
          new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g')
        ),
      ]),
      password2: new FormControl(``, [
        Validators.required,
        Validators.minLength(14),
        Validators.pattern(
          new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g')
        ),
      ]),
      isDriver: new FormControl(true),
      carColor: new FormControl('', [Validators.required]),
      verifyCode: new FormControl('', []),

      carModel: new FormControl('', [Validators.required]),
      carNumber: new FormControl('', [Validators.required]),
      carType: new FormControl('basic', [Validators.required]),
    });

    this.registrationForm.get('password2').valueChanges.subscribe(() => {
      this.comparePasswords();
    });
    this.registrationForm.get('password').valueChanges.subscribe(() => {
      this.comparePasswords();
    });
  }

  comparePasswords = () => {
    const pas1Value = this.registrationForm.get('password');
    const pas2Value = this.registrationForm.get('password2');

    if (pas1Value.dirty && pas2Value.dirty) {
      const isEquel =
        pas1Value.value === pas2Value.value &&
        pas1Value.value.trim() !== '' &&
        pas2Value.value.trim() !== '';
      if (!isEquel) {
        pas1Value.setErrors({ ...pas1Value.errors, isEquel: true });
        pas2Value.setErrors({ ...pas2Value.errors, isEquel: true });
      } else {
        let errors1 = pas1Value.errors;
        let errors2 = pas2Value.errors;
        let length1 = 1,
          length2 = 1;

        if (errors1) {
          length1 = Object.keys(errors1).length;
          errors1 = { ...errors1 };
          delete errors1['isEquel'];
        }
        if (errors2) {
          length2 = Object.keys(errors2).length;
          errors2 = { ...errors2 };
          delete errors2['isEquel'];
        }

        pas1Value.setErrors(length1 === 1 ? null : errors1);
        pas2Value.setErrors(length2 === 1 ? null : errors2);
      }
    }
  };

  async register() {
    if (this.registrationForm.value.isDriver) {
      const body = {
        userInfo: {
          phone: this.registrationForm.value.phone,
          password: this.registrationForm.value.password,
          email: this.registrationForm.value.email || '',
          name: this.registrationForm.value.name || '',
          verifyCode: this.registrationForm.value.verifyCode,
        },
        driverInfo: {
          carType: this.registrationForm.value.carType,
          carColor: this.registrationForm.value.carColor,
          carNumber: this.registrationForm.value.carNumber,
          carModel: this.registrationForm.value.carModel,
        },
      };
      const resp = await this.authService.registerDriver(body);

      if (resp.user) {
        this.router.navigate(['/user/info']);
        this.notification.addNotification({
          message: 'You successfully registered in app.',
          title: '',
          timer: 5000,
        });
      }

      if (resp?.message) {
        this.notification.addNotification({
          message: resp.message,
          title: 'Error: ',
          timer: 5000,
        });
      }
      if (resp?.status === 'NOT_VERIFIED') {
        this.notification.addNotification({
          message: this.registrationForm.value.phone,
          title: 'We sent you verify code on this phone number ',
          timer: 5000,
        });

        this.showVerifyCodeInput = true;
      }
    } else {
      const body = {
        phone: this.registrationForm.value.phone,
        password: this.registrationForm.value.password,
        verifyCode: this.registrationForm.value.verifyCode,
      };
      const resp = await this.authService.register(body);

      if (resp.user) {
        this.router.navigate(['/user/info']);
      }

      if (resp?.message) {
        this.notification.addNotification({
          message: resp.message,
          title: 'Error: ',
          timer: 7000,
        });
      }
      if (resp?.status === 'NOT_VERIFIED') {
        this.showVerifyCodeInput = true;

        this.registrationForm
          .get('verifyCode')
          .setValidators([Validators.required]);
        this.registrationForm.updateValueAndValidity();

        this.notification.addNotification({
          message: this.registrationForm.value.phone,
          title: 'We sent you verify code on this phone number ',
          timer: 5000,
        });

        const verifyCode = resp.verifyCode;

        if (verifyCode.code !== 0) {
          this.notification.addNotification({
            message: '',
            title: 'SMS notification service not avaliable.',
            timer: 5000,
          });
        }
      }
    }
  }
}
