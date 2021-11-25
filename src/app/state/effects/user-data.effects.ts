import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as UserDataActions from '../actions/user-data.actions';


@Injectable()
export class UserDataEffects {


  loadUserDatas$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UserDataActions.loadUserDatas),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });


  constructor(private actions$: Actions) {}

}
