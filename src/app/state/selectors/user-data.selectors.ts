import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserData from '../reducers/user-data.reducer';

export const selectUserDataState = createFeatureSelector<fromUserData.State>(
  fromUserData.userDataFeatureKey
);
