import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { ApiService } from "../services/api.service";
import { ForumModel } from "../models/forum.model";

@Injectable()
export class GameResolve implements Resolve<ForumModel> {
  constructor(private _api: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    let id = +route.params["id"];
    let topicId = +route.params["topicId"];
    let pageParam = route.params["page"];
    let page = pageParam && pageParam != "reply" ? parseInt(pageParam) : 1;

    if (topicId) return this._api.getGameForumTopic(id, topicId, page);
    else return this._api.getGameAndForum(id);
  }
}