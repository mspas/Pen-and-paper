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

  private pageSizeForum = 10;

  private acceptedImageExtensions = ['gif', 'jpg', 'png'];

  private gameCategories: any[] = [
    {
      name: "Fantasy",
      urlImage: "assets/fantasy1.png",
    },
    {
      name: "SciFi",
      urlImage: "assets/scifi.png",
    },
    {
      name: "Mafia",
      urlImage: "assets/mafia1.png",
    },
    {
      name: "Cyberpunk",
      urlImage: "assets/fantasy1.png",
    },
    {
      name: "Steampunk",
      urlImage: "assets/fantasy1.png",
    },
    {
      name: "PostApo",
      urlImage: "assets/fantasy1.png",
    },
    {
      name: "Zombie",
      urlImage: "assets/fantasy1.png",
    },
    {
      name: "AltHistory",
      urlImage: "assets/fantasy1.png",
    },
    {
      name: "Other",
      urlImage: "assets/fantasy1.png",
    },
  ];

  private forumCategories: any[] = ["General", "Game", "Support", "Off-topic"];

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

  getForumCategories() {
    return this.forumCategories;
  }

  getAcceptedImageExtensions() {
    return this.acceptedImageExtensions;
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
