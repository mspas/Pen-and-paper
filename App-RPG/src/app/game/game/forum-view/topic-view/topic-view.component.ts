import { Component, OnInit, Input } from '@angular/core';
import { ForumModel, TopicModel } from '../../../../models/forum.model';
import { GameAppModel } from '../../../../models/game.model';
import { TopicToPersonModel } from '../../../../models/topic-to-person.model';
import { PersonalDataModel } from '../../../../models/personaldata.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css', '../forum-view.component.css']
})
export class TopicViewComponent implements OnInit {
  
  @Input() forumData: ForumModel;
  @Input() gameData: GameAppModel;
  @Input() topicToPersonData: TopicToPersonModel[];
  @Input() profileData: PersonalDataModel;
  @Input() topicData: TopicModel;
  
  pageParam: number;
  replyParam: string;
  replyPage: boolean = false;

  participants: PersonalDataModel[];
  iAmGameMaster: boolean = false;
  linkPrevious: string;
  linkNext: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    var page = this.route.snapshot.params.page;
    if (page)
      this.pageParam = parseInt(page);
    if (page == "reply")
      this.replyPage = true; 

    console.log(this.replyPage);

    if (this.gameData.masterId == this.profileData.id)
    this.iAmGameMaster = true;

    this.participants = this.gameData.participantsProfiles;

    this.linkPrevious = "game/" + this.gameData.id.toString() + "/" + this.topicData.id.toString() + "/";
    let numPage = this.pageParam - 1;
    if (numPage < 1) 
      numPage = 1;
    this.linkPrevious += numPage.toString() + "/view";    
    
    this.linkNext = "game/" + this.gameData.id.toString() + "/" + this.topicData.id.toString() + "/";
    numPage = this.pageParam + 1;
    if (numPage > this.topicData.totalPages) 
      numPage = this.topicData.totalPages;
    this.linkNext += numPage.toString() + "/view";    
  }

}
