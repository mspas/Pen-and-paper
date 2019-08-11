import { Component, OnInit, Input } from '@angular/core';
import { GameToPersonAppModel } from '../../models/game-to-person.model';

@Component({
  selector: 'app-account-games',
  templateUrl: './account-games.component.html',
  styleUrls: ['./account-games.component.css']
})
export class AccountGamesComponent implements OnInit {

  @Input("myGamesAPPList") myGamesAPPList: GameToPersonAppModel[] = [];
  
  constructor() { }

  ngOnInit() {
  }

}
