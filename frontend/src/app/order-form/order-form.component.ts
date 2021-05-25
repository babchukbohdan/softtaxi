import { ThemeService } from './../services/theme.service';
import { NotificationService } from './../services/notification.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Order } from './../../assets/types/types';
import { AuthService } from './../services/auth.service';
import { Request, CarType, StatusType } from '../../assets/types/types';
import { randomInteger } from 'src/assets/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Output() onAdd: EventEmitter<Request> = new EventEmitter<Request>();
  price = randomInteger(5, 33);

  carTypes = [
    {
      value: 'basic',
      className: 'basic',
    },
    {
      value: 'comfort',
      className: 'comfort',
    },
    {
      value: 'eco',
      className: 'eco',
    },
    {
      value: 'xl',
      className: 'xl',
    },
    // {
    //   value: 'sedan-car-model',
    //   className: 'sedan-car-model',
    // },
  ];

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private note: NotificationService,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const user = this.authService.getCurrentUser();

    if (user) {
      this.form.get('phoneNumber').setValue(user.phone_number);
    }
  }

  initForm() {
    this.form = new FormGroup({
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('380[0-9]{9}'),
      ]),
      from: new FormControl(``, [Validators.required]),
      to: new FormControl(``, [Validators.required]),
      carType: new FormControl('basic', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(21)]),
    });
  }

  onCarTypeChange = (value) => {
    this.form.patchValue({
      carType: value,
    });
    !this.form.get('carType').touched &&
      this.form.get('carType').markAsTouched();

    this.calculatePrice();
  };

  calculatePrice() {
    this.price = randomInteger(5, 33);
  }

  getFormValue(name) {
    return this.form.get(name).value;
  }

  async checkUser() {
    return await this.authService.getUserByPhoneNumber(
      this.form.get('phoneNumber').value
    );
  }

  async sendOrder(order: Order) {
    try {
      const res = await fetch(`${environment.apiUrl}requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      const response = await res.json();
      return response;
    } catch (error) {}
  }

  async makeOrder() {
    const formData = { ...this.form.value };

    const userInService = this.authService.getCurrentUser();

    if (!userInService) {
      const user = await this.checkUser();

      if (!user) {
        await this.authService.createUser(formData.phoneNumber);
      }
    }

    if (this.form.valid) {
      const order: Order = new Order({
        id: this.authService.getCurrentUser().id,
        price: '$ ' + this.price,
        ...this.form.value,
      });
      const newOrder = await this.sendOrder(order);

      this.router.navigate(['requests']);
      return newOrder;
    }
  }
}
