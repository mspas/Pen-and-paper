import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewFriendsComponent } from './profile-view-friends.component';

describe('ProfileViewFriendsComponent', () => {
  let component: ProfileViewFriendsComponent;
  let fixture: ComponentFixture<ProfileViewFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
