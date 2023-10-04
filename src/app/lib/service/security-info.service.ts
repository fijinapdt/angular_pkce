import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { LoginInfo } from '../classes/LoginInfo';
import { Pkce } from '../classes/pkce';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PkceService } from './pkce.service';
import { StateService } from './state.service';
import { AccessToken } from '../classes/access_token';
import { AccessTokens } from '../classes/access_tokens';
import { TokenResponse } from '../classes/token-response';
import { AuthenticateResponse } from '../classes/authenticate-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityInfoService {
  private clientId: string = 'dt-rosoom-pkce-client';
  private redirectUri: string = 'http://localhost:4200/tw/app';

  // private loginInfo: LoginInfo;
  // private _remoteUrl!: string;
  constructor(private httpClient: HttpClient,    
    private pkceService: PkceService,
    private stateService: StateService) {
    // this.loginInfo = new LoginInfo();
  }

  // public isLoggedIn(): boolean {
  //   return !!this.loginInfo.access_token;
  // }

  // private getToken(): string {
  //   return this.loginInfo!.access_token!;
  // }

  // public logOut() {
  //   this.loginInfo = {};
  // }

  // private loginNotExpired() {
  //   if (!this.loginInfo.expires_in_seconds) {
  //     return true;
  //   }
  //   let timeDiff: number;
  //   timeDiff =
  //     (new Date().getTime() - this.loginInfo!.created_Time?.getTime()!) / 1000;

  //   return timeDiff < this.loginInfo.expires_in_seconds;
  // }

  // private refreshToken() {
  //   const data: any = this._httpService
  //     .getData(this._remoteUrl, true)
  //     .subscribe((data) => {
  //       this.loginInfo = {
  //         access_token: data.token,
  //         refresh_token: data.refreshToken,
  //         expires_in_seconds: data.refreshIntervalSeconds,
  //         created_Time: new Date(),
  //       };

  //       this.updateRefreshTime();
  //     });
  // }
  // public async login(url: string) {
  //   this._remoteUrl = url;
  //   if (this.loginInfo.access_token && this.loginNotExpired()) {
  //     console.log(' Already Logged in');
  //     return true;
  //   }
  //   console.log(' Logging in ');
  //   const data: any = await this._httpService.getDataSync(url, true);
  //   this.loginInfo.access_token = data.token;
  //   this.loginInfo = {
  //     access_token: data.token,
  //     refresh_token: data.refreshToken,
  //     expires_in_seconds: data.refreshIntervalSeconds,
  //     created_Time: new Date(),
  //   };
  //   this.updateRefreshTime();
  //   if (this.loginInfo.access_token) return true;
  //   else return false;
  // }
  public addAccessToken(tokenResponse: TokenResponse): void {
    if (!tokenResponse || tokenResponse.access_token.length === 0) {
      return;
    }

    let expires = new Date();
    expires.setSeconds(expires.getSeconds() + tokenResponse.expires_in);

    let accesssTokens: AccessTokens = this.accessTokens?.tokens
      ? this.accessTokens
      : { tokens: [] };
      
    const token = {
      access_token: tokenResponse.access_token,
      state: tokenResponse.state,
      expires: expires.toUTCString(),
      environment_name: tokenResponse.environment_name,
    };

    accesssTokens.tokens.push(token);

    this.accessTokens = accesssTokens;
    this.accessToken = token;
  }

  public exchangeAuthenticateCode(
    authenticateResponse: AuthenticateResponse
  ): Observable<TokenResponse> {
    const verifier = localStorage.getItem(authenticateResponse.state);

    if (!verifier) {
      throw 'Could not get verifier from local storage using the state';
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      code: authenticateResponse.code,
      code_verifier: verifier,
    });

    return this.httpClient
    .post<TokenResponse>('https://authd.dubaitrade.ae/auth/realms/DUBAITRADE/protocol/openid-connect/token', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
    .pipe(
      tap((result) => {
        result.state = authenticateResponse.state;
        localStorage.removeItem(result.state);
        this.addAccessToken(result);
      })
    );
  }

  public removeState(state: string): void {
    localStorage.removeItem(state);
  }

  public get hasAccessToken(): boolean {
    return !!this.accessToken;
  }

  public get accessTokens(): AccessTokens {
    const accessTokenString: string | null =
      localStorage.getItem('access_tokens');

    const accessTokens: AccessTokens = !accessTokenString
      ? { tokens: [] }
      : (JSON.parse(accessTokenString) as AccessTokens);

    return accessTokens;
  }

  public set accessTokens(value: AccessTokens | null) {
    if (!value) {
      localStorage.removeItem('access_tokens');
    } else {
      localStorage.setItem('access_tokens', JSON.stringify(value));
    }
  }

  public validAccessTokens(): AccessToken[] {
    return this.accessTokens.tokens.filter(
      (token) => token.expires > new Date().toUTCString()
    );
  }

  public removeAccessToken(token: AccessToken): void {
    let cached = this.accessTokens;

    if (!cached) {
      return;
    }

    const idx = cached.tokens.indexOf(token);
    if (idx > -1) {
      cached.tokens = cached.tokens.splice(idx, 1);
      this.accessTokens = cached;
    }
  }
  
  public get accessToken(): AccessToken | null {
    const cachedToken = localStorage.getItem('access_token');
    if (!cachedToken) {
      return null;
    }

    const parsedToken = JSON.parse(cachedToken);

    if (parsedToken.expires <= new Date().toUTCString()) {
      this.removeAccessToken(parsedToken);
      this.accessToken = null;
      return null;
    }

    return parsedToken;
  }

  public set accessToken(value: AccessToken | null) {
    if (!value) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', JSON.stringify(value));
    }
  }
  public authenticate(): void {
    this.accessToken = null;

    const pkce = this.pkceService.getPkce();
    const state = this.stateService.getState(40);

    localStorage.setItem(state, pkce.verifier);

    (window as any).location.href = this.getAuthUrl(state, pkce);
  }

  private getAuthUrl(state: string, pkce: Pkce): string {
    const params = this.getAuthParams(state, pkce);
    return `https://authd.dubaitrade.ae/auth/realms/DUBAITRADE/protocol/openid-connect/auth?${params.toString()}`;
  }

  private getAuthParams(state: string, pkce: Pkce): HttpParams {
    const params = {
      response_type: 'code',
      scope: 'openid',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state: state,
      code_challenge_method: pkce.method,
      code_challenge: pkce.challenge,
    };
    return new HttpParams({
      fromObject: params,
    });
  }
  
  // private updateRefreshTime() {
  //   setTimeout(() => {
  //     this.refreshToken();
  //   }, 1800000);
  // }
}
