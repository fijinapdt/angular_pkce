import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { FieldConfig } from 'src/app/lib/classes/field.interface';
import { TranslateService } from '@ngx-translate/core';
import { AppInjector } from '../../classes/AppInjector';
import { Subscription } from 'rxjs';
import { ChangeDetectionService } from '../../service/change-detection.service';
import { TranslationService } from 'src/app/service/TranslationService';

@Component({
  selector: 'app-base-form-control',
  template: ``,
  styles: [],
})
export class BaseFormControlComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnDestroy
{
  @Input() parentForm: FormGroup | undefined;
  @Input() fieldConfig: FieldConfig | undefined;
  @Input() fb: FormBuilder | undefined;
  @Input() label: any;
  @Input() placeHolder: any;
  @Input() fieldName: any;
  @Input() fieldType: any;
  @Input() toolTip: string | undefined;
  @Input() validations: any[] | undefined;
  @Input() prefixIcon = 'description';
  @Input() showIcon: boolean = true;
  @Input() backgroundColor: ElementBackGround | undefined;
  @Input() helpTxt: string | undefined;
  @Output() outputEvent = new EventEmitter<FormEmitter>();

  // private _translateService: TranslateService;
  private _translateService: TranslateService;
  private _translationService: TranslationService;
  _cDref: ChangeDetectorRef | undefined;

  labelTxt: string | undefined = '';
  formElementBackGround: string | undefined = '';
  subscription: Subscription;

  constructor() {
    const injector = AppInjector.getInjector();
    this._translateService = injector.get(TranslateService);
    this._translationService = injector.get(TranslationService);
    this.subscription = injector
      .get(ChangeDetectionService)
      .getMessage()
      .subscribe((msg: any) => {
        if (this._cDref) this._cDref.markForCheck();
      });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterContentInit() {
    this.labelTxt = this.getLocaleValue(this.label);
    this.formElementBackGround = this.getFormElementBackGround() || '';
    this.setValidations();
  }

  ngAfterViewInit() {
    // console.log('After View Init');
    this.labelTxt = this.getLocaleValue(this.label);
    this.formElementBackGround = this.getFormElementBackGround() || '';
  }

  isEmptyObject(obj: any) {
    return obj && Object.keys(obj).length === 0;
  }

  logObject(obj: any) {
    console.log(JSON.stringify(obj));
  }

  getFormElementBackGround() {
    if (this.backgroundColor === ElementBackGround.white)
      return 'form-element-background-white .mat-form-field-flex';
    return '';
  }

  addToForm(name: string, control: FormControl) {
    this.parentForm?.addControl(name, control);
  }

  emitAction(action: FormActions, event: any, data?: any) {
    const obj: FormEmitter = { action: action, event: event, value: data };
    this.outputEvent.emit(obj);
  }

  markForChangeDetection(cdref: ChangeDetectorRef) {
    if (this._cDref) this._cDref.markForCheck();
  }
  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: any = [];
      validations.forEach((valid: any) => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  change(event: any, data?: any) {
    console.log(event);
    console.log(data);

    this.emitAction(FormActions.change, event, data);
  }

  clear(f: any, event: any) {
    // f.value = '';
    this.parentForm?.get(this.fieldName)?.patchValue('');
    this.emitAction(FormActions.click, event);
  }

  onKeydown(event: any) {
    if (event.key === 'Enter') {
      this.emitAction(FormActions.enter, event);
      event.stopPropagation();
    }
  }

  getLocaleValue(key: any) {
    // console.log(this._translationService);

    return this._translationService.getValue(key);
  }

  getFieldValue(): any {
    return this.getFormField().value;
  }

  setFieldValue(val: any) {
    this.getFormField().patchValue(val);
  }

  getFormField(): AbstractControl | any {
    return this.parentForm?.get(this.fieldName);
  }

  updateValidations(newValidations: any) {
    if (newValidations && newValidations.length > 0) {
      let validList: any = [];
      newValidations.forEach((validation: any) => {
        validList.push(validation.validator);
      });
      this.parentForm?.get(this.fieldName)?.setErrors(null);
      this.parentForm?.get(this.fieldName)?.setValidators(validList);
    }
  }
  setValidations() {
    if (this.validations && this.validations.length > 0) {
      let validList: any = [];
      this.validations.forEach((validation) => {
        validList.push(validation.validator);
      });
      this.parentForm?.get(this.fieldName)?.setValidators(validList);
    }
  }

  getSpecificedField(fieldName: any): AbstractControl | any {
    return this.parentForm?.get(fieldName);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  isNumberPressed(event: any) {
    return (
      (event.keyCode > 47 && event.keyCode < 58) ||
      (event.keyCode > 95 && event.keyCode < 106)
    );
  }
  isFowardSlash(event: any) {
    return event.keyCode === KEYS.FWD_SLASH;
  }

  isHelperKeys(event: any) {
    return (
      event.keyCode === KEYS.TAB ||
      event.keyCode === KEYS.BACKSPACE ||
      event.keyCode === KEYS.DELETE ||
      event.keyCode === KEYS.LEFT_ARROW ||
      event.keyCode === KEYS.RIGHT_ARROW ||
      event.keyCode === KEYS.END ||
      event.keyCode === KEYS.SHIFT ||
      event.keyCode === KEYS.HOME
    );
  }

  isTabKey(event: any) {
    return event.keyCode === KEYS.TAB;
  }

  isClearKeys(event: any) {
    return event.keyCode === KEYS.DELETE || event.keyCode === KEYS.BACKSPACE;
  }

  getFieldTokenLength(token: any) {
    return this.getFieldValue().split(token).length;
  }

  getFieldValueToken(token: any, pos: number) {
    if (this.getFieldValue().split(token).length > pos)
      return this.getFieldValue().split(token)[pos];
    return '';
  }

  getTxtTokenValue(txt: string, token: any, pos: number) {
    if (txt.split(token).length > pos) return txt.split(token)[pos];
    return '';
  }

  isTxtHighLighted(event: any) {
    return (
      event.currentTarget.selectionStart < event.currentTarget.selectionEnd
    );
  }

  switchToNext(event: any) {
    event.currentTarget.nextElementSibling.focus();
  }

  stopDefaultBehaviour(event: any) {
    event.preventDefault();
  }

  updateLabelTxt(label: any) {
    this.labelTxt = label;
  }
}

export enum FormActions {
  click = 1,
  change = 2,
  enter = 3,
}

export class FormEmitter {
  action?: FormActions;
  event?: any;
  value?: any;
}

export enum ElementBackGround {
  default = 0,
  white = 1,
}

export enum KEYS {
  TAB = 9,
  BACKSPACE = 8,
  DELETE = 46,
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39,
  END = 35,
  HOME = 36,
  SHIFT = 16,
  FWD_SLASH = 191,
}
