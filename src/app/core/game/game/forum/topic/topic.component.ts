import { Component, OnInit, Input } from "@angular/core";
import { ForumModel, TopicModel } from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/core/services/data.service";

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
  @Input() totalPages: number;
  @Input() navigate: (params) => void;

  pageNumber: number;
  pageSize: number;
  replyParam: string;
  replyPage: boolean = false;

  participants: PersonalDataModel[];
  iAmGameMaster: boolean = false;
  linkPrevious: string;
  linkNext: string;

  constructor(private route: ActivatedRoute, private _data: DataService) {}

  ngOnInit() {
    this.pageNumber = parseInt(this.route.snapshot.queryParams.pageNumber);
    this.replyPage = this.route.snapshot.queryParams.reply === "true" ? true : false;
    this.pageSize = this._data.getPageSizeForum();
  }

}
