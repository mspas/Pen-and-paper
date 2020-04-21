import { Component, OnInit, Input } from "@angular/core";
import { ForumModel, TopicListModel } from "src/app/models/forum.model";
import { GameAppModel } from "src/app/models/game.model";
import { TopicToPersonModel } from "src/app/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/models/personaldata.model";

@Component({
  selector: "app-topic-list",
  templateUrl: "./topic-list.component.html",
  styleUrls: ["./topic-list.component.sass"]
})
export class TopicListComponent implements OnInit {
  @Input() forumData: ForumModel;
  @Input() gameData: GameAppModel;
  @Input() topicToPersonData: TopicToPersonModel[];
  @Input() profileData: PersonalDataModel;

  topicGeneralList: TopicListModel[] = [];
  topicGameList: TopicListModel[] = [];
  topicSupportList: TopicListModel[] = [];
  topicOfftopList: TopicListModel[] = [];

  constructor() {}

  ngOnInit() {
    this.forumData.topics.forEach(topic => {
      let topicListModel = new TopicListModel(
        topic,
        null,
        true,
        null,
        topic.messages[this.forumData.topics[0].messagesAmount - 1].sendDdate
      );
      this.gameData.participantsProfiles.forEach(user => {
        if (user.id == topic.authorId) topicListModel.author = user;
      });
      this.topicToPersonData.forEach(t2p => {
        if (t2p.lastActivitySeen <= topic.lastActivityDate)
          topicListModel.wasSeen = false;
      });

      this.gameData.participantsProfiles.forEach(user => {
        if (user.id == topic.messages[topic.messagesAmount - 1].senderId)
          topicListModel.lastAuthor = user;
      });

      if (topic.category == "General")
        this.topicGeneralList.push(topicListModel);
      if (topic.category == "Game") this.topicGameList.push(topicListModel);
      if (topic.category == "Support")
        this.topicSupportList.push(topicListModel);
      if (topic.category == "Off-topic")
        this.topicOfftopList.push(topicListModel);
    });
  }
}
