import { MySkillCreateModel } from '../models/myskill.model';
import { GameToPersonApiModel, GameToPersonAppModel, GameToPersonCreateModel } from '../models/game-to-person.model';
import { GameCreateModel, GameAppModel } from '../models/game.model';
import { FriendCreateModel, FriendModel } from '../models/friend.model';
import { PersonalDataModel } from '../models/personaldata.model';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { SkillCreateModel } from '../models/skill.model';
import { GameSessionCreateModel } from '../models/gamesession.model';
import { ChangePasswordModel } from '../models/changepassword.model';
import { MessageModel, MessageCreateModel } from '../models/message.model';
import { NotificationAppModel } from '../models/notification.model';
import { ForumModel, TopicCreateModel, MessageForumCreateModel, NewTopicModel, TopicModel } from '../models/forum.model';
import { TopicToPersonModel } from '../models/topic-to-person.model';
import { ForumService } from './forum.service';
import { DataService } from './data.service';

@Injectable()
export class ApiService {

    url = 'http://localhost:50168/api/';

    constructor(private _http: HttpClient, private _forum: ForumService, private _data: DataService) {
    }

    getAllDataProfile(nick: string, login: string): Observable<any> {
        if (login != null && nick != null) {
            let myProfile =  this._http
                .get<PersonalDataModel[]>(this.url + 'pdata/' + login);
                //.do(data => console.log("oby id " + JSON.stringify(data)));
            let myFriendsList = this._http
                .get<FriendModel[]>(this.url + 'Friend/' + login);
            let myGamesList = this._http
                .get<GameToPersonAppModel[]>(this.url + 'GameToPerson/' + login);

            let profile =  this._http
                .get<PersonalDataModel[]>(this.url + 'pdata/' + nick);
            let friendsList = this._http
                .get<FriendModel[]>(this.url + 'Friend/' + nick);
            let gamesList = this._http
                .get<GameToPersonAppModel[]>(this.url + 'GameToPerson/' + nick);

            return Observable.forkJoin([myProfile, myFriendsList, myGamesList, profile, friendsList, gamesList]);
        }
    }

    getGameAndForum(gameId: number): Observable<any> {
        let profile =  this._http
            .get<PersonalDataModel[]>(this.url + 'pdata/' + localStorage.getItem("nick").toString());
        let forum =  this._http
            .get<ForumModel>(this.url + 'Forum/' + gameId.toString());
        let game = this._http
            .get<GameAppModel[]>(this.url + 'Game/' + gameId.toString());
        let t2p = this._http
            .get<TopicToPersonModel[]>(this.url + 'TopicToPerson/' + localStorage.getItem("id").toString() +"/" + gameId.toString());
        return Observable.forkJoin([profile, forum, game, t2p]);
    }

    getGameForumTopic(gameId: number, topicId: number, page: number): Observable<any> {
        let profileId = localStorage.getItem("id").toString();
        let profileName = localStorage.getItem("nick").toString();

        let profile =  this._http
            .get<PersonalDataModel[]>(this.url + 'pdata/' + profileName);
        let forum =  this._http
            .get<ForumModel>(this.url + 'Forum/' + gameId.toString());
        let topic =  this._http
            .get<TopicModel>(this.url + 'Topic/' + profileId + "/" + topicId.toString());
        let t2p = this._http
            .get<TopicToPersonModel[]>(this.url + 'TopicToPerson/' + profileId + "/" + gameId.toString());
        let game = this._http
            .get<GameAppModel[]>(this.url + 'Game/' + gameId.toString());
        return Observable.forkJoin([profile, forum, game, t2p, topic]);
    }
    getTopicData(topicId: number) {
        return this._http
            .get<TopicModel>(this.url + 'Topic/' + localStorage.getItem("id").toString() + "/" + topicId.toString());
    }

    getConversation(relationId: number) {
        //this._http.post(this.url + 'Message/', new MessageModel(0, new Date(Date.UTC(2019, 6, 19, 1,1,1,1)), false, "hello dude", 2)).subscribe (
          //  error => console.log(error));;
        return this._http
            .get<MessageModel[]>(this.url + 'Message/' + relationId);
           // .do(data => console.log('All: ' + JSON.stringify(data)));
    }

    getRelationData(relationId: number) {
        return this._http
            .get<FriendModel[]>(this.url + 'Friend/' + relationId.toString());
            //.do(data => console.log('All: ' + JSON.stringify(data)));
    }

