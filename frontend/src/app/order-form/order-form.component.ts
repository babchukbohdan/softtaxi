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
  id = '';
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

  constructor(private authService: AuthService, private router: Router) {}

  initForm() {
    this.form = new FormGroup({
      phoneNumber: new FormControl('11', [Validators.required]),
      from: new FormControl(`Головна, ${randomInteger(1, 260)}`, [
        Validators.required,
      ]),
      to: new FormControl(`Комарова, ${randomInteger(1, 55)}`, [
        Validators.required,
      ]),
      carType: new FormControl('basic', [Validators.required]),
      description: new FormControl('With air conditioning'),
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

  ngOnInit(): void {
    this.initForm();
    const user = this.authService.getCurrentUser();

    if (user) {
      this.id = user.id;
      this.form.get('phoneNumber').setValue(user.phone_number);
    }
  }

  getPrice(): number {
    return randomInteger(5, 33);
  }

  async checkUser() {
    console.log(
      `%cchecking user in DB by phone: ${this.form.get('phoneNumber').value}`,
      'color: #2E86C1'
    );

    return await this.authService.getUserByPhoneNumber(
      this.form.get('phoneNumber').value
    );
  }

  async sendOrder(order: Order) {
    console.log('%csending new order', 'color: #2E86C1', order);
    try {
      const res = await fetch(`${environment.apiUrl}requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      const response = await res.json();
      console.log(`%ccreated order in DB`, 'color: #2ECC71', response);
      return response;
    } catch (error) {}
  }

  async makeOrder() {
    const formData = { ...this.form.value };
    console.log('formData', formData);

    const user = await this.checkUser();
    console.log('user in make order', user);
    if (user) {
      console.log('%cuser is already exist in DB', 'color: #2ECC71', user);
      this.id = user.id;
      this.authService.setCurrentUser(user);
    } else {
      console.log('%cuser not found in DB', 'color: red');
      console.log('%ccreate user in DB', 'color: #2E86C1');
      const newUser = await this.authService.createUser(formData.phoneNumber);
      console.log('%cnew user', 'color: yellow', newUser);
      this.id = newUser.id;
    }

    if (this.form.valid) {
      const order: Order = new Order({
        id: this.id,
        price: '$ ' + this.price,
        ...this.form.value,
      });
      // this.onAdd.emit(order);
      const newOrder = await this.sendOrder(order);

      this.router.navigate(['requests']);
      return newOrder;
    }
  }
}
