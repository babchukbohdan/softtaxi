import { Request } from './../app.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() request: Request;

  constructor() {}

  ngOnInit(): void {}
}
