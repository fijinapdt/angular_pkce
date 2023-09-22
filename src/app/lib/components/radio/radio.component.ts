import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'app-radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends BaseFormControlComponent implements OnInit {
  @Input() options!: any[];
  constructor() {
    super();
  }

  override ngOnInit() {}
}
