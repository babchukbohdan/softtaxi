import { Request, CarType, StatusType } from './../../assets/types/types';
import { Component, OnInit } from '@angular/core';

const snakeToCamel = (str: string): string =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

const transformRequest = (requests) => {
  const keys = Object.keys(requests[0]);
  return requests.map((req) => {
    return keys.reduce((acc, val) => {
      if (val === 'car_type') {
        acc[snakeToCamel(val)] = req[val].toLowerCase();
      } else {
        acc[snakeToCamel(val)] = req[val];
      }
      return acc;
    }, {});
  });
};

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [
    {
      customerId: '1',
      driverId: '',
      createdDate: new Date(),
      lastUpdate: new Date(),
      destinationLocation: 'Головна, 246',
      passangerLocation: 'Комарова 2-А',
      price: 50,
      carType: CarType[CarType.xl],
      status: StatusType.Active,
      description: 'Air conditioning',
    },
    {
      customerId: '2',
      driverId: '',
      createdDate: new Date(),
      lastUpdate: new Date(),
      destinationLocation: 'Головна, 246',
      passangerLocation: 'Комарова 2-А',
      price: 50,
      carType: CarType[CarType.basic],
      status: StatusType.Active,
      description: 'Air conditioning',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    const res = fetch('http://localhost:8080/requests');
    res
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        console.log(snakeToCamel('asds_fdf'));
        console.log();
        this.requests = transformRequest(res);
      });
  }
}
