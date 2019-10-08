import { Component, OnInit, Input } from '@angular/core';
import { ConversationModel, MessageCreateModel, MessageModel } from '../../models/message.model';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { CheckNotificationModel, NotificationAppModel } from '../../models/notification.model';
import { DataService } from '../../services/data.service';
import { FriendModel, FriendListModel } from '../../models/friend.model';

@Component({
  selector: 'app-account-messages',
  templateUrl: './account-messages.component.html',
  styleUrls: ['./account-messages.component.css']
})
export class AccountMessagesComponent implements OnInit {

  @Input("allConversations") allConversations: ConversationModel[] = null;
  @Input("notificationSet") notificationSet: CheckNotificationModel;
  @Input("myFriends") myFriends: FriendModel[] = [];
  friendsAcceptedPhoto: FriendListModel[] = [];
  isImageLoading: boolean;
  defaultValue: string = "";
  timerSubscription: any;
  //notificationData: NotificationAppModel = null;
  //allConversations: ConversationModel[] = [];
  //conversation: MessageModel[];

  constructor(private _api: ApiService, private _data: DataService) { }

  ngOnInit() { 
   /* await this.myFriends.forEach(relation => {
      if (relation.lastMessageDate != null) {
        this.getConversation(relation);
      }
    });

    console.log("allConv KURWA " + JSON.stringify(this.allConversations));*/

    // TUTEJ JEST COS ZE LISTA MA 1 DLUGOSC A ROBI NA 2


    this.myFriends.forEach(element => {
      let friend = new FriendListModel(element.personalData, null);
      this.friendsAcceptedPhoto.push(friend);
      let id = this.friendsAcceptedPhoto.length - 1;
      this.isImageLoading = true;
      if (element.personalData.photoName != null && element.personalData.photoName != "") {
        this._api.getImage(element.personalData.photoName).subscribe(data => {
          this.createImageFromBlob(data, id);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });
      }
    });

    this.refreshData();    
  }

  createImageFromBlob(image: Blob, id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.friendsAcceptedPhoto[id].photo = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  ngAfterViewChecked() {
    var i = 0;
    this.allConversations.forEach(chat => {
      chat.messages.forEach(msg => {
        if (msg.senderId == chat.conversationData.myProfile.id) {
          document.getElementById("msg" + msg.id.toString()).setAttribute("class", "my-message");
        }
        //chat.photo = this.friendsAcceptedPhoto[i].photo;
        //this.scrollChatDown(i);
      });
      //console.log("photo = " + chat.photo);
      chat.photo = this.friendsAcceptedPhoto[i].photo;
      i++;
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

 async scrollChatDown(index: number) {
    await this.delay(300);

    var msgList = document.getElementById("msg-list" + index.toString());
    msgList.scrollTop = msgList.scrollHeight;

    if (this.notificationSet.message) {
      var notificationData: NotificationAppModel;
      await this._data.currentNotificationData.subscribe(data => {
        notificationData = data;
      });
      notificationData.lastMessageSeen = notificationData.lastMessageDate;
      this._api.editNotificationData(notificationData);
    }
  }

  async refreshData() {
    //this._api.getConversation(this.conversationData.relationId).subscribe(data => this.conversation = data);
    //await this.delay(4000);
    this.allConversations.forEach(async conversation => {
      conversation.conversationData.relation
      await this._api.getRelationData(conversation.conversationData.relation.id).subscribe(data => {
        conversation.conversationData.relation = data[0];
        //this.subscribeToData();
      });
      await this.delay(4000);
      let lastDate = conversation.conversationData.relation.lastMessageDate;
      let length = conversation.messages.length;
      if (lastDate > conversation.messages[length-1].sendDdate || conversation.messages[length-1].sendDdate == null) { //nowsza rzecz jest wieksza
        this._api.getConversation(conversation.conversationData.relation.id).subscribe(data => conversation.messages = data);
      }
    });
    await this.delay(4000);
    this.refreshData();
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(4000).first().subscribe(() => this.refreshData());
  }

  onSendMessage(index: number) {
    var body = (<HTMLInputElement>document.getElementById("message")).value;
    this.defaultValue = "";
    var myDate = new Date();
    var msg = new MessageCreateModel(
      myDate, false, body, this.allConversations[index].conversationData.relation.id, this.allConversations[index].conversationData.myProfile.id
    );
    this._api.sendMessage(msg);
    this.allConversations[index].conversationData.relation.lastMessageDate = myDate;
    //this._api.editRelation(this.allConversations[index].conversationData.relation);
    this.addMsgTemporary(msg, index);
  }

  addMsgTemporary(msg: MessageCreateModel, index: number) {
    this.allConversations[index].messages.push(new MessageModel(-1, null, false, msg.bodyMessage, msg.relationId, msg.senderId));
  }

}
