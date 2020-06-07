export class MyItemCreateModel {
    constructor(
        public itemName: string,
        public itemValue: number,
        public cardId: number
    ) {}
}

export class MyItemModel {
    constructor(
        public id: number,
        public itemName: string,
        public itemValue: number,
        public cardId: number
    ) {}
}