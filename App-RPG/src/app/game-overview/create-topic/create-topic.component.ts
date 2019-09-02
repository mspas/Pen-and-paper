import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TopicCreateModel, ForumModel, MessageForumModel, MessageForumCreateModel, NewTopicModel } from '../../models/forum.model';
import { PersonalDataModel } from '../../models/personaldata.model';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css', '../game-overview.component.css']
})
export class CreateTopicComponent implements OnInit {

  @Input() forumData: ForumModel;
  @Input() profileData: PersonalDataModel;

  constructor(private _api: ApiService) { }

  ngOnInit() {
  }

  onCreate(form: NgForm) {
    let id;
    let date = new Date();
    let array: MessageForumModel[] = [];
    console.log(form.value.title + " " + form.value.category + " " + form.value.message);
    const message: MessageForumModel = new MessageForumModel(null, date, null, form.value.message, this.profileData.id, null, 1);
    array.push(message);
    const topic: TopicCreateModel = new TopicCreateModel(this.forumData.id, form.value.title, form.value.category, this.profileData.id, true, 1, date, date, this.profileData.id, 1);
    const newtopic: NewTopicModel = new NewTopicModel(topic, form.value.message);
    this._api.createTopic(newtopic);
    //nie dziala
  }
  

}
