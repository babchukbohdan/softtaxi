import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Request, CarType, StatusType } from './../../assets/types/types';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const snakeToCamel = (str: string): string =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

const transformRequests = (requests) => {
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

const getDriverFilterForActiveTab = (id) => ({
  status: ['Accepted', 'accepted', 'waiting_form_customer', 'in_progress'],
  driver_id: [id],
});
const getDriverFilterForAllTab = (id?) => ({
  status: ['active', 'Active'],
});
const getUserFilterForActiveTab = (id) => ({
  status: [
    'active',
    'Postponed',
    'accepted',
    'waiting_form_customer',
    'in_progress',
  ],
  customer_id: [id],
});
const getUserFilterForAllTab = (id) => ({
  status: ['done', 'canceled'],
  customer_id: [id],
});

const getRequestsWithFilter = async (
  filter,
  limit: number,
  offset: number,
  sorted: boolean = false
) => {
  let query = `${environment.apiUrl}requests?${getQueryFromFilter(
    filter
  )}&limit=${limit}&offset=${offset}`;

  if (sorted) {
    query += '&sort=last_update';
  }

  const res = await fetch(query);
  const requests = await res.json();

  return transformRequests(requests);
};

type RequestTabs = 'active' | 'all';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  allRequests: Request[] = [];
  activeRequests: Request[] = [];

  countOfPagesForAllRequests: number;
  countOfPagesForActiveRequests: number;

  currentTab: RequestTabs = 'active';
  isDriver: boolean;
  isAuthenticated: boolean;
  showAsDriver: boolean;

  limit = 5;
  currentPage = 1;
  offset = 0;

  user;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    console.log(user, 'user');

    this.user = user;
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log(user, 'user in request list');

    this.isDriver = this.authService.isDriver();

    this.getRequests();
  }

  showForDriver() {
    this.showAsDriver = !this.showAsDriver;
    this.resetPagination();
    // this.getCountOfRequestsForDriver(this.user.id);
    this.countOfPagesForActiveRequests = 0;
    this.countOfPagesForAllRequests = 0;
    this.getRequests();
  }

  getRequests() {
    if (this.isDriver && this.showAsDriver) {
      console.log('show for driver if driver');

      this.getCountOfRequestsForDriver(this.user.id);
      this.getRequestsForDriver(this.user, this.limit, this.offset);
    } else if (this.isDriver && !this.showAsDriver) {
      console.log('show for user if driver');
      this.getCountOfRequestsForCustomer(this.user.id);
      this.getRequestsForUser(this.user, this.limit, this.offset);
    } else if (this.user) {
      console.log('show for user');
      this.getCountOfRequestsForCustomer(this.user.id);
      this.getRequestsForUser(this.user, this.limit, this.offset);
    }
  }

  changePage = (page) => {
    this.setOffset(page);
    this.currentPage = page;

    if (this.currentTab === 'active') {
      this.getRequestsForActiveTab(
        this.authService.getCurrentUser(),
        this.limit,
        this.offset
      );
    } else if (this.currentTab === 'all') {
      this.getRequestsForAllTab(
        this.authService.getCurrentUser(),
        this.limit,
        this.offset
      );
    }
  };

  setOffset(currentPage) {
    this.offset = currentPage * this.limit - this.limit;
  }

  async getCountOfRequestsWithFilter(filter): Promise<number> {
    const res = await fetch(
      `${environment.apiUrl}requests?${getQueryFromFilter(filter)}&count=1`
    );

    const count: Promise<number> = await res.json();
    return +count[0].count;
  }

  async getCountOfRequestsForDriver(id) {
    const countOfAllReq = await this.getCountOfRequestsWithFilter(
      getDriverFilterForAllTab()
    );
    this.countOfPagesForAllRequests = Math.ceil(countOfAllReq / this.limit);

    const countOfActiveReq = await this.getCountOfRequestsWithFilter(
      getDriverFilterForActiveTab(id)
    );
    this.countOfPagesForActiveRequests = Math.ceil(
      countOfActiveReq / this.limit
    );
  }

  async getCountOfRequestsForCustomer(id) {
    const countOfAllReq = await this.getCountOfRequestsWithFilter(
      getUserFilterForAllTab(id)
    );
    this.countOfPagesForAllRequests = Math.ceil(countOfAllReq / this.limit);

    const countOfActiveReq = await this.getCountOfRequestsWithFilter(
      getUserFilterForActiveTab(id)
    );
    this.countOfPagesForActiveRequests = Math.ceil(
      countOfActiveReq / this.limit
    );
  }

  setAllRequests(requests) {
    if (this.isAuthenticated) {
      this.allRequests = requests;
    }
    // console.log('all req ', requests);
  }
  setActiveRequests(requests) {
    this.activeRequests = requests;
    // console.log('active req ', requests);
  }

  async getRequestsForAllTab(user, limit, offset) {
    let filter,
      sorted = true;
    if (this.showAsDriver) {
      filter = getDriverFilterForAllTab();
    } else {
      filter = getUserFilterForAllTab(user.id);
    }

    const allRequests = await getRequestsWithFilter(
      filter,
      limit,
      offset,
      sorted
    );
    console.log('all tab driver', allRequests);

    this.setAllRequests(allRequests);
  }

  async getRequestsForActiveTab(user, limit, offset) {
    let filter,
      sorted = false;
    if (this.showAsDriver && user.driverInfo) {
      const id = user.driverInfo.id;
      filter = getDriverFilterForActiveTab(id);
    } else {
      sorted = true;
      filter = getUserFilterForActiveTab(user.id);
    }

    const activeReq = await getRequestsWithFilter(
      filter,
      limit,
      offset,
      sorted
    );
    console.log('active tab driver', activeReq);

    this.setActiveRequests(activeReq);
  }

  async getRequestsForDriver(driver, limit: number, offset: number) {
    await this.getRequestsForAllTab(driver, limit, offset);
    await this.getRequestsForActiveTab(driver, limit, offset);
  }

  async getRequestsForUser(user, limit: number, offset: number) {
    await this.getRequestsForAllTab(user, limit, offset);
    await this.getRequestsForActiveTab(user, limit, offset);
  }

  removeRequestFromActiveTab(id) {
    const idx = this.activeRequests.findIndex((val) => {
      return val.id === id;
    });
    this.activeRequests.splice(idx, 1);
  }

  moveRequestToActiveTab(request) {
    const newRequest = transformRequests([request])[0];
    const idx = this.allRequests.findIndex((val) => {
      return val.id === newRequest.id;
    });

    this.allRequests.splice(idx, 1);

    this.activeRequests.push(newRequest);

    this.getRequestsForAllTab(
      this.authService.getCurrentUser(),
      this.limit,
      this.offset
    );
    this.changeTab('active');
  }

  changeTab(tab: RequestTabs): void {
    this.currentTab = tab;
  }

  resetPagination() {
    this.limit = 5;
    this.offset = 0;
    this.currentPage = 1;
  }
}
