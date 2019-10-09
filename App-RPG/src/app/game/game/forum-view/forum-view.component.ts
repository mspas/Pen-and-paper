import { Component, OnInit, Input } from '@angular/core';
import { ForumModel, TopicListModel, TopicModel } from '../../../models/forum.model';
import { GameAppModel } from '../../../models/game.model';
import { TopicToPersonModel } from '../../../models/topic-to-person.model';
import { PersonalDataModel } from '../../../models/personaldata.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-forum-view',
  templateUrl: './forum-view.component.html',
  styleUrls: ['./forum-view.component.css']
})
export class ForumViewComponent implements OnInit {

  @Input() forumData: ForumModel;
  @Input() gameData: GameAppModel;
  @Input() topicToPersonData: TopicToPersonModel[];
  @Input() profileData: PersonalDataModel;
  @Input() topicData: TopicModel;

  topicIdParam: number = null;

  topicGeneralList: TopicListModel[] = [];
  topicGameList: TopicListModel[] = [];
  topicSupportList: TopicListModel[] = [];
  topicOfftopList: TopicListModel[] = [];
  iAmGameMaster: boolean = false;

  showCreateTopic: boolean = false;
  showTopicList: boolean = false;
  
  constructor(private route: ActivatedRoute, private _api: ApiService) { }

  ngOnInit() {
    var topicId = this.route.snapshot.params.topicId;
    if (topicId) {
      this.topicIdParam = parseInt(topicId);
    }
    else 
      this.showTopicList = true;

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

  onCreateTopic() {
    this.showCreateTopic = true;
    this.showTopicList = false;
  }

  closeCreateTopic(check) {
    if (check == "false") {
      this.showCreateTopic = false;
      this.showTopicList = true;
    }
  }
}
