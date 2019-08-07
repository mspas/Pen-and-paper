import { Component, OnInit, Input } from '@angular/core';
import { PersonalDataModel } from '../../models/personaldata.model';
import { ApiService } from '../../api.service';
import { MessageModel, ConversationModel, ConversationDataModel } from '../../models/message.model';
import { FriendModel } from '../../models/friend.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  @Input() userProfileData : PersonalDataModel;
  @Input() myProfileData : PersonalDataModel;
  @Input() isInvited : boolean;
  @Input() isFriend : boolean;
  @Input() ourRelation : FriendModel;
  @Input() myProfilePage : boolean;

  conversation : MessageModel[] = [];
  newConversation : boolean = false;  

  constructor(private _api : ApiService, private _data : DataService) {
   }

  ngOnInit() {
  }

  onSendInvite() {
    let loggedID = parseInt(localStorage.getItem("id"));
    if (this.ourRelation == null)
      this._api.sendFriendInvite(loggedID, this.myProfileData.id);
    if (this.ourRelation != null && this.isInvited == false && this.isFriend == false) {
      let relation = this.ourRelation;
      relation.isFriendRequest = true;
      this._api.editRelation(relation);
    }
  }

  deleteFriend() {

  }

  onSendMessage(){
    if (this.ourRelation != null) {
      //await this._api.getConversation(this.ourRelation.id).subscribe(data => this.conversation = data); //wyjebac to do app comp i viewchildem do chatu elo ide spac
      this._data.changeConversationData(new ConversationDataModel(this.ourRelation, this.myProfileData, this.userProfileData));
      this._data.changeChatControl(true);
    }
    else {
      this._data.changeConversationData(new ConversationDataModel(null, null, this.userProfileData));
      this._data.changeChatControl(true);
    }
  }

}
