import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from '../components/textarea/textarea.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ButtonComponent } from '../components/button/button.component';
import { AlertComponent } from '../components/alert/alert.component';
import { TextInputComponent } from '../components/text-input/text-input.component';
import { NumbersOnlyDirective } from '../directive/numbers-only.directive';
import { BaseComponent } from '../classes/BaseComponent';
import { BaseFormControlComponent } from '../components/base-form-control/base-form-control.component';
import { FileuploadComponent } from '../components/fileupload/fileupload.component';
import { ProgressLoaderComponent } from '../components/progress-loader/progress-loader.component';
import { HighlightPipe } from '../pipe/HighLightPipe';
import { MessageNotificationService } from '../service/message-notification.service';
import { NotificationBarComponent } from '../components/notification-bar/notification-bar.component';
import { DateInputComponent } from '../components/date-input/date-input.component';
import { AutoCompleteComponent } from '../components/auto-complete/auto-complete.component';
import { SelectComponent } from '../components/select/select.component';
import { TableComponent } from '../components/table/table.component';
import { RadioComponent } from '../components/radio/radio.component';
import { CheckBoxComponent } from '../components/check-box/check-box.component';
import { SlideComponent } from '../components/slide/slide.component';
import { NormalTableComponent } from '../components/table/normal-table.component';
// import { BreadCrumbComponent } from '../components/bread-crumb/bread-crumb.component';
import { BreadcrumbService } from '../service/breadcrumb.service';
import { MasterGuard } from '../guards/master-guard.service';
import { AuthGuardService } from '../service/auth-guard.service';
import { SanitizeHtmlPipe } from '../pipe/SanitizeHtmlPipe';
import { ErrorHandlerService } from '../service/error-handler.service';
import { FormErrorComponent } from '../components/form-error/form-error.component';
import { InfoBoxComponent } from '../components/info-box/info-box.component';
import { ActionDialogComponent } from '../components/action-dialog/action-dialog.component';
import { CollapsePanelComponent } from '../components/collapse-panel/collapse-panel.component';
import { CollapseAccordComponent } from '../components/collapse-accord/collapse-accord.component';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { StaticFieldComponent } from '../components/static-field/static-field.component';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { TreeItemComponent } from '../components/tree/tree-item/tree-item.component';
import { TreeNodeComponent } from '../components/tree/tree-node/tree-node.component';
import { TelNumberComponent } from '../components/tel-number/tel-number.component';
import { CardComponent } from '../components/card/card.component';
import { DateTimeComponent } from '../components/date-time/date-time.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { CloseComponent } from '../components/close/close.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { PhoneNumberDirective } from '../directive/phone-number.directive';
import { PageComponent } from '../components/page/page.component';

@NgModule({
  declarations: [
    TextareaComponent,
    DialogComponent,
    ButtonComponent,
    NumbersOnlyDirective,
    AlertComponent,
    TextInputComponent,
    BaseComponent,
    HighlightPipe,
    InfoBoxComponent,
    BaseFormControlComponent,
    FileuploadComponent,
    ProgressLoaderComponent,
    NotificationBarComponent,
    DateInputComponent,
    AutoCompleteComponent,
    SelectComponent,
    TableComponent,
    RadioComponent,
    CheckBoxComponent,
    FormErrorComponent,
    SlideComponent,
    NormalTableComponent,
    PageComponent,
    // BreadCrumbComponent,
    SanitizeHtmlPipe,
    ActionDialogComponent,
    CollapseAccordComponent,
    CollapsePanelComponent,
    PageHeaderComponent,
    StaticFieldComponent,
    ConfirmComponent,
    TreeItemComponent,
    TreeNodeComponent,
    TelNumberComponent,
    CardComponent,
    DateTimeComponent,
    BreadcrumbComponent,
    CloseComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule,
    MatDatepickerModule,
  ],
  providers: [
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
  exports: [
    TextareaComponent,
    DialogComponent,
    ButtonComponent,
    NumbersOnlyDirective,
    AlertComponent,
    TextInputComponent,
    BaseComponent,
    HighlightPipe,
    InfoBoxComponent,
    BaseFormControlComponent,
    FileuploadComponent,
    ProgressLoaderComponent,
    NotificationBarComponent,
    DateInputComponent,
    AutoCompleteComponent,
    SelectComponent,
    TableComponent,
    RadioComponent,
    CheckBoxComponent,
    FormErrorComponent,
    SlideComponent,
    NormalTableComponent,
    // BreadCrumbComponent,
    SanitizeHtmlPipe,
    ActionDialogComponent,
    CollapseAccordComponent,
    CollapsePanelComponent,
    PageHeaderComponent,
    StaticFieldComponent,
    ConfirmComponent,
    TreeItemComponent,
    TreeNodeComponent,
    TelNumberComponent,
    CardComponent,
    DateTimeComponent,
    BreadcrumbComponent,
    CloseComponent,
    PageComponent,
  ],
})
export class CommonLibModule {}
