import { Component, OnInit } from "@angular/core";
import { ForumModel } from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataListModel, PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { DataService } from "../../services/data.service";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.sass"],
})
export class GameComponent implements OnInit {
  faSpinner = faSpinner;
  
  forumData: ForumModel;
  gameData: GameAppModel;
  profileData: PersonalDataModel;
  gameMaster: PersonalDataModel;
  
  topicToPersonData: TopicToPersonModel[];

  acceptedPlayers: PersonalDataListModel[] = [];
  waitingSelfRequested: PersonalDataModel[] = [];
  waitingInvited: PersonalDataModel[] = [];

  isLoadingGame: boolean = true;
  isLoadingForum: boolean = true;

  iAmGameParticipant: boolean = false;
  iAmGameMaster: boolean = false;
  
  showGameViewContent: boolean = true;

  pageSize: number = 50;

  constructor(private route: ActivatedRoute, private _api: ApiService, private _data: DataService) {}

  ngOnInit() {
    this.pageSize = this._data.getPageSizeForum();
    let profileId = parseInt(localStorage.getItem("id"));
    let profileName = localStorage.getItem("nick");

    this.route.queryParams.subscribe((params) => {
      let query = { ...params.keys, ...params };

      this.isLoadingGame = true;
      
      this.showGameView(query);

      this._api.getProfileData(profileName).subscribe((data) => {
        this.profileData = data;
      });
      
      this.acceptedPlayers = [];
      this.waitingSelfRequested = [];
      this.waitingInvited = [];
  
      this._api.getGame(query.gameId).subscribe((data) => {
        this.isLoadingGame = false;

        this.gameData = data;
        this.gameMaster = this.gameData.gameMaster;

        this.gameData.participantsProfiles.forEach((user) => {
          this.setUserParticipationType(this.gameData, user);
          
          this.sortPlayers(this.gameData.participants, user);
        });
  
        if (this.iAmGameParticipant || this.iAmGameMaster) 
          this.getForumData(this.gameData.forumId, profileId);
      });
    });
  }

  showGameView(query) {
    if (query.hasOwnProperty("topicId") || query.hasOwnProperty("page"))
      this.showGameViewContent = false;
    else
      this.showGameViewContent = true;
  }

  setUserParticipationType(game, user) {
    if (user.id == this.profileData.id) {
      game.participants.forEach(g2p => {
        if (g2p.playerId === this.profileData.id) this.iAmGameParticipant = g2p.isAccepted;
      });
    }

    if (game.masterId == this.profileData.id)
      this.iAmGameMaster = true;
  }

  sortPlayers(players, user) {
    players.forEach((card) => {
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
  }

  getForumData(gameId, profileId) {
    this.isLoadingForum = true;

    this._api.getForumData(gameId, this.pageSize).subscribe((data) => {
      this.forumData = data;
      this._api
        .getUserTopicsAccessList(profileId, gameId)
        .subscribe((data) => {
          this.topicToPersonData = data;
          this.isLoadingForum = false;
        });
    });
  }
}
