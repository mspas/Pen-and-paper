import { Component, OnInit, Input } from '@angular/core';
import { ForumModel, TopicListModel } from '../../models/forum.model';
import { GameAppModel } from '../../models/game.model';
import { TopicToPersonModel } from '../../models/topic-to-person.model';
import { PersonalDataModel } from '../../models/personaldata.model';

@Component({
  selector: 'app-game-forum',
  templateUrl: './game-forum.component.html',
  styleUrls: ['./game-forum.component.css', '../game-overview.component.css']
})
export class GameForumComponent implements OnInit {

  @Input() forumData: ForumModel;
  @Input() gameData: GameAppModel;
  @Input() topicToPersonData: TopicToPersonModel[];
  @Input() profileData: PersonalDataModel;
  
  topicGeneralList: TopicListModel[] = [];
  topicGameList: TopicListModel[] = [];
  topicSupportList: TopicListModel[] = [];
  topicOfftopList: TopicListModel[] = [];

  constructor() { }

  ngOnInit() {
    this.forumData.topics.forEach(topic => {
      let topicListModel = new TopicListModel(topic, null, true, null, topic.messages[this.forumData.topics[0].messagesAmount-1].sendDdate);
      this.gameData.participantsProfiles.forEach(user => {
        if (user.id == topic.authorId) 
          topicListModel.author = user;
      });
      this.topicToPersonData.forEach(t2p => {
        if (t2p.lastActivitySeen <= topic.lastActivityDate)
          topicListModel.wasSeen = false;
      });

      this.gameData.participantsProfiles.forEach(user => {
        if (user.id == topic.messages[topic.messagesAmount-1].senderId)
          topicListModel.lastAuthor = user;
      });

      if (topic.category == "General")
        this.topicGeneralList.push(topicListModel);
      if (topic.category == "Game")
        this.topicGameList.push(topicListModel);
      if (topic.category == "Support")
        this.topicSupportList.push(topicListModel);
      if (topic.category == "Off-topic")
        this.topicOfftopList.push(topicListModel);
    });
  }
}
