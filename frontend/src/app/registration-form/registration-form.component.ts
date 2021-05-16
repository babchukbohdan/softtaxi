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
  styleUrls: [
    './registration-form.component.scss',
    '../login-form/login-form.component.scss',
  ],
})
export class RegistrationFormComponent implements OnInit {
  public isDriver;
  public errorMessage;

  registrationForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registrationForm = new FormGroup({
      phoneNumber: new FormControl('11', [Validators.required]),
      password: new FormControl(`test`, [Validators.required]),
      password2: new FormControl(`test`, [Validators.required]),
      // pas: new FormGroup(
      //   {
      //     password: new FormControl(`test`, [Validators.required]),
      //     password2: new FormControl(`test`, [Validators.required]),
      //   },
      //   samePasswords
      // ),
    });
  }

  register() {}
}
