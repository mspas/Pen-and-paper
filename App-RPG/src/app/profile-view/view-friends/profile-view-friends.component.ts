import { FriendModel, FriendListModel } from '../../models/friend.model';
import { Component, OnInit, Input } from '@angular/core';
import { PersonalDataModel } from '../../models/personaldata.model';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-friends',
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

  @Input("userFriends") userFriends: FriendModel[] = [];
  @Input("myFriends") myFriends: FriendModel[] = [];
  friendsAccepted: PersonalDataModel[] = [];
  friendsAcceptedNoPhoto: PersonalDataModel[] = [];
  friendsAcceptedPhoto: FriendListModel[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private _api : ApiService) { 
  }

  ngOnInit() {
    /*this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let profile = this.data[0];
    this.profileData = profile.pop();
    var viewUserFriends = this.data[1];*/

    if (this.userFriends != null) {
      this.userFriends.forEach(fr => {
        if (fr.isAccepted) {
          this.friendsAccepted.push(fr.personalData);
        }
      });
    }
    
    /*this._api.getFriendsList(this.userID).subscribe(obje => (this.friendsAll = obje));
    
    this.friendsAll.forEach(element => {
      if (element.isAccepted == true) 
        this.friendsAccepted.push(element.personalData);
    });*/

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
    //console.log("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit eget enim a fermentum. Praesent vulputate nunc eget massa iaculis vestibulum. Donec luctus a odio eget molestie. Praesent eu lorem in sem euismod tempor. Quisque molestie ex eget blandit aliquam. Curabitur rhoncus, mi eu scelerisque volutpat, ante quam vestibulum lacus, sit amet interdum dui leo at felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam at felis orci. Nunc placerat ac dui vitae vehicula. Cras lacus nunc, lacinia sit amet lorem non, feugiat dignissim nisl. Nullam vulputate massa ipsum, quis pulvinar urna tempor id. Proin volutpat consequat cursus. Sed semper commodo tellus, ut gravida lectus tempus ut. Nulla fermentum eget eros et feugiat. In a felis scelerisque, sodales orci id, eleifend elit.");
    //console.log("kurwa mac " + friend);
    var res = await this.router.navigate(['/profile', friend]);
    var snapshot = this.route.snapshot;
    window.location.reload();
 }


}
