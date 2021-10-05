import { Component, OnInit, Input } from "@angular/core";
import { ForumModel, TopicListModel } from "src/app/core/models/forum.model";
import { GameAppModel } from "src/app/core/models/game.model";
import { TopicToPersonModel } from "src/app/core/models/topic-to-person.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { Router } from "@angular/router";
import { DataService } from "src/app/core/services/data.service";
import { faTrashAlt, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from "src/app/core/services/api.service";

@Component({
  selector: "app-topic-list",
  templateUrl: "./topic-list.component.html",
  styleUrls: ["./topic-list.component.sass"],
})
export class TopicListComponent implements OnInit {
  @Input() forumData: ForumModel;
  @Input() gameData: GameAppModel;
  @Input() topicToPersonData: TopicToPersonModel[];
  @Input() profileData: PersonalDataModel;
  @Input() topicsList: [{ name: string; topics: TopicListModel[] }];
  @Input() navigate: (params) => void;

  pageSize: number;
  isLoadingDelete: boolean = false;
  showModal: boolean = false;
  topicToDeleteId: number = -1;
  showAlert: boolean = false;
  alertMessage: string = "";

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faSpinner = faSpinner;

  constructor(private _api: ApiService, private _data: DataService) {}

  ngOnInit() {
    this.pageSize = this._data.getPageSizeForum();
  }

  onTopicClick(topicId: number, pageNumber: number) {
    let params = {
      queryParams: {
        gameId: this.gameData.id,
        topicId: topicId,
        pageNumber: pageNumber,
        pageSize: this.pageSize,
      }
    };
    this.navigate(params);
  }

  onEditTopicClick(topicId: number) {
    alert("Not implemented!");
  }

  onDeleteTopicClick(topicId: number) {
    this.showModal = true;
    this.topicToDeleteId = topicId;
  }

  deleteTopic() {
    this.isLoadingDelete = true;

    this._api.deleteTopic(this.topicToDeleteId).subscribe(data => {
      this.isLoadingDelete = false;
      if (data.success) {
        this.showAlert = false;
        window.location.reload();
      }
      else {
        this.alertMessage = "Error! Something went wrong!"
        this.showAlert = true;
      }
    })
  }

  closeModal(value: boolean) {
    this.showModal = value;
    this.topicToDeleteId = -1;
  }
}
