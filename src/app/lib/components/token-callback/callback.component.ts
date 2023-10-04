import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { AuthenticateResponse } from '../../classes/authenticate-response';
import { SecurityInfoService } from '../../service/security-info.service';
import { ProgressLoaderService } from '../../service/progress-loader.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  public error: string | undefined;
  public errorMessage: string | undefined;
  public isWaiting: boolean = true;
  public get hasError(): boolean {
    return !!this.error;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private _securityInfoService: SecurityInfoService,
    private progressLoaderService: ProgressLoaderService,
    private router: Router,
  ) {}

  private toggleLoader(showLoader: boolean) {
    // console.log(showLoader);
    if (showLoader) {
      this.showLoader();
    } else {
      this.hideLoader();
    }
  }

  private showLoader(): void {
    this.progressLoaderService.show();
  }
  private hideLoader(): void {
    this.progressLoaderService.hide();
  }

  public ngOnInit(): void {

    
    this.activatedRoute.queryParams.subscribe((params) => {
      this.error = params['error'];

      if (!!this.error) {
        this.errorMessage = params['error_message'];
        this._securityInfoService.removeState(params['state']);
        return;
      }
      

      const authorizationResponse: AuthenticateResponse = {
        code: params['code'],
        state: params['state'],
      };

      this.toggleLoader(true);

      this._securityInfoService
        .exchangeAuthenticateCode(authorizationResponse)
        .pipe(
          finalize(() => {
            () => this.hideLoader()
          }),
          catchError((err) => {
            console.log(err);
            this.error = 'exchange_error';
            this.errorMessage =
              'There was an error exchanging the authorization code for an access token';
            return of(undefined);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/sample']);
        });
    });
  }
}
