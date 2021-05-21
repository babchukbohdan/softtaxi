import { ThemeService } from './../services/theme.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  theme = 'dark';
  @Input() isActive;
  @Output() changeHandler = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onChange() {
    this.changeHandler.emit();
  }
}
