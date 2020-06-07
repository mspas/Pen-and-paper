import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import {
  ForumModel,
  TopicCreateModel,
  NewTopicModel,
  MessageForumCreateModel,
} from "src/app/core/models/forum.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ApiService } from "src/app/core/services/api.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-create-topic",
  templateUrl: "./create-topic.component.html",
  styleUrls: ["./create-topic.component.sass"],
})
export class CreateTopicComponent implements OnInit {
  @ViewChild("formOptions", { static: true }) formTopicOptions: NgForm;

  @Input() forumData: ForumModel;
  @Input() profileData: PersonalDataModel;
  @Input() iAmGameMaster: boolean;

  @Output() valueChange = new EventEmitter();

  constructor(private _api: ApiService) {}

  ngOnInit() {}

  onClickBack() {
    this.valueChange.emit("false");
  }

  onCreate(form: NgForm) {
    let date = new Date();
    let access = true;

    if (form.controls["optradio"].value == "limited") access = false;

    const topic: TopicCreateModel = new TopicCreateModel(
      this.forumData.id,
      form.value.title,
      form.value.category,
      this.profileData.id,
      access,
      1,
      date,
      date,
      this.profileData.id,
      1
    );
    const newtopic: NewTopicModel = new NewTopicModel(
      topic,
      form.value.message
    );
    this._api.createTopic(newtopic);

    this.valueChange.emit("false");
  }

  getMsgHTML(s) {
    let date = new Date();
    let access = true;

    if (
      this.iAmGameMaster &&
      this.formTopicOptions.controls["access"].value == "limited"
    )
      access = false;

    const topic: TopicCreateModel = new TopicCreateModel(
      this.forumData.id,
      this.formTopicOptions.value.title,
      this.formTopicOptions.value.category,
      this.profileData.id,
      access,
      1,
      date,
      date,
      this.profileData.id,
      1
    );
    const newtopic: NewTopicModel = new NewTopicModel(topic, s);
    this._api.createTopic(newtopic);

    this.valueChange.emit("false");
  }
}
