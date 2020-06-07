import { Component, OnInit, Input } from "@angular/core";
import { FriendModel, FriendListModel } from "src/app/core/models/friend.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";

@Component({
  selector: "app-my-friends",
  templateUrl: "./my-friends.component.html",
  styleUrls: ["./my-friends.component.sass"],
})
export class MyFriendsComponent implements OnInit {
  @Input("myFriends") myFriends: FriendModel[] = [];
  isImageLoading: boolean;
  friendsAccepted: PersonalDataModel[] = [];
  friendsAcceptedNoPhoto: PersonalDataModel[] = [];
  friendsAcceptedPhoto: FriendListModel[] = [];

  constructor() {}

  ngOnInit() {}
}
