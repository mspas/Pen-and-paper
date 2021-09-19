import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsProfileComponent } from './search-results-profile.component';

describe('SearchResultsProfileComponent', () => {
  let component: SearchResultsProfileComponent;
  let fixture: ComponentFixture<SearchResultsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
