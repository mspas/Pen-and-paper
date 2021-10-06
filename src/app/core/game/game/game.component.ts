import { Component, OnInit } from "@angular/core";
import { ForumModel } from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataListModel, PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { DataService } from "../../services/data.service";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GameToPersonListModel } from "../../models/game-to-person.model";

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
  gameMaster: PersonalDataListModel;
  
  topicToPersonData: TopicToPersonModel[];

  acceptedPlayers: PersonalDataListModel[] = [];
  acceptedPlayersCards: GameToPersonListModel[] = [];
  waitingSelfRequested: GameToPersonListModel[] = [];
  waitingInvited: GameToPersonListModel[] = [];

  isLoadingGame: boolean = true;
  isLoadingForum: boolean = true;

  iAmGameParticipant: boolean = false;
  iAmGameMaster: boolean = false;
  
  showGameViewContent: boolean = true;

  pageSize: number = 50;

  constructor(private route: ActivatedRoute, private _api: ApiService, private _data: DataService, private router: Router) {}

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
      this.acceptedPlayersCards = [];
      this.waitingSelfRequested = [];
      this.waitingInvited = [];
  
      this._api.getGame(query.gameId).subscribe(async (data) => {

        if (!data) 
          return this.router.navigate(["profile", profileName]);

        this.gameData = data;

        let photo = await this.getImageData(this.gameData.gameMaster.photoName);
        this.gameMaster = new PersonalDataListModel(this.gameData.gameMaster, photo);
        
        this.isLoadingGame = false;

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
    players.forEach(async (card) => {
      if (
        card.playerId == user.id &&
        this.gameData.masterId !== user.id
      ) {
        let photo = await this.getImageData(user.photoName);
        if (card.isAccepted) {
          this.acceptedPlayers.push(new PersonalDataListModel(user, photo));
          this.acceptedPlayersCards.push(new GameToPersonListModel(card, user, photo));
        } else {
          let g2pListModel = new GameToPersonListModel(card, user, photo);
          if (card.isMadeByPlayer) this.waitingSelfRequested.push(g2pListModel);
          else this.waitingInvited.push(g2pListModel);
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


  async getImageData(photoName: string): Promise<string> {
    if (photoName === null || photoName === "unknown.png" || photoName === "" ) 
      return null;

    let blob = await this._api.getImage(photoName).toPromise();
    let imageElem = await this.blobToImage(blob);
    return imageElem.src;
  }

  blobToImage = (blob: Blob): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
      let reader = new FileReader();
      let dataURI;
      reader.addEventListener(
        "load",
        () => {
          dataURI = reader.result;
          const img = document.createElement("img");
          img.src = dataURI;
          resolve(img);
        },
        false
      );
      if (blob) {
        reader.readAsDataURL(blob);
      }
    })
  }
}
