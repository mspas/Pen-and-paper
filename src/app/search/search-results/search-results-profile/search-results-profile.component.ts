import { Component, Input, OnInit } from '@angular/core';
import { PersonalDataListModel } from 'src/app/core/models/personaldata.model';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-results-profile',
  templateUrl: './search-results-profile.component.html',
  styleUrls: ['./search-results-profile.component.sass']
})
export class SearchResultsProfileComponent implements OnInit {
  @Input() foundProfiles: PersonalDataListModel[];
  @Input() isLoading: boolean;

  faSpinner = faSpinner;

  constructor() { }

  ngOnInit() {
  }

}
