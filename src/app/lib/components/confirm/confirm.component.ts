import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit {
  @Input() header_txt: string = '';
  @Input() success: boolean = false;
  @Input() error: boolean = false;

  constructor() {}

  ngOnInit() {}

  getHeaderStyle() {
    if (this.success) return 'confirm-header-text color-sucesss';
    if (this.error) return 'confirm-header-text color-fail';
    return '';
  }

  getIcon() {
    if (this.success) return 'check_circle';
    if (this.error) return 'highlight_off';
    return '';
  }

  getStyle() {
    if (this.success) return 'success-icon color-green';
    if (this.error) return 'success-icon color-red';
    return '';
  }
}
