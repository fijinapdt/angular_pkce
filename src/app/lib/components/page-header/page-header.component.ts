import { Component, Input, OnInit } from '@angular/core';
import { PageHeaderService } from '../../service/page-header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  // headerName: string = '';
  subscription: Subscription;
  @Input() pageHeader: string;

  constructor(private _pageHeaderService: PageHeaderService) {
    this.subscription = this._pageHeaderService
      .getHeader()
      .subscribe((msg: any) => {
        this.pageHeader = msg;
      });
  }

  ngOnInit() {}

  getHeaderName() {
    // console.log('header ' + this.headerName);
    return this.pageHeader;
  }
}
