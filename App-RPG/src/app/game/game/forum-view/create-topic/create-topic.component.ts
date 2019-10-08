import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TopicCreateModel, ForumModel, MessageForumModel, MessageForumCreateModel, NewTopicModel } from '../../../../models/forum.model';
import { PersonalDataModel } from '../../../../models/personaldata.model';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css', '../forum-view.component.css']
})
export class CreateTopicComponent implements OnInit {

  @Input() forumData: ForumModel;
  @Input() profileData: PersonalDataModel;
  @Input() iAmGameMaster: boolean;

  @Output() valueChange = new EventEmitter(); 

  constructor(private _api: ApiService) { }

  ngOnInit() {
  }

  onClickBack() {
    this.valueChange.emit("false");
  }

  onCreate(form: NgForm) {
    let date = new Date();
    let access = true;

    if (form.controls['optradio'].value == "limited")
      access = false;

    const topic: TopicCreateModel = new TopicCreateModel(this.forumData.id, form.value.title, form.value.category, this.profileData.id, access, 1, date, date, this.profileData.id, 1);
    const newtopic: NewTopicModel = new NewTopicModel(topic, form.value.message);
    this._api.createTopic(newtopic);

    this.valueChange.emit("false");
  }  

}
