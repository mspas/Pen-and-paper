import { Component, OnInit, Input } from "@angular/core";
import {
  ForumModel,
  TopicModel,
  TopicListModel,
} from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataListModel, PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ButtonManager } from "../../button-manager";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";

const categoriesDefault = ["General", "Game", "Support", "Off-topic"];

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
  @Input() gameMaster: PersonalDataModel;
  @Input() acceptedPlayers: PersonalDataListModel[];
  @Input() waitingSelfRequested: PersonalDataListModel[];
  @Input() waitingInvited: PersonalDataListModel[];
  @Input() iAmGameMaster: boolean;

  topicIdParam: number = null;
  totalPages: number = -1;

  topicsList: any = [];

  isLoadingTopics: boolean = true;
  isLoading: boolean = false;
  topicData: TopicModel;

  imageToShow: any;
  isImageLoading: boolean;
  
  myCardId: number = -1;

  subpageManager: ButtonManager;
  showModalFlag: boolean = false;
  modalTitle: string;
  modalOption: number = -1;

  constructor(private router: Router, private route: ActivatedRoute, private _api: ApiService) {}

  ngOnInit() {
    this.isLoadingTopics = true;
    this.subpageManager = new ButtonManager();

    this.prepareTopicList();

    this.route.queryParams.subscribe((params) => {
      let query = { ...params.keys, ...params };
      if (query.hasOwnProperty("topicId")) {
        this.isLoading = true;
        this.subpageManager.showTopic();

        this._api
          .getTopic(this.profileData.id, query.topicId)
          .subscribe((data) => {
            this.topicData = data;

            if (query)
              this._api
                .getTopicMessages(
                  query.gameId,
                  query.topicId,
                  query.pageNumber,
                  query.pageSize
                )
                .subscribe((data) => {
                  this.totalPages = data.maxPages;
                  this.topicData.messages = data.messagesResult;
                  this.isLoading = false;
                });
          });
      }
      else {
        if (query.hasOwnProperty("page")) this.subpageManager.showChildComponent(query.page);
        else this.subpageManager.showTopicList();
      }
    });
    
    this.acceptedPlayers.forEach((element) => {
      if (
        element.data.photoName != null &&
        element.data.photoName != "" &&
        element.data.photoName != "unknown.png"
      ) {
        this._api.getImage(element.data.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(
              data,
              this.acceptedPlayers.indexOf(element)
            );
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      }
    });
  }

  ngOnChanges() {
    this.prepareTopicList();
  }

  prepareTopicList() {
    this.topicsList = this.createEmptyTopicList();

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
    });
  }

  createEmptyTopicList() {
    let list = [];
    for (let i = 0; i < categoriesDefault.length; i++) {
      const item = {name: categoriesDefault[i], topics: []};
      list.push(item);
    }
    return list;
  }

  createImageFromBlob(image: Blob, i: number) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (i != -1) this.acceptedPlayers[i].photo = reader.result;
        else this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  navigate(params: any) {
    if (params.hasOwnProperty("page")) 
      this.subpageManager.showChildComponent(params.page);
    else if (!params.hasOwnProperty("topicId"))
      this.subpageManager.showTopicList();
    else if (params.hasOwnProperty("topicId"))
      this.subpageManager.showTopic();

    this.router.navigate(["game"], { queryParams: params });
  }

  onCreateTopic() {
    this.navigate({gameId: this.gameData.id, page: "create-topic"});
  }

  onUserAccess() {
    this.navigate({gameId: this.gameData.id, page: "user-access"});
  }

  onGameSettings() {
    this.navigate({gameId: this.gameData.id, page: "game-settings"});
  }

  onManagePlayers() {
    this.navigate({gameId: this.gameData.id, page: "players"});
  }

  onEndGame() {
    this.gameData.status = "Ended";
    this._api.editGameData(this.gameData.id, this.gameData).subscribe(data => {
      if (data.success) window.location.reload();
    });
  }

  onLeaveGame() {
    this._api.declineJoinGame(this.myCardId).subscribe(data => {
      if (data.success) window.location.reload();
    });
  }

  goBack(value: boolean) {
    this.navigate({gameId: this.gameData.id})
  }

  showModal(index: number, value: boolean, title: string) {
    this.modalOption = index;
    this.showModalFlag = value;
    this.modalTitle = title;
  }

  closeModal(value: boolean) {
    this.showModal(-1 , value, "");
  }
}
