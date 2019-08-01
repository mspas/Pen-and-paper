export class NotificationModel {
    constructor(
        public lastMessageDate: Date,
        public lastGameNotificationDate: Date,
        public lastFriendNotificationDate: Date,
        public lastMessageSeen: Date,
        public lastGameNotificationSeen: Date,
        public lastFriendNotificationSeen: Date
    ) {}
  }

  export class NotificationAppModel {
    constructor(
        public id: number,
        public lastMessageDate: Date,
        public lastGameNotificationDate: Date,
        public lastFriendNotificationDate: Date,
        public lastMessageSeen: Date,
        public lastGameNotificationSeen: Date,
        public lastFriendNotificationSeen: Date
    ) {}
  }

  export class CheckNotificationModel {
    constructor(
        public message: boolean,
        public game: boolean,
        public friend: boolean
    ) {}
  }