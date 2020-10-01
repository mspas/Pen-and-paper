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
import { ActivatedRoute } from "@angular/router";
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
  @Input() iAmGameMaster: boolean;

  topicIdParam: number = null;

  topicsList = [
    { name: "General", topics: [] },
    { name: "Game", topics: [] },
    { name: "Support", topics: [] },
    { name: "Offtop", topics: [] },
  ];

  isLoadingTopics: boolean = true;
  isLoading: boolean = false;
  topicData: TopicModel;

  myCardId: number = -1;

  subpageManager: ButtonManager;

  constructor(private route: ActivatedRoute, private _api: ApiService) {}

  ngOnInit() {
    this.isLoadingTopics = true;
    this.subpageManager = new ButtonManager();

    var topicId = this.route.snapshot.params.topicId;
    if (topicId) this.topicIdParam = parseInt(topicId);

    var subpage = this.route.snapshot.params.subpage;
    if (!this.topicIdParam) this.setChildComponent(subpage);

    let i = 0;
    this.forumData.topics.forEach((topic) => {
      let author: PersonalDataModel = null;
      let lastPostAuthor: PersonalDataModel = null;
      let topicWasSeen = true;

      this.gameData.participantsProfiles.forEach((user) => {
        if (user.id == topic.authorId) author = user;
        if (user.id == topic.lastActivityUserId) lastPostAuthor = user;
      });

      this.topicToPersonData.forEach((t2p) => {
        if (
          t2p.lastActivitySeen < topic.lastActivityDate ||
          t2p.lastActivitySeen == null
        )
          topicWasSeen = false;
      });

      this.gameData.participants.forEach((card) => {
        if (this.profileData.id == card.playerId) this.myCardId = card.id;
      });

      let topicListModel = new TopicListModel(
        topic,
        author,
        topicWasSeen,
        lastPostAuthor,
        topic.lastActivityDate
      );

      this.topicsList.forEach((category) => {
        if (category.name === topicListModel.topicData.category)
          category.topics.push(topicListModel);
      });

      this.isLoadingTopics = false;
      //this.detectTopicCategory(topicListModel);
      i++;
    });

    this.route.queryParams.subscribe((params) => {
      let query = { ...params.keys, ...params };

      if (query.topicId) {
        this.isLoading = true;
        this.subpageManager.showTopic();

        this._api
          .getTopic(this.profileData.id, query.topicId)
          .subscribe((data) => {
            this.topicData = data;

            if (query)
              this._api
                .getTopicMessages(
                  query.topicId,
                  query.pageNumber,
                  query.pageSize
                )
                .subscribe((data) => {
                  this.topicData.messages = data.messagesResult;
                  this.isLoading = false;
                });
          });
      }
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
    window.location.reload();
  }

  async closeChildComponent(check) {
    if (check == "false") {
      this.subpageManager.showTopicList();
      //var res = await this.router.navigate(["/game", this.gameData.id]);
    }
  }
}
