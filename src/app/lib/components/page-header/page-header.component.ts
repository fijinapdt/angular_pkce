import { Component, OnInit } from '@angular/core';
import { PageHeaderService } from '../../service/page-header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  headerName: string = '';
  subscription: Subscription;

  constructor(private _pageHeaderService: PageHeaderService) {
    this.subscription = this._pageHeaderService
      .getHeader()
      .subscribe((msg: any) => {
        this.headerName = msg;
      });
  }

  ngOnInit() {}

  getHeaderName() {
    console.log('header ' + this.headerName);
    return this.headerName;
  }
}
