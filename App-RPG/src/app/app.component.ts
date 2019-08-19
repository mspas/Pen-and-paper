import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api.service';
import { FriendModel } from './models/friend.model';
import { DataService } from './data.service';
import { ConversationModel } from './models/message.model';
import { NotificationAppModel, CheckNotificationModel } from './models/notification.model';
import { Observable } from 'rxjs';

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
  notificationData: NotificationAppModel = null;
  notificationDataPrevious: NotificationAppModel = null;
  timerSubscription: any;

  constructor(private auth: AuthService, private _api: ApiService, private _data: DataService) {
  }

  ngOnInit() {
    this.subscribeToData();
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async refreshData() {
    //this._api.getConversation(this.conversationData.relationId).subscribe(data => this.conversation = data);
    //await this.delay(4000);
    await this._api.getNotificationData(Number.parseInt(localStorage.getItem("id"))).subscribe(data => {
      this.notificationData = data;
      this.subscribeToData();
    });

    if (this.notificationData == null) 
      await this.delay(1000);
    else 
      await this.delay(3000);
    

    var notificationSet = new CheckNotificationModel(false, false, false);

    if (this.notificationData != null) {
      if (this.notificationData.lastMessageDate > this.notificationData.lastMessageSeen) 
        notificationSet.message = true;
      else 
        notificationSet.message = false;

      if (this.notificationData.lastGameNotificationDate > this.notificationData.lastGameNotificationSeen)
        notificationSet.game = true;
      else 
        notificationSet.game = false;

      if (this.notificationData.lastFriendNotificationDate > this.notificationData.lastFriendNotificationSeen)
        notificationSet.friend = true;
      else 
        notificationSet.friend = false;
    }

    this._data.changeNotificationSet(notificationSet);
    this._data.changeNotificationData(this.notificationData);
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(2000).first().subscribe(() => this.refreshData());
  }
}
