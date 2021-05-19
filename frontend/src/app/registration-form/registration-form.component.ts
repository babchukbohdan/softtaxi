import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { NotificationService } from '../services/notification.service';

const samePasswords = (
  control: FormControl
): { [key: string]: boolean } | null => {
  console.log(control, 'control');
  // const isSame = .value.password === control.value;
  if (true) {
    return { samePasswords: true };
  }

  return null;
};

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  errorMessage = '';
  // public verifyCode: string = '';
  public showVerifyCodeInput;

  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registrationForm = new FormGroup({
      phone: new FormControl('11[]', [Validators.required]),
      password: new FormControl(`test`, [Validators.required]),
      password2: new FormControl(`test`, [Validators.required]),
      isDriver: new FormControl(false),
      carColor: new FormControl('black', [Validators.required]),
      verifyCode: new FormControl('', []),

      carModel: new FormControl('BMW', [Validators.required]),
      carNumber: new FormControl('CE1111AA', [Validators.required]),
      carType: new FormControl('basic', [Validators.required]),
      // pas: new FormGroup(
      //   {
      //     password: new FormControl(`test`, [Validators.required]),
      //     password2: new FormControl(`test`, [Validators.required]),
      //   },
      //   samePasswords
      // ),
    });
  }

  async register() {
    if (this.registrationForm.value.isDriver) {
      const body = {
        userInfo: {
          phone: this.registrationForm.value.phone,
          password: this.registrationForm.value.password,
          email: this.registrationForm.value.email,
          name: this.registrationForm.value.name,
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
      }

      if (resp?.message) {
        this.errorMessage = resp.message;
        this.notification.addNotification({
          message: resp.message,
          title: 'Error: ',
        });
      }
      if (resp?.status === 'NOT_VERIFIED') {
        this.showVerifyCodeInput = true;

        this.notification.addNotification({
          message: this.registrationForm.value.phone,
          title: 'We sent you verify code on this phone number ',
        });

        const verifyCode = resp.verifyCode;
        const fakeLatency = 3000;
        setTimeout(() => {
          this.notification.addNotification({
            message: verifyCode,
            title: `Your verify code:`,
          });
        }, fakeLatency);
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
        this.notification.addNotification({
          message: resp.message,
          title: 'Error: ',
        });
      }
      if (resp?.status === 'NOT_VERIFIED') {
        this.showVerifyCodeInput = true;

        this.notification.addNotification({
          message: this.registrationForm.value.phone,
          title: 'We sent you verify code on this phone number ',
        });

        const verifyCode = resp.verifyCode;
        const fakeLatency = 3000;
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
