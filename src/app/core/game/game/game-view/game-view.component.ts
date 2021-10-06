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
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.component.html",
  styleUrls: ["./game-view.component.sass"],
})
export class GameViewComponent implements OnInit {
  @Input() profileData: PersonalDataModel;
  @Input() gameData: GameAppModel;
  @Input() gameMaster: PersonalDataListModel;
  @Input() iAmGameMaster: boolean;
  @Input() showGameViewContent: boolean;
  @Input() acceptedPlayers: PersonalDataListModel[];
  @Input() waitingSelfRequested: PersonalDataListModel[];
  @Input() waitingInvited: PersonalDataListModel[];

  gameImageAssets = new Map()
  imageUrl: string = "";
  gameCategories: any[] = [];

  gameMasterImage: any;
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
    private _data: DataService
  ) {}

  ngOnInit() {
    let categories = this._data.getGameCategories();
    categories.forEach(category => {
      this.gameImageAssets.set(category.name, category.urlImage);
    });

    this.buttonManager = new ButtonManager();
    
    this.prepareGameConstantDetails(this.gameData);

    this.gameData.participantsProfiles.forEach((player) => {
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
  }

  blobToImage = (blob: Blob): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
      let reader = new FileReader();
      let dataURI;
      reader.addEventListener(
        "load",
        () => {
          dataURI = reader.result;
          const img = document.createElement("img");
          img.src = dataURI;
          resolve(img);
        },
        false
      );
      if (blob) {
        reader.readAsDataURL(blob);
      }
    })
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
    this._api.joinGame(newConnection).subscribe(data => {
      if (data.success) window.location.reload();
    });
  }

  onAcceptRequest(playerId: number) {
    this.gameData.participants.forEach((card) => {
      if (card.playerId == playerId) 
        this._api.acceptJoinGame(card).subscribe(data => {
          if (data.success) window.location.reload();
        });
    });
  }

  onDeclineRequest(playerId: number) {
    this.gameData.participants.forEach((card) => {
      if (card.playerId == playerId) 
        this._api.deleteGameToPerson(card.id).subscribe(data => {
          if (data.success) window.location.reload();
        });
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
