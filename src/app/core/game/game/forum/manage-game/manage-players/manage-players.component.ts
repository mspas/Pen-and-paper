import { Component, Input, OnInit } from '@angular/core';
import { PersonalDataListModel } from 'src/app/core/models/personaldata.model';
import { faCheck, faTimes, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GameToPersonListModel } from 'src/app/core/models/game-to-person.model';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.sass']
})
export class ManagePlayersComponent implements OnInit {
  @Input() isLoading: boolean;
  @Input() acceptedPlayers: PersonalDataListModel[];
  @Input() waitingSelfRequested: GameToPersonListModel[];
  @Input() waitingInvited: GameToPersonListModel[];
  @Input() friendsList: PersonalDataListModel[];

  faCheck = faCheck;
  faTimes = faTimes;
  faSpinner = faSpinner;
  faPlus = faPlus;

  constructor() { }

  ngOnInit() { }

  onAcceptRequest(requestId: number) {
  }

  onDeclineRequest(requestId: number) {
  }

  onInviteFriend(playerId: number) {
  }
}
