import { Component, OnInit, Input } from "@angular/core";
import {
  ForumModel,
  TopicModel,
  TopicListModel,
} from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ButtonManager } from "../../button-manager";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";

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
  @Input() iAmGameMaster: boolean;

  topicIdParam: number = null;

  topicGeneralList: TopicListModel[] = [];
  topicGameList: TopicListModel[] = [];
  topicSupportList: TopicListModel[] = [];
  topicOfftopList: TopicListModel[] = [];

  showCreateTopic: boolean = false;
  showTopicList: boolean = false;
  showManagePlayers: boolean = false;
  showUserAccess: boolean = false;
  showGameSettings: boolean = false;
  showYourCharacter: boolean = false;
  showEndGame: boolean = false;

  myCardId: number = -1;

  subpageManager: ButtonManager;

  constructor(
    private route: ActivatedRoute,
    private _api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subpageManager = new ButtonManager();

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
        if (user.id == topic.messages[topic.messagesAmount - 1].senderId)
          topicListModel.lastAuthor = user;
      });
      this.topicToPersonData.forEach((t2p) => {
        if (
          t2p.lastActivitySeen < topic.lastActivityDate ||
          t2p.lastActivitySeen == null
        )
          topicListModel.wasSeen = false;
      });

      this.gameData.participants.forEach((card) => {
        if (this.profileData.id == card.playerId) this.myCardId = card.id;
      });

      this.detectTopicCategory(topicListModel);
    });
  }

  setChildComponent(subpage: string) {
    switch (subpage) {
      case "user-access":
        if (this.iAmGameMaster) this.subpageManager.showUserAccess();
      case "game-settings":
        if (this.iAmGameMaster) this.subpageManager.showGameSettings();
      case "create-topic":
        this.subpageManager.showCreateTopic();
      case "manage-players":
        this.subpageManager.showManagePlayers();
      case "players":
        this.subpageManager.showManagePlayers();
      case "my-character":
        this.subpageManager.showYourCharacter();
      default:
        this.subpageManager.showTopicList();
    }
  }

  detectTopicCategory(topicListModel: TopicListModel) {
    switch (topicListModel.topicData.category) {
      case "general":
        this.topicGeneralList.push(topicListModel);
      case "game":
        this.topicGameList.push(topicListModel);
      case "support":
        this.topicSupportList.push(topicListModel);
      case "offtop":
        this.topicOfftopList.push(topicListModel);
      default:
        return;
    }
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

  onLeaveGame() {
    this._api.declineJoinGame(this.myCardId);
    console.log("chuj");
    window.location.reload();
  }

  async closeChildComponent(check) {
    if (check == "false") {
      this.subpageManager.showTopicList();
      //var res = await this.router.navigate(["/game", this.gameData.id]);
    }
  }
}
