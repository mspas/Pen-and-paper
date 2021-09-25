import { Component, OnInit, Input } from "@angular/core";
import {
  ConversationModel,
  MessageCreateModel,
  MessageModel,
} from "src/app/core/models/message.model";
import {
  CheckNotificationModel,
  NotificationAppModel,
} from "src/app/core/models/notification.model";
import { FriendModel, FriendListModel } from "src/app/core/models/friend.model";
import { ApiService } from "src/app/core/services/api.service";
import { DataService } from "src/app/core/services/data.service";
import { Observable, timer } from "rxjs";

@Component({
  selector: "app-my-messages",
  templateUrl: "./my-messages.component.html",
  styleUrls: ["./my-messages.component.sass"],
})
export class MyMessagesComponent implements OnInit {
  @Input("conversationsList") conversationsList: ConversationModel[] = null;
  @Input("notificationData") notificationData: CheckNotificationModel;
  @Input("myRelationsList") myRelationsList: FriendModel[] = [];
  friendsAcceptedPhoto: FriendListModel[] = [];
  isImageLoading: boolean;
  defaultValue: string = "";
  timerSubscription: any;

  constructor(private _api: ApiService, private _data: DataService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.myRelationsList.forEach((element) => {
      let friend = new FriendListModel(element, element.personalData, null);
      this.friendsAcceptedPhoto.push(friend);
      let id = this.friendsAcceptedPhoto.length - 1;
      this.isImageLoading = true;
      if (
        element.personalData.photoName != null &&
        element.personalData.photoName != ""
      ) {
        this._api.getImage(element.personalData.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(data, id);
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

  createImageFromBlob(image: Blob, id: number) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.friendsAcceptedPhoto[id].photo = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async scrollChatDown(index: number) {
    var msgList = document.getElementById("msg-list" + index.toString());
    msgList.scrollTop = msgList.scrollHeight;

    if (this.notificationData.message) {
      var notificationData: NotificationAppModel;
      this._data.currentNotificationData.subscribe((data) => {
        notificationData = data;
        notificationData.lastMessageSeen = notificationData.lastMessageDate;
        this._api.editNotificationData(notificationData);
      });
    }
  }

  onSendMessage(index: number) {
    var body = (<HTMLInputElement>document.getElementById("message")).value;
    this.defaultValue = "";
    var myDate = new Date();
    var msg = new MessageCreateModel(
      myDate,
      false,
      body,
      this.conversationsList[index].conversationData.relation.id,
      this.conversationsList[index].conversationData.myProfile.id,
      false
    );
    this._api.sendMessage(msg);
    this.conversationsList[
      index
    ].conversationData.relation.lastMessageDate = myDate;
    //this._api.editRelation(this.conversationsList[index].conversationData.relation);
    this.addMsgTemporary(msg, index);
  }

  addMsgTemporary(msg: MessageCreateModel, index: number) {
    this.conversationsList[index].messages.push(
      new MessageModel(
        -1,
        null,
        false,
        msg.bodyMessage,
        msg.relationId,
        msg.senderId,
        false
      )
    );
  }
}
