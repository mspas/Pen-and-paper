import { Component, OnInit } from '@angular/core';
import { ForumModel, TopicListModel } from '../../models/forum.model';
import { GameAppModel } from '../../models/game.model';
import { TopicToPersonModel } from '../../models/topic-to-person.model';
import { PersonalDataModel } from '../../models/personaldata.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  data: any[];
  forumData: ForumModel;
  gameData: GameAppModel;
  topicToPersonData: TopicToPersonModel[];
  profileData: PersonalDataModel;
  gameMaster: PersonalDataModel;
  subpage: string;

  topicGeneralList: TopicListModel[] = [];
  topicGameList: TopicListModel[] = [];
  topicSupportList: TopicListModel[] = [];
  topicOfftopList: TopicListModel[] = [];
  iAmGameParticipant: boolean = false;
  iAmGameMaster: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //this.subpage = this.route.snapshot.params.subpage;
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
      this.gameData.participantsProfiles.forEach(user => {
        if (user.id == topic.authorId) 
          topicListModel.author = user;
      });
      this.topicToPersonData.forEach(t2p => {
        if (t2p.lastActivitySeen < topic.lastActivityDate || t2p.lastActivitySeen == null)
          topicListModel.wasSeen = false;
      });

      this.gameData.participantsProfiles.forEach(user => {
        if (user.id == this.profileData.id)
          this.iAmGameParticipant = true;
        if (user.id == this.gameData.gameMaster.id)
          this.gameMaster = user;
        if (user.id == topic.messages[topic.messagesAmount-1].senderId)
          topicListModel.lastAuthor = user;
      });

      if (this.gameData.masterId == this.profileData.id)
        this.iAmGameMaster = true;

      if (topic.category == "general")
        this.topicGeneralList.push(topicListModel);
      if (topic.category == "game")
        this.topicGameList.push(topicListModel);
      if (topic.category == "support")
        this.topicSupportList.push(topicListModel);
      if (topic.category == "offtop")
        this.topicOfftopList.push(topicListModel);
    });
  }
}
