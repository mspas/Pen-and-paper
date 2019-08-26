export class ForumModel {
    constructor(
        public id: number,
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
        public editDdate: Date,
        public bodyMessage: string,
        public senderId: number,
        public topicId: number
    ) { }
}