import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FriendModel } from '../models/friend.model';
import { PersonalDataModel } from '../models/personaldata.model';
import { GameToPersonAppModel } from '../models/game-to-person.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  
  data: any;
  profileData: PersonalDataModel;
  gamesAPPList: GameToPersonAppModel[] = [];
  gamesAccepted: GameToPersonAppModel[] = [];
  invitations: GameToPersonAppModel[] = [];
  friendsAll: FriendModel[] = [];
  friendsAccepted: PersonalDataModel[] = [];
  friendsWaiting: PersonalDataModel[] = [];
  receivedInvites: FriendModel[] = [];
  isNewInvite: boolean; isDataReady = false;
  test: number = 9;

  constructor(private route: ActivatedRoute, private _api: ApiService, private _data: DataService){
  }

  ngOnInit() {
    console.log("subscribed in sidebar: " + this.data);
    /*this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });
    console.log("magik " + this.data);

    let profile = this.data[0];
    this.profileData = profile.pop();
    this.friendsAll = this.data[1];
    this.gamesAPPList = this.data[2];

    console.log("magik " + this.friendsAll);

    this.gamesAPPList.forEach(element => {
      if (element.isAccepted) 
        this.gamesAccepted.push(element);
      if (!element.isAccepted && !element.isMadeByPlayer)
        this.invitations.push(element);
    });

    this.friendsAll.forEach(element => {
      if (element.isAccepted) {
        this.friendsAccepted.push(element.personalData);
      }
      else {
        if (element.isReceiver) 
          this.receivedInvites.push(element);
        else 
          this.friendsWaiting.push(element.personalData);
      }
    });

    if (this.receivedInvites.length > 0) 
      this.isNewInvite = true;
    else 
      this.isNewInvite = false;
    do {
      this._data.currentFriends.subscribe(message => this.friendsAll = message);
      console.log("magik " + JSON.stringify(this.friendsAll));

      this.test = this.friendsAll.toString();
    } while(!this.friendsAll.includes(new FriendModel(-1, null, true, true)));*/
  }

/*ngAfterViewInit() {
    this._data.currentFriends.subscribe(message => this.friendsAll = message);
    console.log("magik " + JSON.stringify(this.friendsAll));

    this.test = this.friendsAll[1].id;

}*/



  ngAfterContentChecked(){
    this._data.currentSidebarControl.subscribe(data => this.isDataReady = data);
    if (this.isDataReady) {
      this._data.currentFriends.subscribe(message => this.friendsAll = message);  
      this.friendsAll.forEach(element => {
        if (element.isAccepted) {
          this.friendsAccepted.push(element.personalData);
        }
        else {
          if (element.isReceiver) 
            this.receivedInvites.push(element);
          else 
            this.friendsWaiting.push(element.personalData);
        }
      }); 
      console.log("magik " + JSON.stringify(this.friendsAll));
      this.test = this.friendsAll.pop().id;
      this._data.changeSidebarControls(false);   
    }
  }

}