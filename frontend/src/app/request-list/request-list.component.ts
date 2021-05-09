import { AuthService } from './../services/auth.service';
import { Request, CarType, StatusType } from './../../assets/types/types';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const snakeToCamel = (str: string): string =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

const transformRequest = (requests) => {
  if (!requests.length) {
    return [];
  }
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
  requests: Request[];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const url = environment.apiUrl;
    const user = this.authService.getCurrentUser();
    console.log(user, 'current User');

    if (user) {
      const res = fetch(
        `${url}requests?limit=5&filter[status]=active&filter[customer_id]=${user.id}`
      );
      res
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res, 'request list response');
          this.requests = transformRequest(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
