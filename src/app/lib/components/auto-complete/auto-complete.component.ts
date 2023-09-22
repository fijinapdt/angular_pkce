import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { HttpRequestService } from 'src/app/lib/service/http-request.service';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['auto-complete.component.scss'],
})
export class AutoCompleteComponent
  extends BaseFormControlComponent
  implements OnInit
{
  @Input() items!: any[];
  @Input() url!: string;
  @Input() localSearch: boolean = false;
  @Input() loadLocalDataFromServer: boolean = false;
  itemSelected = false;

  filteredOptions$: Observable<any[]> | null | undefined = null;
  isLoading: Boolean = false;
  toHighlight = '';
  loadError: boolean = false;
  loadedItem!: any[];
  noData: boolean = false;
  selectedValue: any;
  objectSelected: any = {};

  constructor(
    private _httpService: HttpRequestService,
    private _chdref: ChangeDetectorRef
  ) {
    super();
    this._cDref = _chdref;
  }

  optionSelected(event: any) {
    this.objectSelected = {
      value: event.option.value.value,
      txt: event.option.value.label,
    };
    this.selectedValue = event.option.value;
    this.itemSelected = true;
    super.change(event, this.objectSelected);
  }

  async blur(event: any) {
    /*To make the blur event fire last */
    await super.delay(500);

    if (
      !this.objectSelected ||
      !this.objectSelected.value ||
      this.objectSelected.txt !== this.getFieldValue().label
    ) {
      this.selectedValue = '';
      this.clear(null, event);
      this.setLoadingFalse();
    }
  }
  refreshItems(items: any[], value?: any) {
    if (value) {
      this.selectedValue = value;
    }
    this.items = items;
    if (value) super.getFormField().patchValue(value);
    else super.getFormField().patchValue('');

    if (super.getFieldValue()) {
      this.objectSelected = {
        value: this.getFieldValue().value,
        txt: this.getFieldValue().label,
      };
      this.selectedValue = this.getFieldValue().value;
      this.itemSelected = true;
    }
    super.markForChangeDetection(this._chdref);
  }

  getTypedText() {
    return super.getFormField().value;
  }

  onClose(event: any) {
    this.setLoadingFalse();
  }

  setLoadingFalse() {
    this.isLoading = false;
    super.markForChangeDetection(this._chdref);
  }

  setLoadingTrue() {
    this.isLoading = true;
    super.markForChangeDetection(this._chdref);
  }

  override ngOnInit() {
    if (this.getFieldValue()) {
      this.objectSelected = {
        value: this.getFieldValue().value,
        txt: this.getFieldValue().label,
      };
      this.selectedValue = this.getFieldValue().value;
      this.itemSelected = true;
    }
    if (this.localSearch) {
      this.filteredOptions$ = this.getFormField().valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filterLocal(value))
      );
    } else {
      let control = null;
      if (this.parentForm) {
        control = this.parentForm.get(this.fieldName);
        if (control) {
          this.filteredOptions$ = control.valueChanges;
        } else {
          this.filteredOptions$ = null;
        }
      } else {
        this.filteredOptions$ = null;
      }
      this.filteredOptions$ = control!.valueChanges.pipe(
        debounceTime(300),
        switchMap((term: string) => {
          if (term.toLocaleString().indexOf('object Object') !== -1) {
            this.setLoadingFalse();
            return of(null);
          }
          if (term !== '') {
            this.setLoadingTrue();
            this.objectSelected = {};
            return this._httpService
              .getData(this.url + '?q=' + term)
              .pipe(tap(() => this.setLoadingFalse()));
          } else {
            return of(null);
          }
        })
      );
    }
  }

  // private _filter(value: string): Observable<any> {
  //   const filterValue = value.toLowerCase();
  //   this.toHighlight = value.toLowerCase();
  //   return of(this.items.filter(option => option.label.toLowerCase().indexOf(filterValue) !== -1));
  // }

  private _filterLocal(value: string): any[] {
    if (value.toLocaleString().indexOf('object Object') !== -1) {
      return [];
    }
    const filterValue = value.toLowerCase();
    this.toHighlight = value.toLowerCase();
    if (!this.items) {
      return [];
    }
    if (value.trim() === '') {
      return this.items;
    }
    return this.items.filter(
      (option) => option.label.toLowerCase().indexOf(filterValue) !== -1
    );
  }

  displayFn(option: any) {
    if (option) {
      return option.label;
    }
  }

  // displayFn(id) {
  //   if (!id) return '';

  //   let index = this.items.findIndex(item => item.value === id);
  //   this.isLoading =false;
  //   return this.items[index].label;

  // }
}
