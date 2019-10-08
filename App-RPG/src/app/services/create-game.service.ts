import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GameCreateModel } from '../models/game.model';


@Injectable()
export class CreateGameDataService {

  private newGame = new BehaviorSubject<GameCreateModel>( null );

  currentNewGame = this.newGame.asObservable();

  changeNewGameData(data: GameCreateModel) {
    this.newGame.next(data)
  }

}