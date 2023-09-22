import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './dt/landing/landing.component';
import { SamplePageComponent } from './dt/sample-page-component/sample-page.component';
import { ConfirmpageComponent } from './dt/confirmpage/confirmpage.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'sample', component: SamplePageComponent },
  { path: 'confirm', component: ConfirmpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
