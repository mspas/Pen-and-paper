import { PersonalDataModel } from './personaldata.model';
import { SkillModel } from './skill.model';
import { GameSessionModel } from './gamesession.model';
import { GameToPersonAppModel } from './game-to-person.model';
import { ForumModel } from './forum.model';

export class GameCreateModel {
    constructor(
      public masterId: number,
      public title: string,
      public category: string,
      public nofparticipants: number,
      public nofplayers: number,
      public description: string,
      public location: string,
      public book: string,
      public comment: string,
      public date: Date,
      public needInvite: boolean,
      public isActive: boolean
    ) { }
  }

  export class GameAppModel {
    constructor(
      public id: number,
      public masterId: number,
      public title: string,
      public category: string,
      public nofparticipants: number,
      public nofplayers: number,
      public description: string,
      public location: string,
      public book: string,
      public comment: string,
      public date: Date,
      public needInvite: boolean,
      public isActive: boolean,
      public lastActivityDate: Date,
      public gameMaster: PersonalDataModel,
      public participants: GameToPersonAppModel[],
      public skillSetting: SkillModel[],
      public sessions: GameSessionModel[],
      public participantsProfiles: PersonalDataModel[],
    ) { }
  }

  export class GameModel {
    constructor(
      public gameData: GameAppModel,
      public forum: ForumModel
    ) { } 
  }