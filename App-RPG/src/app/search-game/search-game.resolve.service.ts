import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { PersonalDataModel } from '../models/personaldata.model';
import { Observable } from 'rxjs';
import { GameAppModel } from '../models/game.model';


@Injectable()
export class SearchGameResolve implements Resolve<GameAppModel[]> {

    
    profileData: GameAppModel[];
    default: string = "search";

    constructor(private _api: ApiService, private router: Router) {
     }
    
    resolve(route: ActivatedRouteSnapshot) {
        let value = route.params['value'];
        if (value == this.default)
            value = ".....";
        return this._api.getGame(value);
    }
}