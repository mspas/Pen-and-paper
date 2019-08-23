export class ForumModel {
    constructor(
        public id: number,
        public forumName: string,
        public isPublic: boolean,
        public lastActivityDate: Date,
        public topics: TopicModel[]
    ) { }
}

export class TopicModel {
    constructor(
        public id: number,
        public topicName: string,
        public isPublic: boolean,
        public lastActivityDate: Date,
        public forumId: number,
        public messages: MessageForumModel[]
    ) { }
}

export class MessageForumModel {
    constructor(
        public id: number,
        public sendDdate: Date,
        public bodyMessage: string,
        public senderId: number,
        public forumId: number,
        public topicId: number
    ) { }
}