import { ApiService } from '../api.service';
import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { FriendModel } from '../models/friend.model';


@Injectable()
export class FriendResolve implements Resolve<FriendModel[]> {

    constructor(private _api: ApiService) {
     }

    resolve(route: ActivatedRouteSnapshot) {
        let id = localStorage.getItem("id");
        return this._api.getFriendsList(parseInt(id));
    }
}