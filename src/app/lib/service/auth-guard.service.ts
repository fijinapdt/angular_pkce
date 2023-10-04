import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { SecurityInfoService } from './security-info.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    public router: Router,
    private _securityInfo: SecurityInfoService
  ) {}

  async canActivate() {
    const loginSuccessFul: any = await this._securityInfo.login('/api/login');

    if (!loginSuccessFul) {
      this.router.navigate(['/unauthorized']);
      // throw new Error('Unable to Login');
      return false;
    } else {
      return true;
    }
  }
}
