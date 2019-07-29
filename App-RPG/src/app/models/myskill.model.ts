export class MySkillCreateModel {
    constructor(
        public skillName: string,
        public skillValue: number,
        public cardId: number
    ) {}
}

export class MySkillModel {
    constructor(
        public id: number,
        public skillName: string,
        public skillValue: number,
        public cardId: number
    ) {}
}