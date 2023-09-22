import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constants } from 'src/app/lib/classes/Constants';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
})
export class AlertComponent implements OnInit {
  cancel: boolean = false;
  ok: boolean = false;
  message: string;
  title: string;
  okTxt: string;
  cancelTxt: string;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    console.log(data);
    this.ok = data.ok;
    this.cancel = data.cancel;
    this.message = data.message;
    this.title = data.title;
    this.okTxt = data.okTxt;
    this.cancelTxt = data.cancelTxt;
  }

  ngOnInit() {}

  close(val: any) {
    this._dialogRef.close(val);
  }

  getDialogType() {
    if (this.ok && this.cancel) {
      return Constants.INFO_BOX;
    } else {
      return Constants.ALERT_BOX;
    }
  }
}
