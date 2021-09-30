import { Component, OnInit } from "@angular/core";
import { timer } from "rxjs";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { GameToPersonAppModel } from "src/app/core/models/game-to-person.model";
import { FriendCreateModel, FriendModel } from "src/app/core/models/friend.model";
import {
  MessageModel,
  ConversationModel,
  ConversationDataModel,
} from "src/app/core/models/message.model";
import { CheckNotificationModel, NotificationAppModel } from "src/app/core/models/notification.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.sass"],
})
export class ActivityComponent implements OnInit {
  imageToShow: any;
  isImageLoading: boolean;
  isFriend: boolean = false;
  isInvited: boolean = false;
  defaultImage: boolean = true;
  subPage: string;
  timerSubscription: any;

  myMessagesFlag: boolean = true;
  myGamesFlag: boolean = false;
  myFriendsFlag: boolean = false;
  settingsFlag: boolean = false;

  messagesLoading: boolean = true;
  gamesLoading: boolean = true;
  friendsLoading: boolean = true;

  notificationData: NotificationAppModel;

  myProfileData: PersonalDataModel;
  myGamesList: GameToPersonAppModel[] = [];
  myRelationsList: FriendModel[] = [];

  isLoadingFriends: boolean = false;
  isLoadingGames: boolean = false;
  isLoadingMessagesData: boolean = false;

  subpage: string = "";

  data: any;
  conversationsList: ConversationModel[] = [];

  private newNotificationSet: CheckNotificationModel;
  private notificationSet: CheckNotificationModel = new CheckNotificationModel(
    false,
    false,
    false
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _api: ApiService,
    private _data: DataService
  ) {}

  ngOnInit() {
    let loggedNick = localStorage.getItem("nick");
    this._api.getProfileData(loggedNick).subscribe((data) => {
      this.myProfileData = data;
    });

    this._data.currentNotificationData.subscribe(data => {
      if (this.checkNotificationsIfChanges(data))
        this.refreshData(loggedNick);
      this.notificationData = data;
    })

    this.route.params.subscribe((params) => {
      this.isLoadingFriends = true;
      this.isLoadingGames = true;
      this.isLoadingMessagesData = true;
      this.subpage = params.page;

      switch (this.subpage) {
        case "my-messages":
          this.resetFlags();
          this.myMessagesFlag = true;
          this.prepareMyMessagesData(loggedNick);
          break;
        case "my-games":
          this.resetFlags();
          this.myGamesFlag = true;
          this._api.getPlayerGames(loggedNick).subscribe((data) => {
            this.myGamesList = data;
            this.isLoadingGames = false;
          });
          break;
        case "my-friends":
          this.resetFlags();
          this.myFriendsFlag = true;
          this._api.getFriendsList(loggedNick).subscribe((data) => {
            this.myRelationsList = data;
            this.isLoadingFriends = false;
          });
          break;
        case "settings":
          this.resetFlags();
          this.settingsFlag = true;
          break;
        default:
          break;
      }
    });
  }

  checkNotificationsIfChanges(newNotificationData: NotificationAppModel): boolean {
    if (!this.notificationData) return false;
    if (newNotificationData.lastFriendNotificationDate > this.notificationData.lastFriendNotificationDate) return true;
    if (newNotificationData.lastGameNotificationDate > this.notificationData.lastGameNotificationDate) return true;
    if (newNotificationData.lastMessageDate > this.notificationData.lastMessageDate) return true;
    return false;
  }

  resetFlags() {
    this.myMessagesFlag = false;
    this.myGamesFlag = false;
    this.myFriendsFlag = false;
    this.settingsFlag = false;
  }

  prepareMyMessagesData(nick: string) {
    this._api.getFriendsList(nick).subscribe((data) => {
      this.myRelationsList = data;
      this.isLoadingFriends = false;

      this.myRelationsList.forEach((relation) => {
        this._api.getConversation(relation.id).subscribe(messages => {
          if (messages.length > 0) {
            let conv = new ConversationDataModel(relation, this.myProfileData, relation.personalData);
            this.conversationsList.push(new ConversationModel(conv, null, messages));
          }
        });
      });
      this.isLoadingMessagesData = false;
    });
  }

  refreshData(nick: string) {
    this.prepareMyMessagesData(nick);
    this._api.getPlayerGames(nick).subscribe((data) => {
      this.myGamesList = data;
    });
    this._api.getFriendsList(nick).subscribe((data) => {
      this.myRelationsList = data;
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  deleteFriend() {}

  async onNavClick(event: Event) {
    let elementId: string = (event.target as Element).id;
    var res = await this.router.navigate(["/my-account", elementId]);
    var snapshot = this.route.snapshot;
    window.location.reload();
  }
}
