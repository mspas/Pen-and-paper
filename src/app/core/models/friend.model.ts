import { PersonalDataModel } from './personaldata.model';
export class FriendModel {
    constructor(
        public id: number,
        public personalData: PersonalDataModel,
        public isAccepted: boolean,
        public isReceiver: boolean,
        public isFriendRequest: boolean,
        public lastMessageDate: Date
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
        public relationData: FriendModel,
        public personalData: PersonalDataModel,
        public photo: any
    ) {}
  }
