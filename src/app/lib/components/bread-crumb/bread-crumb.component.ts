import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BreadCrumb,
  BreadcrumbService,
} from '../../service/breadcrumb.service';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: 'bread-crumb.component.html',
  styleUrls: ['bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit {
  crumb!: BreadCrumb;
  constructor(
    private _breadCrumbService: BreadcrumbService,
    private _changeDetector: ChangeDetectorRef,
    private _transalateService: TranslateService
  ) {
    _breadCrumbService.getCrumb().subscribe((crumb: BreadCrumb) => {
      this.crumb = crumb;
      this._changeDetector.markForCheck();
    });
  }

  ngOnInit() {}

  getLocaleValue(key: any) {
    if (key) {
      return this._transalateService.instant(key);
    }
    return key;
  }
}
