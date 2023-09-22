import { Component, OnInit, Input } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent extends BaseFormControlComponent implements OnInit {
  @Input() checked: boolean = false;
  @Input() formText: string = '';
  @Input() trueTxt = '';
  @Input() falseTxt = '';

  slideTxt: string = '';
  slideClass: string = '';
  constructor() {
    super();
  }

  override ngOnInit() {
    this.updateFieldTxt();
  }

  updateFieldTxt() {
    if (this.getFieldValue() === true) {
      this.slideTxt = this.trueTxt;
      this.slideClass = 'slideClass-true';
    } else {
      this.slideTxt = this.falseTxt;
      this.slideClass = 'slideClass-false';
    }

    if (this.slideTxt.trim() === '') {
      this.slideTxt = this.formText;
    }
  }

  toggled($event: any) {
    this.updateFieldTxt();
    super.change($event);
  }
}
