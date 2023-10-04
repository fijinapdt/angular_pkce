import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { SecurityInfoService } from './security-info.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    public router: Router,
    // private _securityInfo: SecurityInfoService
    private _authentication: AuthenticationService
  ) {}

  async canActivate() {
    //const loginSuccessFul: any = await this._securityInfo.isLoggedIn();
    if (this._authentication.hasAccessToken) {
      return true;
    } else {
      this._authentication.authenticate();
      return false;
    }
    // if (!loginSuccessFul) {
    //   this.router.navigate(['/unauthorized']);
    //   // throw new Error('Unable to Login');
    //   return false;
    // } else {
    //   return true;
    // }
  }
}
