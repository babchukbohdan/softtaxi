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

const getQueryFromFilter = (filter) => {
  return Object.keys(filter)
    .map((key) => {
      return filter[key]
        .map((val) => {
          return `filter[${key}]=${val}`;
        })
        .join('&');
    })
    .join('&');
};

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  allRequests: Request[] = [];
  activeRequests: Request[] = [];
  currentTab = 'active';
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    console.log(user, 'current User in Requests list');

    if (user?.driverInfo) {
      this.getOrdersForDriver(user);
    } else if (user) {
      this.getOrdersForUser(user);
    }
  }

  async getOrdersForDriver(driver) {
    console.log('get orders for driver');
    const filterForActiveTab = {
      status: ['Accepted', 'accepted', 'waiting_form_customer', 'in_progress'],
      driver_id: [driver.id],
    };
    const filterForAllTab = {
      status: ['active', 'Active'],
    };

    const getActive = await fetch(
      `${environment.apiUrl}requests?${getQueryFromFilter(
        filterForActiveTab
      )}&limit=5`
    );
    const activeReq = await getActive.json();
    this.activeRequests = transformRequest(activeReq);
    console.log(activeReq, 'activeReq list response');

    const getAll = await fetch(
      `${environment.apiUrl}requests?${getQueryFromFilter(
        filterForAllTab
      )}&limit=5`
    );
    const AllReq = await getAll.json();
    this.allRequests = transformRequest(AllReq);
    console.log(AllReq, 'AllReq list response');
  }

  async getOrdersForUser(user) {
    const filterForActiveTab = {
      status: [
        'active',
        'Postponed',
        'accepted',
        'waiting_form_customer',
        'in_progress',
      ],
      customer_id: [user.id],
    };
    const filterForAllTab = {
      status: ['done', 'canceled'],
      customer_id: [user.id],
    };
    const getActive = await fetch(
      `${environment.apiUrl}requests?${getQueryFromFilter(
        filterForActiveTab
      )}&limit=5`
    );
    const activeReq = await getActive.json();
    this.activeRequests = transformRequest(activeReq);
    console.log(activeReq, 'activeReq list response');

    const getAll = await fetch(
      `${environment.apiUrl}requests?${getQueryFromFilter(
        filterForAllTab
      )}&limit=5`
    );
    const AllReq = await getAll.json();
    this.allRequests = transformRequest(AllReq);
    console.log(AllReq, 'AllReq list response');
  }

  cancelOrder(id) {
    const idx = this.activeRequests.findIndex((val) => {
      return val.id === id;
    });
    this.activeRequests.splice(idx, 1);
    console.log('cancel in list');
  }

  changeTab(tab) {
    this.currentTab = tab;
  }
}
