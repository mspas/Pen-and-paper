import { Component, OnInit, Input } from '@angular/core';
import { TopicModel, MessageForumCreateModel } from '../../../../../models/forum.model';
import { ApiService } from '../../../../../services/api.service';
import { ForumService } from '../../../../../services/forum.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reply-post',
  templateUrl: './reply-post.component.html',
  styleUrls: ['./reply-post.component.css', '../../forum-view.component.css']
})
export class ReplyPostComponent implements OnInit {

  @Input() topicData: TopicModel;
  @Input() iAmGameMaster: boolean;
  @Input() gameId: number;

  msgId: number = -1;
  error: boolean = false;
  files: any;
  btn: any;
  getText: any;
  content: any;
  editorContent: any;

  constructor(private _api: ApiService, private _forum: ForumService, private _router: Router) { }

  ngOnInit() {
    this.btn = document.querySelector(".sai");
    this.getText = document.querySelector(".getText");
    this.content = document.querySelector(".getcontent");
    this.editorContent = document.querySelector(".editor");
  }

  getImage() {
    this.files = document.querySelector("input[type=file]");
  
    var file = <Blob>this.files.files[0];
  
    var reader = new FileReader();
  
    let dataURI;
  
    reader.addEventListener(
      "load",
      function() {
        dataURI = reader.result;
        const editorContent = document.querySelector(".editor");
        const img = document.createElement("img");
        img.src = dataURI;
        editorContent.appendChild(img);
      },
      false
    );
  
    if (file) {
      console.log("s");
      reader.readAsDataURL(file);
    }
  }
  
  async get() {
    //var get = this.Editor.data.getData();
    const editorContent = document.querySelector(".editor");
    var s = editorContent.innerHTML;
    console.log(s);


    
    let date = new Date();
    let page = Math.floor(this.topicData.messages.length/10);
    let msg = new MessageForumCreateModel(date, null, s, parseInt(localStorage.getItem("id")), this.topicData.id, page, false);
    this._api.createForumMessage(msg);
    await this.delay(500);
    this._api.getTopicData(this.topicData.id).subscribe(data => this.topicData = data);
    await this.delay(300);
    this._forum.currentApiResponse.subscribe(data => this.msgId = data);
    if (this.msgId != null && this.msgId != -1) {
      var res = await this._router.navigate(['/game', this.gameId, this.topicData.id, this.topicData.messagesAmount, 'view']);
      window.location.reload(); 
    }
    else 
      this.error = true;
  }

  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async onCreate(form: NgForm) {
    let date = new Date();
    let page = Math.floor(this.topicData.messages.length/10);
    let msg = new MessageForumCreateModel(date, null, form.value.message, parseInt(localStorage.getItem("id")), this.topicData.id, page, false);
    this._api.createForumMessage(msg);
    await this.delay(500);
    this._api.getTopicData(this.topicData.id).subscribe(data => this.topicData = data);
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
