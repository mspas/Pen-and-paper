import { PersonalDataModel } from "./personaldata.model";
import { TopicToPersonModel } from "./topic-to-person.model";

export class ForumModel {
    constructor(
        public id: number,
        public isPublic: boolean,
        public lastActivityDate: Date,
        public topics: TopicModel[]
    ) { }
}

export class TopicCreateModel {
    constructor(
        public forumId: number,
        public topicName: string,
        public category: string,
        public authorId: number,
        public isPublic: boolean,
        public messagesAmount: number,
        public createDate: Date,
        public lastActivityDate: Date,
        public lastActivityUserId: number,
        public totalPages: number
    ) { }
}

export class TopicModel {
    constructor(
        public id: number,
        public forumId: number,
        public topicName: string,
        public category: string,
        public authorId: number,
        public isPublic: boolean,
        public messagesAmount: number,
        public createDate: Date,
        public lastActivityDate: Date,
        public lastActivityUserId: number,
        public totalPages: number,
        public messages: MessageForumModel[],
        public userConnected: TopicToPersonModel[]

    ) { }
}

export class TopicListModel {
    constructor(
        public topicData: TopicModel,
        public author: PersonalDataModel,
        public wasSeen: boolean,
        public lastAuthor: PersonalDataModel,
        public lastPostDate: Date

    ) { }
}

export class MessageForumModel {
    constructor(
        public id: number,
        public sendDdate: Date,
        public editDdate: Date,
        public bodyMessage: string,
        public senderId: number,
        public topicId: number,
        public pageNumber: number,
        public isPhoto: boolean
    ) { }
}

export class MessageForumCreateModel {
    constructor(
        public sendDdate: Date,
        public editDdate: Date,
        public bodyMessage: string,
        public senderId: number,
        public topicId: number,
        public pageNumber: number,
        public isPhoto: boolean
    ) { }
}

export class NewTopicModel {
    constructor(
        public topic: TopicCreateModel,
        public bodyMessage: string
    ) { }
}

export class PostModel {
    constructor(
        public message: MessageForumModel,
        public user: PersonalDataModel,
        public photo: any
    ) { }
}

export class PostImageModel {
    constructor(
        public fileNames: string[],
        public divId: number,
        public html: string[],
        public htmlsm: string[],
        public photos: any
    ) { }
}

export class PostImageModel2 {
    constructor(
        public fileName: MessageForumModel,
        public divId: number,
        public html: string[],
        public photo: any
    ) { }
}