import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFreeViewComponent } from './game-free-view.component';

describe('GameFreeViewComponent', () => {
  let component: GameFreeViewComponent;
  let fixture: ComponentFixture<GameFreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
