import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { ApiService } from '../../api.service';
import { FriendModel } from '../../models/friend.model';


@Injectable()
export class GameInviteResolve implements Resolve<any[]> {

    
    constructor(private _api: ApiService, private router: Router) {
     }

    resolve(route: ActivatedRouteSnapshot) {
        let gameId = +route.params['id'];
        return this._api.getGameAndFriends(gameId);
    }
}