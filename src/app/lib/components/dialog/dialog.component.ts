import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from 'src/app/lib/classes/Constants';
import { BTN_ClICK } from '../button/button.component';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() title!: string;
  @Input() dialogType: number = 1;
  @Output() clickEvent = new EventEmitter();
  @Input() ok!: boolean;
  @Input() cancel!: boolean;
  @Input() okTxt!: string;
  @Input() cancelTxt!: string;
  @Input() scrollable = false;
  @Input() maxHeight!: any;
  @Input() actionButtons = true;
  css!: string;
  constructor() {}

  getScrollable() {
    if (this.scrollable) return 'scrollable';
    return '';
  }

  getDialogClass() {}

  getMaxHeight() {
    if (this.getScrollable()) return this.maxHeight;
  }

  getokTxt() {
    if (!this.okTxt) return 'Ok';
    return this.okTxt;
  }

  getCancelTxt() {
    if (!this.cancelTxt) return 'Cancel';
    return this.cancelTxt;
  }

  ngOnInit() {
    if (!this.ok) this.ok = true;

    console.log(this.dialogType);
    if (this.dialogType === Constants.ALERT_BOX) {
      this.css = 'dialog-header alert';
    } else {
      this.css = 'dialog-header classic';
    }
  }

  okClicked() {
    this.click(BTN_ClICK.OK);
  }

  cancelClicked() {
    this.click(BTN_ClICK.CANCEL);
  }

  click(val: any) {
    this.clickEvent.emit(val);
  }
}
