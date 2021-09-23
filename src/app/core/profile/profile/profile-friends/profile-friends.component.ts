import { Component, OnInit, Input } from "@angular/core";
import { FriendModel, FriendListModel } from "src/app/core/models/friend.model";
import {
  PersonalDataModel,
  PersonalDataListModel,
} from "src/app/core/models/personaldata.model";
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from "src/app/core/services/api.service";

@Component({
  selector: "app-profile-friends",
  templateUrl: "./profile-friends.component.html",
  styleUrls: ["./profile-friends.component.sass"],
})
export class ProfileFriendsComponent implements OnInit {
  @Input("userRelationsList") userRelationsList: FriendModel[] = [];
  @Input("myRelationsList") myRelationsList: FriendModel[] = [];
  @Input("isMyProfileFlag") isMyProfileFlag: boolean;
  @Input("isLoading") isLoading: boolean;

  faCheck = faCheck;
  faTimes = faTimes;
  
  imageToShow: any;
  isImageLoading: boolean;
  defaultImage: boolean = true;
  data: any;

  friendsAccepted: PersonalDataListModel[] = [];
  invitations: FriendListModel[] = [];

  constructor(
    private _api: ApiService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.isLoading) this.sortFriends();
  }

  sortFriends() {
    this.friendsAccepted = [];
    this.invitations = [];
    if (this.userRelationsList != null) {
      this.userRelationsList.forEach((fr) => {
        if (fr.isAccepted) {
          this.friendsAccepted.push(
            new PersonalDataListModel(fr.personalData, null)
          );
        }
        if (!fr.isAccepted && fr.isReceiver) {
          this.invitations.push(
            new FriendListModel(fr, fr.personalData, null)
          );
        }
      });
    }

    this.friendsAccepted.forEach((element) => {
      if (
        element.data.photoName != null &&
        element.data.photoName != "unknown.png"
      ) {
        this.isImageLoading = true;
        this._api.getImage(element.data.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(
              data,
              this.friendsAccepted.indexOf(element),
              true
            );
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      }
    });

    this.invitations.forEach((element) => {
      if (
        element.personalData.photoName != null &&
        element.personalData.photoName != "unknown.png"
      ) {
        this.isImageLoading = true;
        this._api.getImage(element.personalData.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(
              data,
              this.invitations.indexOf(element),
              false
            );
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      }
    });
  }

  createImageFromBlob(image: Blob, id: number, check: boolean) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (id > -1)
          if (check) this.friendsAccepted[id].photo = reader.result;
          else this.invitations[id].photo = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onAcceptFriend(id: number) {
    this.userRelationsList.forEach((relation) => {
      if (relation.id == id) {
        relation.isAccepted = true;
        this._api.acceptFriendInvite(relation).subscribe(data => {
          if (data.success) window.location.reload();
        });
      }
    });
  }

  onRemoveFriend(id: number) {
    this.userRelationsList.forEach((relation) => {
      if (relation.id == id)
        this._api.declineFriendInvite(id).subscribe(data => {
          if (data.success) window.location.reload();
        });
    });
  }
}
