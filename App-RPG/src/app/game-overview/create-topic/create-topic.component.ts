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
  @Input() iAmGameMaster: boolean;

  constructor(private _api: ApiService) { }

  ngOnInit() {

  }

  async onCreate(form: NgForm) {
    let date = new Date();
    let access = true;

    if (form.controls['optradio'].value == "limited")
      access = false;

    const topic: TopicCreateModel = new TopicCreateModel(this.forumData.id, form.value.title, form.value.category, this.profileData.id, access, 1, date, date, this.profileData.id, 1);
    const newtopic: NewTopicModel = new NewTopicModel(topic, form.value.message);
    await this._api.createTopic(newtopic);


  }  

}
