import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { ApiService } from '../services/api.service';
import { ForumModel } from '../models/forum.model';


@Injectable()
export class GameResolve implements Resolve<ForumModel> {

    
    constructor(private _api: ApiService, private router: Router) {
     }

    resolve(route: ActivatedRouteSnapshot) {
        var id = +route.params['id'];
        var topicId = +route.params['topicId'];
        var page = 1;
        var pageParam = route.params[page];
        if (pageParam && pageParam != "reply")
            page = parseInt(pageParam);

        if (topicId)
            return this._api.getGameForumTopic(id, topicId, page);
        else 
            return this._api.getGameAndForum(id);
    }
}