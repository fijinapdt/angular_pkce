import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FieldConfig } from 'src/app/lib/classes/field.interface';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent
  implements OnInit, AfterContentInit, AfterViewInit
{
  @Input() field!: FieldConfig;
  @Input() buttonName!: string;
  @Input() buttonType!: string;
  @Input() color!: string;
  @Input() icon!: string;
  @Input() iconButton = false;
  @Output() clickEvent = new EventEmitter();
  @Input() clickCount!: number;
  @Input() btnCategory!: BTN_CATEGORY;
  buttonClicked = false;
  subscription!: Subscription;
  send!: string;
  btnClass!: string;

  btnTxt!: string;

  clicked() {
    if (this.clickCount > 0) {
      this.buttonClicked = true;
    }
    this.clickEvent.emit(this.buttonClicked);
  }

  ngAfterContentInit() {
    // this.btnTxt = this.getLocaleValue(this.buttonName);
    if (this.btnCategory === BTN_CATEGORY.PRIMARY || !this.btnCategory)
      this.btnClass = 'btn-class-primary';
    else this.btnClass = 'btn-class-secondary';
  }

  ngAfterViewInit() {
    // this.btnTxt = this.getLocaleValue(this.buttonName);
    if (this.btnCategory === BTN_CATEGORY.PRIMARY || !this.btnCategory)
      return 'btn-class-primary';
    else return 'btn-class-secondary';
  }

  constructor(private _translateService: TranslateService) {
    //  console.log(' Constructor ');
  }

  ngOnInit() {
    // console.log(' in INIT ');
    if (!this.buttonClicked) {
      this.buttonClicked = false;
    }
    if (!this.color) {
      this.color = 'primary';
    }
    if (!this.buttonType) {
      this.buttonType = 'button';
    }

    if (this.icon === 'send') {
      this.send = 'icon-send';
    }

    // if (!this.icon) {
    //   this.icon = 'send';
    //   this.send = 'icon-send';
    // }
  }

  getLocaleValue(label: any) {
    console.log('IN button component ' + this._translateService.instant(label));

    console.log(this._translateService);

    if (label) return this._translateService.instant(label);
    else return label;
  }
}

export enum BTN_ClICK {
  OK = 1,
  CANCEL = 2,
}

export enum BTN_CATEGORY {
  PRIMARY = 1,
  SECONDARY = 2,
}
