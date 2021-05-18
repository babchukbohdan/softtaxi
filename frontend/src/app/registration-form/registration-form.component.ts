import { AuthService } from './../services/auth.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

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

  registrationForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registrationForm = new FormGroup({
      phone: new FormControl('11', [Validators.required]),
      password: new FormControl(`test`, [Validators.required]),
      password2: new FormControl(`test`, [Validators.required]),
      isDriver: new FormControl(false),
      carColor: new FormControl('black', [Validators.required]),

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
        },
        driverInfo: {
          carType: this.registrationForm.value.carType,
          carColor: this.registrationForm.value.carColor,
          carNumber: this.registrationForm.value.carNumber,
          carModel: this.registrationForm.value.carModel,
        },
      };
      const resp = await this.authService.registerDriver(body);
      if (resp.message) {
        this.errorMessage = resp.message;
      }
    } else {
      const body = {
        phone: this.registrationForm.value.phone,
        password: this.registrationForm.value.password,
      };
      const resp = await this.authService.register(body);

      if (resp.message) {
        this.errorMessage = resp.message;
      }
    }
  }
}
