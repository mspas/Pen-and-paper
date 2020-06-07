

export class SkillCreateModel {
    constructor(
        public skillName: string,
        public gameId: number
    ) {}
}

export class SkillModel {
    constructor(
        public id: number,
        public skillName: string,
        public gameId: number
    ) {}
}