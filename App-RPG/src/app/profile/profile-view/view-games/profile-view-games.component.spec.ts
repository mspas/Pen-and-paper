import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewGamesComponent } from './profile-view-games.component';

describe('ProfileViewGamesComponent', () => {
  let component: ProfileViewGamesComponent;
  let fixture: ComponentFixture<ProfileViewGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
