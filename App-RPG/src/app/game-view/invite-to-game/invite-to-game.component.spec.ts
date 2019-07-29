import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToGameComponent } from './invite-to-game.component';

describe('InviteToGameComponent', () => {
  let component: InviteToGameComponent;
  let fixture: ComponentFixture<InviteToGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteToGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteToGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
