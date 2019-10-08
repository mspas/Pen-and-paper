import { GameToPersonCreateModel } from '../../../../models/game-to-person.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { PersonalDataModel } from '../../../../models/personaldata.model';
import { GameAppModel } from '../../../../models/game.model';
import { FriendModel, FriendListModel } from '../../../../models/friend.model';

@Component({
  selector: 'app-invite-to-game',
  templateUrl: './invite-to-game.component.html',
  styleUrls: ['./invite-to-game.component.css']
})
export class InviteToGameComponent implements OnInit {

  data: any;
  isImageLoading: boolean;
  profileData: PersonalDataModel;
  gameData: GameAppModel;
  friendsAll: FriendModel[] = [];
  friendsAccepted: PersonalDataModel[] = [];
  friendsAcceptedNoPhoto: PersonalDataModel[] = [];
  friendsAcceptedPhoto: FriendListModel[] = [];

  constructor(private route: ActivatedRoute, private _api: ApiService) { }

  ngOnInit() {
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let game = this.data[0];
    this.gameData = game.pop();
    let viewUserFriends = this.data[1];

    if (viewUserFriends != null) {
      viewUserFriends.forEach(fr => {
        if (fr.isAccepted) {
          this.friendsAccepted.push(fr.personalData);
        }
      });
    }

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

  isInGame(player: PersonalDataModel): boolean {
    let check = false;
    this.gameData.participants.forEach(participant => {
      if (participant.id == player.id)
        check = true;
    });
    return check;
  }

  invitePlayer(player: PersonalDataModel) {
    let g2p = new GameToPersonCreateModel(this.gameData.id, player.id, false, false, false, 10);
    this._api.joinGame(g2p);
  }

 }
