import { Component, OnInit, Input } from "@angular/core";
import {
  ForumModel,
  TopicModel,
  TopicListModel,
} from "src/app/models/forum.model";
import { GameAppModel } from "src/app/models/game.model";
import { TopicToPersonModel } from "src/app/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/models/personaldata.model";
import { ButtonManager } from "../../button-manager";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-forum",
  templateUrl: "./forum.component.html",
  styleUrls: ["./forum.component.sass"],
})
export class ForumComponent implements OnInit {
  @Input() forumData: ForumModel;
  @Input() gameData: GameAppModel;
  @Input() topicToPersonData: TopicToPersonModel[];
  @Input() profileData: PersonalDataModel;
  @Input() topicData: TopicModel;

  topicIdParam: number = null;

  topicGeneralList: TopicListModel[] = [];
  topicGameList: TopicListModel[] = [];
  topicSupportList: TopicListModel[] = [];
  topicOfftopList: TopicListModel[] = [];
  iAmGameMaster: boolean = false;

  showCreateTopic: boolean = false;
  showTopicList: boolean = false;
  showManagePlayers: boolean = false;
  showUserAccess: boolean = false;
  showGameSettings: boolean = false;
  showYourCharacter: boolean = false;
  showEndGame: boolean = false;

  subpageManager: ButtonManager;

  constructor(
    private route: ActivatedRoute,
    private _api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subpageManager = new ButtonManager(
      false,
      false,
      false,
      false,
      false,
      false
    );

    var topicId = this.route.snapshot.params.topicId;
    if (topicId) this.topicIdParam = parseInt(topicId);

    var subpage = this.route.snapshot.params.subpage;
    if (!this.topicIdParam) this.setChildComponent(subpage);

    this.forumData.topics.forEach((topic) => {
      let topicListModel = new TopicListModel(
        topic,
        null,
        true,
        null,
        topic.messages[this.forumData.topics[0].messagesAmount - 1].sendDdate
      );
      this.gameData.participantsProfiles.forEach((user) => {
        if (user.id == topic.authorId) topicListModel.author = user;
      });
      this.topicToPersonData.forEach((t2p) => {
        if (
          t2p.lastActivitySeen < topic.lastActivityDate ||
          t2p.lastActivitySeen == null
        )
          topicListModel.wasSeen = false;
      });

      this.gameData.participantsProfiles.forEach((user) => {
        if (user.id == topic.messages[topic.messagesAmount - 1].senderId)
          topicListModel.lastAuthor = user;
      });

      this.detectTopicCategory(topicListModel);
    });

    console.log(this.subpageManager.topicList);
    if (this.gameData.masterId == this.profileData.id)
      this.iAmGameMaster = true;
  }

  setChildComponent(subpage: string) {
    if (subpage == "user-access" && this.iAmGameMaster)
      this.subpageManager.showUserAccess();
    else if (subpage == "game-settings" && this.iAmGameMaster)
      this.subpageManager.showGameSettings();
    else if (subpage == "create-topic") this.subpageManager.showCreateTopic();
    else if (subpage == "manage-players" || subpage == "players")
      this.subpageManager.showManagePlayers();
    else if (subpage == "my-character") this.subpageManager.showYourCharacter();
    else this.subpageManager.showTopicList();
  }

  detectTopicCategory(topicListModel: TopicListModel) {
    if (topicListModel.topicData.category == "general")
      this.topicGeneralList.push(topicListModel);
    if (topicListModel.topicData.category == "game")
      this.topicGameList.push(topicListModel);
    if (topicListModel.topicData.category == "support")
      this.topicSupportList.push(topicListModel);
    if (topicListModel.topicData.category == "offtop")
      this.topicOfftopList.push(topicListModel);
  }

  async onCreateTopic() {
    this.subpageManager.showCreateTopic();
    //await this.router.navigate(["/game", this.gameData.id, "create-topic/", 0]);
  }

  async onUserAccess() {
    this.subpageManager.showUserAccess();
    //await this.router.navigate(["/game", this.gameData.id, "user-access/", 0]);
  }

  async onGameSettings() {
    this.subpageManager.showGameSettings();
    /*await this.router.navigate([
      "/game",
      this.gameData.id,
      "game-settings/",
      0,
    ]);*/
  }

  async onManagePlayers() {
    this.subpageManager.showManagePlayers();
    /*if (this.iAmGameMaster)
      await this.router.navigate([
        "/game",
        this.gameData.id,
        "manage-players/",
        0,
      ]);
    else await this.router.navigate(["/game", this.gameData.id, "players/", 0]);*/
  }

  async onYourCharacter() {
    this.subpageManager.showYourCharacter();
    //await this.router.navigate(["/game", this.gameData.id, "my-character"]);
  }

  onEndGame() {}

  onLeaveGame() {}

  async closeChildComponent(check) {
    if (check == "false") {
      this.subpageManager.showTopicList();
      //var res = await this.router.navigate(["/game", this.gameData.id]);
    }
  }
}
