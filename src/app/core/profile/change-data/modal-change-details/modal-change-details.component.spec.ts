import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeDetailsComponent } from './modal-change-details.component';

describe('ModalChangeDetailsComponent', () => {
  let component: ModalChangeDetailsComponent;
  let fixture: ComponentFixture<ModalChangeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
