import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { TopicModel } from '../../models/forum.model';
import { ApiService } from '../../api.service';


@Injectable()
export class TopicResolve implements Resolve<TopicModel> {

    
    constructor(private _api: ApiService, private router: Router) {
     }

    resolve(route: ActivatedRouteSnapshot) {
        let gameId = +route.params['id'];
        let topicId = +route.params['topicid'];
        let page = +route.params['page'];
        return this._api.getTopic(gameId, topicId, page);
    }
}