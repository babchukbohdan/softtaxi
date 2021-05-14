import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() count;
  @Input() clickHandler;
  @Input() currentPage;

  constructor() {}

  ngOnInit(): void {
    console.log('pagination', this.count);
  }
}
