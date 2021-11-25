import { Component, OnInit, Input } from "@angular/core";
import {
  TopicModel,
  MessageForumCreateModel,
} from "src/app/core/models/forum.model";

import { ApiService } from "src/app/core/services/api.service";
import { Router } from "@angular/router";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-reply-post",
  templateUrl: "./reply-post.component.html",
  styleUrls: ["./reply-post.component.sass"],
})
export class ReplyPostComponent implements OnInit {
  @Input() topicData: TopicModel;
  @Input() iAmGameMaster: boolean;
  @Input() gameId: number;
  @Input() totalPages: number;
  @Input() pageSize: number;
  @Input() navigate: (params) => void;

  msgId: number = -1;
  error: boolean = false;
  editorContent: any;
  isLoading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = "";

  faSpinner = faSpinner;

  constructor(private _api: ApiService, private router: Router) {}

  ngOnInit() {
    this.editorContent = document.querySelector(".editor");
  }

  async getMessageData(messageData: any) {
    let bodyHtml = messageData.html;
    let filesArray = messageData.files;
    let userId = parseInt(localStorage.getItem("id"));

    if (bodyHtml.length < 1) return false;

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
    let msg = new MessageForumCreateModel(date, null, bodyMessage, userId, this.topicData.id, false);

    this._api.sendForumMessage(msg).subscribe(async data => {
      this.isLoading = false;
      if (data.success) {
        let params = {
          gameId: this.gameId,
          topicId: this.topicData.id,
          pageNumber: this.totalPages,
          pageSize: this.pageSize
        }
        this.router.navigate(["game"], { queryParams: params });
      }
      else {
        this.alertMessage = data.message
        this.showAlert = true;
      }
    });
  }
}
