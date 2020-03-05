import { Component, OnInit, Input } from "@angular/core";
import { FriendModel, FriendListModel } from "src/app/models/friend.model";
import { PersonalDataModel } from "src/app/models/personaldata.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-profile-friends",
  templateUrl: "./profile-friends.component.html",
  styleUrls: ["./profile-friends.component.sass"]
})
export class ProfileFriendsComponent implements OnInit {
  @Input("userFriends") userFriends: FriendModel[] = [];
  @Input("myFriends") myFriends: FriendModel[] = [];
  @Input("isMyProfileFlag") isMyProfileFlag: boolean;
  friendsAccepted: PersonalDataModel[] = [];

  imageToShow: any;
  isImageLoading: boolean;
  defaultImage: boolean = true;
  userID: number;
  profileData: PersonalDataModel;
  data: any;
  friendsAcceptedNoPhoto: PersonalDataModel[] = [];
  friendsAcceptedPhoto: FriendListModel[] = [];

  invitations: PersonalDataModel[] = [];
  invitationsNoPhoto: PersonalDataModel[] = [];
  invitationsPhoto: FriendListModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _api: ApiService
  ) {}

  ngOnInit() {
    if (this.userFriends != null) {
      this.userFriends.forEach(fr => {
        if (fr.isAccepted) {
          this.friendsAccepted.push(fr.personalData);
        }
        if (!fr.isAccepted && fr.isReceiver) {
          this.invitations.push(fr.personalData);
        }
      });
    }

    this.friendsAccepted.forEach(element => {
      if (element.photoName != null && element.photoName != "unknown.png") {
        let friend = new FriendListModel(element, null);
        this.friendsAcceptedPhoto.push(friend);
        let id = this.friendsAcceptedPhoto.length - 1;
        this.isImageLoading = true;
        this._api.getImage(element.photoName).subscribe(
          data => {
            this.createImageFromBlob(data, id, true);
            this.isImageLoading = false;
          },
          error => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      } else {
        this.friendsAcceptedNoPhoto.push(element);
      }
    });

    this.invitations.forEach(element => {
      if (element.photoName != null && element.photoName != "") {
        let friend = new FriendListModel(element, null);
        this.invitationsPhoto.push(friend);
        let id = this.invitationsPhoto.length - 1;
        this.isImageLoading = true;
        this._api.getImage(element.photoName).subscribe(
          data => {
            this.createImageFromBlob(data, id, false);
            this.isImageLoading = false;
          },
          error => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      } else {
        this.invitationsNoPhoto.push(element);
      }
    });
  }

  createImageFromBlob(image: Blob, id: number, check: boolean) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (check) this.friendsAcceptedPhoto[id].photo = reader.result;
        else this.invitationsPhoto[id].photo = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async onClickFriend(friend: string) {
    var res = await this.router.navigate(["/profile", friend]);
    var snapshot = this.route.snapshot;
    window.location.reload();
  }

  async onAcceptFriend(id: number) {
    this.userFriends.forEach(element => {
      if (element.personalData.id == id) {
        element.isAccepted = true;
        this._api.acceptFriendInvite(element);
        window.location.reload();
      }
    });
  }

  onRemoveFriend(id: number) {
    this.userFriends.forEach(element => {
      if (element.personalData.id == id)
        this._api.declineFriendInvite(element.id);
      window.location.reload();
    });
  }
}