    sendMessage(msg: MessageCreateModel) {
        console.log(JSON.stringify(msg));
        this._http.post(this.url + 'Message/', msg).subscribe (
            error => console.log(error));
    }
    
    sendFriendInvite(idS: number, idR: number) {
        let friendInvite = new FriendCreateModel(false, idS, idR);
        this._http.post(this.url + 'Friend/', friendInvite).subscribe (
            error => console.log(error));
    }
    
    acceptFriendInvite(invite: FriendModel) {
        console.log(invite.id);
        this._http.put<number>(this.url + 'Friend/' + invite.id.toString(), invite).subscribe (
            error => console.log(error));
    }

    declineFriendInvite(inviteId: number) {
        this._http.delete(this.url + 'Friend/' + inviteId.toString()).subscribe (
            error => console.log(error));
    }

    getNotificationData(id: number) {
        return this._http
            .get<NotificationAppModel>(this.url + 'NotificationData/' + id);
    }

    editNotificationData(data: NotificationAppModel) {
        this._http.put<NotificationAppModel>(this.url + 'NotificationData/' + data.id.toString(), data).subscribe (
            error => console.log(error));
    }

    createTopic(topic: NewTopicModel) {
        console.log(JSON.stringify(topic));
        return this._http.post(this.url+'Topic', topic).subscribe (
            data => console.log(data));
    }

    createForumMessage(msg: MessageForumCreateModel) {
        this._http.post(this.url+'MessageForum', msg).subscribe (
            (data: number) => this._forum.changeIdResponse(data));
    }





    getDataProfile(id: number, nick: string): Observable<any> {
        if (id != null && nick != null) {
            let profile =  this._http
                .get<PersonalDataModel[]>(this.url + 'pdata/' + nick)
                .do(data => console.log("oby id " + JSON.stringify(data)));
            let friendsList = this._http
                .get<FriendModel[]>(this.url + 'Friend/' + id)
                .do(data => console.log('All: ' + JSON.stringify(data)));
            let gamesList = this._http
                .get<GameToPersonAppModel[]>(this.url + 'GameToPerson/' + id)
                .do(data => console.log('All: ' + JSON.stringify(data)));
            return Observable.forkJoin([profile, friendsList, gamesList]);
        }
    }

    getFriendsList(id: number): Observable<FriendModel[]> {
        return this._http
            .get<FriendModel[]>(this.url + 'Friend/' + id.toString())
            .do(data => console.log('from API: ' + JSON.stringify(data)));
    }

    getProfile(nick: string): Observable<PersonalDataModel[]> {
        return this._http
            .get<PersonalDataModel[]>(this.url + 'pdata/' + nick)
            .do(data => console.log('All: ' + JSON.stringify(data)));
    }
    
    getData_LoggedWithView(nick: string): Observable<any> {
        let profile =  this._http
            .get<PersonalDataModel[]>(this.url + 'pdata/' + nick)
            .do(data => console.log('All: ' + JSON.stringify(data)));
        let list = this._http
            .get<FriendModel[]>(this.url + 'Friend/' + localStorage.getItem("id"))
            .do(data => console.log('All: ' + JSON.stringify(data)));
        return Observable.forkJoin([profile, list]);
    }

    getData_OnlyView(nick: string): Observable<any> {
        let profile =  this._http
            .get<PersonalDataModel[]>(this.url + 'pdata/' + nick)
            .do(data => console.log("oby id " + JSON.stringify(data)));
        let list = this._http
            .get<FriendModel[]>(this.url + 'Friend/' + localStorage.getItem("profileid"))
            .do(data => console.log('All: ' + JSON.stringify(data)));
        return Observable.forkJoin([profile, list]);
    }

    editRelation(invite: FriendModel) {
        this._http.put<FriendModel>(this.url + 'Friend/' + invite.id.toString(), invite).subscribe (
            error => console.log(error));
    }
        
    searchFriend(value: string): Observable<PersonalDataModel[]> {
        return this._http
            .get<PersonalDataModel[]>(this.url + 'pdata/' + value)
            .do(data => console.log('All: ' + JSON.stringify(data)));
    }

    createGameDB(game: GameCreateModel) {
        this._http.post(this.url+'Game', game).subscribe (
            (data: number) => this._data.changeNewGameId(data));
    }

    getGame(id: number): Observable<GameAppModel[]> {
        return this._http
            .get<GameAppModel[]>(this.url + 'Game/' + id.toString())
            .do(data => console.log('All: ' + JSON.stringify(data)));
    }    

