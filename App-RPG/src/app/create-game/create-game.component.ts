import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { GameCreateModel } from '../models/game.model';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})

export class CreateGameComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  gameCategories: string[] = ["Fantasy", "Sci-fi", "Mafia", "Cyberpunk", "Steampunk", "Post-Apo", "Zombie" ,"Alternative-history", "Other"];
  numberOfPlayers: number[] = [1,2,3,4,5,6,7,8,9,10];
  info: string = "Set character card sheet";
  dismissBtn: string = "Save";
  wasSaved: boolean = false;
  wasConfirmed: boolean = false;
  needInvite: boolean = false;
  hotJoin: boolean = false;
  races: string[] = [];
  skills: string[] = [];

  newGameId: number;

  constructor(private router: Router, private _api: ApiService, private _data: DataService) {  }

  ngOnInit() {
  }

  onBox(value: boolean) {
    this.needInvite = value;
  }
  onBoxHotJoin(value: boolean) {
    this.hotJoin = value;
  }

  needInvitation() {
    return this.wasSaved;
  }

  onConfirmNumbers(form: NgForm) {
    this.wasConfirmed = true;

    for (let i = 0; i < form.value.nofraces; i++) {
      this.races[i] = "";
    }
    for (let i = 0; i < form.value.nofskills; i++) {
      this.skills[i] = "";
    }
  }

  onSaveCard(form: NgForm) {
    this.info = "Setting was saved!";
    document.getElementById("button4box").setAttribute("class", "btn btn-success btn-lg active");
    this.wasSaved = true;
  }

   async onCreate(form: NgForm) {
    let newGame = new GameCreateModel(
      parseInt(localStorage.getItem("id")),
      form.value.gametitle,
      form.value.genre,
      0,
      parseInt(form.value.nofplayers),
      form.value.description,
      form.value.book,
      form.value.comment,
      form.value.date,
      this.needInvite,
      this.hotJoin,
      "Active",
      form.value.genre + ".png",
      "bgdefault.png"
    );
    this._api.createGameDB(newGame);
    await this.delay(500);
    this._data.currentNewGameId.subscribe(data => this.newGameId = data);

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this._api.uploadPhoto(false,this.newGameId, false, nativeElement.files[0]);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}


export class FormModel {
  constructor(public name: string, public value: string) {}
}
