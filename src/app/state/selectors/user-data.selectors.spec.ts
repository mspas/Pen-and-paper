import * as fromUserData from '../reducers/user-data.reducer';
import { selectUserDataState } from './user-data.selectors';

describe('UserData Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUserDataState({
      [fromUserData.userDataFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
