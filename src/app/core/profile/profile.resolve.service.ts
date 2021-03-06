import { ApiService } from "../services/api.service";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { PersonalDataModel } from "../models/personaldata.model";

@Injectable()
export class PersonalDataResolve implements Resolve<PersonalDataModel> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let profileLogin = route.params["login"];
    return this.api.getProfileData(profileLogin);
  }
}
