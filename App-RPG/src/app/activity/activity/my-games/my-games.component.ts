import { Component, OnInit, Input } from "@angular/core";
import { GameToPersonAppModel } from "src/app/models/game-to-person.model";

@Component({
  selector: "app-my-games",
  templateUrl: "./my-games.component.html",
  styleUrls: ["./my-games.component.sass"],
})
export class MyGamesComponent implements OnInit {
  @Input("myGamesAPPList") myGamesAPPList: GameToPersonAppModel[] = [];

  constructor() {}

  ngOnInit() {}
}
