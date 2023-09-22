import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';
import { ChangeDetectionService } from '../../service/change-detection.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent
  extends BaseFormControlComponent
  implements OnInit
{
  @Input() numbersOnly: boolean = false;
  constructor(
    private _cD: ChangeDetectorRef,
    private _cdService: ChangeDetectionService
  ) {
    super();
    this._cDref = _cD;
  }

  override ngOnInit() {}
}
