import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FriendModel } from './models/friend.model';
import { MessageModel, ConversationModel } from './models/message.model';


@Injectable()
export class DataService {

  private friendsSource = new BehaviorSubject<FriendModel[]>([{id: -1, personalData:null, isAccepted:true, isReceiver:true, isFriendRequest: false, lastMessageDate: new Date()}]);
  private bPhotoSource = new BehaviorSubject<string>("assets/book.jpg");
  private sidebarControl = new BehaviorSubject<boolean>(false);
  private conversationData = new BehaviorSubject<ConversationModel>(null);
  private chatControl = new BehaviorSubject<boolean>(false);
  private relationId = new BehaviorSubject<number>(-1);

  currentFriends = this.friendsSource.asObservable();
  currentBPhoto = this.bPhotoSource.asObservable();
  currentSidebarControl = this.sidebarControl.asObservable();
  currentConversationData = this.conversationData.asObservable();
  currentChatControl = this.chatControl.asObservable();
  currentRelationId = this.relationId.asObservable();

  constructor() { }

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

  changeConversationData(conv: ConversationModel) {
    this.conversationData.next(conv);
  }

  changeChatControl(check: boolean) {
    this.chatControl.next(check);
  }
  
  changeRelationId(id: number) {
    this.relationId.next(id);
  }
  
}