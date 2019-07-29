import { PersonalDataModel } from './personaldata.model';
export class FriendModel {
    constructor(
        public id: number,
        public personalData: PersonalDataModel,
        public isAccepted: boolean,
        public isReceiver: boolean
    ) {}
  }

  export class FriendCreateModel {
    constructor(
        public isAccepted: boolean,
        public player1Id: number,
        public player2Id: number
    ) {}
  }

  export class FriendListModel {
    constructor(
        public personalData: PersonalDataModel,
        public photo: any
    ) {}
  }
