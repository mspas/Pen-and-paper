import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameForumComponent } from './game-forum.component';

describe('GameForumComponent', () => {
  let component: GameForumComponent;
  let fixture: ComponentFixture<GameForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
