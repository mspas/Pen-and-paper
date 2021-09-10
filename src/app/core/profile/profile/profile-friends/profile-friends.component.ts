import { Component, OnInit, Input } from "@angular/core";
import { FriendModel, FriendListModel } from "src/app/core/models/friend.model";
import {
  PersonalDataModel,
  PersonalDataListModel,
} from "src/app/core/models/personaldata.model";
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";

@Component({
  selector: "app-profile-friends",
  templateUrl: "./profile-friends.component.html",
  styleUrls: ["./profile-friends.component.sass"],
})
export class ProfileFriendsComponent implements OnInit {
  @Input("userFriends") userFriends: FriendModel[] = [];
  @Input("myFriends") myFriends: FriendModel[] = [];
  @Input("isMyProfileFlag") isMyProfileFlag: boolean;
  @Input("isLoading") isLoading: boolean;

  faCheck = faCheck;
  faTimes = faTimes;
  
  imageToShow: any;
  isImageLoading: boolean;
  defaultImage: boolean = true;
  userID: number;
  profileData: PersonalDataModel;
  data: any;

  friendsAccepted: PersonalDataListModel[] = [];
  invitations: PersonalDataListModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _api: ApiService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.isLoading) this.sortFriends();
  }

  sortFriends() {
    this.friendsAccepted = [];
    this.invitations = [];
    if (this.userFriends != null) {
      this.userFriends.forEach((fr) => {
        if (fr.isAccepted) {
          this.friendsAccepted.push(
            new PersonalDataListModel(fr.personalData, null)
          );
        }
        if (!fr.isAccepted && fr.isReceiver) {
          this.invitations.push(
            new PersonalDataListModel(fr.personalData, null)
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
        element.data.photoName != null &&
        element.data.photoName != "unknown.png"
      ) {
        this.isImageLoading = true;
        this._api.getImage(element.data.photoName).subscribe(
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
        if (check) this.friendsAccepted[id].photo = reader.result;
        else this.invitations[id].photo = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  /*async onClickFriend(friend: string) {
    var res = await this.router.navigate(["/profile", friend]);
    var snapshot = this.route.snapshot;
    window.location.reload();
  }*/

  async onAcceptFriend(id: number) {
    this.userFriends.forEach((element) => {
      if (element.personalData.id == id) {
        element.isAccepted = true;
        this._api.acceptFriendInvite(element);
        window.location.reload();
      }
    });
  }

  onRemoveFriend(id: number) {
    this.userFriends.forEach((element) => {
      if (element.personalData.id == id)
        this._api.declineFriendInvite(element.id);
      window.location.reload();
    });
  }
}
