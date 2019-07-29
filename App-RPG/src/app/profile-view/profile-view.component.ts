
import { PersonalDataModel } from './../models/personaldata.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

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
  profileData: PersonalDataModel;
  data: any;
  //loggedUserFriends: PersonalDataModel[] = [];

  constructor(private route: ActivatedRoute, private _api : ApiService) { 
    this.userID = parseInt(route.snapshot.params['id']);
  }

  ngOnInit() {

    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let profile = this.data[0];
    this.profileData = profile.pop();
    localStorage.setItem("profileid", this.profileData.id.toString());
    var loggedUserFriends = this.data[1];

    console.log("foto " + this.profileData.photoName);

    if (this.profileData.photoName != null && this.profileData.photoName != "") {

      console.log("foto " + this.profileData.photoName + " weszlem");
      this.defaultImage = false;

      this.isImageLoading = true;
      this._api.getImage(this.profileData.photoName).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
    }

    if (loggedUserFriends != null) {
      loggedUserFriends.forEach(fr => {
        console.log("fr = " + fr.personalData.id + "; pd = " + this.profileData.id);
        if (fr.personalData.id == this.profileData.id){
          if (fr.isAccepted) {
            this.isFriend = true;
            this.isInvited = false;
          }
          else {
            this.isFriend = false;
            this.isInvited = true;
          }
        }
      });
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
    this._api.sendFriendInvite(loggedID, this.profileData.id);
  }

  deleteFriend() {

  }

}
