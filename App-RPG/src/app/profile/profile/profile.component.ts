import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PersonalDataModel } from "src/app/models/personaldata.model";
import { GameToPersonAppModel } from "src/app/models/game-to-person.model";
import { FriendModel } from "src/app/models/friend.model";
import { ApiService } from "src/app/services/api.service";
import { ConversationDataModel } from "src/app/models/message.model";
import { NgForm } from "@angular/forms";
import { ChangePasswordModel } from "src/app/models/changepassword.model";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.sass"]
})
export class ProfileComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;

  imageToShow: any;
  isImageLoading: boolean;
  isFriend: boolean = false;
  isInvited: boolean = false;
  defaultImage: boolean = true;
  mobileView = false;
  userID: number;
  data: any;

  profileChild: boolean = true;
  friendsChild: boolean = false;
  gamesChild: boolean = false;

  myProfileData: PersonalDataModel;
  myGamesAPPList: GameToPersonAppModel[] = [];
  myFriends: FriendModel[] = [];

  userProfileData: PersonalDataModel;
  userGamesAPPList: GameToPersonAppModel[] = [];
  userFriends: FriendModel[] = [];

  ourRelation: FriendModel = null;
  myProfilePage: boolean = false;

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
        data => {
          this.createImageFromBlob(data);
          this.isImageLoading = false;
        },
        error => {
          this.isImageLoading = false;
          console.log(error);
        }
      );
    }

    if (this.myProfileData.id == this.userProfileData.id) {
      this.myProfilePage = true;
    } else {
      if (this.myFriends != null) {
        this.myFriends.forEach(fr => {
          if (fr.personalData.id == this.userProfileData.id) {
            if (fr.isAccepted) {
              this.isFriend = true;
              this.isInvited = false;
            } else {
              this.isFriend = false;
              this.isInvited = true;
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
      this.isInvited == false &&
      this.isFriend == false
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

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this._api.uploadPhoto(
      true,
      this.myProfileData.id,
      false,
      nativeElement.files[0]
    );
  }

  onSaveChanges(form: NgForm) {
    var profile = this.myProfileData;
    if (form.value.email.length > 0) profile.email = form.value.email;
    if (form.value.firstname.length > 0)
      profile.firstname = form.value.firstname;
    if (form.value.lastname.length > 0) profile.lastname = form.value.lastname;
    if (form.value.city.length > 0) profile.city = form.value.city;
    if (parseInt(form.value.age) > 0) profile.age = parseInt(form.value.age);
    this._api.editPersonalData(profile);
  }

  onSavePassword(form: NgForm) {
    if (form.value.password == form.value.repeatpassword) {
      let data = new ChangePasswordModel(
        form.value.password,
        form.value.oldpassword
      );
      this._api.editPassword(data);
    }
  }

  onSaveImage(form: NgForm) {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this._api.uploadPhoto(
      true,
      this.myProfileData.id,
      false,
      nativeElement.files[0]
    );
    window.location.reload();
  }
}
