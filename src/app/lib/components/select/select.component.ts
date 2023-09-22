import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent
  extends BaseFormControlComponent
  implements OnInit
{
  @Input() items?: any[];
  @Input() multiple: boolean = false;
  @Output() selectedItems: any;
  originalList?: any[] = [];
  boxOpened = false;
  chkDisabled = false;

  constructor(private _cdRef: ChangeDetectorRef) {
    super();
    this._cDref = _cdRef;
  }

  override ngOnInit() {
    this.originalList = this.items;
  }

  initOpen(e: any) {
    this.boxOpened = true;
  }
  chkChange(e: any) {
    if (e.checked === true) {
      let vals = this.items?.map((item) => {
        this.emitItems(item);
        return item.value;
      });
      this.refreshItems(this.items!, vals!);
    } else this.refreshItems(this.items!, []);
  }
  selectClosed(e: any) {
    this.boxOpened = false;
    this.items = this.originalList;
  }

  onBlur(event: any) {
    setTimeout(() => {
      if (this.boxOpened == false) event.target.value = '';
    }, 500);
  }
  keypress(e: any) {
    if (e.keyCode == 32) e.stopPropagation();
  }
  filterData(e: any) {
    if (e.target.value && e.target.value.length > 0) this.chkDisabled = true;
    else this.chkDisabled = false;

    let filteredItems = [];
    let listLength = this.originalList!.length;
    for (let i = 0; i < listLength; i++) {
      if (
        this.originalList![i].label.toUpperCase().indexOf(
          e.target.value.toUpperCase()
        ) != -1
      ) {
        this.originalList![i].display = 'flex';
      } else {
        this.originalList![i].display = 'none';
      }
      filteredItems.push(this.originalList![i]);
    }

    this.items = filteredItems;
  }

  emitItems(item: any) {
    const actveItems = [];
    const selectedValues = super.getFieldValue();

    for (let i = 0; i < this.items!.length; i++) {
      for (let j = 0; j < selectedValues.length; j++) {
        if (selectedValues[j] === this.items![i].value) {
          actveItems.push(this.items![i]);
        }
      }
    }

    super.change(actveItems);
  }

  public refreshItems(newItems: any[], values: any[]) {
    this.items = newItems;
    this.originalList = this.items;
    super.getFormField().patchValue(values);
    super.markForChangeDetection(this._cdRef);
  }
}
