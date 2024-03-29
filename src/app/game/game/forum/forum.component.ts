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
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FriendModel } from "src/app/core/models/friend.model";
import { GameToPersonListModel } from "src/app/core/models/game-to-person.model";

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
  @Input() gameMaster: PersonalDataListModel;
  @Input() acceptedPlayers: PersonalDataListModel[];
  @Input() acceptedPlayersCards: GameToPersonListModel[];
  @Input() waitingSelfRequested: GameToPersonListModel[];
  @Input() waitingInvited: GameToPersonListModel[];
  @Input() iAmGameMaster: boolean;

  faSpinner = faSpinner;

  topicIdParam: number = null;
  totalPages: number = -1;

  topicsList: any = [];
  isLoadingTopics: boolean = false;
  isLoading: boolean = false;
  topicData: TopicModel;

  imageToShow: any;
  isImageLoading: boolean;
  
  myCardId: number = -1;
  myUserName: string;

  isLoadingFriendsList: boolean = false;
  friendsList: PersonalDataListModel[] = [];

  subpageManager: ButtonManager = new ButtonManager();
  showModalFlag: boolean = false;
  modalTitle: string;
  modalOption: number = -1;

  constructor(private router: Router, private route: ActivatedRoute, private _api: ApiService) {}

  ngOnInit() {
    this.prepareTopicList();
    this.myUserName = localStorage.getItem("nick");

    this.route.queryParams.subscribe((params) => {
      let query = { ...params.keys, ...params };
      if (query.hasOwnProperty("topicId")) {
        this.isLoading = true;
        this.isLoadingTopics = true;
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
  }

  /*ngOnChanges() {
    this.prepareTopicList();
  }*/

  prepareTopicList() {
    this.topicsList = this.createEmptyTopicList();

    this.forumData.topics.forEach(async (topic) => {
      let author: PersonalDataModel = null;
      let lastPostAuthor: PersonalDataModel = null;
      let topicWasSeen = true;
      
      this.gameData.participantsProfiles.forEach((user) => {
        if (user.id === topic.authorId) author = user;
        if (user.id === topic.lastActivityUserId) lastPostAuthor = user;
      });
      if (this.gameData.gameMaster.id === topic.authorId) author = this.gameData.gameMaster;
      if (this.gameData.gameMaster.id === topic.lastActivityUserId) lastPostAuthor = this.gameData.gameMaster;

      if (!author) 
        author = await this._api.getProfileDataById(topic.authorId).toPromise();
      if (!lastPostAuthor) 
        lastPostAuthor = await this._api.getProfileDataById(topic.lastActivityUserId).toPromise();

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
    this.isLoadingFriendsList = true;
    this._api.getFriendsList(this.myUserName).subscribe(async data => {
      this.isLoadingFriendsList = false;

      let filteredList = [];

      for (let i = 0; i < data.length; i++) {
        const friend = data[i];
        let check = true;

        if (!friend.isAccepted)
          continue;

        this.acceptedPlayers.forEach(player => {
          if (friend.personalData.id === player.data.id)
            check = false;
        });
        this.waitingInvited.forEach(request => {
          if (friend.personalData.id === request.profileData.id)
            check = false;
        });
        this.waitingSelfRequested.forEach(request => {
          if (friend.personalData.id === request.profileData.id)
            check = false;
        });

        if (check) {
          let photo = await this.getImageData(friend.personalData.photoName);
          filteredList.push(new PersonalDataListModel(friend.personalData, photo));
        }
      }
      
      this.friendsList = filteredList;
      this.showModal(1, true, "Manage players");
    })
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

  onEndGame() {
    let toUpdate = this.gameData;
    toUpdate.status = "Ended";
    this._api.editGameData(toUpdate).subscribe(data => {
      if (data.success) window.location.reload();
    });
  }

  onLeaveGame() {
    this._api.deleteGameToPerson(this.myCardId).subscribe(data => {
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
