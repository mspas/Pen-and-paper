import { Component, OnInit, Input } from '@angular/core';
import { ConversationModel, MessageCreateModel, MessageModel, ConversationDataModel } from '../../models/message.model';
import { ApiService } from '../../api.service';
import { FriendModel } from '../../models/friend.model';
import { PersonalDataModel } from '../../models/personaldata.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-messages',
  templateUrl: './account-messages.component.html',
  styleUrls: ['./account-messages.component.css']
})
export class AccountMessagesComponent implements OnInit {

  @Input("allConversations") allConversations: ConversationModel[] = [];
  isImageLoading: boolean;
  defaultValue: string = "";
  timerSubscription: any;
  //allConversations: ConversationModel[] = [];
  //conversation: MessageModel[];

  constructor(private _api: ApiService) { }

  ngOnInit() { 
   /* await this.myFriends.forEach(relation => {
      if (relation.lastMessageDate != null) {
        this.getConversation(relation);
      }
    });

    console.log("allConv KURWA " + JSON.stringify(this.allConversations));*/

    var i = 0;
    this.allConversations.forEach(element => {
      i++;
      this.isImageLoading = true;
      this._api.getImage(element.conversationData.userProfile.photoName).subscribe(data => {
          this.createImageFromBlob(data, i);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });
    });

    this.refreshData();    
  }

  createImageFromBlob(image: Blob, i: number) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.allConversations[i].photo = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  ngAfterViewChecked() {
    this.allConversations.forEach(chat => {
      chat.messages.forEach(msg => {
        if (msg.senderId == chat.conversationData.myProfile.id) {
          document.getElementById("msg" + msg.id.toString()).setAttribute("class", "my-message");
        }
      });
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
