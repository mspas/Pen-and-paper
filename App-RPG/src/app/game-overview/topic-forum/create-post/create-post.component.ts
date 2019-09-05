import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TopicModel, MessageForumCreateModel } from '../../../models/forum.model';
import { ApiService } from '../../../api.service';
import { ForumService } from '../../../forum.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css', '../../game-overview.component.css']
})
export class CreatePostComponent implements OnInit {

  @Input() topicData: TopicModel;
  @Input() iAmGameMaster: boolean;
  @Input() gameId: number;

  msgId: number = -1;
  error: boolean = false;

  constructor(private _api: ApiService, private _forum: ForumService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async onCreate(form: NgForm) {
    let date = new Date();
    let page = Math.floor(this.topicData.messages.length/10);
    let msg = new MessageForumCreateModel(date, null, form.value.message, parseInt(localStorage.getItem("id")), this.topicData.id, page);
    this._api.createForumMessage(msg);
    await this.delay(500);
    this._api.getOnlyTopic(this.topicData.id).subscribe(data => this.topicData = data);
    await this.delay(300);
    this._forum.currentApiResponse.subscribe(data => this.msgId = data);
    if (this.msgId != null && this.msgId != -1) {
      var res = await this._router.navigate(['/game', this.gameId, this.topicData.id, this.topicData.messagesAmount, 'view']);
      window.location.reload(); 
    }
    else 
      this.error = true;
  } 
}
