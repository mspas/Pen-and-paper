import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumModel, TopicListModel } from '../models/forum.model';
import { GameAppModel } from '../models/game.model';
import { PersonalDataModel } from '../models/personaldata.model';
import { TopicToPersonModel } from '../models/topic-to-person.model';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {

  data: any[];
  forumData: ForumModel;
  gameData: GameAppModel;
  topicToPersonData: TopicToPersonModel[];
  profileData: PersonalDataModel;

  topicGeneralList: TopicListModel[] = [];
  topicGameList: TopicListModel[] = [];
  topicSupportList: TopicListModel[] = [];
  topicOfftopList: TopicListModel[] = [];
  subpage: string;
  iAmGameMaster: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subpage = this.route.snapshot.params.subpage;
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let profile = this.data[0];
    this.profileData = profile.pop();
    this.forumData = this.data[1];
    let gameList = this.data[2];
    this.gameData = gameList.pop();
    this.topicToPersonData = this.data[3];

    this.forumData.topics.forEach(topic => {
      let topicListModel = new TopicListModel(topic, null, true, null, topic.messages[this.forumData.topics[0].messagesAmount-1].sendDdate);
      this.gameData.participants.forEach(user => {
        if (user.id == topic.authorId) 
          topicListModel.author = user;
      });
      this.topicToPersonData.forEach(t2p => {
        if (t2p.lastActivitySeen < topic.lastActivityDate || t2p.lastActivitySeen == null)
          topicListModel.wasSeen = false;
      });

      this.gameData.participants.forEach(user => {
        if (user.id == topic.messages[topic.messagesAmount-1].senderId)
          topicListModel.lastAuthor = user;
      });

      if (topic.category == "general")
        this.topicGeneralList.push(topicListModel);
      if (topic.category == "game")
        this.topicGameList.push(topicListModel);
      if (topic.category == "support")
        this.topicSupportList.push(topicListModel);
      if (topic.category == "offtop")
        this.topicOfftopList.push(topicListModel);
    });

    if (this.gameData.masterId == this.profileData.id)
      this.iAmGameMaster = true;

}
