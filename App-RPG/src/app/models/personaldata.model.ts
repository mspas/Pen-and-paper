export class PersonalDataModel {
    constructor(
      public id: number,
      public login: string,
      public email: string,
      public firstname: string,
      public lastname: string,
      public city: string,
      public age: number,
      public photoName: string
    ) {}
  }

  export class PersonalDataCreateModel {
    constructor(
      public login: string,
      public email: string,
      public firstname: string,
      public lastname: string,
      public city: string,
      public age: number
    ) {}
  }