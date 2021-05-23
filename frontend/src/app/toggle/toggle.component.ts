import { ThemeService } from './../services/theme.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input() isActive;
  @Input() name;
  @Input() parentForm = null;
  @Input() controlName = null;
  @Output() changeHandler = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onChange() {
    this.changeHandler.emit();
  }
}
