import { Component, OnInit, Input } from "@angular/core";
import { ForumModel, TopicModel } from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-topic",
  templateUrl: "./topic.component.html",
  styleUrls: ["./topic.component.sass", "../forum.component.sass"],
})
export class TopicComponent implements OnInit {
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    var page = this.route.snapshot.params.page;
    if (page) this.pageParam = parseInt(page);
    if (page == "reply") this.replyPage = true;

    console.log(this.replyPage);

    if (this.gameData.masterId == this.profileData.id)
      this.iAmGameMaster = true;

    this.participants = this.gameData.participantsProfiles;

    let link = `game/${this.gameData.id}/${this.topicData.id}/`;

    let numPage = this.pageParam - 1;
    if (numPage < 1) numPage = 1;
    this.linkPrevious = `${link}/${numPage}/view`;

    numPage = this.pageParam + 1;
    if (numPage > this.topicData.totalPages)
      numPage = this.topicData.totalPages;
    this.linkNext = `${link}/${numPage}/view`;
  }
}
