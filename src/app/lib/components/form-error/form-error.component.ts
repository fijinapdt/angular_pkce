import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'form-error',
  templateUrl: `form-error.component.html`,
  styleUrls: ['form-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent
  extends BaseFormControlComponent
  implements OnInit
{
  constructor() {
    super();
  }

  override ngOnInit() {}
}
