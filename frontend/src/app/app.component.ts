import { Component } from '@angular/core';
export enum CarType {
  Basic,
  Comfort,
  Xl,
  Lux,
  Green,
}
export enum StatusType {
  Postponed,
  Active,
  Accepted,
  WaitingForCustomer,
  InProgress,
  Done,
  Canceled,
}

export interface Request {
  customerId: string;
  driverId: string;
  createdDate: Date;
  lastUpdate: Date;
  destinationLocation: string;
  passangerLocation: string;
  price: number;
  carType: CarType;
  status: StatusType;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  requests: Request[] = [
    {
      customerId: '1',
      driverId: '',
      createdDate: new Date(),
      lastUpdate: new Date(),
      destinationLocation: 'Головна, 246',
      passangerLocation: 'Комарова 2-А',
      price: 0,
      carType: CarType.Basic,
      status: StatusType.Active,
      description: 'Air conditioning',
    },
  ];

  updateRequests(request: Request) {
    console.log('post', request);
    this.requests.unshift(request);
  }
}
