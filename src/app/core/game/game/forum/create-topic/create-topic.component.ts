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

  async onCreate(messageData: any) {
    let bodyHtml = messageData.html;
    let filesArray = messageData.files;
    let userId = parseInt(localStorage.getItem("id"));

    let validateInput = this.validateInput(this.form, bodyHtml);
    if (!validateInput) {
      this.showAlert = true;
      this.alertMessage = "Fill all of the input fields!"
      return validateInput;
    }
    else {
      this.showAlert = false;
      this.alertMessage = ""
    }

    this.isLoading = true;

    let arraySplitImg = bodyHtml.split(`<img src="`);
    let arraySplit = [];

    for (let i = 0; i < arraySplitImg.length; i++) {            // split message in a way that every second item in output array will be representing an image
      const element = arraySplitImg[i].split(`" alt="findme">`);
      for (let j = 0; j < element.length; j++) 
        arraySplit.push(element[j]);
    }

    let bodyMessage = "";
    for (let i = 0, fileIndex = 0; i < arraySplit.length; i++) {    // each second element stands for image which needs to be replaced with acctual img data
      if (i%2 !== 0) {
        let imageResponse = await this._api.uploadPhoto(3, userId, false, filesArray[fileIndex]).toPromise();
        if (imageResponse.success)
          arraySplit[i] = `<img src="${imageResponse.message}" alt="findme">`
        else 
          arraySplit[i] = `<img src="${filesArray[fileIndex].name}" alt="findme">`     //doodoo
        fileIndex++;
      }
      bodyMessage += arraySplit[i];
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
    const newtopic: NewTopicModel = new NewTopicModel(topic, bodyMessage);

    this._api.createTopic(newtopic).subscribe(data => {
      this.isLoading = false;
      if (data.success) {
        this.alertMessage = "";
        this.showAlert = false;
        this.goBackOnSuccessEvent.emit(true);
      }
      else {
        this.alertMessage = "Error! Refresh and try again later!";
        this.showAlert = true;
      }
    });
  }
}
