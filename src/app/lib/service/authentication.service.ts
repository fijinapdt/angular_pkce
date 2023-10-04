import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Pkce } from '../classes/pkce';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PkceService } from './pkce.service';
import { StateService } from './state.service';
import { AccessToken } from '../classes/access_token';
import { TokenResponse } from '../classes/token-response';
import { AuthenticateResponse } from '../classes/authenticate-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private clientId: string = 'dt-rosoom-pkce-client';
  private redirectUri: string = 'http://localhost:4200/tw/app';

  constructor(private httpClient: HttpClient,    
    private pkceService: PkceService,
    private stateService: StateService) {
  }

  public addAccessToken(tokenResponse: TokenResponse): void {
    if (!tokenResponse || tokenResponse.access_token.length === 0) {
      return;
    }

    let expires = new Date();
    expires.setSeconds(expires.getSeconds() + tokenResponse.expires_in);

    // let accesssTokens: AccessTokens = this.accessTokens?.tokens
    //   ? this.accessTokens
    //   : { tokens: [] };
      
    const token = {
      access_token: tokenResponse.access_token,
      state: tokenResponse.state,
      expires: expires.toUTCString(),
      environment_name: tokenResponse.environment_name,
    };

    // accesssTokens.tokens.push(token);

    // this.accessTokens = accesssTokens;
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

  // public get accessTokens(): AccessTokens {
  //   const accessTokenString: string | null =
  //     localStorage.getItem('access_tokens');

  //   const accessTokens: AccessTokens = !accessTokenString
  //     ? { tokens: [] }
  //     : (JSON.parse(accessTokenString) as AccessTokens);

  //   return accessTokens;
  // }

  // public set accessTokens(value: AccessTokens | null) {
  //   if (!value) {
  //     localStorage.removeItem('access_tokens');
  //   } else {
  //     localStorage.setItem('access_tokens', JSON.stringify(value));
  //   }
  // }

  // public validAccessTokens(): AccessToken[] {
  //   return this.accessTokens.tokens.filter(
  //     (token) => token.expires > new Date().toUTCString()
  //   );
  // }

  // public removeAccessToken(token: AccessToken): void {
  //   let cached = this.accessTokens;

  //   if (!cached) {
  //     return;
  //   }

  //   const idx = cached.tokens.indexOf(token);
  //   if (idx > -1) {
  //     cached.tokens = cached.tokens.splice(idx, 1);
  //     this.accessTokens = cached;
  //   }
  // }

  public removeAccessToken(): void {
    sessionStorage.removeItem('access_token');
  }
  
  public get accessToken(): AccessToken | null {
    const cachedToken = sessionStorage.getItem('access_token');
    if (!cachedToken) {
      return null;
    }

    const parsedToken = JSON.parse(cachedToken);

    if (parsedToken.expires <= new Date().toUTCString()) {
      this.removeAccessToken();
      this.accessToken = null;
      return null;
    }

    return parsedToken;
  }

  public set accessToken(value: AccessToken | null) {
    if (!value) {
      sessionStorage.removeItem('access_token');
    } else {
      sessionStorage.setItem('access_token', JSON.stringify(value));
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
 }
