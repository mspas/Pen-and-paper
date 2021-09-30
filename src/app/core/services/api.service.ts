import { forkJoin as observableForkJoin, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { MySkillCreateModel } from "../models/myskill.model";
import {
  GameToPersonApiModel,
  GameToPersonAppModel,
  GameToPersonCreateModel,
} from "../models/game-to-person.model";
import { GameCreateModel, GameAppModel } from "../models/game.model";
import { FriendCreateModel, FriendModel } from "../models/friend.model";
import { PersonalDataModel } from "../models/personaldata.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { SkillCreateModel } from "../models/skill.model";
import { GameSessionCreateModel } from "../models/gamesession.model";
import { ChangePasswordModel } from "../models/changepassword.model";
import { MessageModel, MessageCreateModel } from "../models/message.model";
import { NotificationAppModel } from "../models/notification.model";
import {
  ForumModel,
  TopicCreateModel,
  MessageForumCreateModel,
  NewTopicModel,
  TopicModel,
  MessageForumModel,
} from "../models/forum.model";
import { TopicToPersonModel } from "../models/topic-to-person.model";
import { ForumService } from "./forum.service";
import { DataService } from "./data.service";

@Injectable()
export class ApiService {
  url = "http://localhost:50168/api";
  //url = "/api";

  constructor(
    private _http: HttpClient,
    private _forum: ForumService,
    private _data: DataService
  ) {}

  getHeader() {
    if (localStorage.getItem('token'))
      return new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getProfileData(user: string): Observable<PersonalDataModel> {
    return this._http.get<PersonalDataModel>(`${this.url}/pdata/${user}`, { headers: this.getHeader() });
  }

  getProfileDataById(id: number): Observable<PersonalDataModel> {
    return this._http.get<PersonalDataModel>(`${this.url}/pdata/id/${id}`, { headers: this.getHeader() });
  }

  getFriendsList(user: string): Observable<FriendModel[]> {
    return this._http.get<FriendModel[]>(`${this.url}/Friend/${user}`, { headers: this.getHeader() });
  }

  getPlayerGames(user: string): Observable<GameToPersonAppModel[]> {
    return this._http.get<GameToPersonAppModel[]>(`${this.url}/GameToPerson/${user}`, { headers: this.getHeader() });
  }

  getGame(gameId: number): Observable<GameAppModel> {
    return this._http.get<GameAppModel>(`${this.url}/Game/${gameId}`, { headers: this.getHeader() });
  }

  getForumData(gameId: number, pageSize: number): Observable<ForumModel> {
    return this._http.get<ForumModel>(
      `${this.url}/Forum/${gameId}/${pageSize}`, { headers: this.getHeader() }
    );
  }

  getTopic(profileId: number, topicId: number): Observable<TopicModel> {
    return this._http.get<TopicModel>(
      `${this.url}/Topic/${profileId}/${topicId}`, { headers: this.getHeader() }
    );
  }

  getUserTopicsAccessList(
    profileId: number,
    gameId: number
  ): Observable<TopicToPersonModel[]> {
    return this._http.get<TopicToPersonModel[]>(
      `${this.url}/TopicToPerson/${profileId}/${gameId}`, { headers: this.getHeader() }
    );
  }

  getTopicMessages(
    gameId: number,
    topicId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("gameId", gameId.toString());
    params = params.append("topicId", topicId.toString());
    params = params.append("pageNumber", pageNumber.toString());
    params = params.append("pageSize", pageSize.toString());

    return this._http.get<any>(`${this.url}/MessageForum`, {
      headers: this.getHeader(),
      params: params,
    });
  }

  getConversation(relationId: number) {
    //this._http.post(this.url + 'Message/', new MessageModel(0, new Date(Date.UTC(2019, 6, 19, 1,1,1,1)), false, "hello dude", 2)).subscribe (
    //  error => console.log(error));;
    return this._http.get<MessageModel[]>(this.url + "/Message/" + relationId, { headers: this.getHeader() });
    // .do(data => console.log('All: ' + JSON.stringify(data)));
  }

  getRelationData(relationId: number) {
    return this._http.get<FriendModel[]>(
      this.url + "/Friend/" + relationId.toString(), { headers: this.getHeader() }
    );
    //.do(data => console.log('All: ' + JSON.stringify(data)));
  }

  sendMessage(msg: MessageCreateModel) {
    console.log(JSON.stringify(msg));
    this._http
      .post(this.url + "/Message/", msg, { headers: this.getHeader() })
      .subscribe((error) => console.log(error));
  }

  sendFriendInvite(friendInvite: FriendCreateModel): Observable<any> {
    return this._http.post(`${this.url}/Friend/`, friendInvite, { headers: this.getHeader() });
  }

  editRelation(invite: FriendModel): Observable<any> {
    return this._http.put<FriendModel>(`${this.url}/Friend/${invite.id}`, invite, { headers: this.getHeader() });
  }

  acceptFriendInvite(friendRelation: FriendModel): Observable<any> {
    return this._http.put<any>(`${this.url}/Friend/${friendRelation.id}`, friendRelation, { headers: this.getHeader() });
  }

  declineFriendInvite(relationId: number): Observable<any> {
    return this._http.delete(`${this.url}/Friend/${relationId}`, { headers: this.getHeader() });
  }

  getNotificationData(userId: number): Observable<NotificationAppModel> {
    return this._http.get<NotificationAppModel>(`${this.url}/NotificationData/${userId}`, { headers: this.getHeader() });
  }

  editNotificationData(data: NotificationAppModel) {
    this._http
      .put<NotificationAppModel>(
        this.url + "/NotificationData/" + data.id.toString(),
        data, { headers: this.getHeader() }
      )
      .subscribe((error) => console.log(error));
  }

  createTopic(topic: NewTopicModel): Observable<TopicModel>  {
    return this._http
      .post<TopicModel>(this.url + "/Topic", topic, { headers: this.getHeader() });
  }

  /*createTopic(topic: NewTopicModel) {
    return this._http
      .post(this.url + "/Topic", topic)
      .subscribe((data) => console.log(data));
  }*/

  sendForumMessage(msg: MessageForumCreateModel) {
    return this._http
      .post<any>(this.url + "/MessageForum", msg, { headers: this.getHeader() });
  }

  searchGames(params: any): Observable<any> {
    return this._http.get<any>(`${this.url}/Game/search`, { headers: this.getHeader(), params: params });
  }

  searchProfiles(params: any): Observable<any> {
    return this._http.get<any>(`${this.url}/pdata/search`, { headers: this.getHeader(), params: params });
  }

  getPostImages(fileName: string): Observable<Blob> {
    return this._http.get(this.url + "/Photo/" + fileName, {
      headers: this.getHeader(),
      responseType: "blob",
    });
  }

  uploadPhoto(type: number, id: number, isBgPhoto: boolean, file): Observable<any> {
    var formData = new FormData();
    formData.append("file", file);
    return this._http.post(`${this.url}/Photo/${type}/${isBgPhoto}/${id}`, formData, { headers: this.getHeader() });
  }

  getImage(fileName: string): Observable<Blob> {
    return this._http.get(this.url + "/Photo/" + fileName, {
      headers: this.getHeader(),
      responseType: "blob",
    });
  }

  createGame(game: GameCreateModel): Observable<any> {
    return this._http.post(`${this.url}/Game`, game, { headers: this.getHeader() });
  }

  joinGame(g2p: GameToPersonCreateModel): Observable<any> {
    return this._http.post(`${this.url}/GameToPerson`, g2p, { headers: this.getHeader() });
  }

  acceptJoinGame(invite: GameToPersonAppModel): Observable<any> {
    let accept = new GameToPersonApiModel(
      invite.id,
      invite.gameId,
      invite.playerId,
      invite.isGameMaster,
      true,
      invite.isMadeByPlayer,
      invite.characterHealth
    );
    return this._http.put<GameToPersonApiModel>(`${this.url}/GameToPerson/${accept.id}`, accept, { headers: this.getHeader() });
  }

  declineJoinGame(inviteId: number): Observable<any> {
    return this._http.delete(`${this.url}/GameToPerson/${inviteId}`, { headers: this.getHeader() });
  }

  addSkill(skill: SkillCreateModel) {
    this._http
      .post(this.url + "/Skill", skill, { headers: this.getHeader() })
      .subscribe((data) => console.log(data));
  }

  deleteSkill(skillId: number) {
    this._http
      .delete(this.url + "/Skill/" + skillId.toString(), { headers: this.getHeader() })
      .subscribe((error) => console.log(error));
  }

  addMySkill(mySkill: MySkillCreateModel) {
    this._http
      .post(this.url + "/MySkill", mySkill, { headers: this.getHeader() })
      .subscribe((data) => console.log(data));
  }

  deleteMySkill(skillId: number) {
    this._http
      .delete(this.url + "/MySkill/" + skillId.toString(), { headers: this.getHeader() })
      .subscribe((error) => console.log(error));
  }

  addSession(session: GameSessionCreateModel) {
    this._http
      .post(this.url + "/GameSession", session, { headers: this.getHeader() })
      .subscribe((data) => console.log(data));
  }

  deleteSession(sessionId: number) {
    this._http
      .delete(this.url + "/GameSession/" + sessionId.toString(), { headers: this.getHeader() })
      .subscribe((error) => console.log(error));
  }

  editPersonalData(profile: PersonalDataModel): Observable<any> {
    let id = localStorage.getItem("id");
    return this._http.put<PersonalDataModel>(`${this.url}/pdata/${id}`, profile, { headers: this.getHeader() });
  }

  editGameData(gameId: number, game: GameAppModel): Observable<any> {
    return this._http.put<any>(`${this.url}/Game/${gameId}`, game, { headers: this.getHeader() });
  }

  editPassword(passwordData: ChangePasswordModel): Observable<any> {
    let id = localStorage.getItem("id");
    console.log(passwordData)
    return this._http.put<ChangePasswordModel>(`${this.url}/account/${id}`, passwordData, { headers: this.getHeader() });
  }
}
