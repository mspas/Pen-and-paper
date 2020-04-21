import { Component, OnInit, Input } from "@angular/core";
import { ForumModel, TopicModel } from "src/app/models/forum.model";
import { GameAppModel } from "src/app/models/game.model";
import { TopicToPersonModel } from "src/app/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/models/personaldata.model";

@Component({
  selector: "app-topic",
  templateUrl: "./topic.component.html",
  styleUrls: ["./topic.component.sass"]
})
export class TopicComponent implements OnInit {
  @Input() forumData: ForumModel;
  @Input() gameData: GameAppModel;
  @Input() topicToPersonData: TopicToPersonModel[];
  @Input() profileData: PersonalDataModel;
  @Input() topicData: TopicModel;

  constructor() {}

  ngOnInit() {}
}
