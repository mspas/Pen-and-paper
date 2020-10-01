import { Component, OnInit } from "@angular/core";
import {
  ForumModel,
  TopicModel,
  TopicListModel,
} from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.sass"],
})
export class GameComponent implements OnInit {
  forumData: ForumModel;
  gameData: GameAppModel;
  topicToPersonData: TopicToPersonModel[];
  profileData: PersonalDataModel;
  gameMaster: PersonalDataModel;
  topicData: TopicModel;

  isLoadingGame: boolean = true;
  isLoadingForum: boolean = true;

  iAmGameParticipant: boolean = false;
  iAmGameMaster: boolean = false;

  constructor(private route: ActivatedRoute, private _api: ApiService) {}

  ngOnInit() {
    let topicId = this.route.snapshot.params.topicId;
    let gameId = this.route.snapshot.params.id;
    let profileId = parseInt(localStorage.getItem("id"));
    let profileName = localStorage.getItem("nick");

    this._api.getProfileData(profileName).subscribe((data) => {
      this.profileData = data;
    });

    this._api.getGame(gameId).subscribe((data) => {
      this.gameData = data;
      this.isLoadingGame = false;

      this.gameData.participantsProfiles.forEach((user) => {
        if (user.id == this.profileData.id) this.iAmGameParticipant = true;
        if (user.id == this.gameData.gameMaster.id) this.gameMaster = user;
      });

      if (this.gameData.masterId == this.profileData.id)
        this.iAmGameMaster = true;
      if (this.iAmGameParticipant || this.iAmGameMaster) {
        this._api.getForumData(gameId).subscribe((data) => {
          console.log(data);
          this.forumData = data;

          this._api
            .getUserTopicsAccessList(profileId, gameId)
            .subscribe((data) => {
              this.topicToPersonData = data;
              this.isLoadingForum = false;
            });
        });
      }
    });
  }
}
