import {
  RequestTabs,
  getDriverFilterForAllTab,
  getDriverFilterForActiveTab,
  getUserFilterForAllTab,
  getUserFilterForActiveTab,
  getRequestsWithFilter,
  transformRequests,
  getQueryFromFilter,
} from './retquest-list.utils';
import { AuthService } from './../services/auth.service';
import { Request } from './../../assets/types/types';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  canRefresh: boolean;

  limit = 5;
  currentPage = 1;
  offset = 0;

  userAllTabDate;
  user;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const user = this.authService.getCurrentUser();

    this.user = user;
    this.isAuthenticated = this.authService.isAuthenticated();

    this.isDriver = this.authService.isDriver();

    this.getRequests();
  }

  changeDate({ target }) {
    console.log(target.value, 'date');
    console.log(target.valueAsDate, 'date');
    this.userAllTabDate = target.valueAsDate;
    this.resetPagination();
    this.getRequestsForAllTab(this.user, this.limit, this.offset);
    this.getCountOfRequestsForCustomer(this.user.id);
  }

  showForDriver() {
    this.showAsDriver = !this.showAsDriver;
    this.resetPagination();
    this.getRequests();
  }

  disableRefresh(ms: number = 1000) {
    this.canRefresh = false;
    setTimeout(() => {
      this.canRefresh = true;
    }, ms);
  }

  getRequests() {
    this.disableRefresh();
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
    console.log('change page');

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
      getDriverFilterForAllTab(new Date())
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
      getUserFilterForAllTab(id, this.userAllTabDate)
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
  }
  setActiveRequests(requests) {
    this.activeRequests = requests;
  }

  async getRequestsForAllTab(user, limit, offset) {
    console.log('getRequestsForAllTab');

    let filter,
      sorted = true;
    if (this.showAsDriver) {
      filter = getDriverFilterForAllTab(new Date());
    } else {
      filter = getUserFilterForAllTab(user.id, this.userAllTabDate);
    }

    const allRequests = await getRequestsWithFilter(
      filter,
      limit,
      offset,
      sorted
    );

    this.setAllRequests(allRequests);
  }

  async getRequestsForActiveTab(user, limit, offset) {
    let filter,
      sorted = false;
    if (this.showAsDriver && this.isDriver) {
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
    const request = this.activeRequests.splice(idx, 1);

    console.log('removed', request);

    if (!this.showAsDriver) {
      this.moveRequestToAllTab(request[0]);
    }
  }

  moveRequestToAllTab(request) {
    console.log('move to all tab');

    this.allRequests.unshift(request);
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
    this.countOfPagesForActiveRequests = 0;
    this.countOfPagesForAllRequests = 0;
  }
}
