import { FriendModel, FriendListModel } from './../../models/friend.model';
import { Component, OnInit } from '@angular/core';
import { PersonalDataModel } from '../../models/personaldata.model';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-view-friends',
  templateUrl: './profile-view-friends.component.html',
  styleUrls: ['./profile-view-friends.component.css']
})
export class ProfileViewFriendsComponent implements OnInit {

  imageToShow: any;
  isImageLoading: boolean;
  defaultImage: boolean = true;
  userID: number;
  profileData: PersonalDataModel;
  data: any;
  friendsAll: FriendModel[] = [];
  friendsAccepted: PersonalDataModel[] = [];
  friendsAcceptedNoPhoto: PersonalDataModel[] = [];
  friendsAcceptedPhoto: FriendListModel[] = [];

  constructor(private route: ActivatedRoute, private _api : ApiService) { 
    this.userID = parseInt(route.snapshot.params['id']);
  }

  ngOnInit() {
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let profile = this.data[0];
    this.profileData = profile.pop();
    var viewUserFriends = this.data[1];

    if (viewUserFriends != null) {
      viewUserFriends.forEach(fr => {
        console.log("fr = " + fr.personalData.id + "; pd = " + this.profileData.id);
        if (fr.isAccepted) {
          this.friendsAccepted.push(fr.personalData);
        }
      });
    }
    
    this._api.getFriendsList(this.userID).subscribe(obje => (this.friendsAll = obje));
    
    this.friendsAll.forEach(element => {
      if (element.isAccepted == true) 
        this.friendsAccepted.push(element.personalData);
    });

    this.friendsAccepted.forEach(element => {
      if (element.photoName != null && element.photoName != "") {
        let friend = new FriendListModel(element, null);
        this.friendsAcceptedPhoto.push(friend);
        let id = this.friendsAcceptedPhoto.length - 1;
        this.isImageLoading = true;
        this._api.getImage(element.photoName).subscribe(data => {
          this.createImageFromBlob(data, id);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });
      }
      else {
        this.friendsAcceptedNoPhoto.push(element);
      }
    });
  }

  createImageFromBlob(image: Blob, id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.friendsAcceptedPhoto[id].photo = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }


}
