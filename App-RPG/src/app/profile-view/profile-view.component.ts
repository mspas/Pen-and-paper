
import { PersonalDataModel } from './../models/personaldata.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { GameToPersonAppModel } from '../models/game-to-person.model';
import { FriendModel } from '../models/friend.model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  imageToShow: any;
  isImageLoading: boolean;
  isFriend: boolean = false;
  isInvited: boolean = false;
  defaultImage: boolean = true;
  userID: number;

  profileChild: boolean = true;
  friendsChild: boolean = false;
  gamesChild: boolean = false;

  myProfileData: PersonalDataModel;
  myGamesAPPList: GameToPersonAppModel[] = [];
  myFriends: FriendModel[] = [];

  userProfileData: PersonalDataModel;
  userGamesAPPList: GameToPersonAppModel[] = [];
  userFriends: FriendModel[] = [];

  data: any;
  ourRelation: FriendModel = null;
  myProfilePage: boolean = false;
  //loggedUserFriends: PersonalDataModel[] = [];

  constructor(private route: ActivatedRoute, private _api : ApiService) { 
    this.userID = parseInt(route.snapshot.params['id']);
  }

  ngOnInit() {

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

    console.log("foto " + this.userProfileData.photoName);

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
          console.log("fr = " + fr.personalData.id + "; pd = " + this.userProfileData.id);
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

  onNavClick(event: Event) {    
    let elementId: string = (event.target as Element).id;
    document.getElementById("nav-profile").setAttribute("class", "");
    document.getElementById("nav-friends").setAttribute("class", "");
    document.getElementById("nav-games").setAttribute("class", "");

    if (elementId == "anav-profile") {
      this.profileChild = true;
      this.friendsChild = false;
      this.gamesChild = false;
      document.getElementById("nav-profile").setAttribute("class", "active");
    }
    if (elementId == "anav-friends") {
      this.profileChild = false;
      this.friendsChild = true;
      this.gamesChild = false;
      document.getElementById("nav-friends").setAttribute("class", "active");
    }    
    if (elementId == "anav-games") {
      this.profileChild = false;
      this.friendsChild = false;
      this.gamesChild = true;
      document.getElementById("nav-games").setAttribute("class", "active");
    }
  }

}
