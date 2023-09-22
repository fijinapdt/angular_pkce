import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../lib/modules/material.module';
import { CommonLibModule } from '../lib/modules/custom-components.module';
import { RouterModule } from '@angular/router';
import { SamplePageComponent } from './sample-page-component/sample-page.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmpageComponent } from './confirmpage/confirmpage.component';

@NgModule({
  declarations: [LandingComponent, SamplePageComponent, ConfirmpageComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonLibModule,
    RouterModule,
    MatIconModule,
  ],
})
export class DtModule {}
