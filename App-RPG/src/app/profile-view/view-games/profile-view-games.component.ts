import { GameToPersonAppModel } from '../../models/game-to-person.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalDataModel } from '../../models/personaldata.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-view-games',
  templateUrl: './profile-view-games.component.html',
  styleUrls: ['./profile-view-games.component.css']
})
export class ProfileViewGamesComponent implements OnInit {

  
  data: any;
  profileData: PersonalDataModel;
  @Input("myGamesAPPList") myGamesAPPList: GameToPersonAppModel[];
  @Input("userGamesAPPList") userGamesAPPList: GameToPersonAppModel[];
  @Input("myProfilePage") myProfilePage: boolean;
  gamesAccepted: GameToPersonAppModel[] = [];
  invitations: GameToPersonAppModel[] = [];
  participantsCount: number;
  
  constructor(private route: ActivatedRoute, private _api: ApiService) { }

  ngOnInit() {
    /*this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let profile = this.data[0];
    this.profileData = profile.pop();
    this.gamesAPPList = this.data[1];*/

    this.userGamesAPPList.forEach(element => {
      if (element.isAccepted) 
        this.gamesAccepted.push(element);
      if (!element.isAccepted && !element.isMadeByPlayer)
        this.invitations.push(element);
    });
  }

  onAcceptRequest(inviteId: number) {
    this.invitations.forEach(invite => {
      if (invite.id == inviteId) 
        this._api.acceptJoinGame(invite);
    });
  }

  onDeclineRequest(inviteId: number) {
    this.invitations.forEach(invite => {
      if (invite.id == inviteId)
        this._api.declineJoinGame(invite.id);
    });
  }

}
