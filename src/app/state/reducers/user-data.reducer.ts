import { Action, createReducer, on } from '@ngrx/store';
import * as UserDataActions from '../actions/user-data.actions';

export const userDataFeatureKey = 'userData';

export interface State {
  dupa: number
}

export const initialState: State = {
  dupa: -1
};

export const reducer = createReducer(
  initialState,

  on(UserDataActions.loadUserDatas, state => state),

);
