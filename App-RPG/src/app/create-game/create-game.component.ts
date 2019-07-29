import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { GameCreateModel } from '../models/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})

export class CreateGameComponent implements OnInit {

  gameCategories: string[] = ["Fantasy", "Sci-fi", "Mafia"];
  numberOfPlayers: number[] = [1,2,3,4,5,6,7,8,9,10];
  info: string = "Set character card sheet";
  dismissBtn: string = "Save";
  wasSaved: boolean = false;
  wasConfirmed: boolean = false;
  needInvite: boolean = false;
  races: string[] = [];
  skills: string[] = [];

  constructor(private router: Router, private _api: ApiService) {  }

  ngOnInit() {
  }

  onBox(value: boolean) {
    this.needInvite = value;
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

  onCreate(form: NgForm) {
    console.log(form.value.genre);
    let newGame = new GameCreateModel(
      parseInt(localStorage.getItem("id")),
      form.value.title,
      form.value.genre,
      0,
      parseInt(form.value.nofplayers),
      form.value.description,
      form.value.location,
      form.value.book,
      form.value.comment,
      form.value.date,
      this.needInvite,
      true
    );
    this._api.createGameDB(newGame);
  }

}

export class FormModel {
  constructor(public name: string, public value: string) {}
}
