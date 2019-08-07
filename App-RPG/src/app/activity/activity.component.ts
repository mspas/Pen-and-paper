import { PersonalDataModel } from './../models/personaldata.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { GameToPersonAppModel } from '../models/game-to-person.model';
import { FriendModel } from '../models/friend.model';
import { MessageModel, ConversationModel, ConversationDataModel } from '../models/message.model';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  imageToShow: any;
  isImageLoading: boolean;
  isFriend: boolean = false;
  isInvited: boolean = false;
  defaultImage: boolean = true;
  subPage: string;

  messagesChild: boolean = true;
  gamesChild: boolean = false;
  friendsChild: boolean = false;
  settingsChild: boolean = false;

  myProfileData: PersonalDataModel;
  myGamesAPPList: GameToPersonAppModel[] = [];
  myFriends: FriendModel[] = [];

  userProfileData: PersonalDataModel;
  userGamesAPPList: GameToPersonAppModel[] = [];
  userFriends: FriendModel[] = [];

  data: any;
  ourRelation: FriendModel = null;
  myProfilePage: boolean = false;
  conversation: MessageModel[];
  allConversations: ConversationModel[] = [];
  //loggedUserFriends: PersonalDataModel[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private _api : ApiService) { 
  }

  ngOnInit() {
    this.subPage = this.route.snapshot.params['value'];

    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let profile = this.data[0];
    this.myProfileData = profile.pop();
    this.myFriends = this.data[1];
    this.myGamesAPPList = this.data[2];

    profile = this.data[3];
    this.userProfileData = profile.pop();
    //localStorage.setItem("profileid", this.userProfileData.id.toString());
    this.userFriends = this.data[4];
    this.userGamesAPPList = this.data[5];

    if (this.userProfileData.photoName != null && this.userProfileData.photoName != "") {

      this.defaultImage = false;

      this.isImageLoading = true;
      this._api.getImage(this.userProfileData.photoName).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
    }

    if (this.myProfileData.id == this.userProfileData.id) {
      this.myProfilePage = true;
    }
    else {
      if (this.myFriends != null) {
        this.myFriends.forEach(fr => {
          if (fr.personalData.id == this.userProfileData.id){
            if (fr.isAccepted) {
              this.isFriend = true;
              this.isInvited = false;
            }
            else {
              this.isFriend = false;
              this.isInvited = true;
            }
            this.ourRelation = fr;
          }
        });
      }
    }


    console.log("myFriends KURWA " + JSON.stringify(this.myFriends));

    this.myFriends.forEach(relation => {
      if (relation.lastMessageDate != null) {
        this.getConversation(relation);
      }
    });

    
    console.log("allConv KURWA " + JSON.stringify(this.allConversations));

    
    this.setProperNavTab();

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async getConversation(relation: FriendModel) {
    let conversationData = new ConversationDataModel(relation, this.myProfileData, relation.personalData);
    await this._api.getConversation(relation.id).subscribe(data => this.conversation = data);
    console.log("conversasioin KURWA " + JSON.stringify(this.conversation));
    await this.delay(4000);
    this.allConversations.push(new ConversationModel(conversationData, null, this.conversation));
  }

  setProperNavTab() {
    this.setFalse();
    if (this.subPage == "messages") {
      console.log("messages = " + this.subPage);
      document.getElementById("acc-messages").setAttribute("class", "active");
      this.messagesChild = true; 
    }
    if (this.subPage == "games") {
      console.log("games = " + this.subPage);
      document.getElementById("acc-games").setAttribute("class", "active"); 
      this.gamesChild = true;   
    }
    if (this.subPage == "friends") {
      console.log("friends = " + this.subPage);
      document.getElementById("acc-friends").setAttribute("class", "active");  
      this.friendsChild = true;  
    }
    if (this.subPage == "settings") {
      console.log("settings = " + this.subPage);
      document.getElementById("acc-settings").setAttribute("class", "active");   
      this.settingsChild = true;   
    }
  }

  setFalse(){
    this.messagesChild = false;
    this.friendsChild = false;
    this.gamesChild = false;
    this.settingsChild = false;
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

  onSendInvite() {
    let loggedID = parseInt(localStorage.getItem("id"));
    this._api.sendFriendInvite(loggedID, this.myProfileData.id);
  }

  deleteFriend() {

  }

  async onNavClick(event: Event) {    
    let elementId: string = (event.target as Element).id;
    var res = await this.router.navigate(['/my-account', elementId]);
    var snapshot = this.route.snapshot;
    window.location.reload();
  }

}
