import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() isActive: boolean;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() className: string;
  constructor() {}

  ngOnInit(): void {}
}
