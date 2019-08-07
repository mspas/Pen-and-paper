import { Component, OnInit, Input } from '@angular/core';
import { FriendModel, FriendListModel } from '../../models/friend.model';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalDataModel } from '../../models/personaldata.model';

@Component({
  selector: 'app-account-friends',
  templateUrl: './account-friends.component.html',
  styleUrls: ['./account-friends.component.css']
})
export class AccountFriendsComponent implements OnInit {

  @Input("myFriends") myFriends: FriendModel[] = [];
  isImageLoading: boolean;
  friendsAccepted: PersonalDataModel[] = [];
  friendsAcceptedNoPhoto: PersonalDataModel[] = [];
  friendsAcceptedPhoto: FriendListModel[] = [];
  
  constructor(private _api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log("friends KURWA " + JSON.stringify(this.myFriends));

    if (this.myFriends != null) {
      this.myFriends.forEach(fr => {
        if (fr.isAccepted) {
          this.friendsAccepted.push(fr.personalData);
        }
      });
    }

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

 async onClickFriend(friend: string) {
    var res = await this.router.navigate(['/profile', friend]);
    var snapshot = this.route.snapshot;
    window.location.reload();
 }
}
