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

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return tokenNotExpired(null, token);
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
    this._http.post(this.url+'login', user).subscribe(
      (token: string) => {
        localStorage.setItem('token', token['token']);
        let tokenn = localStorage.getItem("token");
        let tokenInfo = this.getDecodedAccessToken(tokenn);
        this.router.navigate(['/profile', tokenInfo.login]);
        localStorage.setItem("id", tokenInfo.id);
      },
      //error => console.log(error)
      error => this.loginError.next(true)
    );

  }

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
    localStorage.removeItem('id');
    this.router.navigate(['/home']);
  }


}