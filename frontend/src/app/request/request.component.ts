import { Request } from './../../assets/types/types';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  @Input() request: Request;
  constructor() {}

  ngOnInit(): void {}
}
