import { ChangePasswordModel } from './../models/changepassword.model';
import { FriendModel } from './../models/friend.model';
import { ApiService } from './../api.service';
import { AccountModel } from './../models/account.model';
import { PersonalDataModel } from './../models/personaldata.model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  private token : string; 

  @ViewChild('fileInput') fileInput: ElementRef;
  urlAssets: string = "http://localhost:50168/wwwroot/";
  urlPhoto: string = "assets/unknown.png";

  imageToShow: any;
  isImageLoading: boolean;
  myProfile: AccountModel;
  friendsAll: FriendModel[] = [];
  friendsAccepted: PersonalDataModel[] = [];
  friendsWaiting: PersonalDataModel[] = [];
  receivedInvites: FriendModel[] = [];
  isNewInvite: boolean; modalData: boolean = false; modalPassword: boolean = false; modalPicture: boolean = false;
  defaultImage: boolean = true;
  accountId: string;
  modalTitle: string = "Change personal data";
  pd: PersonalDataModel;

  constructor(private auth : AuthService, private route: ActivatedRoute, private _api: ApiService) { }

  ngOnInit() {
    this.token = localStorage.getItem("token");
    let tokenInfo = this.getDecodedAccessToken(this.token);
    this.accountId = tokenInfo.id;
    localStorage.setItem("profileid", this.accountId);
    localStorage.setItem("nick", tokenInfo.login);
    let fileName = tokenInfo.photoName;
    var personalData = new PersonalDataModel(parseInt(tokenInfo.id), tokenInfo.login, tokenInfo.email, tokenInfo.firstname, tokenInfo.lastname, tokenInfo.city, parseInt(tokenInfo.age), tokenInfo.photoName);
    this.myProfile = new AccountModel(tokenInfo.login, 'nope', tokenInfo.email, personalData);
    this.pd = personalData;

    if (fileName != null || fileName != "") 
      this.defaultImage = false;
  
    this.isImageLoading = true;
    this._api.getImage(fileName).subscribe(data => {
      this.createImage(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });

    
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.friendsAll = profiledata.profiledata;
    });

    this.friendsAll.forEach(element => {
      if (element.isAccepted) {
        this.friendsAccepted.push(element.personalData);
      }
      else {
        if (element.isReceiver) 
          this.receivedInvites.push(element);
        else 
          this.friendsWaiting.push(element.personalData);
      }
    });

    if (this.receivedInvites.length > 0) 
      this.isNewInvite = true;
    else 
      this.isNewInvite = false;

  }

  
  createImage(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  onAcceptInvitation(inviteId: number) {
    this.receivedInvites.forEach(element => {
      if (element.id == inviteId) {
        let invite = element;
        invite.isAccepted = true;
        this._api.acceptFriendInvite(invite);
      }
    });
  }

  onDeclineInvitation(inviteId: number) {
    this.receivedInvites.forEach(element => {
      if (element.id == inviteId) {
        this._api.declineFriendInvite(element.id);
      }
    });
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
    this._api.uploadPhoto(this.pd.id, nativeElement.files[0]);
  }

  onSaveChanges(form: NgForm) {
    if (this.modalData) {
      var profile = this.pd;
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
      this._api.uploadPhoto(this.pd.id, nativeElement.files[0]);
    }
  }

  onSavePassword(form: NgForm) {
  }

  onLogout() {
    this.auth.logout();
  }


}
