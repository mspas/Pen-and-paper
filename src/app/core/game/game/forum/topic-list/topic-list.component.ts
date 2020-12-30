import { Component, OnInit, Input } from "@angular/core";
import { ForumModel, TopicListModel } from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { Router } from "@angular/router";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-topic-list",
  templateUrl: "./topic-list.component.html",
  styleUrls: ["./topic-list.component.sass"],
})
export class TopicListComponent implements OnInit {
  @Input() forumData: ForumModel;
  @Input() gameData: GameAppModel;
  @Input() topicToPersonData: TopicToPersonModel[];
  @Input() profileData: PersonalDataModel;
  @Input() topicsList: [{ name: string; topics: TopicListModel[] }];
  @Input() navigate: (params) => void;

  pageSize: number;

  constructor(private router: Router, private _data: DataService) {}

  ngOnInit() {
    this.pageSize = this._data.getPageSizeForum();
  }

  onTopicClick(topicId: number, pageNumber: number) {
    let params = {
      queryParams: {
        gameId: this.gameData.id,
        topicId: topicId,
        pageNumber: pageNumber,
        pageSize: this.pageSize,
      }
    };
    this.navigate(params);
  }
}
