import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  TableAction,
  TableComponentResp,
  TableDefn,
} from '../../classes/TableDefn';

@Component({
  selector: 'app-normal-table',
  templateUrl: 'normal-table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class NormalTableComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns!: string[];
  @Input() columnDefns!: string[];
  @Input() tableDS: any[] = [];
  @Input() url!: string;
  @Input() tableDefn!: TableDefn[];
  @Input() view = false;
  @Input() delete = false;
  @Input() edit = false;
  @Input() other = false;

  @Input() download = false;
  @Input() otherTip!: string;
  @Input() otherIcon!: string;
  @Output() clickEvent = new EventEmitter();
  @Input() checkBoxEnabled = false;
  @Input() isScrollableTable = false;
  @Input() isRowClickable = false;
  @Input() noRecordsMessage = 'No Data Found';
  @Input() tableHeight: number = 400;

  tableId = 0;
  offsetWidth = 0;
  cellWidth = 0;
  checkBoxColWidth = 40;
  scrollableClass = '';
  scrollableHeadClass = '';
  scrollableBodyClass = '';
  clickRow = '';
  constructor(private _changeDetector: ChangeDetectorRef) {
    this.tableId = Math.floor(Math.random() * 20000 + 1);
  }

  ngOnInit() {
    if (this.isScrollableTable) {
      this.scrollableClass = 'table-scroll';
      this.scrollableHeadClass = 'thead-scroll';
      this.scrollableBodyClass = 'tbody-scroll';
    }

    if (this.isRowClickable) this.clickRow = 'row-click-enabled';
  }
  afterinit() {
    if (
      document.getElementById('' + this.tableId + '') != null &&
      this.offsetWidth === 0
    ) {
      let margin = 20;

      if (this.checkBoxEnabled) {
        margin = margin + this.checkBoxColWidth;
      }
      let columnSize = this.tableDefn.length;
      if (
        this.delete ||
        this.view ||
        this.edit ||
        this.download ||
        this.other
      ) {
        columnSize = columnSize + 1;
      }

      this.offsetWidth =
        document.getElementById('' + this.tableId + '')!.offsetWidth - margin;
      this.cellWidth = Math.floor(this.offsetWidth / columnSize);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.afterinit();
    });
  }

  isClickableRow() {
    if (this.isRowClickable) return 'row-click-enabled';
    return '';
  }

  rowClick(dataRow: any, dataIndex: any) {
    const data: TableComponentResp = {
      action: TableAction.rowClick,
      dataRow: dataRow,
      index: dataIndex,
    };
    this.clickEvent.emit(data);
  }

  getView() {
    return TableAction.view;
  }

  getDownload() {
    return TableAction.download;
  }

  getOther() {
    return TableAction.other;
  }
  getDelete() {
    return TableAction.delete;
  }
  getEdit() {
    return TableAction.edit;
  }

  getId() {
    if (this.tableId == 0) this.tableId = Math.floor(Math.random() * 20000 + 1);

    return this.tableId;
  }

  checkedItem($event: any, row: any, i: any) {
    if ($event.checked) this.action(TableAction.rowCheck, row, i);
    else this.action(TableAction.rowUnCheck, row, i);
  }
  action(tableAction: TableAction, row: any, i: any) {
    const data: TableComponentResp = {
      action: tableAction,
      dataRow: row,
      index: i,
    };
    this.clickEvent.emit(data);
  }

  refreshTable(tableDS: any) {
    this.tableDS = tableDS;
  }

  addItems(tablElem: any) {
    this.tableDS.push(tablElem);
  }

  removeItem(tableElem: any) {
    this.tableDS.splice(tableElem, 1);
  }
  loopArray(n: number): any[] {
    return Array(n);
  }
}
