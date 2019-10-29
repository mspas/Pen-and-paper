import { Component, OnInit, Input } from '@angular/core';
import { PersonalDataModel, PersonalDataListModel } from '../../../models/personaldata.model';
import { GameAppModel } from '../../../models/game.model';
import { ButtonManager } from '../../button-manager';
import { GameSessionCreateModel } from '../../../models/gamesession.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { GameToPersonCreateModel } from '../../../models/game-to-person.model';
import { NgForm } from '@angular/forms';
import { SkillCreateModel } from '../../../models/skill.model';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {

  @Input() profileData: PersonalDataModel;
  @Input() gameData: GameAppModel;
  @Input() gameMaster: PersonalDataModel;
  
  urlMafia: string = "assets/mafia1.png";
  urlFantasy: string = "assets/fantasy1.png";
  urlSciFi: string = "assets/scifi.png";
  imageUrl: string = "";
  imageToShow: any;

  data: any;
  buttonManager: ButtonManager;
  hotJoinString: string = "No";
  needInviteString: string = "No";
  info: string = "Join game";
  modalTitle: string = "";
  iAmMaster: boolean = false;
  iAmParticipant: boolean = false;
  isNewRequest: boolean = false;
  numberOfRequests: number = 0;
  myCardId: number;
  acceptedPlayers: PersonalDataListModel[] = [];
  waitingSelfRequested: PersonalDataModel[] = [];
  waitingInvited: PersonalDataModel[] = [];
  newSkillsNames: string[] = [];
  newGameSessions: GameSessionCreateModel[] = [];
  isNewInvited: boolean = false;
  isImageLoading: boolean;
  subpage: string;


  
  constructor(private route: ActivatedRoute, private _api: ApiService, private _router: Router) { }

  ngOnInit() {
    this.buttonManager = new ButtonManager(false,false,false,false,false,false);

    if (this.gameData.masterId == this.profileData.id)
      this.iAmMaster = true;

    if (this.gameData.category == "Mafia") 
      this.imageUrl = this.urlMafia;
    if (this.gameData.category == "Fantasy")
      this.imageUrl = this.urlFantasy;
    if (this.gameData.category == "Sci-fi")
      this.imageUrl = this.urlSciFi;

    if (this.gameData.hotJoin)
      this.hotJoinString = "Yes";
    if (this.gameData.needInvite)
      this.needInviteString = "Yes";

    this.gameData.participantsProfiles.forEach(player => {
      if (this.gameData.masterId == player.id)
        this.gameMaster = player;
      if (this.profileData.id == player.id && !this.iAmMaster) {
        this.gameData.participants.forEach(card => {
          if (this.profileData.id == card.playerId) {
            if (card.isAccepted) {
              this.iAmParticipant = true;
              this.myCardId = card.id;
            }
            else {
              this.iAmParticipant = false;
              this.info = "Your request is waiting...";
            }
          }
        });
      }
      this.gameData.participants.forEach(card => {
        //if (card.playerId == player.id && card.id != this.gameMaster.id) {
          if (card.playerId == player.id) {
          if (card.isAccepted) {
            let playerListModel = new PersonalDataListModel(player, null);
            this.acceptedPlayers.push(playerListModel);
          }
          else {
            if (card.isMadeByPlayer)
              this.waitingSelfRequested.push(player);
            else 
              this.waitingInvited.push(player);
          }
        }
      });
    });

    if (this.subpage == "view") {
      if (this.iAmParticipant || this.iAmMaster) {
        this.goToGameOverview();
      }
    }

    
    if (this.waitingSelfRequested.length >= 1)
      this.numberOfRequests = this.waitingSelfRequested.length;

    if (this.waitingSelfRequested.length > 0) 
      this.isNewRequest = true;
    if (this.waitingInvited.length > 0)
      this.isNewInvited = true;

    if (this.gameMaster.photoName != null && this.gameMaster.photoName != "") {
        this._api.getImage(this.gameMaster.photoName).subscribe(data => {
          this.createImageFromBlob(data, -1);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });
    }
    let i = 0;
    this.acceptedPlayers.forEach(element => {
      if (element.data.photoName != null && element.data.photoName != "") {
        this._api.getImage(element.data.photoName).subscribe(data => {
          this.createImageFromBlob(data, i-1);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });
      }
      i++;
    });

  }

  createImageFromBlob(image: Blob, i: number) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      if (i != -1)
        this.acceptedPlayers[i].photo = reader.result;
      else  
        this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

 async goToGameOverview() {
    var res = await this._router.navigate(['/game', this.gameData.id, 'overview', 'forum']);
    var snapshot = this.route.snapshot;
    //window.location.reload();         MOGLO SIE ZEPSUC TUTAJ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 }

  toggleClick() {
    var elem = document.getElementById("panel1");
    if (elem.getAttribute("class") == "panel border")
      elem.setAttribute("class", "panel"); 
    else
      elem.setAttribute("class", "panel border");
  
  }

  onJoin() {
    let invite = false;
    if (this.gameData.needInvite == false)
      invite = true;

    let newConnection = new GameToPersonCreateModel(this.gameData.id, this.profileData.id, false, invite, true, 10);
    this._api.joinGame(newConnection);
    this._router.navigate(['/profile/games-list/', this.profileData.login]);
  }

  onLeave() {
    this._api.declineJoinGame(this.myCardId);
    this._router.navigate(['/profile/games-list/', this.profileData.login]);
  }

  onAcceptRequest(playerId: number) {
    this.gameData.participants.forEach(card => {
      if (card.playerId == playerId) 
        this._api.acceptJoinGame(card);
    });
  }

  onDeclineRequest(playerId: number) {
    this.gameData.participants.forEach(card => {
      if (card.playerId == playerId) 
        this._api.declineJoinGame(card.id);
    });
  }

  onAddSkill(form: NgForm) {
    if (this.newSkillsNames == null) 
      this.newSkillsNames = [];
    this.newSkillsNames.push(form.value.skill);
    form.reset();
  }

  onRemoveNewSkill(index: number){
    this.newSkillsNames.splice(index, 1);
  }

  onRemoveSkill(id: number, index: number) {
    console.log("id " + id + " indx " + index);
    let elemId = "skill" + index.toString();
    document.getElementById(elemId).removeAttribute("class");
    document.getElementById(elemId).setAttribute("class", "sr-only");
    let cross = "cross" + index.toString();
    document.getElementById(cross).removeAttribute("class");
    document.getElementById(cross).setAttribute("class", "sr-only");
    this._api.deleteSkill(id);
  }

  onAddSession(form: NgForm) {
    if (this.newGameSessions == null) 
      this.newGameSessions = [];
    this.newGameSessions.push(new GameSessionCreateModel(form.value.stitle, form.value.date, this.gameData.id));
    form.reset();
  }

  onRemoveNewSession(index: number){
    this.newGameSessions.splice(index, 1);
  }

  onRemoveSession(id: number, index: number) {
    let elemId = "ses" + index.toString();
    document.getElementById(elemId).removeAttribute("class");
    document.getElementById(elemId).setAttribute("class", "sr-only");
    let cross = "cros" + index.toString();
    document.getElementById(cross).removeAttribute("class");
    document.getElementById(cross).setAttribute("class", "sr-only");
    this._api.deleteSession(id);
  }
  
  kickPlayer() {
    
  }

  showCard() {
    
  }

  setCard() {
    
  }

  onSaveChanges() {
    if (this.buttonManager.gameSettings && this.newSkillsNames != null) {
      this.newSkillsNames.forEach(skillName => {
        this._api.addSkill(new SkillCreateModel(skillName, this.gameData.id));
      });
    }

    if (this.buttonManager.userAccess && this.newGameSessions != null) {
      this.newGameSessions.forEach(session => {
        this._api.addSession(new GameSessionCreateModel(session.sessionName, session.date, this.gameData.id));
      });
    }

    this.newSkillsNames = null;
    this.newGameSessions = null;
  }
}

