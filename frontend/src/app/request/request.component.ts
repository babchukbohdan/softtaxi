import { environment } from './../../environments/environment';
import { Request } from './../../assets/types/types';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  @Input() request: Request;
  @Output() cancelOrder = new EventEmitter();

  constructor() {}

  async cancelRequest() {
    const res = await fetch(`${environment.apiUrl}requests`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.request.id,
        status: 'canceled',
      }),
    });

    const resp = await res.json();
    console.log('updated req', resp);
    this.cancelOrder.emit(this.request.id);
  }
  ngOnInit(): void {}
}
