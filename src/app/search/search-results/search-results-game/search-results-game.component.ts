import { Component, Input, OnInit } from '@angular/core';
import { GameListModel } from 'src/app/core/models/game.model';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-results-game',
  templateUrl: './search-results-game.component.html',
  styleUrls: ['./search-results-game.component.sass']
})
export class SearchResultsGameComponent implements OnInit {
  @Input() foundGames: GameListModel[];
  @Input() isLoading: boolean;

  faSpinner= faSpinner;

  constructor() { }

  ngOnInit() {
  }

}
