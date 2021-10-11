import { Component, OnInit, Input } from "@angular/core";
import { faStar, faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
  @Input("userGamesList") userGamesList: GameToPersonAppModel[];
  @Input("isMyProfileFlag") isMyProfileFlag: boolean;
  @Input("isLoading") isLoading: boolean;

  faSpinner = faSpinner;
  faStar = faStar;
  faCheck = faCheck;
  faTimes = faTimes;

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
    this.userGamesList.forEach((element) => {
      let g2p = this.filterPlayers(element);

      if (g2p.isAccepted) this.gamesAccepted.push(g2p);
      if (!g2p.isAccepted && !g2p.isMadeByPlayer)
        this.invitations.push(g2p);
    });
  }

  filterPlayers(g2p: GameToPersonAppModel) {
    for (let i = 0; i < g2p.game.participants.length; i++) {
      const element = g2p.game.participants[i];
      if (!element.isAccepted)
        g2p.game.participants.splice(i, 1);
    }
    return g2p;
  }

  onAcceptRequest(inviteId: number) {
    this.invitations.forEach((invite) => {
      if (invite.id == inviteId) { 
        invite.isAccepted = true;
        this._api.acceptJoinGame(invite).subscribe(data => {
          if (data.success) window.location.reload();
        });
      }
    });
  }

  onDeclineRequest(inviteId: number) {
    this.invitations.forEach((invite) => {
      if (invite.id == inviteId) 
        this._api.deleteGameToPerson(invite.id).subscribe(data => {
          if (data.success) window.location.reload();
        });
    });
  }
}
