import { randomInteger } from 'src/assets/utils';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NotificationService } from '../services/notification.service';

const checkPasswordStrength = (pass: string): boolean => {
  const regEx = new RegExp(
    '^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$',
    'g'
  );

  const res = regEx.test(pass);
  return res;
};

export class MyValidators {
  static strongPassword(control: FormControl): { [key: string]: boolean } {
    const isStrong = checkPasswordStrength(control.value);
    console.log('isStrong', isStrong);

    if (!isStrong) {
      return {
        weakPassword: true,
      };
    }

    const length = Object.keys(control.errors).length;
    const errors = { ...control.errors };
    delete errors['weakPassword'];

    console.log('errors', Object.keys(control.errors));
    console.log('errors', typeof length);

    console.log('returned errors', errors);
    console.log('returned bool', length === 1 ? null : errors);

    return length === 1 ? null : errors;
  }
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  public errorMessage = '';
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
      console.log('set phone in register');

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
      phone: new FormControl('380954061246', [
        Validators.required,
        Validators.pattern('380[0-9]{9}'),
      ]),
      password: new FormControl(`test`, [
        Validators.required,
        // MyValidators.strongPassword,
        Validators.pattern(
          new RegExp(
            '^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$',
            'g'
          )
        ),
        Validators.minLength(14),
      ]),
      password2: new FormControl(`test`, [
        Validators.required,
        Validators.pattern(
          new RegExp(
            '^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$',
            'g'
          )
        ),
        Validators.minLength(14),
        // MyValidators.strongPassword,
      ]),
      isDriver: new FormControl(true),
      carColor: new FormControl('white', [Validators.required]),
      verifyCode: new FormControl('', []),

      carModel: new FormControl('audi', [Validators.required]),
      carNumber: new FormControl('ce3333aa', [Validators.required]),
      carType: new FormControl('basic', [Validators.required]),
    });

    // this.registrationForm.valueChanges.subscribe(() => {
    //   console.log(this.registrationForm, 'form');
    // });

    // same valuer for passwords
    this.registrationForm.get('password2').valueChanges.subscribe(() => {
      this.comparePasswords();
      console.log(this.registrationForm.get('password2'));
    });
    this.registrationForm.get('password').valueChanges.subscribe(() => {
      console.log(this.registrationForm.get('password'));

      this.comparePasswords();
    });

    // this.registrationForm
    //     .get('verifyCode')
    //     .setValidators([Validators.required]);
  }

  comparePasswords = () => {
    const pas1Value = this.registrationForm.get('password');
    const pas2Value = this.registrationForm.get('password2');

    console.log(pas1Value, 'b pass 1');
    console.log(pas2Value, 'b pass 2');

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
        console.log(errors1, 'errors 1');
        console.log(errors2, 'errors 2');

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
        });
      }

      if (resp?.message) {
        this.errorMessage = resp.message;
        this.notification.addNotification({
          message: resp.message,
          title: 'Error: ',
        });
      }
      if (resp?.status === 'NOT_VERIFIED') {
        this.notification.addNotification({
          message: this.registrationForm.value.phone,
          title: 'We sent you verify code on this phone number ',
        });

        // console.log(this.registrationForm);

        const verifyCode = resp.verifyCode;
        // const fakeLatency = randomInteger(2000, 3500);
        // setTimeout(() => {
        //   this.notification.addNotification({
        //     message: verifyCode,
        //     title: `Your verify code:`,
        //   });
        // }, fakeLatency);

        this.showVerifyCodeInput = true;
      }
    } else {
      const body = {
        phone: this.registrationForm.value.phone,
        password: this.registrationForm.value.password,
        verifyCode: this.registrationForm.value.verifyCode,
      };
      const resp = await this.authService.register(body);
      console.log(resp, 'response in reg form');

      if (resp.user) {
        this.router.navigate(['/user/info']);
      }

      if (resp?.message) {
        this.errorMessage = resp.message;
        // this.notification.addNotification({
        //   message: resp.message,
        //   title: 'Error: ',
        // });
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
        });

        const verifyCode = resp.verifyCode;
        // const fakeLatency = randomInteger(2000, 3500);
        // setTimeout(() => {
        //   this.notification.addNotification({
        //     message: verifyCode,
        //     title: `Your verify code:`,
        //   });
        // }, fakeLatency);
      }
    }
  }
}
