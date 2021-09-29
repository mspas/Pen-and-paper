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
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-create-topic",
  templateUrl: "./create-topic.component.html",
  styleUrls: ["./create-topic.component.sass"],
})
export class CreateTopicComponent implements OnInit {
  @ViewChild("f", { static: true }) form: NgForm;

  @Input() gameData: GameAppModel;
  @Input() forumData: ForumModel;
  @Input() profileData: PersonalDataModel;
  @Input() iAmGameMaster: boolean;
  
  @Output() goBackOnSuccessEvent = new EventEmitter<boolean>();

  f: NgForm;
  faSpinner = faSpinner;

  isLoading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string;

  constructor(private _api: ApiService) {}

  ngOnInit() {}

  validateInput(form: NgForm, msg: string) {
    if (this.iAmGameMaster && !form.controls["access"].value) return false;
    if (!form.value.title || msg.length < 1) return false;
    return true;
  }

  onCreate(s) {
    let validateInput = this.validateInput(this.form, s);
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
    let access = this.iAmGameMaster && this.form.controls["access"].value === "limited" ? false : true;

    const topic: TopicCreateModel = new TopicCreateModel(
      this.forumData.id,
      this.form.value.title,
      this.form.value.category,
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
