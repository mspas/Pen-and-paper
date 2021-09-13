import { Component, OnInit } from "@angular/core";
import {
  ForumModel,
  TopicModel,
  TopicListModel,
} from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataListModel, PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.sass"],
})
export class GameComponent implements OnInit {
  forumData: ForumModel;
  gameData: GameAppModel;
  profileData: PersonalDataModel;
  gameMaster: PersonalDataModel;
  topicData: TopicModel;
  
  topicToPersonData: TopicToPersonModel[];
  acceptedPlayers: PersonalDataListModel[] = [];
  waitingSelfRequested: PersonalDataModel[] = [];
  waitingInvited: PersonalDataModel[] = [];

  isLoadingGame: boolean = true;
  isLoadingForum: boolean = true;

  iAmGameParticipant: boolean = false;
  iAmGameMaster: boolean = false;
  
  hideGameViewContent: boolean = false;

  pageSize: number = 10;

  constructor(private route: ActivatedRoute, private _api: ApiService, private _data: DataService) {}

  ngOnInit() {
    this.pageSize = this._data.getPageSizeForum();
    let profileId = parseInt(localStorage.getItem("id"));
    let profileName = localStorage.getItem("nick");

    this.route.queryParams.subscribe((params) => {
      let query = { ...params.keys, ...params };
      
      if (query.hasOwnProperty("topicId") || query.hasOwnProperty("topicId"))
        this.hideGameViewContent = true;
      else
        this.hideGameViewContent = false;

      this._api.getProfileData(profileName).subscribe((data) => {
        this.profileData = data;
      });

      
    this.acceptedPlayers = [];
    this.waitingSelfRequested = [];
    this.waitingInvited = [];
  
      this._api.getGame(query.gameId).subscribe((data) => {
        this.gameData = data;
        this.isLoadingGame = false;
        this.gameData.participantsProfiles.forEach((user) => {
          if (user.id == this.profileData.id) {
            this.gameData.participants.forEach(g2p => {
              if (g2p.playerId === this.profileData.id) this.iAmGameParticipant = g2p.isAccepted;
            });
          }
          if (user.id == this.gameData.gameMaster.id) this.gameMaster = user;
          
          this.gameData.participants.forEach((card) => {
            //if (card.playerId == player.id && card.id != this.gameMaster.id) {
            if (
              card.playerId == user.id &&
              this.gameData.masterId !== user.id
            ) {
              if (card.isAccepted) {
                let playerListModel = new PersonalDataListModel(user, null);
                this.acceptedPlayers.push(playerListModel);
              } else {
                if (card.isMadeByPlayer) this.waitingSelfRequested.push(user);
                else this.waitingInvited.push(user);
              }
            }
          });
        });
  
        if (this.gameData.masterId == this.profileData.id)
          this.iAmGameMaster = true;
        if (this.iAmGameParticipant || this.iAmGameMaster) {
          this._api.getForumData(query.gameId, this.pageSize).subscribe((data) => {
            this.forumData = data;
  
            this._api
              .getUserTopicsAccessList(profileId, query.gameId)
              .subscribe((data) => {
                this.topicToPersonData = data;
                this.isLoadingForum = false;
              });
          });
        }
      });
    });
  }
}
