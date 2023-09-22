import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BreadcrumbService,
  BreadCrumb,
} from '../../service/breadcrumb.service';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  crumb: BreadCrumb = {};

  constructor(
    private _breadCrumbService: BreadcrumbService,
    private _transalateService: TranslateService
  ) {
    _breadCrumbService.getCrumb().subscribe((crumb: BreadCrumb) => {
      this.crumb = crumb;
    });
  }

  ngOnInit(): void {}
}