    getGameAndFriends(gameId: number): Observable<any> {
        let game =  this._http
            .get<GameAppModel[]>(this.url + 'Game/' + gameId.toString())
            .do(data => console.log('All: ' + JSON.stringify(data)));
        let list = this._http
            .get<FriendModel[]>(this.url + 'Friend/' + localStorage.getItem("id"))
            .do(data => console.log('All: ' + JSON.stringify(data)));
        return Observable.forkJoin([game, list]);
    }

    getAllGames(): Observable<GameAppModel[]> {
        return this._http
            .get<GameAppModel[]>(this.url + 'Game/')
            .do(data => console.log('All: ' + JSON.stringify(data)));
    }

    getGameView(gameId: number): Observable<any> {
        let profile =  this._http
            .get<PersonalDataModel[]>(this.url + 'pdata/' + localStorage.getItem("nick"))
            .do(data => console.log("profil " + JSON.stringify(data)));
        let game = this._http
            .get<GameAppModel[]>(this.url + 'Game/' + gameId.toString())
            .do(data => console.log('All: ' + JSON.stringify(data)));
        return Observable.forkJoin([profile, game]);
    }

    getAllGamesToPerson(id: number): Observable<GameToPersonApiModel[]> {
        return this._http
            .get<GameToPersonApiModel[]>(this.url + 'GameToPerson/' + id.toString())
            .do(data => console.log('All: ' + JSON.stringify(data)));
    }

    getGamesWithProfile(nick: string): Observable<any> {
        let profile =  this._http
            .get<PersonalDataModel[]>(this.url + 'pdata/' + nick)
            .do(data => console.log("oby id " + JSON.stringify(data)));
        let list = this._http
            .get<GameToPersonAppModel[]>(this.url + 'GameToPerson/' + localStorage.getItem("profileid"))
            .do(data => console.log('All: ' + JSON.stringify(data)));
        return Observable.forkJoin([profile, list]);
    }

    joinGame(g2p: GameToPersonCreateModel) {
        this._http.post(this.url+'GameToPerson', g2p).subscribe (
            data => console.log(data));
    }

    acceptJoinGame(invite: GameToPersonAppModel) {
        let accept = new GameToPersonApiModel(invite.id, invite.gameId, invite.playerId, invite.isGameMaster, true, invite.isMadeByPlayer, invite.characterHealth);
        this._http.put<GameToPersonApiModel>(this.url + 'GameToPerson/' + accept.id.toString(), accept).subscribe (
            error => console.log(error));
    }

    declineJoinGame(inviteId: number) {
        this._http.delete(this.url + 'GameToPerson/' + inviteId.toString()).subscribe (
            error => console.log(error));
    }

    addSkill(skill: SkillCreateModel) {
        this._http.post(this.url+'Skill', skill).subscribe (
            data => console.log(data));
    }

    deleteSkill(skillId: number) {
        this._http.delete(this.url + 'Skill/' + skillId.toString()).subscribe (
            error => console.log(error));
    }

    addMySkill(mySkill: MySkillCreateModel) {
        this._http.post(this.url+'MySkill', mySkill).subscribe (
            data => console.log(data));
    }

    deleteMySkill(skillId: number) {
        this._http.delete(this.url + 'MySkill/' + skillId.toString()).subscribe (
            error => console.log(error));
    }

    addSession(session: GameSessionCreateModel) {
        this._http.post(this.url+'GameSession', session).subscribe (
            data => console.log(data));
    }

    deleteSession(sessionId: number) {
        this._http.delete(this.url + 'GameSession/' + sessionId.toString()).subscribe (
            error => console.log(error));
    }

    editPersonalData(profile: PersonalDataModel) {
        let id = localStorage.getItem("id"); 
        this._http.put<PersonalDataModel>(this.url + 'pdata/' + id.toString(), profile).subscribe (
            error => console.log(error));
    }

    editPassword(passwordData: ChangePasswordModel) {
        let id = localStorage.getItem("id"); 
        this._http.put<ChangePasswordModel>(this.url + 'account/' + id.toString(), passwordData).subscribe (
            error => console.log(error));
    }

    uploadPhoto(profileOrGame: boolean, id: number, isBgPhoto: boolean, file) {
        var formData = new FormData();
        formData.append('file', file);
        this._http.post(this.url + "Photo/" + profileOrGame + "/" + isBgPhoto + "/" + id, formData).subscribe (
            error => console.log(error));
    }

    getImage(fileName: string): Observable<Blob> {
        console.log(this.url + 'Photo/' + fileName);
        return this._http.get(this.url + 'Photo/' + fileName, { responseType: 'blob' });
    }

}