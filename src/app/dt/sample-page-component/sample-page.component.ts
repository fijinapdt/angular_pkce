import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FieldConfig, Validator } from 'src/app/lib/classes/field.interface';
// import { TestPopUpComponent } from 'src/app/test-pop-up/test-pop-up.component';
import {
  NotificationMessage,
  MessageStatus,
} from 'src/app/lib/classes/NotificationMessage';
import { BaseComponent } from 'src/app/lib/classes/BaseComponent';
import {
  TableType,
  TableDefn,
  TableAction,
  TableFunctions,
} from 'src/app/lib/classes/TableDefn';
import { TableComponent } from 'src/app/lib/components/table/table.component';
import { AutoCompleteComponent } from 'src/app/lib/components/auto-complete/auto-complete.component';
// import { ValidateName } from '../home-new/validator/home-new.validator';
import { SelectComponent } from 'src/app/lib/components/select/select.component';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NormalTableComponent } from 'src/app/lib/components/table/normal-table.component';
import { TelNumberComponent } from 'src/app/lib/components/tel-number/tel-number.component';
import { DialogOptions } from 'src/app/lib/service/dialog.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss'],
})
export class SamplePageComponent extends BaseComponent implements OnInit {
  myForm!: FormGroup;

  firstNameValidations!: Validator[];
  telValidations!: Validator[];
  uploadValidations!: Validator[];
  autoVals!: Validator[];
  checkBoxVals!: Validator[];
  checkBoxConfig!: FieldConfig;
  test!: string;
  clickCount = 0;
  public TableAction = TableAction;

  @ViewChild(TableComponent) dataTable!: TableComponent;
  @ViewChild('ac1') autoComplete!: AutoCompleteComponent;
  @ViewChild('ac2') autoComplete2!: AutoCompleteComponent;
  @ViewChild(NormalTableComponent) normalTable!: NormalTableComponent;
  @ViewChild(TelNumberComponent) telnumCompo!: TelNumberComponent;

  @ViewChild('sel1') selectComponent!: SelectComponent;

  items: any[] = [
    { value: '0', label: 'Red' },
    { value: '1', label: 'Green' },
    { value: '2', label: 'Blue' },
  ];

  items2: any[] = [
    { value: '0', label: 'One' },
    { value: '1', label: 'Two' },
    { value: '2', label: 'Three' },
  ];

  selectItems: any[] = [
    { value: '0', label: 'egg' },
    { value: '1', label: 'Peas' },
    { value: '2', label: 'Beans' },
  ];

  tableItems: any[] = [];

  tableDfn: TableDefn[] = [
    {
      displayName: 'Rosoom ',
      mappingName: 'id',
      type: TableType.number,
      sort: true,
      width: 8,
    },
    {
      displayName: 'Sample Long Column Name',
      mappingName: 'name',
      type: TableType.string,
      sort: true,
      // width: 40,
    },
    {
      displayName: 'Department',
      mappingName: 'dept.deptName',
      type: TableType.string,
    },
    {
      displayName: 'Amount',
      mappingName: 'dateOfBirth',
      type: TableType.string,
      sort: true,
    },
    { displayName: 'html', isHtml: true, mappingName: 'html', width: 10 },

    {
      displayName: '',
      mappingName: 'action',
      type: TableType.action,
    },
  ];

  rowActions: TableFunctions[] = [
    {
      action: TableAction.edit,
      fnName: 'edit',
      toolTip: 'edit',
      icon: 'view_headline',
      iconColor: 'blue',
      iconText: 'edit',
    },
    {
      action: TableAction.delete,
      fnName: 'delete',
      toolTip: 'delete',
      iconText: 'delete',
      icon: 'delete',
      iconColor: 'red',
    },
  ];

  normalTableDefn: TableDefn[] = [
    {
      displayName: 'Name',
      mappingName: 'name',
      type: TableType.string,
      sort: true,
    },
    { displayName: 'Email', mappingName: 'email', type: TableType.string },
    {
      displayName: 'Date of Birth',
      mappingName: 'dateOfBirth',
      type: TableType.string,
      sort: true,
    },
  ];
  ctr = 0;
  reloadDataTable(event: any) {
    this.ctr++;
    console.log(this.dataTable);

    if (this.ctr == 1)
      this.dataTable.refreshTable('firName=22&lastName=dd', true, false, false);
    if (this.ctr == 2)
      this.dataTable.refreshTable('firName=22&lastName=dd', false, true, false);
    if (this.ctr == 3) {
      this.dataTable.refreshTable('firName=22&lastName=dd', false, false, true);
    }
    if (this.ctr == 4) {
      this.dataTable.refreshTable('firName=22&lastName=dd', true, true, true);
      this.ctr = 0;
    }
  }
  constructor(private _route: ActivatedRoute) {
    super();
    this._pageHeaderService.updateHeader('Page header');
  }

  sClick($event: any) {
    console.log($event);
  }

  fileUpload($event: any) {
    console.log($event);
    this.myForm.patchValue({
      uploadDoc: $event,
    });
    this.chageDetectorRef.markForCheck();
  }

  openAlert() {
    this._dialogService
      .alert()
      .subscribe((retval) => console.log(' Dialog Data ', retval));
  }

  openConfirm() {
    this._dialogService
      .confirm()
      .subscribe((retval) => console.log(' Dialog Data ', retval));
  }

