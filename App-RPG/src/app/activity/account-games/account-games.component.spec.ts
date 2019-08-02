import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGamesComponent } from './account-games.component';

describe('AccountGamesComponent', () => {
  let component: AccountGamesComponent;
  let fixture: ComponentFixture<AccountGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
