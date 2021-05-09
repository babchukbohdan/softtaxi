import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() page: string = 'make-order';

  @Output() onPageChange = new EventEmitter<string>();
  clickHandler(page: string) {
    this.onPageChange.emit(page);
  }
}
