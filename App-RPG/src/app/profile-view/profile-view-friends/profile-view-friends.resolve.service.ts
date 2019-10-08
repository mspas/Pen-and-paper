import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { FriendModel } from '../../models/friend.model';


@Injectable()
export class FriendViewResolve implements Resolve<FriendModel[]> {

    
    profileData: FriendModel[];

    constructor(private _api: ApiService, private router: Router) {
     }

    resolve(route: ActivatedRouteSnapshot) {
        let nick = route.params['login'];
        return this._api.getData_OnlyView(nick);
    }
}