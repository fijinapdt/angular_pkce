import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LandingComponent } from './dt/landing/landing.component';
import { SamplePageComponent } from './dt/sample-page-component/sample-page.component';
import { ConfirmpageComponent } from './dt/confirmpage/confirmpage.component';
import { LoginResolverService } from './lib/service/login-resolver.service';
import { AuthGuardService } from './lib/service/auth-guard.service';
import { UnauthorizedComponent } from './lib/components/unauthorized/unauthorized.component';
import { CallbackComponent } from './lib/components/token-callback/callback.component';

const routes: Routes = [
  {
    path: 'sample',
    component: SamplePageComponent,
    canActivate: mapToCanActivate([AuthGuardService]),
  },
  { path: 'landing', component: LandingComponent },
  { path: 'tw/app', component: CallbackComponent},  
  { path: 'confirm', component: ConfirmpageComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
