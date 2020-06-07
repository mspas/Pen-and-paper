import { NotificationModel } from "./notification.model";

export class PersonalDataModel {
    constructor(
      public id: number,
      public login: string,
      public email: string,
      public firstname: string,
      public lastname: string,
      public city: string,
      public age: number,
      public photoName: string,
      public isPhotoUploaded: boolean

    ) {}
  }

  export class PersonalDataCreateModel {
    constructor(
      public login: string,
      public email: string,
      public firstname: string,
      public lastname: string,
      public city: string,
      public age: number,
      public photoname: string,
      public isPhotoUploaded: boolean
    ) {}
  }

  export class PersonalDataListModel {
    constructor(
      public data: PersonalDataModel,
      public photo: any
    ) {}

}