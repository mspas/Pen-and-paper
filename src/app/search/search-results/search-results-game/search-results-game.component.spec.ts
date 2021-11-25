import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsGameComponent } from './search-results-game.component';

describe('SearchResultsGameComponent', () => {
  let component: SearchResultsGameComponent;
  let fixture: ComponentFixture<SearchResultsGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
