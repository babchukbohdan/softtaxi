import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() _count;
  @Input() clickHandler;
  @Input() currentPage;

  @Input()
  set count(count: number) {
    const arrayOfNumbers = new Array(count).fill('').map((val, i) => i + 1);
    this._count = arrayOfNumbers;
  }
  get count() {
    return this._count;
  }

  constructor() {}

  ngOnInit(): void {}
}
