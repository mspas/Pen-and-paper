import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameAppModel } from '../../../../models/game.model';
import { TopicToPersonModel } from '../../../../models/topic-to-person.model';
import { PersonalDataModel, PersonalDataListModel } from '../../../../models/personaldata.model';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css', '../forum-view.component.css']
})
export class PlayersComponent implements OnInit {

  @Input() gameData: GameAppModel;
  @Input() topicToPersonData: TopicToPersonModel[];
  @Input() profileData: PersonalDataModel;
  @Input() iAmGameMaster: boolean;
  
  @Output() valueChange = new EventEmitter(); 
  
  gameMaster: PersonalDataListModel;
  iAmParticipant: boolean;
  myCardId: number;

  participants: PersonalDataListModel[] = [];
  acceptedPlayers: PersonalDataListModel[] = [];
  waitingSelfRequested: PersonalDataListModel[] = [];
  waitingInvited: PersonalDataListModel[] = [];
  
  isImageLoading: boolean;

  constructor(private _api: ApiService) { }

  ngOnInit() {
    this.gameData.participantsProfiles.forEach(player => {
      this.participants.push(new PersonalDataListModel(player, null));
      let index = 0;
      if (player.photoName != null && player.photoName !="unknown.png") {
        index = this.gameData.participantsProfiles.indexOf(player);
        this.getImage(player.photoName, index);
      }
      else {
        index = this.gameData.participantsProfiles.indexOf(player);
      }
      this.detectProfile(this.participants[index]);
    });
  }

  detectProfile(profile: PersonalDataListModel){
    if (this.gameData.masterId == profile.data.id) {
      this.gameMaster = profile;
      return true;
    }
    this.gameData.participants.forEach(card => {
      if (card.playerId == profile.data.id) {
        if (card.isAccepted) {
          this.acceptedPlayers.push(profile);
        }
        else {
          if (card.isMadeByPlayer)
            this.waitingSelfRequested.push(profile);
          else 
            this.waitingInvited.push(profile);
        }
      }
    });
  }

  getImage(photoName: string, index: number) {
    this.isImageLoading = true;
    this._api.getImage(photoName).subscribe(data => {
      this.createImageFromBlob(data, index);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob, index: number) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.participants[index].photo = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }
 
  onClickBack() {
    this.valueChange.emit("false");
  }

}
