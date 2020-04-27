import { Component, OnInit, Input } from "@angular/core";
import {
  TopicModel,
  MessageForumCreateModel,
} from "src/app/models/forum.model";

import { ApiService } from "src/app/services/api.service";
import { ForumService } from "src/app/services/forum.service";
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

  msgId: number = -1;
  error: boolean = false;
  editorContent: any;

  constructor(
    private _api: ApiService,
    private _forum: ForumService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.editorContent = document.querySelector(".editor");
  }

  async getMsgHTML(s) {
    let date = new Date();
    let page = Math.floor(this.topicData.messages.length / 10);
    let msg = new MessageForumCreateModel(
      date,
      null,
      s,
      parseInt(localStorage.getItem("id")),
      this.topicData.id,
      page,
      false
    );
    this._api.createForumMessage(msg);
    await this.delay(500);
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
    } else this.error = true;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
