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

const getDriverFilterForActiveTab = (id) => ({
  status: ['Accepted', 'accepted', 'waiting_form_customer', 'in_progress'],
  driver_id: [id],
});
const getDriverFilterForAllTab = () => ({
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

const getRequestsWithFilter = async (filter, limit: number, offset: number) => {
  const res = await fetch(
    `${environment.apiUrl}requests?${getQueryFromFilter(
      filter
    )}&limit=${limit}&offset=${offset}`
  );
  const requests = await res.json();

  return transformRequest(requests);
};

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  allRequests: Request[] = [];
  activeRequests: Request[] = [];

  countOfAllRequests = [];
  countOfActiveRequests = [];

  // "active" | "all"
  currentTab = 'active';

  limit = 5;
  currentPage = 1;
  offset = 0;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    console.log(user, 'current User in Requests list');

    if (user?.driverInfo) {
      this.getOrdersForDriver(user, this.limit, this.offset);
      this.getCountOfRequestsForDriver(user.id);
    } else if (user) {
      this.getOrdersForUser(user, this.limit, this.offset);
      this.getCountOfRequestsForCustomer(user.id);
    }
  }

  changePage = (page) => {
    console.log(page, 'page');
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
    this.countOfAllRequests = new Array(
      Math.ceil(countOfAllReq / this.limit)
    ).map((val, i) => i + 1);

    const countOfActiveReq = await this.getCountOfRequestsWithFilter(
      getDriverFilterForActiveTab(id)
    );
    this.countOfActiveRequests = new Array(
      Math.ceil(countOfActiveReq / this.limit)
    ).map((val, i) => i + 1);
  }

  async getCountOfRequestsForCustomer(id) {
    const countOfAllReq = await this.getCountOfRequestsWithFilter(
      getUserFilterForAllTab(id)
    );
    this.countOfAllRequests = new Array(
      Math.ceil(countOfAllReq / this.limit)
    ).map((val, i) => i + 1);

    const countOfActiveReq = await this.getCountOfRequestsWithFilter(
      getUserFilterForActiveTab(id)
    );
    this.countOfActiveRequests = new Array(
      Math.ceil(countOfActiveReq / this.limit)
    ).map((val, i) => i + 1);
  }

  setAllRequests(requests) {
    this.allRequests = requests;
  }
  setActiveRequests(requests) {
    this.activeRequests = requests;
  }

  async getRequestsForAllTab(user, limit, offset) {
    let filter;
    if (user?.driverInfo) {
      filter = getDriverFilterForAllTab();
    } else {
      filter = getUserFilterForAllTab(user.id);
    }

    const allRequests = await getRequestsWithFilter(filter, limit, offset);

    this.setAllRequests(allRequests);
  }

  async getRequestsForActiveTab(user, limit, offset) {
    let filter;
    if (user?.driverInfo) {
      filter = getDriverFilterForActiveTab(user.id);
    } else {
      filter = getUserFilterForActiveTab(user.id);
    }

    const activeReq = await getRequestsWithFilter(filter, limit, offset);

    this.setActiveRequests(activeReq);
  }

  async getOrdersForDriver(driver, limit: number, offset: number) {
    await this.getRequestsForAllTab(driver, limit, offset);
    console.log(this.allRequests, 'allReq list response');
    await this.getRequestsForActiveTab(driver, limit, offset);
    console.log(this.activeRequests, 'activeReq list response');
  }

  async getOrdersForUser(user, limit: number, offset: number) {
    await this.getRequestsForAllTab(user, limit, offset);
    console.log(this.allRequests, 'allReq list response');
    await this.getRequestsForActiveTab(user, limit, offset);
    console.log(this.activeRequests, 'activeReq list response');
  }

  cancelOrder(id) {
    const idx = this.activeRequests.findIndex((val) => {
      return val.id === id;
    });
    this.activeRequests.splice(idx, 1);
    console.log('cancel in list');
  }

  changeTab(tab: string): void {
    this.currentTab = tab;
  }
}
