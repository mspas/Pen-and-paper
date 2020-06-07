import { PersonalDataModel, PersonalDataCreateModel } from "./personaldata.model";

export class AccountModel {
    constructor(
      public login: string,
      public password: string,
      public email: string,
      public personaldata: PersonalDataModel
    ) { }
  }

export class AccountCreateModel {
    constructor(
      public login: string,
      public password: string,
      public email: string,
      public personaldata: PersonalDataCreateModel
    ) { }
  }