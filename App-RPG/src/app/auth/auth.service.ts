import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel, AccountCreateModel } from '../models/account.model';
import { PersonalDataModel } from '../models/personaldata.model';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AuthModel } from '../models/auth.model';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { TokenModel, TokenModelSuspicious, AccessToken, RefreshTokenCredentials } from '../models/token.model';

@Injectable()
export class AuthService {

  url = 'http://localhost:50168/api/';
  private token : string; 
  private loginError = new BehaviorSubject<boolean>(false);
  private accMsg = new BehaviorSubject<boolean>(false);

  currentLoginError = this.loginError.asObservable();
  currentAccMsg = this.accMsg.asObservable();

  constructor(private _http: HttpClient, private router: Router) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }
  getLogin(): string {
    return localStorage.getItem('nick');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    let isValid = tokenNotExpired(null, token);
    /*if (!isValid && token != null)
      this.refreshToken(this.getRefreshToken(), this.getLogin());
    */return tokenNotExpired(null, token);
  }

  getAccounts() {
    let obs = this._http.get(this.url+'account');
    obs.subscribe((res)=>console.log(res));
  }

  createAccountDB(account : AccountCreateModel) {
    this._http.post(this.url+'account', account).subscribe (
      error => this.accMsg.next(true));
  }

  signInUser(email: string, password: string) {
    const user: AuthModel = new AuthModel(email, password);
    this._http.post<AccessToken>(this.url+'login', user).subscribe(
      (token: AccessToken) => {
        let login = this.decodeToken(token);
        this.router.navigate(['/profile', login]);
      },
      //error => console.log(error)
      error => this.loginError.next(true)
    );

  }

  refreshToken(token: string, login: string) {
    let data = new RefreshTokenCredentials(token, login);
    console.log(JSON.stringify(data));
    this._http.post<AccessToken>(this.url+'login/refresh', data).subscribe(
      (token: AccessToken) => {
        let login = this.decodeToken(token);
        console.log(token.token);
        //this.router.navigate(['/profile', login]);
      },
      //error => console.log(error)
      error => this.loginError.next(true)
    );
  }

  decodeToken(token : AccessToken) {
    let accessToken = token.token;
    let accessTokenExp = token.expiration;

    let refreshToken = token.refreshToken.token;  
    let refreshTokenExp = token.refreshToken.expiration;
    
    localStorage.setItem('token', accessToken);
    localStorage.setItem('token-exp', accessTokenExp.toString());
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('refreshToken-exp', refreshTokenExp.toString());

    let tokenInfo = this.getDecodedAccessToken(accessToken);
    localStorage.setItem("id", tokenInfo.unique_name);
    localStorage.setItem("nick", tokenInfo.sub);

    return tokenInfo.sub;
  }

        /*var yourDate = new Date();  // for example

        // the number of .net ticks at the unix epoch
        var epochTicks = 621355968000000000;
        
        // there are 10000 .net ticks per millisecond
        var ticksPerMillisecond = 10000;
        
        // calculate the total number of .net ticks for your date
        var yourTicks = epochTicks + (yourDate.getTime() * ticksPerMillisecond);
        console.log(yourTicks);*/


  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token-exp');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshToken-exp');
    localStorage.removeItem('id');
    localStorage.removeItem('nick');
    this.router.navigate(['/home']);
  }


}