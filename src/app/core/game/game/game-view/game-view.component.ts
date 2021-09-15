import { Component, OnInit, Input } from "@angular/core";
import {
  PersonalDataModel,
  PersonalDataListModel,
} from "src/app/core/models/personaldata.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { GameSessionCreateModel } from "src/app/core/models/gamesession.model";
import { ApiService } from "src/app/core/services/api.service";
import { GameToPersonCreateModel } from "src/app/core/models/game-to-person.model";
import { NgForm } from "@angular/forms";
import { SkillCreateModel } from "src/app/core/models/skill.model";
import { ButtonManager } from "../../button-manager";

@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.component.html",
  styleUrls: ["./game-view.component.sass"],
})
export class GameViewComponent implements OnInit {
  @Input() profileData: PersonalDataModel;
  @Input() gameData: GameAppModel;
  @Input() gameMaster: PersonalDataModel;
  @Input() iAmGameMaster: boolean;
  @Input() showGameViewContent: boolean;
  @Input() acceptedPlayers: PersonalDataListModel[];
  @Input() waitingSelfRequested: PersonalDataListModel[];
  @Input() waitingInvited: PersonalDataListModel[];

  gameImageAssets = new Map([
    ["Mafia", "assets/mafia1.png"],
    ["Fantasy", "assets/fantasy1.png"],
    ["SciFi", "assets/scifi.png"]
  ])
  imageUrl: string = "";

  imageToShow: any;
  isImageLoading: boolean;
  data: any;

  buttonManager: ButtonManager;
  hotJoinString: string = "No";
  needInviteString: string = "No";
  info: string = "Join game";
  iAmParticipant: boolean = false;
  isNewRequest: boolean = false;
  myCardId: number;
  newSkillsNames: string[] = [];
  newGameSessions: GameSessionCreateModel[] = [];
  isNewInvited: boolean = false;
  subpage: string;

  showModalFlag: boolean = false;
  modalTitle: string;

  constructor(
    private _api: ApiService,
  ) {}

  ngOnInit() {
    this.buttonManager = new ButtonManager();
    
    this.prepareGameConstantDetails(this.gameData);

    this.gameData.participantsProfiles.forEach((player) => {
      if (this.gameData.masterId == player.id) this.gameMaster = player;
      if (this.profileData.id == player.id && !this.iAmGameMaster) {
        this.gameData.participants.forEach((card) => {
          if (this.profileData.id == card.playerId) {
            if (card.isAccepted) {
              this.iAmParticipant = true;
              this.myCardId = card.id;
            } else {
              this.iAmParticipant = false;
              this.info = "Your request is waiting...";
            }
          }
        });
      }
    });

    this.setNotificationFlags();
  }

  ngOnChanges() {
    this.setNotificationFlags();
    this.getProfileImages();
  }

  getProfileImages() {
    if (
      this.gameMaster.photoName != null &&
      this.gameMaster.photoName != "" &&
      this.gameMaster.photoName != "unknown.png"
    ) {
      this._api.getImage(this.gameMaster.photoName).subscribe(
        (data) => {
          this.createImageFromBlob(data, -1);
          this.isImageLoading = false;
        },
        (error) => {
          this.isImageLoading = false;
          console.log(error);
        }
      );
    }
    
    this.acceptedPlayers.forEach((element) => {
      if (
        element.data.photoName != null &&
        element.data.photoName != "" &&
        element.data.photoName != "unknown.png"
      ) {
        this._api.getImage(element.data.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(
              data,
              this.acceptedPlayers.indexOf(element)
            );
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      }
    });
  }

  createImageFromBlob(image: Blob, i: number) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (i != -1) this.acceptedPlayers[i].photo = reader.result;
        else this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  setGamePicture(category) {
    this.imageUrl = this.gameImageAssets[category] ? this.gameImageAssets[category] : this.gameImageAssets.get("Fantasy");
  }

  setNotificationFlags() {
    if (this.waitingSelfRequested.length > 0) this.isNewRequest = true;
    if (this.waitingInvited.length > 0) this.isNewInvited = true;
  }

  prepareGameConstantDetails(gameData) {
    this.setGamePicture(gameData.category);

    if (gameData.hotJoin) this.hotJoinString = "Yes";
    if (gameData.needInvite) this.needInviteString = "Yes";
  }

  
  showModal(value: boolean, title: string) {
    this.showModalFlag = value;
    this.modalTitle = title;
  }

  closeModal(value: boolean) {
    this.showModal(value, "");
  }

  onJoin() {
    let newConnection = new GameToPersonCreateModel(
      this.gameData.id,
      this.profileData.id,
      false,
      !this.gameData.needInvite,
      true,
      10
    );
    this._api.joinGame(newConnection);
    window.location.reload();
  }

  onLeave() {
    this._api.declineJoinGame(this.myCardId);
    window.location.reload();
  }

  onAcceptRequest(playerId: number) {
    this.gameData.participants.forEach((card) => {
      if (card.playerId == playerId) this._api.acceptJoinGame(card);
    });
  }

  onDeclineRequest(playerId: number) {
    this.gameData.participants.forEach((card) => {
      if (card.playerId == playerId) this._api.declineJoinGame(card.id);
    });
  }

  onAddSkill(form: NgForm) {
    if (this.newSkillsNames == null) this.newSkillsNames = [];
    this.newSkillsNames.push(form.value.skill);
    form.reset();
  }

  onRemoveNewSkill(index: number) {
    this.newSkillsNames.splice(index, 1);
  }

  onRemoveSkill(id: number, index: number) {
    let elemId = "skill" + index.toString();
    document.getElementById(elemId).removeAttribute("class");
    document.getElementById(elemId).setAttribute("class", "sr-only");

    let cross = "cross" + index.toString();
    document.getElementById(cross).removeAttribute("class");
    document.getElementById(cross).setAttribute("class", "sr-only");

    this._api.deleteSkill(id);
  }

  onAddSession(form: NgForm) {
    if (this.newGameSessions == null) this.newGameSessions = [];
    this.newGameSessions.push(
      new GameSessionCreateModel(
        form.value.stitle,
        form.value.date,
        this.gameData.id
      )
    );
    form.reset();
  }

  onRemoveNewSession(index: number) {
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

  kickPlayer() {}

  showCard() {}

  setCard() {}

  onSaveChanges() {
    if (this.buttonManager.gameSettings && this.newSkillsNames != null) {
      this.newSkillsNames.forEach((skillName) => {
        this._api.addSkill(new SkillCreateModel(skillName, this.gameData.id));
      });
    }

    if (this.buttonManager.userAccess && this.newGameSessions != null) {
      this.newGameSessions.forEach((session) => {
        this._api.addSession(
          new GameSessionCreateModel(
            session.sessionName,
            session.date,
            this.gameData.id
          )
        );
      });
    }

    this.newSkillsNames = null;
    this.newGameSessions = null;
  }
}
