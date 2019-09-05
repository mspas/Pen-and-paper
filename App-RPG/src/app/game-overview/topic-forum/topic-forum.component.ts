import { Component, OnInit } from '@angular/core';
import { TopicModel, ForumModel, MessageForumModel } from '../../models/forum.model';
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
  participants: PersonalDataModel[];
  iAmGameMaster: boolean = false;
  page: number;
  linkPrevious: string;
  linkNext: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subpage = this.route.snapshot.params.subpage;
    this.page = parseInt(this.route.snapshot.params.page);
    
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.data = profiledata.profiledata;
    });

    let profile = this.data[0];
    this.profileData = profile.pop();
    this.forumData = this.data[1];
    this.topicData = this.data[2];
    this.topicToPersonData = this.data[3];
    this.gameData = this.data[4].pop();

    if (this.gameData.masterId == this.profileData.id)
      this.iAmGameMaster = true;

    this.participants = this.gameData.participants;

    this.linkPrevious = "game/" + this.gameData.id.toString() + "/" + this.topicData.id.toString() + "/";
    let numPage = this.page - 1;
    if (numPage < 1) 
      numPage = 1;
    this.linkPrevious += numPage.toString() + "/view";    
    
    this.linkNext = "game/" + this.gameData.id.toString() + "/" + this.topicData.id.toString() + "/";
    numPage = this.page + 1;
    if (numPage > this.topicData.totalPages) 
      numPage = this.topicData.totalPages;
    this.linkNext += numPage.toString() + "/view";    
  }

}
