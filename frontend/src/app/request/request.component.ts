import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from './../services/auth.service';
import { environment } from './../../environments/environment';
import { Request, StatusType } from './../../assets/types/types';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const status = ['accepted', 'waiting_form_customer', 'in_progress'];

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  @Input() request: Request;
  @Input() isDriver: boolean;
  @Input() page: string;
  @Input() countOfActiveRequests: number;
  @Output() deleteOrder = new EventEmitter();
  @Output() takeOrder = new EventEmitter();
  public info = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (status.includes(this.request.status)) {
      this.getInfoForAcceptedRequest().then((res) => {
        this.info = res;
      });
    }
    console.log('countOfActiveRequests', this.countOfActiveRequests);

    if (this.isDriver && this.page === 'all') {
    }
  }

  async cancelRequest() {
    const res = await fetch(`${environment.apiUrl}requests`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.request.id,
        status: StatusType.Canceled,
        last_update: new Date(),
      }),
    });

    const resp = await res.json();
    console.log('canceled req', resp);
    this.deleteOrder.emit(this.request.id);
  }

  async finishRequest() {
    const res = await fetch(`${environment.apiUrl}requests`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.request.id,
        status: StatusType.Done,
        last_update: new Date(),
      }),
    });

    const resp = await res.json();
    console.log('finished req', resp);
    this.deleteOrder.emit(this.request.id);
  }

  async takeRequest() {
    const body = JSON.stringify({
      id: this.request.id,
      status: StatusType.Accepted,
      driver_id: this.authService.getCurrentUser().driverInfo.id,
      last_update: new Date(),
    });

    const res = await fetch(`${environment.apiUrl}requests`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const resp = await res.json();
    console.log('taken req', resp);
    this.takeOrder.emit(resp);
  }

  async getRating(id: string, isDriver: boolean): Promise<string> {
    const person = isDriver ? 'driver' : 'user';
    const res = await fetch(`${environment.apiUrl}${person}/${id}`);
    const user = await res.json();

    return user.raiting;
  }

  async getInfoForAcceptedRequest() {
    if (!this.isDriver) {
      const id = this.request.driverId;
      const info = await this.authService.getDriverById(id);

      return info;
    } else {
      const id = this.request.customerId;
      const info = await this.authService.getUser(id);

      return info;
    }
  }
}
