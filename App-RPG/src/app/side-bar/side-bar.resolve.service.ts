import { GameToPersonApiModel } from './../models/game-to-person.model';
import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { ApiService } from '../services/api.service';
import { GameToPersonAppModel } from '../models/game-to-person.model';


@Injectable()
export class ProfileDataResolve implements Resolve<GameToPersonAppModel[]> {

    
    constructor(private _api: ApiService, private router: Router) {
     }

    resolve(route: ActivatedRouteSnapshot) {
        let id = route.params['profileid'];
        let nick = route.params['login'];
        return this._api.getDataProfile(id, nick);
    }
}