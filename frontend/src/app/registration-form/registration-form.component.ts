import { randomInteger } from 'src/assets/utils';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NotificationService } from '../services/notification.service';

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
      this.registrationForm.patchValue({
        phone: user.phone_number,
      });
    }
  }

  ngDoCheck(): void {}

  initForm() {
    this.registrationForm = new FormGroup({
      name: new FormControl(`Zdzislav Beksinsky`, []),
      email: new FormControl(`zdislav@gmail.com`, [Validators.email]),
      phone: new FormControl('380954061246', [
        Validators.required,
        Validators.pattern('380[0-9]{9}'),
      ]),
      password: new FormControl(`test`, [Validators.required]),
      password2: new FormControl(`test`, [Validators.required]),
      isDriver: new FormControl(true),
      carColor: new FormControl('black', [Validators.required]),
      verifyCode: new FormControl('', []),

      carModel: new FormControl('BMW', [Validators.required]),
      carNumber: new FormControl('CE1111AA', [Validators.required]),
      carType: new FormControl('basic', [Validators.required]),
    });

    // this.registrationForm.valueChanges.subscribe(() => {
    //   console.log(this.registrationForm, 'form');
    // });

    // same valuer for passwords
    this.registrationForm.get('password2').valueChanges.subscribe(() => {
      this.comparePasswords();
    });
    this.registrationForm.get('password').valueChanges.subscribe(() => {
      this.comparePasswords();
    });

    // this.registrationForm
    //     .get('verifyCode')
    //     .setValidators([Validators.required]);
  }

  comparePasswords = () => {
    const pas1Value = this.registrationForm.get('password');
    const pas2Value = this.registrationForm.get('password2');

    if (pas1Value.dirty && pas2Value.dirty) {
      const isEquel = pas1Value.value === pas2Value.value;
      if (!isEquel) {
        pas1Value.setErrors({ ...pas1Value.errors, isEquel: true });
        pas2Value.setErrors({ ...pas2Value.errors, isEquel: true });
      } else {
        pas2Value.setErrors({ ...pas2Value.errors });
        pas1Value.setErrors({ ...pas2Value.errors });
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
          message: 'You successful register in app.',
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
        const fakeLatency = randomInteger(2000, 3500);
        setTimeout(() => {
          this.notification.addNotification({
            message: verifyCode,
            title: `Your verify code:`,
          });
        }, fakeLatency);

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
        const fakeLatency = randomInteger(2000, 3500);
        setTimeout(() => {
          this.notification.addNotification({
            message: verifyCode,
            title: `Your verify code:`,
          });
        }, fakeLatency);
      }
    }
  }
}
