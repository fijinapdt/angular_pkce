import { Component, OnInit } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'app-check-box',
  templateUrl: 'check-box.component.html',
  styleUrls: ['check-box.component.scss'],
})
export class CheckBoxComponent
  extends BaseFormControlComponent
  implements OnInit
{
  constructor() {
    super();
  }
  override ngOnInit() {
    // this.parentForm = this.fb.group({
    //   chkboxes: this.buildChxBoxes()
    // });
  }

  // get chkboxes() {
  //   console.log('calling checkboxes');
  //   return this.parentForm.get('chkboxes');
  // }

  // buildChxBoxes() {
  //   const arr = this.fieldConfig.options.map(item => {
  //     return this.fb.control(item.selected);
  //   });
  //   return this.fb.array(arr);
  // }
}
