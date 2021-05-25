import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-type',
  templateUrl: './car-type.component.html',
  styleUrls: ['./car-type.component.scss'],
})
export class CarTypeComponent implements OnInit {
  @Input() carType;
  @Input() isActive: boolean;
  @Input() onClickHandler;
  constructor() {}

  ngOnInit(): void {}
}
