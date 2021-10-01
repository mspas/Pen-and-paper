import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
import { AuthService } from './auth.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private _auth: AuthService) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      console.log(req)
      if (req.headers.get('No-Auth') === 'True') {
        return next.handle(req.clone());
      }
  
      if (localStorage.getItem('token') != null) {
        const clonedreq = req.clone({
          headers: req.headers.set(
            'Authorization',
            'Bearer ' + localStorage.getItem('token')
          )
        });
        return next.handle(clonedreq).pipe(
          tap(
            succ => {},
            err => {
              if (err.status === 401 || err.status === 403) {
                this._auth.logout("/sign-in");
                this.router.navigate(['/sign-in']);
              }
            }
          )
        );
      } else {
        this.router.navigate(['/sign-in']);
      }
    }
  }