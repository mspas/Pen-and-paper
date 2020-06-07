import { PersonalDataModel } from "./personaldata.model";
import { FriendModel } from "./friend.model";

export class MessageModel {
    constructor(
        public id: number,
        public sendDdate: Date,
        public wasSeen: boolean,
        public bodyMessage: string,
        public relationId: number,
        public senderId: number,
        public isPhoto: boolean
    ) {}
  }

  export class MessageCreateModel {
    constructor(
        public sendDdate: Date,
        public wasSeen: boolean,
        public bodyMessage: string,
        public relationId: number,
        public senderId: number,
        public isPhoto: boolean
    ) {}
  }

export class ConversationDataModel {
    constructor(
        public relation: FriendModel,
        public myProfile: PersonalDataModel,
        public userProfile: PersonalDataModel
    ) {}
  }
  
export class ConversationModel {
  constructor(
      public conversationData: ConversationDataModel,
      public photo: any,
      public messages: MessageModel[]
  ) {}
}