  addRow() {
    const data = {
      firstName: 'Carren',
      age: 12,
      title: 'Hello',
    };

    const dialogOptions: DialogOptions = {
      minWidth: '700px',
    };
    // this._dialogService
    //   .openDialog(TestPopUpComponent, data, dialogOptions)
    //   .subscribe((retval) => {
    //     console.log(retval);
    //     this.tabForms.push(this.addTableData(retval.firstName, retval.age));
    //   });
  }

  addTableRow() {
    this.normalTable.addItems({
      id: '6',
      name: 'ccdd',
      email: 'a@y.com',
      dateOfBirth: '12/12/2018',
    });
  }

  delNormalTable(event: any) {
    console.log(event);

    if (event.action == TableAction.delete)
      this.normalTable.removeItem(event.dataRow);
  }

  tableAction(data: any) {
    console.log(data);
    if (data.action === TableAction.delete) {
      this.deleteTableRow(data.index);
    }
  }

  deleteTableRow(i: any) {
    this.tableItems.splice(i, 1);
  }

  deleteRow(i: any) {
    this.tabForms.removeAt(i);
  }

  editRowr(i: any) {
    console.log(this.tabForms.controls[i].value);
    const data = {
      firstName: this.tabForms.controls[i].value.firstName,
      age: this.tabForms.controls[i].value.age,
      title: 'Hello',
    };
    // this._dialogService
    //   .openDialog(TestPopUpComponent, data)
    //   .subscribe((retval) => {
    //     console.log(retval);
    //     this.tabForms.controls[i].setValue(retval);
    //   });
  }

  addTableData(nameStr: any, age: any): FormGroup {
    return this.formBuilder.group({
      firstName: [nameStr],
      age: [age],
    });
  }

  get tabForms() {
    return this.myForm.get('tableData') as FormArray;
  }

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      console.log('Param ' + params['p1']);
    });
    this.firstNameValidations = [
      {
        name: 'minlength',
        validator: Validators.minLength(6),
        message: 'Min Length 6',
      },
      {
        name: 'required',
        validator: Validators.required,
        message: 'First Name Required',
      },
      // {
      //   name: 'validname',
      //   validator: ValidateName,
      //   message: 'Name has to be DubaiTrade',
      // },
    ];
    this.telValidations = [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Tel number Required',
      },
    ];
    this.uploadValidations = [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Document is Required',
      },
    ];
    this.autoVals = [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Select one item',
      },
    ];
    this.checkBoxVals = [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Select one item',
      },
    ];
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      txtField: ['TXT Field', [Validators.required, Validators.minLength(6)]],
      email: ['y@y.com', [Validators.required, Validators.email]],
      selectItem: ['2'],
      dateInput: ['15/7/2018', [Validators.required]],
      dateTimeInput: [null, [Validators.required]],
      gender: [1],
      address: ['', [Validators.required]],
      telephone: ['971-55-8009536', [Validators.required]],
      yn: [true],
      tnc: [true, [Validators.required]],
      uploadDoc: [null, Validators.required],
      multiSelectItem: [['1', '2', '0']],
      autoSelectItem2: ['', [Validators.required]],
      autoSelectItem: ['', [Validators.required]],
      autoSelectItem3: [{ value: '2', label: 'Three' }, [Validators.required]],
      tableData: this.formBuilder.array([]),
    });

    this.checkBoxConfig = {
      label: 'Lang',
      name: 'lang',
      options: [
        { id: 1, value: 'Eng', selected: false },
        { id: 2, value: 'Arabic', selected: true },
      ],
    };

    this.notfnService.actionInvoker$.subscribe((arg) => this.callMe(arg));
  }

  dataTableClick(event: any) {
    console.log(event);
  }
  getOutput(data: any) {
    //  console.log('In get Output ' + data.value);
  }

  textOuput($event: any) {
    console.log(' OUT PUT ');
    console.log($event);
  }
  intializeAutoSelect() {
    this.items = [];
    this.items.push({ value: '2', label: 'Red' });
    // this.autoComplete.refreshItems(this.items);
    this.autoComplete.refreshItems(this.items, '2');
    // this.myForm.get('autoSelectItem').patchValue('2');
  }

  refreshSelectItems() {
    const newItems: any[] = [
      { value: '0', label: 'water' },
      { value: '1', label: 'milk' },
      { value: '2', label: 'juice' },
    ];
    const newValues: any[] = ['0', '1'];
    this.selectComponent.refreshItems(newItems, newValues);
  }

  reset() {
    super.resetForm(this.myForm);
  }

  callMe(obj: any) {
    console.log(obj);
  }

  onSubmitExt(event: any) {
    const data = { name: 'abc', email: '122@y.com', age: 11 };
    super.postToExternalSite(data, 'http://localhost:8080/ep/app/extUrl');
  }
  onSubmit(event: any) {
    console.log(event);
    console.log('Valid?', this.myForm.valid); // true or false
    console.log('Value', this.myForm.value);
    const notfnMessage: NotificationMessage = {
      text: 'Click <a href="#" >Here</a>',
      type: MessageStatus.success,
    };
    let notfnMessages: NotificationMessage[] = [];
    notfnMessages.push(notfnMessage);
    notfnMessages.push(notfnMessage);
    this.notfnService.updateMessage(notfnMessages);
    // this.clickCount = this.clickCount + 1;

    // // super.validateForm(this.myForm);

    // const navextras: NavigationExtras = {
    //   queryParams: { 'data': JSON.stringify('') }
    // };
    // this.notfnService.clearMessage();
    // this._router.navigate(['/confirm'], navextras);
  }
}
