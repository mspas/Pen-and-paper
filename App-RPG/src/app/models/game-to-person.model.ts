import { MySkillModel } from './myskill.model';
import { GameModel, GameAppModel } from "./game.model";
import { MyItemModel } from './myitem.model';

export class GameToPersonApiModel {
    constructor(
      public id: number,
      public gameId: number,
      public playerId: number,
      public isGameMaster: boolean,
      public isAccepted: boolean,
      public isMadeByPlayer: boolean,
      public characterHealth: number
    ) {}
}

export class GameToPersonCreateModel {
    constructor(
      public gameId: number,
      public playerId: number,
      public isGameMaster: boolean,
      public isAccepted: boolean,
      public isMadeByPlayer: boolean,
      public characterHealth: number
    ) {}
}

export class GameToPersonAppModel {
    constructor(
      public id: number,
      public gameId: number,
      public playerId: number,
      public isGameMaster: boolean,
      public isAccepted: boolean,
      public isMadeByPlayer: boolean,
      public characterHealth: number,
      public game: GameAppModel,
      public characterSkills: MySkillModel[],
      public characterItems: MyItemModel[]
    ) {}
}