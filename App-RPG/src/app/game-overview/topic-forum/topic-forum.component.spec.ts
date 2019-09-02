import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicForumComponent } from './topic-forum.component';

describe('TopicForumComponent', () => {
  let component: TopicForumComponent;
  let fixture: ComponentFixture<TopicForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
