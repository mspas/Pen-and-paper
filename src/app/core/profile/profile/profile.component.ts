import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { GameToPersonAppModel } from "src/app/core/models/game-to-person.model";
import { FriendModel } from "src/app/core/models/friend.model";
import { ApiService } from "src/app/core/services/api.service";
import { ConversationDataModel } from "src/app/core/models/message.model";
import { NgForm } from "@angular/forms";
import { ChangePasswordModel } from "src/app/core/models/changepassword.model";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.sass"],
})
export class ProfileComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  imageToShow: any;
  isImageLoading: boolean;
  defaultImage: boolean = true;

  isFriendFlag = false;
  isInvitedFlag = false;
  mobileViewFlag = false;
  viewChildFlag = true;
  isMyProfileFlag = false;
  data: any;

  myProfileData: PersonalDataModel;
  myGamesAPPList: GameToPersonAppModel[] = [];
  myFriends: FriendModel[] = [];

  userProfileData: PersonalDataModel;
  userGamesAPPList: GameToPersonAppModel[] = [];
  userFriends: FriendModel[] = [];

  ourRelation: FriendModel = null;

  constructor(
    private route: ActivatedRoute,
    private _api: ApiService,
    private _data: DataService
  ) {}

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

    if (
      this.userProfileData.photoName != null &&
      this.userProfileData.photoName != ""
    ) {
      this.defaultImage = false;

      this.isImageLoading = true;
      this._api.getImage(this.userProfileData.photoName).subscribe(
        (data) => {
          this.createImageFromBlob(data);
          this.isImageLoading = false;
        },
        (error) => {
          this.isImageLoading = false;
          console.log(error);
        }
      );
    }

    if (this.myProfileData.id == this.userProfileData.id) {
      this.isMyProfileFlag = true;
    } else {
      if (this.myFriends != null) {
        this.myFriends.forEach((fr) => {
          if (fr.personalData.id == this.userProfileData.id) {
            if (fr.isAccepted) {
              this.isFriendFlag = true;
              this.isInvitedFlag = false;
            } else {
              this.isFriendFlag = false;
              this.isInvitedFlag = true;
            }
            this.ourRelation = fr;
          }
        });
      }
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onSendInvite() {
    let loggedID = parseInt(localStorage.getItem("id"));
    if (this.ourRelation == null)
      this._api.sendFriendInvite(loggedID, this.userProfileData.id);
    if (
      this.ourRelation != null &&
      this.isInvitedFlag == false &&
      this.isFriendFlag == false
    ) {
      let relation = this.ourRelation;
      relation.isFriendRequest = true;
      this._api.editRelation(relation);
    }
  }

  deleteFriend() {}

  onSendMessage() {
    if (this.ourRelation != null) {
      //await this._api.getConversation(this.ourRelation.id).subscribe(data => this.conversation = data); //wyjebac to do app comp i viewchildem do chatu elo ide spac
      this._data.changeConversationData(
        new ConversationDataModel(
          this.ourRelation,
          this.myProfileData,
          this.userProfileData
        )
      );
      this._data.changeChatControl(true);
    } else {
      this._data.changeConversationData(
        new ConversationDataModel(null, null, this.userProfileData)
      );
      this._data.changeChatControl(true);
    }
  }

  onNavProfile(event) {
    if (event.target.getAttribute("class") !== "active") {
      this.viewChildFlag = !this.viewChildFlag;

      document.getElementById("nav-profile-games").removeAttribute("class");
      document.getElementById("nav-profile-friends").removeAttribute("class");

      event.target.setAttribute("class", "active");
    }
  }
}
