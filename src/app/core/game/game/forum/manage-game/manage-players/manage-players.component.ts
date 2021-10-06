import { Component, Input, OnInit } from '@angular/core';
import { PersonalDataListModel } from 'src/app/core/models/personaldata.model';
import { faCheck, faTimes, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GameToPersonCreateModel, GameToPersonListModel } from 'src/app/core/models/game-to-person.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.sass']
})
export class ManagePlayersComponent implements OnInit {
  @Input() isLoading: boolean;
  @Input() iAmGameMaster: boolean;
  @Input() gameId: number;
  @Input() acceptedPlayersCards: GameToPersonListModel[];
  @Input() waitingSelfRequested: GameToPersonListModel[];
  @Input() waitingInvited: GameToPersonListModel[];
  @Input() friendsList: PersonalDataListModel[];

  faCheck = faCheck;
  faTimes = faTimes;
  faSpinner = faSpinner;
  faPlus = faPlus;

  constructor(private _api: ApiService) { }

  ngOnInit() { }

  onThrowPlayer(relationId: number) {
    this._api.deleteGameToPerson(relationId).subscribe(data => {
      if (data.success) {
        window.location.reload();
      }
    });
  }

  onAcceptRequest(index: number) {
    this._api.acceptJoinGame(this.waitingSelfRequested[index].card).subscribe(data => {
      if (data.success) {
        window.location.reload();
      }
    });
  }

  onDeclineRequest(requestId: number) {
    this._api.deleteGameToPerson(requestId).subscribe(data => {
      if (data.success) {
        window.location.reload();
      }
    });
  }

  onInviteFriend(playerId: number) {
    let invitation = new GameToPersonCreateModel(this.gameId, playerId, false, false, false, 10);
    this._api.joinGame(invitation).subscribe(data => {
      if (data.success) {
        window.location.reload();
      }
    });
  }
}
