import { Component, OnInit, Input } from "@angular/core";
import { ForumModel, TopicListModel } from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { Router } from "@angular/router";

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

  pageSize: number = 10;

  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(topicId: number, pageNumber: number) {
    let query = `/?topicId=${topicId}&pageNumber=${pageNumber}&pageSize=${this.pageSize}`;
    this.router.navigate(["game", this.gameData.id, "forum"], {
      queryParams: {
        topicId: topicId,
        pageNumber: pageNumber,
        pageSize: this.pageSize,
      },
    });
  }
}
