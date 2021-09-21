import { Component, Input, OnInit } from '@angular/core';
import { GameListModel } from 'src/app/core/models/game.model';

@Component({
  selector: 'app-search-results-game',
  templateUrl: './search-results-game.component.html',
  styleUrls: ['./search-results-game.component.sass']
})
export class SearchResultsGameComponent implements OnInit {
  @Input() foundGames: GameListModel[];
  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
