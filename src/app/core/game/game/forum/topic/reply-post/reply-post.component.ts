import { Component, OnInit, Input } from "@angular/core";
import {
  TopicModel,
  MessageForumCreateModel,
} from "src/app/core/models/forum.model";

import { ApiService } from "src/app/core/services/api.service";
import { Router } from "@angular/router";

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


  constructor(private _api: ApiService, private router: Router) {}

  ngOnInit() {
    this.editorContent = document.querySelector(".editor");
  }

  async getMsgHTML(body) {
    if (body.length < 1) return false;

    let date = new Date();
    let msg = new MessageForumCreateModel(
      date,
      null,
      body,
      parseInt(localStorage.getItem("id")),
      this.topicData.id,
      false
    );

    this.isLoading = true;
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

    /*await this.delay(500);
    this._api
      .getTopicData(this.topicData.id)
      .subscribe((data) => (this.topicData = data));
    await this.delay(300);
    this._forum.currentApiResponse.subscribe((data) => (this.msgId = data));
    if (this.msgId != null && this.msgId != -1) {
      let res = await this._router.navigate([
        "/game",
        this.gameId,
        this.topicData.id,
        this.topicData.messagesAmount,
        "view",
      ]);
      window.location.reload();
    } else this.error = true;*/
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
