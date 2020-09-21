import { Component, OnInit, Input } from "@angular/core";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { GameToPersonAppModel } from "src/app/core/models/game-to-person.model";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";

@Component({
  selector: "app-profile-games",
  templateUrl: "./profile-games.component.html",
  styleUrls: ["./profile-games.component.sass"],
})
export class ProfileGamesComponent implements OnInit {
  @Input("userGamesList") userGamesAPPList: GameToPersonAppModel[];
  @Input("isMyProfileFlag") isMyProfileFlag: boolean;
  @Input("isLoading") isLoading: boolean;

  data: any;
  profileData: PersonalDataModel;
  gamesAccepted: GameToPersonAppModel[] = [];
  invitations: GameToPersonAppModel[] = [];
  participantsCount: number;

  constructor(private route: ActivatedRoute, private _api: ApiService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.isLoading) this.sortGames();
  }

  sortGames() {
    this.gamesAccepted = [];
    this.userGamesAPPList.forEach((element) => {
      if (element.isAccepted) this.gamesAccepted.push(element);
      if (!element.isAccepted && !element.isMadeByPlayer)
        this.invitations.push(element);
    });
  }

  onAcceptRequest(inviteId: number) {
    this.invitations.forEach((invite) => {
      if (invite.id == inviteId) this._api.acceptJoinGame(invite);
    });
  }

  onDeclineRequest(inviteId: number) {
    this.invitations.forEach((invite) => {
      if (invite.id == inviteId) this._api.declineJoinGame(invite.id);
    });
  }
}
