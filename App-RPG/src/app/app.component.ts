import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api.service';
import { FriendModel } from './models/friend.model';
import { DataService } from './data.service';
import { ConversationModel } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RPG';
  userIsLogged = false;
  activeChat = false;
  setChat = false;
  conversation: ConversationModel;
  friendsAll: FriendModel[] = [];

  constructor(private auth: AuthService, private _api: ApiService, private _data: DataService) {
  }


  ngAfterContentChecked() {
    this.userIsLogged = this.auth.isAuthenticated();
    this._data.currentChatControl.subscribe(data => this.activeChat = data);
    /*if (this.activeChat == true)
      this.getConversation();*/
    if (!this.userIsLogged) {
      document.getElementById('router').removeAttribute('class');
    }
    else {
      document.getElementById('router').setAttribute('class', 'main-content-wrap');
    }
    /*if (this.userIsLogged) {
      this._api.getFriendsList(parseInt(localStorage.getItem("id"))).subscribe(data => this.friendsAll = data);
      console.log("app " + this.friendsAll)
    }*/
  }

  async getConversation() {
    //var res = await this._data.currentConversation.subscribe(data => this.conversation = data);
    this.setChat = true;
  }
}
