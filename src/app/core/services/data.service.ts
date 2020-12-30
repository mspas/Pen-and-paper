import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FriendModel } from "../models/friend.model";
import { ConversationDataModel } from "../models/message.model";
import {
  CheckNotificationModel,
  NotificationAppModel,
} from "../models/notification.model";

@Injectable()
export class DataService {
  private friendsSource = new BehaviorSubject<FriendModel[]>([
    {
      id: -1,
      personalData: null,
      isAccepted: true,
      isReceiver: true,
      isFriendRequest: false,
      lastMessageDate: new Date(),
    },
  ]);
  private bPhotoSource = new BehaviorSubject<string>("assets/book.jpg");
  private sidebarControl = new BehaviorSubject<boolean>(false);
  private conversationData = new BehaviorSubject<ConversationDataModel>(null);
  private chatControl = new BehaviorSubject<boolean>(false);
  private relationId = new BehaviorSubject<number>(-1);
  private newGameId = new BehaviorSubject<number>(-1);
  private notificationSet = new BehaviorSubject<CheckNotificationModel>({
    message: false,
    game: false,
    friend: false,
  });
  private notificationData = new BehaviorSubject<NotificationAppModel>(null);

  private pageSizeForum = 2;

  private gameCategories: any[] = [
    {
      name: "Fantasy",
      checked: false,
      urlImage: "assets/fantasy1.png",
      className: "category-name text-default",
    },
    {
      name: "SciFi",
      checked: false,
      urlImage: "assets/scifi.png",
      className: "category-name text-default",
    },
    {
      name: "Mafia",
      checked: false,
      urlImage: "assets/mafia1.png",
      className: "category-name text-default",
    },
    {
      name: "Cyberpunk",
      checked: false,
      urlImage: "assets/fantasy1.png",
      className: "category-name text-default",
    },
    {
      name: "Steampunk",
      checked: false,
      urlImage: "assets/fantasy1.png",
      className: "category-name text-default",
    },
    {
      name: "PostApo",
      checked: false,
      urlImage: "assets/fantasy1.png",
      className: "category-name text-default",
    },
    {
      name: "Zombie",
      checked: false,
      urlImage: "assets/fantasy1.png",
      className: "category-name text-default",
    },
    {
      name: "AltHistory",
      checked: false,
      urlImage: "assets/fantasy1.png",
      className: "category-name text-default",
    },
    {
      name: "Other",
      checked: false,
      urlImage: "assets/fantasy1.png",
      className: "category-name text-default",
    },
  ];

  currentFriends = this.friendsSource.asObservable();
  currentBPhoto = this.bPhotoSource.asObservable();
  currentSidebarControl = this.sidebarControl.asObservable();
  currentConversationData = this.conversationData.asObservable();
  currentChatControl = this.chatControl.asObservable();
  currentRelationId = this.relationId.asObservable();
  currentNewGameId = this.newGameId.asObservable();
  currentNotificationSet = this.notificationSet.asObservable();
  currentNotificationData = this.notificationData.asObservable();

  constructor() {}

  getPageSizeForum() {
    return this.pageSizeForum;
  }

  getGameCategories() {
    return this.gameCategories;
  }

  changeFriends(friends: FriendModel[]) {
    this.friendsSource.next(friends);
  }

  changeBPhoto(bphoto: string) {
    console.log("serwis " + bphoto);
    this.bPhotoSource.next(bphoto);
  }

  changeSidebarControls(check: boolean) {
    this.sidebarControl.next(check);
  }

  changeConversationData(conv: ConversationDataModel) {
    this.conversationData.next(conv);
  }

  changeChatControl(check: boolean) {
    this.chatControl.next(check);
  }

  changeRelationId(id: number) {
    this.relationId.next(id);
  }

  changeNewGameId(id: number) {
    this.newGameId.next(id);
  }

  changeNotificationSet(check: CheckNotificationModel) {
    this.notificationSet.next(check);
  }

  changeNotificationData(data: NotificationAppModel) {
    this.notificationData.next(data);
  }
}
