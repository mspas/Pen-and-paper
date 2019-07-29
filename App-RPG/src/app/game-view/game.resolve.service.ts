import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { ApiService } from '../api.service';
import { GameAppModel } from '../models/game.model';


@Injectable()
export class GameResolve implements Resolve<GameAppModel> {

    
    constructor(private _api: ApiService, private router: Router) {
     }

    resolve(route: ActivatedRouteSnapshot) {
        let id = +route.params['id'];
        return this._api.getGameView(id);
    }
}