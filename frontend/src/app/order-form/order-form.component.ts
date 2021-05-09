import { environment } from 'src/environments/environment';
import { Order } from './../../assets/types/types';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Request, CarType, StatusType } from '../../assets/types/types';
import { randomInteger } from 'src/assets/utils';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Output() onAdd: EventEmitter<Request> = new EventEmitter<Request>();
  id = '';
  phoneNumber = '11';
  from = 'Головна, 212';
  to = 'Комарова, 4';
  carType = 'basic';
  description = 'With air conditioning';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    if (user) {
      this.id = user.id;
      this.phoneNumber = user.phone_number;
    }
  }

  getPrice(): number {
    return randomInteger(5, 33);
  }

  async checkUser() {
    console.log(
      `%cchecking user in DB by phone: ${this.phoneNumber}`,
      'color: #2E86C1'
    );

    return await this.authService.getUserByPhoneNumber(this.phoneNumber);
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
    const user = await this.checkUser();
    if (user) {
      console.log('%cuser is already exist in DB', 'color: #2ECC71', user);
      this.id = user.id;
    } else {
      console.log('%cuser not found in DB', 'color: red');
      console.log('%ccreate user in DB', 'color: #2E86C1');
      const newUser = await this.authService.createUser(this.phoneNumber);
      console.log('%cnew user', 'color: yellow', newUser);
      this.id = newUser.id;
    }

    if (this.phoneNumber.trim() && this.from.trim() && this.to.trim()) {
      const order: Order = new Order({
        id: this.id,
        from: this.from,
        to: this.to,
        price: `$ ${this.getPrice()}`,
        description: this.description,
        carType: this.carType,
      });
      // this.onAdd.emit(order);
      const newOrder = await this.sendOrder(order);
      return newOrder;
    }
  }
}
