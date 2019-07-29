import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { PersonalDataModel } from '../models/personaldata.model';
import { Observable } from 'rxjs';


@Injectable()
export class SearchFriendResolve implements Resolve<PersonalDataModel[]> {

    
    profileData: PersonalDataModel[];
    default: string = "search";

    constructor(private _api: ApiService, private router: Router) {
     }
    
    resolve(route: ActivatedRouteSnapshot) {
        let value = route.params['value'];
        if (value == this.default)
            return null;
        else
            return this._api.searchFriend(value);
    }
}