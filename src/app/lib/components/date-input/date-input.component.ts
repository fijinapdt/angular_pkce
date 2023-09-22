import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'app-date-input',
  templateUrl: 'date-input.component.html',
  styleUrls: ['date-input.component.scss'],
})
export class DateInputComponent
  extends BaseFormControlComponent
  implements OnInit
{
  onBlur() {
    console.log(this.parentForm?.get(this.fieldName)?.value);
  }
  constructor(private _cdRef: ChangeDetectorRef) {
    super();
    this._cDref = _cdRef;
  }

  override ngOnInit() {}
}
