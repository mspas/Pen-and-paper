import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import {
  TopicModel,
  PostModel,
  PostImageModel,
} from "src/app/core/models/forum.model";
import { PersonalDataListModel, PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ApiService } from "src/app/core/services/api.service";
import { ActivatedRoute } from "@angular/router";
import { faTrashAlt, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.sass"],
})
export class PostsComponent implements OnInit {
  @Input() topicData: TopicModel;
  @Input() players: PersonalDataListModel[];
  @Input() iAmGameMaster: boolean;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faSpinner = faSpinner;

  loggedUserId: number = -1;
  html: string;
  test: string = "";
  page: number;
  gameId: number;
  posts: PostModel[] = [];
  postImages: PostImageModel[] = [];
  fileNames: any[] = [];

  isImageLoading: boolean;
  isLoading: boolean;
  isLoadingDelete: boolean = false;
  showModal: boolean = false;
  messageToDeleteId: number = -1;
  showAlert: boolean = false;
  alertMessage: string = "";


  constructor(private _api: ApiService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.gameId = this.route.snapshot.params.gameId;
    this.page = parseInt(this.route.snapshot.params.page);
    this.loggedUserId = parseInt(localStorage.getItem("id"));

    for (let i = 0; i < this.topicData.messages.length; i++) {
      const message = this.topicData.messages[i];
      let author = null;
      this.players.forEach((user) => {
        if (message.senderId == user.data.id) author = user;
      });

      if (!author)                                        // workaround for bug - errer when it tries to prepare post for a user that left, but let's be honst this whole component is the one big WORKAROUND 
        author = new PersonalDataListModel(
          new PersonalDataModel(-1, "unknown", "", "player", "left the game", "", -1, null, false),
          null);

      message.bodyMessage = await this.preparePostHtml(message.bodyMessage);
      
      this.posts.push(new PostModel(message, author.data, author.photo));
    }
  }

  async preparePostHtml(message: string) {
    let arraySplitImg = message.split(`<img src="`);
    let arraySplit = [];
    let postFileNames = [];

    if (arraySplitImg.length < 2) {
      this.fileNames.push(postFileNames);
      return message;
    }

    for (let i = 0; i < arraySplitImg.length; i++) {            // split message in a way that every second item in output array will be representing an image
      const element = arraySplitImg[i].split(`" alt="findme">`);
      for (let j = 0; j < element.length; j++) 
        arraySplit.push(element[j]);
    }

    let bodyMessage = "";
    for (let i = 0; i < arraySplit.length; i++) {    // each second element stands for image which needs to be replaced with acctual img data
      if (i%2 !== 0) {
        postFileNames.push(arraySplit[i]);
        let blob = await this._api.getImage(arraySplit[i]).toPromise();
        let image = await this.blobToImage(blob);
        if (image)
          arraySplit[i] = image.outerHTML;
      }
      bodyMessage += arraySplit[i];
    }

    this.fileNames.push(postFileNames);

    return bodyMessage;
  }

  blobToImage = (blob: Blob): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
      let reader = new FileReader();
      let dataURI;
      reader.addEventListener(
        "load",
        () => {
          dataURI = reader.result;
          const img = document.createElement("img");
          img.src = dataURI;
          resolve(img);
        },
        false
      );
      if (blob) {
        reader.readAsDataURL(blob);
      }
    })
  }

  onEditPostClick(messageForumId: number) {
    alert("Not implemented!");
  }

  onDeletePostClick(messageForumId: number) {
    this.showModal = true;
    this.messageToDeleteId = messageForumId;
  }

  deleteImages(filesToDelete: string[]) {
    let check = true;
    return new Promise((resolve, reject) => {
      if (filesToDelete.length < 1)
        resolve(check);
      for (let i = 0; i < filesToDelete.length; i++) {
        const fileName = filesToDelete[i];
        this._api.deletePhoto(3, this.loggedUserId, fileName).subscribe(data => {
          if (!data.success)
            check = false;
          if (i === filesToDelete.length - 1)
            resolve(check);
        })
      };
    });
  }

  async deleteMessage() {
    let filesToDelete = [];
    this.isLoadingDelete = true;
    
    for (let i = 0; i < this.posts.length; i++) {
      const post = this.posts[i];
      if (post.message.id === this.messageToDeleteId) filesToDelete = this.fileNames[i];
    }

    let checkDeleteImages = await this.deleteImages(filesToDelete);

    if (!checkDeleteImages) {
      this.alertMessage = "Error while deleting images!"
      this.showAlert = true;
      this.isLoadingDelete = false;
      return false;
    }

    this._api.deleteForumMessage(this.messageToDeleteId).subscribe(data => {
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
    this.messageToDeleteId = -1;
  }
}
