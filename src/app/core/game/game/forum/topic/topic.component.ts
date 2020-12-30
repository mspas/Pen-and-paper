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
  @Input() goBack: () => void;
  @Input() navigate: (params) => void;

  pageNumber: number;
  replyParam: string;
  replyPage: boolean = false;

  participants: PersonalDataModel[];
  iAmGameMaster: boolean = false;
  linkPrevious: string;
  linkNext: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.pageNumber = this.route.snapshot.queryParams.pageNumber;
  }
}
