import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {


  @Input() paginationList: any;
  @Input() currentPage: number;
  @Output() onPageChange = new EventEmitter()

  getPage(page: number) {
    this.currentPage = page;
    this.onPageChange.emit(page);
  }

  constructor() { }

  ngOnInit() {
  }

}
