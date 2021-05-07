import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: 'softtaxi';
  // requests: Request[] = [
  //   {
  //     customerId: '1',
  //     driverId: '',
  //     createdDate: new Date(),
  //     lastUpdate: new Date(),
  //     destinationLocation: 'Головна, 246',
  //     passangerLocation: 'Комарова 2-А',
  //     price: 0,
  //     carType: CarType.Basic,
  //     status: StatusType.Active,
  //     description: 'Air conditioning',
  //   },
  // ];

  // updateRequests(request: Request) {
  //   console.log('post', request);
  //   this.requests.unshift(request);
  // }
}
