import { ButtonManager } from './button-manager';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { PersonalDataModel } from '../models/personaldata.model';
import { GameToPersonAppModel, GameToPersonCreateModel } from '../models/game-to-person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GameAppModel } from '../models/game.model';
import { NgForm } from '@angular/forms';
import { GameSessionCreateModel } from '../models/gamesession.model';
import { SkillCreateModel } from '../models/skill.model';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {

  
  urlMafia: string = "assets/mafia1.png";
  urlFantasy: string = "assets/fantasy1.png";
  urlSciFi: string = "assets/scifi.png";
  imageUrl: string = "";

  data: any;
  profileData: PersonalDataModel;
  gameData: GameAppModel;
  gameMaster: PersonalDataModel;
  buttonManager: ButtonManager;
  status: string = "Ended";
  info: string = "Join game";
  modalTitle: string = "";
  iAmMaster: boolean = false;
  iAmParticipant: boolean = false;
  isNewRequest: boolean = false;
  numberOfRequests: number = 0;
  myCardId: number;
  acceptedPlayers: PersonalDataModel[] = [];
  waitingSelfRequested: PersonalDataModel[] = [];
  waitingInvited: PersonalDataModel[] = [];
  newSkillsNames: string[] = [];
  newGameSessions: GameSessionCreateModel[] = [];
  isNewInvited: boolean = false;


  
  constructor(private route: ActivatedRoute, private _api: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    this.buttonManager = new ButtonManager(false,false,false,false,false,false);

    let profile = this.data[0];
    this.profileData = profile.pop();
    let gameList = this.data[1];
    this.gameData = gameList.pop();
    
    if (this.gameData.masterId == this.profileData.id)
      this.iAmMaster = true;

    if (this.gameData.category == "Mafia") 
      this.imageUrl = this.urlMafia;
    if (this.gameData.category == "Fantasy")
      this.imageUrl = this.urlFantasy;
    if (this.gameData.category == "Sci-fi")
      this.imageUrl = this.urlSciFi;


    this.gameData.participants.forEach(player => {
      if (this.gameData.masterId == player.id)
        this.gameMaster = player;
      if (this.profileData.id == player.id && !this.iAmMaster) {
        this.gameData.cards.forEach(card => {
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
      this.gameData.cards.forEach(card => {
        if (card.playerId == player.id) {
          if (card.isAccepted)
            this.acceptedPlayers.push(player);
          else {
            if (card.isMadeByPlayer)
              this.waitingSelfRequested.push(player);
            else 
              this.waitingInvited.push(player);
          }
        }
      });
    });

    
    if (this.waitingSelfRequested.length >= 1)
      this.numberOfRequests = this.waitingSelfRequested.length;

    if (this.waitingSelfRequested.length > 0) 
      this.isNewRequest = true;
    if (this.waitingInvited.length > 0)
      this.isNewInvited = true;

    if (this.gameData.isActive)
      this.status = "Active";

  }

  onJoin() {
    let invite = false;
    if (this.gameData.needInvite == false)
      invite = true;

    let newConnection = new GameToPersonCreateModel(this.gameData.id, this.profileData.id, false, invite, true, 10);
    this._api.joinGame(newConnection);
    this.router.navigate(['/profile/games-list/', this.profileData.login]);
  }

  onLeave() {
    this._api.declineJoinGame(this.myCardId);
    this.router.navigate(['/profile/games-list/', this.profileData.login]);
  }

  onAcceptRequest(playerId: number) {
    this.gameData.cards.forEach(card => {
      if (card.playerId == playerId) 
        this._api.acceptJoinGame(card);
    });
  }

  onDeclineRequest(playerId: number) {
    this.gameData.cards.forEach(card => {
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
    if (this.buttonManager.setScheme && this.newSkillsNames != null) {
      this.newSkillsNames.forEach(skillName => {
        this._api.addSkill(new SkillCreateModel(skillName, this.gameData.id));
      });
    }

    if (this.buttonManager.newSession && this.newGameSessions != null) {
      this.newGameSessions.forEach(session => {
        this._api.addSession(new GameSessionCreateModel(session.sessionName, session.date, this.gameData.id));
      });
    }

    this.newSkillsNames = null;
    this.newGameSessions = null;
  }

  onManageRequests() {
    this.modalTitle= "Join-requests for your game:";
    this.buttonManager.onManageRequests();
  }

  onSetScheme() {
    this.modalTitle= "Set scheme for character's card:";
    this.buttonManager.onSetScheme();
  }

  onNewSession() {
    this.modalTitle= "Create new session:";
    this.buttonManager.onNewSession();
  }

  onShowPlayers() {
    this.modalTitle= "Registered players:";
    this.buttonManager.onShowPlayers();
  }

  onSetCard() {
    this.modalTitle= "Set your character's card:";
    this.buttonManager.onSetCard();
  }

  onShowSessions() {
    this.modalTitle= "Game sessions:";
    this.buttonManager.onShowSessions();
  }
}