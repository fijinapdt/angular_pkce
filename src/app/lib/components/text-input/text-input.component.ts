import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent
  extends BaseFormControlComponent
  implements OnInit, OnDestroy
{
  constructor(private _cD: ChangeDetectorRef) {
    super();
    this._cDref = _cD;
  }

  @Input() numbersOnly: boolean = false;

  getNumbersOnly() {
    return this.numbersOnly;
  }
  override ngOnInit() {
    if (this.numbersOnly) {
      this.numbersOnly = false;
    }
  }

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
