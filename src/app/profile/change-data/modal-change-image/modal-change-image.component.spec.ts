import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeImageComponent } from './modal-change-image.component';

describe('ModalChangeImageComponent', () => {
  let component: ModalChangeImageComponent;
  let fixture: ComponentFixture<ModalChangeImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangeImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
