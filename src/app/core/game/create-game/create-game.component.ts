import { ApiService } from "../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { GameCreateModel } from "../../models/game.model";
import { Router } from "@angular/router";
import { DataService } from "../../services/data.service";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-create-game",
  templateUrl: "./create-game.component.html",
  styleUrls: ["./create-game.component.sass"]
})
export class CreateGameComponent implements OnInit {
  //@ViewChild("fileInput") fileInput: ElementRef;
  gameCategories: string[];
  needInvite: boolean = false;
  hotJoin: boolean = false;
  
  faSpinner = faSpinner;

  isLoading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string;

  constructor(
    private router: Router,
    private _api: ApiService,
    private _data: DataService
  ) {}

  ngOnInit() {
    this.gameCategories = this._data.getGameCategories();
  }

  onBoxInvite(value: boolean) {
    this.needInvite = value;
  }
  onBoxHotJoin(value: boolean) {
    this.hotJoin = value;
  }

  validateInput(form: NgForm) {
    if (!form.value.gameTitle || !form.value.genre || !form.value.maxPlayers || !form.value.date || !form.value.description) return false;
    return true;
  }

  async onCreate(form: NgForm) {
    let validateInput = this.validateInput(form);
    if (!validateInput) {
      this.showAlert = true;
      this.alertMessage = "Fill all of the required input fields!"
      return validateInput;
    }
    else {
      this.showAlert = false;
      this.alertMessage = ""
    }

    let newGame = new GameCreateModel(
      parseInt(localStorage.getItem("id")),
      form.value.gameTitle,
      form.value.genre,
      0,
      parseInt(form.value.maxPlayers),
      form.value.description,
      form.value.book,
      form.value.comment,
      form.value.date,
      !this.needInvite,
      this.hotJoin,
      "Active",
      null,
      "bgdefault.png"
    );

    this.isLoading = true;

    this._api.createGame(newGame).subscribe(data => {
      this.isLoading = false;
      this.alertMessage = "";
      this.showAlert = false;
      if (data.success) this.router.navigate(["game"], { queryParams: { gameId: data.game.id } });
      else {
        this.alertMessage = "Error!";
        this.showAlert = true;
      }
    });

    /*var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this._api.uploadPhoto(false, this.newGameId, false, nativeElement.files[0]);*/
  }
}