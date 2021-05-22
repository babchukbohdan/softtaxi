import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  _count;
  @Input() clickHandler;
  @Input() currentPage;
  last;
  first;

  @Input() count;

  constructor() {}

  ngOnInit(): void {
    if (this.count > 12) {
      const arrayOfNumbers = [
        1,
        ...new Array(5).fill('').map((v, i) => i + 1 + +this.currentPage),
        ...new Array(5).fill('').map((v, i) => i + this.count - 5),

        this.count,
      ].sort((a, b) => a - b);
      console.log('array of pag', arrayOfNumbers);

      this._count = arrayOfNumbers;
    } else {
      const arrayOfNumbers = new Array(this.count)
        .fill('')
        .map((val, i) => i + 1);
      this._count = arrayOfNumbers;
    }
  }

  changeHandler(e) {
    console.log(e, 'event');
    const p = e.target.valueAsNumber;
    this.clickHandler(p);
  }
}
