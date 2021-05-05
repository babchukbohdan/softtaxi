import { Request, CarType, StatusType } from './../app.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Output() onAdd: EventEmitter<Request> = new EventEmitter<Request>();

  phoneNumber = '+3809511111111';
  from = 'Головна, 212';
  to = 'Комарова, 4';
  carType = 'basic';
  description = 'With air conditioning';
  constructor() {}

  ngOnInit(): void {}

  makeOrder() {
    console.log('make order');
    if (this.phoneNumber.trim() && this.from.trim() && this.to.trim()) {
      const request: Request = {
        customerId: '',
        driverId: '',
        createdDate: new Date(),
        lastUpdate: new Date(),
        destinationLocation: this.to,
        passangerLocation: this.from,
        price: 33,
        carType: CarType.Basic,
        status: StatusType.Active,
        description: this.description,
      };
      this.onAdd.emit(request);
      console.log(request);
    }
  }
}
