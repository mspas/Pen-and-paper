import * as fromUserData from './user-data.actions';

describe('loadUserDatas', () => {
  it('should return an action', () => {
    expect(fromUserData.loadUserDatas().type).toBe('[UserData] Load UserDatas');
  });
});
