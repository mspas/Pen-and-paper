import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PersonalDataModel } from '../../models/personaldata.model';
import { ApiService } from '../../api.service';
import { MessageModel, ConversationDataModel } from '../../models/message.model';
import { FriendModel } from '../../models/friend.model';
import { DataService } from '../../data.service';
import { NgForm } from '@angular/forms';
import { ChangePasswordModel } from '../../models/changepassword.model';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  @Input() userProfileData : PersonalDataModel;
  @Input() myProfileData : PersonalDataModel;
  @Input() isInvited : boolean;
  @Input() isFriend : boolean;
  @Input() ourRelation : FriendModel;
  @Input() myProfilePage : boolean;
  @ViewChild('fileInput') fileInput: ElementRef;

  conversation : MessageModel[] = [];
  newConversation : boolean = false;
  isNewInvite: boolean; modalData: boolean = false; modalPassword: boolean = false; modalPicture: boolean = false;
  modalTitle: string = "Change personal data"; 
  pd: PersonalDataModel;
 

  constructor(private _api : ApiService, private _data : DataService) {
   }

  ngOnInit() {
  }


  onSendInvite() {
    let loggedID = parseInt(localStorage.getItem("id"));
    if (this.ourRelation == null)
      this._api.sendFriendInvite(loggedID, this.userProfileData.id);
    if (this.ourRelation != null && this.isInvited == false && this.isFriend == false) {
      let relation = this.ourRelation;
      relation.isFriendRequest = true;
      this._api.editRelation(relation);
    }
  }

  deleteFriend() {

  }

  onSendMessage(){
    if (this.ourRelation != null) {
      //await this._api.getConversation(this.ourRelation.id).subscribe(data => this.conversation = data); //wyjebac to do app comp i viewchildem do chatu elo ide spac
      this._data.changeConversationData(new ConversationDataModel(this.ourRelation, this.myProfileData, this.userProfileData));
      this._data.changeChatControl(true);
    }
    else {
      this._data.changeConversationData(new ConversationDataModel(null, null, this.userProfileData));
      this._data.changeChatControl(true);
    }
  }

  onModalChangeData() {
    this.modalData = true;
    this.modalPassword = false;
    this.modalPicture = false;
    this.modalTitle = "Change personal data";
    }

  onModalChangePassword() {
    this.modalData = false;
    this.modalPassword = true;
    this.modalPicture = false;
    this.modalTitle = "Change password";
  }

  onModalChangePicture() {
    this.modalData = false;
    this.modalPassword = false;
    this.modalPicture = true;
    this.modalTitle = "Change picture";
  }

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this._api.uploadPhoto(true, this.pd.id, false, nativeElement.files[0]);
  }

  onSaveChanges(form: NgForm) {
    if (this.modalData) {
      var profile = this.myProfileData;
      if (form.value.email.length > 0) 
        profile.email = form.value.email;
      if (form.value.firstname.length > 0)
        profile.firstname = form.value.firstname;
      if (form.value.lastname.length > 0)
        profile.lastname = form.value.lastname;
      if (form.value.city.length > 0)
        profile.city = form.value.city;
      if (parseInt(form.value.age) > 0)
        profile.age = parseInt(form.value.age);
      this._api.editPersonalData(profile);
    }

    if (this.modalPassword) {
      if (form.value.password == form.value.repeatpassword) {
        let data = new ChangePasswordModel(form.value.password, form.value.oldpassword);
        this._api.editPassword(data);
      }
    }

    if (this.modalPicture) {
      var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
      this._api.uploadPhoto(this.myProfileData.id, nativeElement.files[0]);
      window.location.reload();
    }
  }

  onSavePassword(form: NgForm) {
  }



}
