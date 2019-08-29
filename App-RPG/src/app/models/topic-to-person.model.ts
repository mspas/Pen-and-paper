export class TopicToPersonModel {
    constructor(
      public id: number,
      public forumId: number,
      public topicId: number,
      public userId: number,
      public lastActivitySeen: Date
    ) {}
}