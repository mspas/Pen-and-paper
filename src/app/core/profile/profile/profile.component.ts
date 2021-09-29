import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { GameToPersonAppModel } from "src/app/core/models/game-to-person.model";
import { FriendCreateModel, FriendModel } from "src/app/core/models/friend.model";
import { ConversationDataModel, MessageModel } from "src/app/core/models/message.model";

import { ApiService } from "src/app/core/services/api.service";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.sass"],
})
export class ProfileComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  faSpinner = faSpinner;
  imageToShow: any;
  isImageLoading: boolean;
  defaultImage: boolean = true;
  modalTitle = "Change password";

  isLoading = true;
  isLoadingFriends = true;
  isLoadingGames = true;
  isLoadingMessages = true;
  isFriendFlag = false;
  isInvitedFlag = false;
  mobileViewFlag = false;
  viewChildFlag = true;
  isMyProfileFlag = false;
  data: any;
  showModalFlag = false;
  showModalIndex = -1;
  showChatFlag = false;

  myProfileData: PersonalDataModel;
  myRelationsList: FriendModel[] = [];

  userProfileData: PersonalDataModel;
  userRelationsList: FriendModel[] = [];
  userGamesList: GameToPersonAppModel[] = [];

  ourRelation: FriendModel = null;

  conversationData: ConversationDataModel = new ConversationDataModel(null, null, null);
  messageList: MessageModel[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private _api: ApiService,
    private _data: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.isLoading = true;
      let myNickname = localStorage.getItem("nick");
      let userNick = params["login"];
      this._api.getProfileData(userNick).subscribe((data) => {
        this.setProfileData(data);
      });

      this.isLoadingFriends = true;
      this.isLoadingGames = true;

      this._api.getFriendsList(userNick).subscribe((data) => {
        this.userRelationsList = data;
        this.isLoadingFriends = false;
      });

      this._api.getFriendsList(myNickname).subscribe((data) => {
        this.myRelationsList = data;
        if (this.myRelationsList != null) {
          for (let i = 0; i < this.myRelationsList.length; i++) {
            const fr = this.myRelationsList[i];
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
          }
          this.conversationData.relation = this.ourRelation;
        }
      });

      this._api.getPlayersGames(userNick).subscribe((data) => {
        this.userGamesList = data;
        this.isLoadingGames = false;
      });
    });
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

  setProfileData(data) {
    this.userProfileData = data;
    this.isLoading = false;
    let nick = localStorage.getItem("nick");

    if (this.userProfileData.id !== parseInt(localStorage.getItem("id")) && nick) {
      this.isMyProfileFlag = false;
      this.conversationData.userProfile = this.userProfileData;
      this._api.getProfileData(nick).subscribe((data) => {
        this.myProfileData = data;
        this.conversationData.myProfile = data;
      });
    } else this.isMyProfileFlag = true;

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
  }

  onSendInvite() {
    let myId = parseInt(localStorage.getItem("id"));
    let friendInvite = new FriendCreateModel(false, myId, this.userProfileData.id);
    if (this.ourRelation == null)
      this._api.sendFriendInvite(friendInvite).subscribe(data => {
        if (data.success) window.location.reload();
      });
    if (
      this.ourRelation != null &&
      this.isInvitedFlag == false &&
      this.isFriendFlag == false
    ) {
      let relation = this.ourRelation;
      relation.isFriendRequest = true;
      this._api.editRelation(relation).subscribe(data => {
        if (data.success) window.location.reload();
      });
    }
  }

  deleteFriend() {
    this._api.declineFriendInvite(this.ourRelation.id).subscribe(data => {
      if (data.success) window.location.reload();
    });
  }

  onSendMessage() {
    this.isLoadingMessages = true;
    this.showChatFlag = true;
    this._api
      .getConversation(this.conversationData.relation.id)
      .subscribe(data => {
        this.messageList = data;
        this.isLoadingMessages = false;
      });
  }

  onNavProfile(event) {
    if (event.target.getAttribute("class") !== "active") {
      this.viewChildFlag = !this.viewChildFlag;

      document.getElementById("nav-profile-games").removeAttribute("class");
      document.getElementById("nav-profile-friends").removeAttribute("class");

      event.target.setAttribute("class", "active");
    }
  }

  showModal(value: boolean, title: string, index: number) {
    this.modalTitle = title;
    this.showModalFlag = value;
    this.showModalIndex = index;
  }

  closeModal(value: boolean) {
    this.showModal(value, "", -1);
  }

  closeChat(value: boolean) {
    this.showChatFlag = value;
  }

}
