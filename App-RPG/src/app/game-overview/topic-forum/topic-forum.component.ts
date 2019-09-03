import { Component, OnInit } from '@angular/core';
import { TopicModel, ForumModel } from '../../models/forum.model';
import { TopicToPersonModel } from '../../models/topic-to-person.model';
import { PersonalDataModel } from '../../models/personaldata.model';
import { ActivatedRoute } from '@angular/router';
import { GameAppModel } from '../../models/game.model';

@Component({
  selector: 'app-topic-forum',
  templateUrl: './topic-forum.component.html',
  styleUrls: ['./topic-forum.component.css', '../game-overview.component.css']
})
export class TopicForumComponent implements OnInit {

  data: any[];
  gameData: GameAppModel;
  forumData: ForumModel;
  topicData: TopicModel;
  topicToPersonData: TopicToPersonModel[];
  profileData: PersonalDataModel;
  subpage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subpage = this.route.snapshot.params.subpage;
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let profile = this.data[0];
    this.profileData = profile.pop();
    this.forumData = this.data[1];
    this.topicData = this.data[2];
    this.topicToPersonData = this.data[3];
    this.gameData = this.data[4].pop();

    console.log(JSON.stringify(this.gameData));

    //dane są, dziś marcin-frontend
  }

}
