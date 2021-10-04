import { Component, OnInit, Input } from "@angular/core";
import { FriendModel, FriendListModel } from "src/app/core/models/friend.model";
import {
  PersonalDataModel,
  PersonalDataListModel,
} from "src/app/core/models/personaldata.model";
import { faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
  faSpinner = faSpinner;
  
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

    this.friendsAccepted.forEach(async (element) => {
      if (
        element.data.photoName != null &&
        element.data.photoName != "unknown.png"
      ) {
        this.isImageLoading = true;

        let blob = await this._api.getImage(element.data.photoName).toPromise();
        let image = await this.blobToImage(blob);
        element.photo = image.src;

        this.isImageLoading = false;
      }
    });

    this.invitations.forEach(async (element) => {
      if (
        element.personalData.photoName != null &&
        element.personalData.photoName != "unknown.png"
      ) {
        let blob = await this._api.getImage(element.personalData.photoName).toPromise();
        let image = await this.blobToImage(blob);
        element.photo = image.src;
      }
    });
  }

  blobToImage = (blob: Blob): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
      let reader = new FileReader();
      let dataURI;
      reader.addEventListener(
        "load",
        () => {
          dataURI = reader.result;
          const img = document.createElement("img");
          img.src = dataURI;
          resolve(img);
        },
        false
      );
      if (blob) {
        reader.readAsDataURL(blob);
      }
    })
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
