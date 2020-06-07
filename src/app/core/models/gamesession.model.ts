export class GameSessionCreateModel {
    constructor(
        public sessionName: string,
        public date: Date,
        public gameId: number
    ) {}
}

export class GameSessionModel {
    constructor(
        public id: number,
        public sessionName: string,
        public date: Date,
        public gameId: number
    ) {}
}