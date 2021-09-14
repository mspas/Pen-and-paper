import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
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
import { GameAppModel } from "src/app/core/models/game.model";

@Component({
  selector: "app-create-topic",
  templateUrl: "./create-topic.component.html",
  styleUrls: ["./create-topic.component.sass"],
})
export class CreateTopicComponent implements OnInit {
  @ViewChild("formOptions", { static: true }) formTopicOptions: NgForm;

  @Input() gameData: GameAppModel;
  @Input() forumData: ForumModel;
  @Input() profileData: PersonalDataModel;
  @Input() iAmGameMaster: boolean;
  
  @Output() goBackOnSuccessEvent = new EventEmitter<boolean>();

  isLoading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string;

  constructor(private _api: ApiService) {}

  ngOnInit() {
  }

  validateInput(form: NgForm, msg: string) {
    if (!form.value.title || !form.controls["access"].value || msg.length < 1) return false;
    return true;
  }

  onCreate(s) {
    let validateInput = this.validateInput(this.formTopicOptions, s);
    if (!validateInput) {
      this.showAlert = true;
      this.alertMessage = "Fill all of the input fields!"
      return validateInput;
    }
    else {
      this.showAlert = false;
      this.alertMessage = ""
    }

    let date = new Date();
    let access = false ? this.iAmGameMaster && this.formTopicOptions.controls["access"].value == "limited" : true;

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

    this.isLoading = true;
    this.alertMessage = "Loading...";
    this.showAlert = true;

    this._api.createTopic(newtopic).subscribe(data => {
      if (data.id) {
        this.isLoading = false;
        this.alertMessage = "";
        this.showAlert = false;
        this.goBackOnSuccessEvent.emit(true);
      }
    });
  }
}
