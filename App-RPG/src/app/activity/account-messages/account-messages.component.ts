import { Component, OnInit, Input } from '@angular/core';
import { ConversationModel, MessageCreateModel, MessageModel, ConversationDataModel } from '../../models/message.model';
import { ApiService } from '../../api.service';
import { FriendModel } from '../../models/friend.model';
import { PersonalDataModel } from '../../models/personaldata.model';

@Component({
  selector: 'app-account-messages',
  templateUrl: './account-messages.component.html',
  styleUrls: ['./account-messages.component.css']
})
export class AccountMessagesComponent implements OnInit {

  @Input("allConversations") allConversations: ConversationModel[] = [];
  //@Input("myProfileData") myProfileData: PersonalDataModel;
  //@Input("userProfileData") userProfileData: PersonalDataModel;
  //@Input("myFriends") myFriends: FriendModel[] = [];
  isImageLoading: boolean;
  defaultValue: string = "";
  //allConversations: ConversationModel[] = [];
  conversation: MessageModel[];

  constructor(private _api: ApiService) { }

  async ngOnInit() { 
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
    
    console.log("allConv KURWA " + JSON.stringify(this.allConversations));
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

  onSendMessage(index: number) {
    var body = (<HTMLInputElement>document.getElementById("message")).value;
    this.defaultValue = "";
    var myDate = new Date();
    var msg = new MessageCreateModel(
      myDate, false, body, this.allConversations[index].conversationData.relation.id, this.allConversations[index].conversationData.myProfile.id
    );
    this._api.sendMessage(msg);
    this.allConversations[index].conversationData.relation.lastMessageDate = myDate;
    this._api.editRelation(this.allConversations[index].conversationData.relation);
    //this.addMsgTemporary(msg,);
  }

  addMsgTemporary(msg: MessageCreateModel) {
   // this.conversation.push(new MessageModel(-1, null, false, msg.bodyMessage, msg.relationId, msg.senderId));
  }

}
