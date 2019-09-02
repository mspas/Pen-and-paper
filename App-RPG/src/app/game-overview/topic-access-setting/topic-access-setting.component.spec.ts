import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAccessSettingComponent } from './topic-access-setting.component';

describe('TopicAccessSettingComponent', () => {
  let component: TopicAccessSettingComponent;
  let fixture: ComponentFixture<TopicAccessSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicAccessSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicAccessSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
