import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ForumModel } from "src/app/models/forum.model";
import { PersonalDataModel } from "src/app/models/personaldata.model";

@Component({
  selector: "app-create-topic",
  templateUrl: "./create-topic.component.html",
  styleUrls: ["./create-topic.component.sass"]
})
export class CreateTopicComponent implements OnInit {
  @Input() forumData: ForumModel;
  @Input() profileData: PersonalDataModel;
  @Input() iAmGameMaster: boolean;

  @Output() valueChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
