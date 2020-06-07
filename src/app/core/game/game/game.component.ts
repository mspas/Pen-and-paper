import { Component, OnInit } from "@angular/core";
import {
  ForumModel,
  TopicModel,
  TopicListModel,
} from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.sass"],
})
export class GameComponent implements OnInit {
  data: any[];
  forumData: ForumModel;
  gameData: GameAppModel;
  topicToPersonData: TopicToPersonModel[];
  profileData: PersonalDataModel;
  gameMaster: PersonalDataModel;
  topicData: TopicModel;
  game: { data: GameAppModel; photo: any };

  iAmGameParticipant: boolean = false;
  iAmGameMaster: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    var topicId = this.route.snapshot.params.topicId;

    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let profile = this.data[0];
    this.profileData = profile.pop();
    this.forumData = this.data[1];
    let gameList = this.data[2];
    this.gameData = gameList.pop();
    this.topicToPersonData = this.data[3];
    if (topicId) {
      this.topicData = this.data[4];
    }

    this.forumData.topics.forEach((topic) => {
      let topicListModel = new TopicListModel(
        topic,
        null,
        true,
        null,
        topic.messages[this.forumData.topics[0].messagesAmount - 1].sendDdate
      );
      this.gameData.participantsProfiles.forEach((user) => {
        if (user.id == topic.authorId) topicListModel.author = user;
      });
      this.topicToPersonData.forEach((t2p) => {
        if (
          t2p.lastActivitySeen < topic.lastActivityDate ||
          t2p.lastActivitySeen == null
        )
          topicListModel.wasSeen = false;
      });

      this.gameData.participantsProfiles.forEach((user) => {
        if (user.id == this.profileData.id) this.iAmGameParticipant = true;
        if (user.id == this.gameData.gameMaster.id) this.gameMaster = user;
        if (user.id == topic.messages[topic.messagesAmount - 1].senderId)
          topicListModel.lastAuthor = user;
      });

      if (this.gameData.masterId == this.profileData.id)
        this.iAmGameMaster = true;
    });
  }
}
